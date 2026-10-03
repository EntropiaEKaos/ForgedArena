import type { Vec3 } from "@forged-arena/protocol";

export const PRECISION = Object.freeze({
  sweetSpot: 0.72,
  perfectWindow: 0.12,
  maxAngleDegrees: 7,
});

const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));

export type PrecisionResult={quality:number;direction:Vec3;angleOffsetDegrees:number};

/**
 * Deterministic execution model. No hidden RNG:
 * the same aim, power and timing bias always produce the same result.
 */
export function resolvePrecision(direction:Vec3,power:number,timingBias:number):PrecisionResult{
  const p=clamp(power,0,1);
  const timing=clamp(timingBias,-1,1);
  const powerError=Math.abs(p-PRECISION.sweetSpot);
  const timingError=Math.abs(timing);
  const quality=clamp(1-powerError*.75-timingError*.35,0,1);
  const angleOffsetDegrees=(1-quality)*PRECISION.maxAngleDegrees*Math.sign(timing||1);
  const angle=angleOffsetDegrees*Math.PI/180;
  const x=direction.x*Math.cos(angle)-direction.z*Math.sin(angle);
  const z=direction.x*Math.sin(angle)+direction.z*Math.cos(angle);
  const l=Math.hypot(x,z)||1;
  return {quality,direction:{x:x/l,y:direction.y,z:z/l},angleOffsetDegrees};
}
