import { describe, expect, it } from "vitest";
import { resolveFirstTouch } from "./first-touch.js";
describe("First Touch", () => {
  it("does not control a distant ball", () => expect(resolveFirstTouch({x:0,y:1,z:0},{x:0,y:0,z:0},{x:3,y:.35,z:0},{x:4,y:0,z:0}).controlled).toBe(false));
  it("rejects an excessively fast ball", () => expect(resolveFirstTouch({x:0,y:1,z:0},{x:0,y:0,z:0},{x:1,y:.35,z:0},{x:20,y:0,z:0}).controlled).toBe(false));
  it("settles a controllable nearby ball", () => {const r=resolveFirstTouch({x:0,y:1,z:0},{x:2,y:0,z:0},{x:1,y:.35,z:0},{x:-5,y:0,z:0});expect(r.controlled).toBe(true);expect(Math.abs(r.velocity.x)).toBeLessThan(5);});
  it("carries momentum from a moving player", () => expect(resolveFirstTouch({x:0,y:1,z:0},{x:4,y:0,z:0},{x:1,y:.35,z:0},{x:0,y:0,z:0}).velocity.x).toBeGreaterThan(0));
});
