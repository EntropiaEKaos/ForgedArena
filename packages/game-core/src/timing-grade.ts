export type TimingGrade="early"|"good"|"perfect"|"late";
export function gradeActionTiming(power:number):TimingGrade{
 const p=Math.max(0,Math.min(1,power));
 if(p<.45)return "early";
 if(p<.66)return "good";
 if(p<=.82)return "perfect";
 return "late";
}
