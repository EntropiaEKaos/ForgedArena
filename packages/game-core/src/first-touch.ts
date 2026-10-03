import type { Vec3 } from "@forged-arena/protocol";

export const FIRST_TOUCH = Object.freeze({
  controlRange: 1.45,
  maxControllableSpeed: 12,
  settleFactor: 0.42,
  carrySpeed: 5.5,
});

export type FirstTouchResult = { velocity: Vec3; controlled: boolean };

export function resolveFirstTouch(player: Vec3, playerVelocity: Vec3, ball: Vec3, ballVelocity: Vec3): FirstTouchResult {
  const distance = Math.hypot(player.x - ball.x, player.z - ball.z);
  const ballSpeed = Math.hypot(ballVelocity.x, ballVelocity.y, ballVelocity.z);
  if (distance > FIRST_TOUCH.controlRange || ballSpeed > FIRST_TOUCH.maxControllableSpeed) {
    return { velocity: ballVelocity, controlled: false };
  }

  const playerSpeed = Math.hypot(playerVelocity.x, playerVelocity.z);
  const carryScale = playerSpeed > 0.1 ? Math.min(1, FIRST_TOUCH.carrySpeed / playerSpeed) : 0;
  return {
    controlled: true,
    velocity: {
      x: ballVelocity.x * FIRST_TOUCH.settleFactor + playerVelocity.x * carryScale,
      y: Math.min(0.6, Math.max(0, ballVelocity.y * 0.25)),
      z: ballVelocity.z * FIRST_TOUCH.settleFactor + playerVelocity.z * carryScale,
    },
  };
}
