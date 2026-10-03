import {describe,expect,it} from "vitest";import {ACTION_TIMING,beginAction,releaseAction} from "./index.js";
describe("authoritative action timing",()=>{
 it("derives pass power from server ticks",()=>{const r=releaseAction(beginAction("pass",10),20)!;expect(r.heldTicks).toBe(10);expect(r.power).toBeCloseTo(10/ACTION_TIMING.passMaxTicks);});
 it("derives shot power from server ticks",()=>expect(releaseAction(beginAction("shoot",10),43)?.power).toBe(1));
 it("clamps overcharge",()=>expect(releaseAction(beginAction("pass",0),999)?.power).toBe(1));
 it("does not release without an active action",()=>expect(releaseAction({kind:null,startedTick:0},10)).toBeNull());
});
