export type V3={x:number;y:number;z:number};
export type BallTuning={
 radius:number; mass:number; groundFriction:number; restitution:number;
 linearDamping:number; angularDamping:number; maxSpeed:number; maxSpin:number;
 gravity:number; magnus:number;
};
export const FORGED_BALL:Readonly<BallTuning>=Object.freeze({
 radius:.35,mass:.43,groundFriction:.48,restitution:.68,
 linearDamping:.055,angularDamping:.09,maxSpeed:38,maxSpin:70,
 gravity:9.81,magnus:.0018
});
export const FORGED_ARENA=Object.freeze({
 halfWidth:12,
 halfDepth:7,
 wallThickness:.3,
 wallHeight:2.4,
 wallRestitution:.82,
 wallFriction:.22
});
export type StrikeKind="ground-pass"|"lob-pass"|"shot"|"placed-shot";
export type StrikeInput={kind:StrikeKind;direction:V3;power:number;spin?:number};
export type BallImpulse={linear:V3;angular:V3};
const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));
const length=(v:V3)=>Math.hypot(v.x,v.y,v.z);
export function normalize(v:V3):V3{const l=length(v);return l>1e-6?{x:v.x/l,y:v.y/l,z:v.z/l}:{x:0,y:0,z:0};}
export function calculateStrike(input:StrikeInput,t=FORGED_BALL):BallImpulse{
 const p=clamp(input.power,0,1),d=normalize(input.direction),spin=clamp(input.spin??0,-1,1);
 const cfg={ "ground-pass":{speed:18,lift:.03,spin:8},"lob-pass":{speed:21,lift:.48,spin:14},"shot":{speed:34,lift:.12,spin:18},"placed-shot":{speed:27,lift:.18,spin:34}}[input.kind];
 const horizontal=normalize({x:d.x,y:0,z:d.z});
 const linear={x:horizontal.x*cfg.speed*p,y:cfg.speed*cfg.lift*p,z:horizontal.z*cfg.speed*p};
 const angular={x:-horizontal.z*cfg.spin*p,z:horizontal.x*cfg.spin*p,y:spin*cfg.spin*p};
 const s=length(linear);if(s>t.maxSpeed){const k=t.maxSpeed/s;linear.x*=k;linear.y*=k;linear.z*=k;}
 return {linear,angular};
}
export function magnusAcceleration(velocity:V3,spin:V3,t=FORGED_BALL):V3{
 return {x:t.magnus*(spin.y*velocity.z-spin.z*velocity.y),y:t.magnus*(spin.z*velocity.x-spin.x*velocity.z),z:t.magnus*(spin.x*velocity.y-spin.y*velocity.x)};
}

export function reflectWallVelocity(velocity:V3,normal:V3,restitution:number=FORGED_ARENA.wallRestitution):V3{
 const n=normalize({x:normal.x,y:0,z:normal.z});
 const dot=velocity.x*n.x+velocity.z*n.z;
 if(Math.hypot(n.x,n.z)<1e-6||dot>=0)return {...velocity};
 const bounce=(1+clamp(restitution,0,1))*dot;
 return {x:velocity.x-bounce*n.x,y:velocity.y,z:velocity.z-bounce*n.z};
}
