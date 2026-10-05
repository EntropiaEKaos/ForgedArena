export function shouldAcceptSnapshot(lastTick:number,incomingTick:number):boolean{
 return Number.isInteger(incomingTick)&&incomingTick>=0&&incomingTick>lastTick;
}
