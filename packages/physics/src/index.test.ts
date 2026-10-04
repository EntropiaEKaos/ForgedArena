import {describe,expect,it} from "vitest";import {calculateStrike,FORGED_ARENA,magnusAcceleration,reflectWallVelocity} from "./index";
describe("Forged Ball Model",()=>{
 it("defines a closed arena larger than the player motor bounds",()=>{expect(FORGED_ARENA.halfWidth).toBeGreaterThan(11.35);expect(FORGED_ARENA.halfDepth).toBeGreaterThan(6.35);});
 it("uses energetic but bounded wall restitution",()=>{expect(FORGED_ARENA.wallRestitution).toBeGreaterThan(0);expect(FORGED_ARENA.wallRestitution).toBeLessThanOrEqual(1);});
 it("walls are tall enough to contain grounded football play",()=>expect(FORGED_ARENA.wallHeight).toBeGreaterThan(2));
 it("reflects an incoming side-wall velocity",()=>{const r=reflectWallVelocity({x:12,y:1,z:4},{x:-1,y:0,z:0});expect(r.x).toBeLessThan(0);expect(r.z).toBeCloseTo(4);expect(r.y).toBeCloseTo(1);});
 it("does not reflect a ball already moving away from the wall",()=>expect(reflectWallVelocity({x:-12,y:0,z:3},{x:-1,y:0,z:0})).toEqual({x:-12,y:0,z:3}));
 it("wall rebound cannot gain normal-axis energy",()=>{const r=reflectWallVelocity({x:20,y:0,z:0},{x:-1,y:0,z:0});expect(Math.abs(r.x)).toBeLessThanOrEqual(20);});
 it("mirrors equivalent left and right bank plays",()=>{const a=reflectWallVelocity({x:15,y:0,z:5},{x:-1,y:0,z:0});const b=reflectWallVelocity({x:-15,y:0,z:5},{x:1,y:0,z:0});expect(a.x).toBeCloseTo(-b.x);expect(a.z).toBeCloseTo(b.z);});
 it("clamps rebound restitution to a safe range",()=>expect(Math.abs(reflectWallVelocity({x:10,y:0,z:0},{x:-1,y:0,z:0},4).x)).toBeLessThanOrEqual(10));
 it("clamps strike power",()=>{expect(calculateStrike({kind:"shot",direction:{x:1,y:0,z:0},power:2}).linear.x).toBeLessThanOrEqual(38)});
 it("ground pass stays low",()=>{const r=calculateStrike({kind:"ground-pass",direction:{x:1,y:0,z:0},power:1});expect(r.linear.y).toBeLessThan(1)});
 it("lob has more lift than ground pass",()=>{const g=calculateStrike({kind:"ground-pass",direction:{x:1,y:0,z:0},power:1});const l=calculateStrike({kind:"lob-pass",direction:{x:1,y:0,z:0},power:1});expect(l.linear.y).toBeGreaterThan(g.linear.y)});
 it("placed shot can carry side spin",()=>{expect(calculateStrike({kind:"placed-shot",direction:{x:1,y:0,z:0},power:1,spin:1}).angular.y).toBeGreaterThan(0)});
 it("spin is mirrored across left and right",()=>{const l=calculateStrike({kind:"placed-shot",direction:{x:1,y:0,z:0},power:1,spin:-1});const r=calculateStrike({kind:"placed-shot",direction:{x:1,y:0,z:0},power:1,spin:1});expect(l.angular.y).toBeCloseTo(-r.angular.y);});
 it("neutral spin has no yaw",()=>expect(calculateStrike({kind:"placed-shot",direction:{x:1,y:0,z:0},power:1,spin:0}).angular.y).toBe(0));
 it("magnus mirrors lateral acceleration",()=>{const l=magnusAcceleration({x:20,y:0,z:0},{x:0,y:-20,z:0});const r=magnusAcceleration({x:20,y:0,z:0},{x:0,y:20,z:0});expect(l.z).toBeCloseTo(-r.z);});
 it("magnus reacts to spin and velocity",()=>{const a=magnusAcceleration({x:20,y:0,z:0},{x:0,y:20,z:0});expect(a.z).not.toBe(0)});
});
