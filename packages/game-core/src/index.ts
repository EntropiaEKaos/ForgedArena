import type {MatchSnapshot,TeamId} from "@forged-arena/protocol";export * from "./player-motor";
export const TICK_RATE=30;export const MATCH_DURATION_MS=6*60*1000;
export function createInitialMatch():MatchSnapshot{return {tick:0,clockMs:MATCH_DURATION_MS,score:{blue:0,red:0},players:[],ball:{position:{x:0,y:.35,z:0},velocity:{x:0,y:0,z:0}}};}
export function scoreGoal(state:MatchSnapshot,team:TeamId):MatchSnapshot{return {...state,score:{...state.score,[team]:state.score[team]+1},ball:{position:{x:0,y:.35,z:0},velocity:{x:0,y:0,z:0}}};}
