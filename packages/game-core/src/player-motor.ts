import type {PlayerInput,Vec3} from "@forged-arena/protocol";
export type PlayerMotorTuning={walkSpeed:number;sprintSpeed:number;acceleration:number;braking:number;turnResponsiveness:number;halfWidth:number;halfDepth:number};
export const PLAYER_MOTOR:Readonly<PlayerMotorTuning>=Object.freeze({walkSpeed:6.5,sprintSpeed:9.2,acceleration:28,braking:34,turnResponsiveness:18,halfWidth:11.35,halfDepth:6.35});
export type MotorState={position:Vec3;velocity:Vec3;lastProcessedInput:number};
const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));
const approach=(v:number,target:number,maxDelta:number)=>v<target?Math.min(v+maxDelta,target):Math.max(v-maxDelta,target);
export function stepPlayerMotor(state:MotorState,input:PlayerInput,dt:number,t=PLAYER_MOTOR):MotorState{
 const len=Math.hypot(input.moveX,input.moveZ),nx=len>1?input.moveX/len:input.moveX,nz=len>1?input.moveZ/len:input.moveZ;
 const speed=input.sprint?t.sprintSpeed:t.walkSpeed, moving=Math.abs(nx)+Math.abs(nz)>.001;
 const rate=moving?t.acceleration:t.braking;
 const vx=approach(state.velocity.x,nx*speed,rate*dt),vz=approach(state.velocity.z,nz*speed,rate*dt);
 return {position:{x:clamp(state.position.x+vx*dt,-t.halfWidth,t.halfWidth),y:state.position.y,z:clamp(state.position.z+vz*dt,-t.halfDepth,t.halfDepth)},velocity:{x:vx,y:0,z:vz},lastProcessedInput:Math.max(state.lastProcessedInput,input.seq)};
}
