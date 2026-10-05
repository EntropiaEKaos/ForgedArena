import {describe,expect,it} from "vitest";
import {shouldAcceptSnapshot} from "./snapshot-order";

describe("snapshot ordering",()=>{
 it("accepts a strictly newer tick",()=>expect(shouldAcceptSnapshot(41,42)).toBe(true));
 it("rejects a duplicate tick",()=>expect(shouldAcceptSnapshot(42,42)).toBe(false));
 it("rejects an older tick",()=>expect(shouldAcceptSnapshot(42,41)).toBe(false));
 it("accepts the first valid snapshot",()=>expect(shouldAcceptSnapshot(-1,0)).toBe(true));
 it("rejects negative incoming ticks",()=>expect(shouldAcceptSnapshot(4,-1)).toBe(false));
 it("rejects fractional incoming ticks",()=>expect(shouldAcceptSnapshot(4,5.5)).toBe(false));
 it("rejects non-finite incoming ticks",()=>expect(shouldAcceptSnapshot(4,Number.POSITIVE_INFINITY)).toBe(false));
});
