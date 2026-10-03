import {WebSocketServer,WebSocket} from "ws";import RAPIER from "@dimforge/rapier3d-compat";import {createInitialMatch,TICK_RATE} from "@forged-arena/game-core";import {FORGED_BALL} from "@forged-arena/physics";import type {ServerMessage} from "@forged-arena/protocol";
await RAPIER.init();const port=Number(process.env.PORT??8787);const wss=new WebSocketServer({port});let state=createInitialMatch();
const world=new RAPIER.World({x:0,y:-FORGED_BALL.gravity,z:0});world.timestep=1/TICK_RATE;
world.createCollider(RAPIER.ColliderDesc.cuboid(12,.2,7).setFriction(FORGED_BALL.groundFriction).setRestitution(FORGED_BALL.restitution));
const ballBody=world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(0,FORGED_BALL.radius+.22,0).setLinearDamping(FORGED_BALL.linearDamping).setAngularDamping(FORGED_BALL.angularDamping).setCcdEnabled(true));
world.createCollider(RAPIER.ColliderDesc.ball(FORGED_BALL.radius).setMass(FORGED_BALL.mass).setFriction(FORGED_BALL.groundFriction).setRestitution(FORGED_BALL.restitution),ballBody);
wss.on("connection",(socket)=>{const welcome:ServerMessage={type:"welcome",payload:{playerId:crypto.randomUUID(),team:"blue"}};socket.send(JSON.stringify(welcome));});
setInterval(()=>{world.step();const p=ballBody.translation(),v=ballBody.linvel();state={...state,tick:state.tick+1,clockMs:Math.max(0,state.clockMs-1000/TICK_RATE),ball:{position:{x:p.x,y:p.y,z:p.z},velocity:{x:v.x,y:v.y,z:v.z}}};const msg:ServerMessage={type:"snapshot",payload:state};const data=JSON.stringify(msg);for(const client of wss.clients)if(client.readyState===WebSocket.OPEN)client.send(data);},1000/TICK_RATE);
console.log(`ForgedArena authoritative physics server :${port} @ ${TICK_RATE}Hz`);
