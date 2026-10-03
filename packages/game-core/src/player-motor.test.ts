import {describe,expect,it} from "vitest";import {stepPlayerMotor} from "./player-motor";
const base={position:{x:0,y:1,z:0},velocity:{x:0,y:0,z:0},lastProcessedInput:0};
describe("Player Motor",()=>{
 it("accelerates from input",()=>{expect(stepPlayerMotor(base,{seq:1,moveX:1,moveZ:0,sprint:false,pass:false,shoot:false,tackle:false},1/30).velocity.x).toBeGreaterThan(0)});
 it("normalizes diagonal input",()=>{const s=stepPlayerMotor(base,{seq:1,moveX:1,moveZ:1,sprint:true,pass:false,shoot:false,tackle:false},1);expect(Math.hypot(s.velocity.x,s.velocity.z)).toBeLessThanOrEqual(9.21)});
 it("brakes without input",()=>{const s=stepPlayerMotor({...base,velocity:{x:6,y:0,z:0}},{seq:2,moveX:0,moveZ:0,sprint:false,pass:false,shoot:false,tackle:false},.1);expect(s.velocity.x).toBeLessThan(6)});
 it("cannot leave arena bounds",()=>{const s=stepPlayerMotor({...base,position:{x:11.34,y:1,z:0}},{seq:3,moveX:1,moveZ:0,sprint:true,pass:false,shoot:false,tackle:false},1);expect(s.position.x).toBeLessThanOrEqual(11.35)});
});
