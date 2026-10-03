import {describe,expect,it} from "vitest";import {resolvePrecision} from "./precision.js";
describe("Deterministic Precision",()=>{
 it("is deterministic",()=>expect(resolvePrecision({x:1,y:0,z:0},.72,.1)).toEqual(resolvePrecision({x:1,y:0,z:0},.72,.1)));
 it("rewards the power sweet spot",()=>expect(resolvePrecision({x:1,y:0,z:0},.72,0).quality).toBeGreaterThan(resolvePrecision({x:1,y:0,z:0},1,0).quality));
 it("penalizes timing error",()=>expect(resolvePrecision({x:1,y:0,z:0},.72,.8).quality).toBeLessThan(resolvePrecision({x:1,y:0,z:0},.72,0).quality));
 it("keeps deviation bounded",()=>expect(Math.abs(resolvePrecision({x:1,y:0,z:0},0,1).angleOffsetDegrees)).toBeLessThanOrEqual(7));
});
