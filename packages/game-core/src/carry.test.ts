import { describe, expect, it } from "vitest";
import { resolveCarry } from "./carry.js";
const moving={seq:1,moveX:1,moveZ:0,aimX:1,aimZ:0,actionPower:.5,spin:0,sprint:false,charging:null,lob:false,placedShot:false,pass:false,shoot:false,tackle:false};
describe("Carry",()=>{
 it("requires movement",()=>expect(resolveCarry({x:0,y:1,z:0},{x:1,y:.35,z:0},{x:0,y:0,z:0},{...moving,moveX:0},20,{lastCarryTick:0})).toBeNull());
 it("requires ball range",()=>expect(resolveCarry({x:0,y:1,z:0},{x:3,y:.35,z:0},{x:0,y:0,z:0},moving,20,{lastCarryTick:0})).toBeNull());
 it("respects cadence",()=>expect(resolveCarry({x:0,y:1,z:0},{x:1,y:.35,z:0},{x:0,y:0,z:0},moving,22,{lastCarryTick:20})).toBeNull());
 it("will not magnetize a fast escaping ball",()=>expect(resolveCarry({x:0,y:1,z:0},{x:1,y:.35,z:0},{x:12,y:0,z:0},moving,20,{lastCarryTick:0})).toBeNull());
 it("suppresses carry during placed-shot release",()=>expect(resolveCarry({x:0,y:1,z:0},{x:1,y:.35,z:0},{x:0,y:0,z:0},{...moving,placedShot:true},20,{lastCarryTick:0})).toBeNull());
 it("creates a discrete forward micro-touch",()=>{const r=resolveCarry({x:0,y:1,z:0},{x:1,y:.35,z:0},{x:0,y:0,z:0},moving,20,{lastCarryTick:0});expect(r?.velocity.x).toBeGreaterThan(0);expect(r?.next.lastCarryTick).toBe(20);});
});
