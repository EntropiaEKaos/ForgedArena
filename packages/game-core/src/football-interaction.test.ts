import { describe, expect, it } from "vitest";
import { resolveStrike } from "./football-interaction.js";
const input = { seq: 1, moveX: 1, moveZ: 0, aimX: 0, aimZ: -1, actionPower: 0.5, sprint: false, pass: true, shoot: false, tackle: false };
describe("Football Interaction", () => {
  it("rejects strikes outside server range", () => expect(resolveStrike({x:0,y:1,z:0},{x:3,y:.35,z:0},input,20,{lastStrikeTick:0})).toBeNull());
  it("creates a ground pass in range", () => expect(resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},input,20,{lastStrikeTick:0})?.strike.kind).toBe("ground-pass"));
  it("uses aim independently from movement", () => expect(resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},input,20,{lastStrikeTick:0})?.strike.direction.z).toBeLessThan(0));
  it("prioritizes shot when requested", () => expect(resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},{...input,shoot:true},20,{lastStrikeTick:0})?.strike.kind).toBe("shot"));
  it("clamps low pass power to the pass floor", () => expect(resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},{...input,actionPower:-5},20,{lastStrikeTick:0})?.strike.power).toBeCloseTo(.34));
  it("clamps shot power to the shot ceiling", () => expect(resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},{...input,shoot:true,actionPower:5},20,{lastStrikeTick:0})?.strike.power).toBe(1));
  it("gives pass and shot distinct power curves", () => {
    const pass=resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},{...input,actionPower:.5},20,{lastStrikeTick:0});
    const shot=resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},{...input,shoot:true,actionPower:.5},20,{lastStrikeTick:0});
    expect(shot!.strike.power).toBeGreaterThan(pass!.strike.power);
  });
  it("applies deterministic precision to strike direction", () => {
    const a=resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},{...input,actionPower:0},20,{lastStrikeTick:0});
    const b=resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},{...input,actionPower:0},20,{lastStrikeTick:0});
    expect(a?.strike.direction).toEqual(b?.strike.direction);
  });
  it("keeps precision deviation bounded in authoritative strike", () => {
    const r=resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},{...input,actionPower:0},20,{lastStrikeTick:0});
    expect(Math.hypot(r!.strike.direction.x,r!.strike.direction.z)).toBeCloseTo(1);
  });
  it("enforces strike cooldown", () => expect(resolveStrike({x:0,y:1,z:0},{x:1,y:.35,z:0},input,24,{lastStrikeTick:20})).toBeNull());
});
