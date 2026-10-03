import {describe,expect,it} from "vitest";import {resolvePrecision} from "./precision.js";
describe("Deterministic Precision",()=>{
 it("is deterministic",()=>expect(resolvePrecision({x:1,y:0,z:0},.72,.1)).toEqual(resolvePrecision({x:1,y:0,z:0},.72,.1)));
 it("rewards the power sweet spot",()=>expect(resolvePrecision({x:1,y:0,z:0},.72,0).quality).toBeGreaterThan(resolvePrecision({x:1,y:0,z:0},1,0).quality));
 it("penalizes timing error",()=>expect(resolvePrecision({x:1,y:0,z:0},.72,.8).quality).toBeLessThan(resolvePrecision({x:1,y:0,z:0},.72,0).quality));
 it("does not invent lateral drift when timing is neutral",()=>{const r=resolvePrecision({x:1,y:0,z:0},0,0);expect(r.angleOffsetDegrees).toBe(0);expect(r.direction.x).toBeCloseTo(1);expect(r.direction.z).toBeCloseTo(0);});
 it("preserves signed timing direction",()=>{expect(resolvePrecision({x:1,y:0,z:0},.72,-.8).angleOffsetDegrees).toBeLessThan(0);expect(resolvePrecision({x:1,y:0,z:0},.72,.8).angleOffsetDegrees).toBeGreaterThan(0);});
 it("keeps deviation bounded",()=>expect(Math.abs(resolvePrecision({x:1,y:0,z:0},0,1).angleOffsetDegrees)).toBeLessThanOrEqual(7));
});
