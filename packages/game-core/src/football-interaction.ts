import type { PlayerInput, Vec3 } from "@forged-arena/protocol";
import type { StrikeInput } from "@forged-arena/physics";
import { resolvePrecision } from "./precision.js";

export const FOOTBALL_INTERACTION = Object.freeze({
  strikeRange: 1.65,
  passMinPower: 0.34,
  passMaxPower: 0.82,
  shotMinPower: 0.46,
  shotMaxPower: 1,
  cooldownTicks: 8,
});

export type InteractionState = { lastStrikeTick: number };
export type StrikeRequest = { strike: StrikeInput; next: InteractionState } | null;

const planarDistance = (a: Vec3, b: Vec3) => Math.hypot(a.x - b.x, a.z - b.z);

export function resolveStrike(
  player: Vec3,
  ball: Vec3,
  input: PlayerInput,
  tick: number,
  state: InteractionState,
): StrikeRequest {
  if (planarDistance(player, ball) > FOOTBALL_INTERACTION.strikeRange) return null;
  if (tick - state.lastStrikeTick < FOOTBALL_INTERACTION.cooldownTicks) return null;
  if (!input.pass && !input.lob && !input.shoot) return null;

  const moveLength = Math.hypot(input.aimX, input.aimZ);
  const direction = moveLength > 0.1
    ? { x: input.aimX / moveLength, y: 0, z: input.aimZ / moveLength }
    : { x: ball.x - player.x, y: 0, z: ball.z - player.z };

  const requestedPower = Math.max(0, Math.min(1, input.actionPower));
  const minPower = input.shoot ? FOOTBALL_INTERACTION.shotMinPower : FOOTBALL_INTERACTION.passMinPower;
  const maxPower = input.shoot ? FOOTBALL_INTERACTION.shotMaxPower : FOOTBALL_INTERACTION.passMaxPower;
  const power = minPower + (maxPower - minPower) * requestedPower;

  const precision = resolvePrecision(direction, power, 0);

  return {
    strike: {
      kind: input.shoot ? "shot" : input.lob ? "lob-pass" : "ground-pass",
      direction: precision.direction,
      power,
    },
    next: { lastStrikeTick: tick },
  };
}
