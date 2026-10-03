import type { PlayerInput, Vec3 } from "@forged-arena/protocol";
import type { StrikeInput } from "@forged-arena/physics";

export const FOOTBALL_INTERACTION = Object.freeze({
  strikeRange: 1.65,
  passPower: 0.62,
  shotPower: 1,
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
  if (!input.pass && !input.shoot) return null;

  const moveLength = Math.hypot(input.moveX, input.moveZ);
  const direction = moveLength > 0.1
    ? { x: input.moveX / moveLength, y: 0, z: input.moveZ / moveLength }
    : { x: ball.x - player.x, y: 0, z: ball.z - player.z };

  return {
    strike: {
      kind: input.shoot ? "shot" : "ground-pass",
      direction,
      power: input.shoot ? FOOTBALL_INTERACTION.shotPower : FOOTBALL_INTERACTION.passPower,
    },
    next: { lastStrikeTick: tick },
  };
}
