import type { PlayerInput, Vec3 } from "@forged-arena/protocol";

export const CARRY = Object.freeze({
  range: 1.55,
  cadenceTicks: 5,
  maxBallSpeed: 8.5,
  touchSpeed: 7.2,
  forwardOffset: 0.45,
});

export type CarryState = { lastCarryTick: number };
export type CarryResult = { velocity: Vec3; next: CarryState } | null;

export function resolveCarry(
  player: Vec3,
  ball: Vec3,
  ballVelocity: Vec3,
  input: PlayerInput,
  tick: number,
  state: CarryState,
): CarryResult {
  const moveLength = Math.hypot(input.moveX, input.moveZ);
  if (moveLength < 0.15 || input.pass || input.shoot) return null;
  if (tick - state.lastCarryTick < CARRY.cadenceTicks) return null;
  if (Math.hypot(player.x - ball.x, player.z - ball.z) > CARRY.range) return null;
  if (Math.hypot(ballVelocity.x, ballVelocity.y, ballVelocity.z) > CARRY.maxBallSpeed) return null;

  const x = input.moveX / moveLength;
  const z = input.moveZ / moveLength;
  return {
    velocity: { x: x * CARRY.touchSpeed, y: Math.max(0, Math.min(ballVelocity.y, 0.35)), z: z * CARRY.touchSpeed },
    next: { lastCarryTick: tick },
  };
}
