import { describe, expect, it } from "vitest";
import { resolveStrike } from "./football-interaction.js";
const input = { seq: 1, moveX: 1, moveZ: 0, aimX: 0, aimZ: -1, sprint: false, pass: true, shoot: false, tackle: false };
describe("Football Interaction", () => {
  it("rejects strikes outside server range", () => expect(resolveStrike({x:0,y:1,z:0},{x:3,y:.35,z:0},input,20,{lastStrikeTick:0})).toBeNull());
  it("creates a ground pass in range", () => expect(resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},input,20,{lastStrikeTick:0})?.strike.kind).toBe("ground-pass"));
  it("uses aim independently from movement", () => expect(resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},input,20,{lastStrikeTick:0})?.strike.direction.z).toBeLessThan(0));
  it("prioritizes shot when requested", () => expect(resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},{...input,shoot:true},20,{lastStrikeTick:0})?.strike.kind).toBe("shot"));
  it("enforces strike cooldown", () => expect(resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},input,24,{lastStrikeTick:20})).toBeNull());
});
