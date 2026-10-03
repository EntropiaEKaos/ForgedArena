import {describe,expect,it} from "vitest";import {calculateStrike,magnusAcceleration} from "./index";
describe("Forged Ball Model",()=>{
 it("clamps strike power",()=>{expect(calculateStrike({kind:"shot",direction:{x:1,y:0,z:0},power:2}).linear.x).toBeLessThanOrEqual(38)});
 it("ground pass stays low",()=>{const r=calculateStrike({kind:"ground-pass",direction:{x:1,y:0,z:0},power:1});expect(r.linear.y).toBeLessThan(1)});
 it("lob has more lift than ground pass",()=>{const g=calculateStrike({kind:"ground-pass",direction:{x:1,y:0,z:0},power:1});const l=calculateStrike({kind:"lob-pass",direction:{x:1,y:0,z:0},power:1});expect(l.linear.y).toBeGreaterThan(g.linear.y)});
 it("placed shot can carry side spin",()=>{expect(calculateStrike({kind:"placed-shot",direction:{x:1,y:0,z:0},power:1,spin:1}).angular.y).toBeGreaterThan(0)});
 it("magnus reacts to spin and velocity",()=>{const a=magnusAcceleration({x:20,y:0,z:0},{x:0,y:20,z:0});expect(a.z).not.toBe(0)});
});
