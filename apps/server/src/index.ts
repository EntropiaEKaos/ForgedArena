import RAPIER from "@dimforge/rapier3d-compat";
import { beginAction, createInitialMatch, releaseAction, resolveCarry, resolveFirstTouch, resolveStrike, stepPlayerMotor, TICK_RATE, type ActionTimingState, type CarryState, type InteractionState, type MotorState } from "@forged-arena/game-core";
import { calculateStrike, FORGED_BALL } from "@forged-arena/physics";
import type { ClientMessage, PlayerInput, ServerMessage, TeamId } from "@forged-arena/protocol";
import { WebSocket, WebSocketServer } from "ws";

await RAPIER.init();

const port = Number(process.env.PORT ?? 8787);
const wss = new WebSocketServer({ port });
let state = createInitialMatch();

const world = new RAPIER.World({ x: 0, y: -FORGED_BALL.gravity, z: 0 });
world.timestep = 1 / TICK_RATE;
world.createCollider(
  RAPIER.ColliderDesc.cuboid(12, 0.2, 7)
    .setFriction(FORGED_BALL.groundFriction)
    .setRestitution(FORGED_BALL.restitution),
);

const ballBody = world.createRigidBody(
  RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(0, FORGED_BALL.radius + 0.22, 0)
    .setLinearDamping(FORGED_BALL.linearDamping)
    .setAngularDamping(FORGED_BALL.angularDamping)
    .setCcdEnabled(true),
);
world.createCollider(
  RAPIER.ColliderDesc.ball(FORGED_BALL.radius)
    .setMass(FORGED_BALL.mass)
    .setFriction(FORGED_BALL.groundFriction)
    .setRestitution(FORGED_BALL.restitution),
  ballBody,
);

type Session = { id: string; team: TeamId; input: PlayerInput; motor: MotorState; interaction: InteractionState; carry: CarryState; touchingBall: boolean; timing: ActionTimingState };
const sessions = new Map<WebSocket, Session>();
const neutral = (seq = 0): PlayerInput => ({
  seq, moveX: 0, moveZ: 0, aimX: 1, aimZ: 0, actionPower: 0.5, sprint: false, charging: null, pass: false, shoot: false, tackle: false,
});

wss.on("connection", (socket) => {
  const id = crypto.randomUUID();
  const team: TeamId = sessions.size % 2 === 0 ? "blue" : "red";
  sessions.set(socket, {
    id, team, input: neutral(), interaction: { lastStrikeTick: -1000 }, carry: { lastCarryTick: -1000 }, touchingBall: false, timing: { kind: null, startedTick: 0 },
    motor: {
      position: { x: team === "blue" ? -4 : 4, y: 1, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      lastProcessedInput: 0,
    },
  });

  socket.send(JSON.stringify({ type: "welcome", payload: { playerId: id, team } } satisfies ServerMessage));
  socket.on("message", (raw) => {
    try {
      const msg = JSON.parse(raw.toString()) as ClientMessage;
      if (msg.type !== "input") return;
      const session = sessions.get(socket);
      if (session && msg.payload.seq > session.input.seq) session.input = msg.payload;
    } catch {}
  });
  socket.on("close", () => sessions.delete(socket));
});

setInterval(() => {
  world.step();
  for (const session of sessions.values()) {
    session.motor = stepPlayerMotor(session.motor, session.input, 1 / TICK_RATE);
    const ball = ballBody.translation();
    const ballPosition = { x: ball.x, y: ball.y, z: ball.z };
    const distance = Math.hypot(session.motor.position.x - ball.x, session.motor.position.z - ball.z);
    const inTouchZone = distance <= 1.45;
    if (inTouchZone && !session.touchingBall && !session.input.pass && !session.input.shoot) {
      const bv = ballBody.linvel();
      const touch = resolveFirstTouch(session.motor.position, session.motor.velocity, ballPosition, { x: bv.x, y: bv.y, z: bv.z });
      if (touch.controlled) ballBody.setLinvel(touch.velocity, true);
    }
    session.touchingBall = inTouchZone;
    if (session.input.charging && session.timing.kind !== session.input.charging) session.timing = beginAction(session.input.charging, state.tick);
    let strikeInput = session.input;
    const releasedAction = session.input.pass || session.input.shoot;
    if (releasedAction && !session.timing.kind) {
      strikeInput = { ...session.input, pass: false, shoot: false, actionPower: 0 };
    }
    if (releasedAction && session.timing.kind) {
      const released = releaseAction(session.timing, state.tick);
      if (released) {
        const matches = (released.kind === "pass" && session.input.pass) || (released.kind === "shoot" && session.input.shoot);
        strikeInput = matches
          ? { ...session.input, actionPower: released.power }
          : { ...session.input, pass: false, shoot: false, actionPower: 0 };
        session.timing = released.next;
      }
    }
    const request = resolveStrike(session.motor.position, ballPosition, strikeInput, state.tick, session.interaction);
    if (request) {
      const impulse = calculateStrike(request.strike);
      ballBody.setLinvel(impulse.linear, true);
      ballBody.setAngvel(impulse.angular, true);
      session.interaction = request.next;
    } else {
      const bv = ballBody.linvel();
      const carry = resolveCarry(session.motor.position, ballPosition, { x: bv.x, y: bv.y, z: bv.z }, session.input, state.tick, session.carry);
      if (carry) {
        ballBody.setLinvel(carry.velocity, true);
        session.carry = carry.next;
      }
    }
  }

  const p = ballBody.translation();
  const v = ballBody.linvel();
  state = {
    ...state,
    tick: state.tick + 1,
    clockMs: Math.max(0, state.clockMs - 1000 / TICK_RATE),
    players: [...sessions.values()].map((session) => ({
      id: session.id, team: session.team,
      position: session.motor.position, velocity: session.motor.velocity,
    })),
    ball: {
      position: { x: p.x, y: p.y, z: p.z },
      velocity: { x: v.x, y: v.y, z: v.z },
    },
  };

  const data = JSON.stringify({ type: "snapshot", payload: state } satisfies ServerMessage);
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) client.send(data);
  }
}, 1000 / TICK_RATE);

console.log(`ForgedArena authoritative server :${port} @ ${TICK_RATE}Hz`);
