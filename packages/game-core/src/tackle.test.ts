import { describe, expect, it } from "vitest";
import { resolveTackle } from "./tackle.js";

const player={x:0,y:1,z:0}, aim={x:1,y:0,z:0}, ball={x:1.2,y:.35,z:0}, ready={lastTackleTick:-1000};

describe("Tackle",()=>{
  it("knocks a ball in range when facing it",()=>{const r=resolveTackle(player,aim,ball,30,ready);expect(r?.velocity.x).toBeGreaterThan(0);expect(r?.velocity.y).toBeGreaterThan(0);});
  it("rejects a ball outside tackle range",()=>expect(resolveTackle(player,aim,{x:3,y:.35,z:0},30,ready)).toBeNull());
  it("rejects tackles aimed away from the ball",()=>expect(resolveTackle(player,{x:-1,y:0,z:0},ball,30,ready)).toBeNull());
  it("enforces authoritative cooldown",()=>expect(resolveTackle(player,aim,ball,40,{lastTackleTick:30})).toBeNull());
  it("rejects zero aim",()=>expect(resolveTackle(player,{x:0,y:0,z:0},ball,30,ready)).toBeNull());
  it("accepts the exact range boundary",()=>expect(resolveTackle(player,aim,{x:1.7,y:.35,z:0},30,ready)).not.toBeNull());
  it("keeps knock speed bounded",()=>{const r=resolveTackle(player,aim,ball,30,ready);expect(Math.hypot(r!.velocity.x,r!.velocity.z)).toBeCloseTo(10.5);});
  it("is deterministic for identical inputs",()=>expect(resolveTackle(player,aim,ball,30,ready)).toEqual(resolveTackle(player,aim,ball,30,ready)));
});
