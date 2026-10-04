import type { Vec3 } from "@forged-arena/protocol";

export const TACKLE = Object.freeze({
  range: 1.7,
  cooldownTicks: 24,
  knockSpeed: 10.5,
  minFacingDot: 0.2,
});

export type TackleState = { lastTackleTick: number };
export type TackleResult = { velocity: Vec3; next: TackleState } | null;

const normalizePlanar = (v: Vec3): Vec3 => {
  const length = Math.hypot(v.x, v.z);
  return length > 1e-6 ? { x: v.x / length, y: 0, z: v.z / length } : { x: 0, y: 0, z: 0 };
};

export function resolveTackle(
  player: Vec3,
  aim: Vec3,
  ball: Vec3,
  tick: number,
  state: TackleState,
): TackleResult {
  if (tick - state.lastTackleTick < TACKLE.cooldownTicks) return null;
  const toBall = { x: ball.x - player.x, y: 0, z: ball.z - player.z };
  const distance = Math.hypot(toBall.x, toBall.z);
  if (distance > TACKLE.range || distance < 1e-6) return null;

  const facing = normalizePlanar(aim);
  const direction = normalizePlanar(toBall);
  const dot = facing.x * direction.x + facing.z * direction.z;
  if (dot < TACKLE.minFacingDot) return null;

  return {
    velocity: { x: direction.x * TACKLE.knockSpeed, y: 0.65, z: direction.z * TACKLE.knockSpeed },
    next: { lastTackleTick: tick },
  };
}
