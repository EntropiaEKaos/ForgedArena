import {describe,expect,it} from "vitest";import {stepPlayerMotor} from "./player-motor";
const base={position:{x:0,y:1,z:0},velocity:{x:0,y:0,z:0},lastProcessedInput:0};
const input=(seq:number,moveX:number,moveZ:number,sprint=false)=>({seq,moveX,moveZ,aimX:moveX,aimZ:moveZ,actionPower:.5,sprint,pass:false,shoot:false,tackle:false});
describe("Player Motor",()=>{
 it("accelerates from input",()=>{expect(stepPlayerMotor(base,input(1,1,0),1/30).velocity.x).toBeGreaterThan(0)});
 it("normalizes diagonal input",()=>{const s=stepPlayerMotor(base,input(1,1,1,true),1);expect(Math.hypot(s.velocity.x,s.velocity.z)).toBeLessThanOrEqual(9.21)});
 it("brakes without input",()=>{const s=stepPlayerMotor({...base,velocity:{x:6,y:0,z:0}},input(2,0,0),.1);expect(s.velocity.x).toBeLessThan(6)});
 it("cannot leave arena bounds",()=>{const s=stepPlayerMotor({...base,position:{x:11.34,y:1,z:0}},input(3,1,0,true),1);expect(s.position.x).toBeLessThanOrEqual(11.35)});
});
