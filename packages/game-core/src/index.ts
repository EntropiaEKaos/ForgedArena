import type { MatchSnapshot, TeamId } from "@forged-arena/protocol";
export * from "./player-motor.js";
export * from "./football-interaction.js";
export * from "./first-touch.js";

export const TICK_RATE = 30;
export const MATCH_DURATION_MS = 6 * 60 * 1000;

export function createInitialMatch(): MatchSnapshot {
  return {
    tick: 0,
    clockMs: MATCH_DURATION_MS,
    score: { blue: 0, red: 0 },
    players: [],
    ball: { position: { x: 0, y: 0.35, z: 0 }, velocity: { x: 0, y: 0, z: 0 } },
  };
}

export function scoreGoal(state: MatchSnapshot, team: TeamId): MatchSnapshot {
  return {
    ...state,
    score: { ...state.score, [team]: state.score[team] + 1 },
    ball: { position: { x: 0, y: 0.35, z: 0 }, velocity: { x: 0, y: 0, z: 0 } },
  };
}
export * from "./carry.js";
export * from "./precision.js";

export type ActionKind="pass"|"lob"|"shoot"|"placed-shot";
export type ActionTimingState={kind:ActionKind|null;startedTick:number};
export const ACTION_TIMING=Object.freeze({passMaxTicks:21,lobMaxTicks:27,shootMaxTicks:33,placedShotMaxTicks:30});
export function beginAction(kind:ActionKind,tick:number):ActionTimingState{return {kind,startedTick:tick};}
export function releaseAction(state:ActionTimingState,tick:number){
 if(!state.kind)return null;
 const max=state.kind==="pass"?ACTION_TIMING.passMaxTicks:state.kind==="lob"?ACTION_TIMING.lobMaxTicks:state.kind==="placed-shot"?ACTION_TIMING.placedShotMaxTicks:ACTION_TIMING.shootMaxTicks;
 const held=Math.max(0,tick-state.startedTick);
 return {kind:state.kind,heldTicks:held,power:Math.max(0,Math.min(1,held/max)),next:{kind:null,startedTick:tick} as ActionTimingState};
}
export * from "./timing-grade.js";
