import {WebSocketServer} from "ws";
import {createInitialMatch,TICK_RATE} from "@forged-arena/game-core";
import type {ServerMessage} from "@forged-arena/protocol";
const port=Number(process.env.PORT??8787);const wss=new WebSocketServer({port});let state=createInitialMatch();
wss.on("connection",(socket)=>{const welcome:ServerMessage={type:"welcome",payload:{playerId:crypto.randomUUID(),team:"blue"}};socket.send(JSON.stringify(welcome));});
setInterval(()=>{state={...state,tick:state.tick+1,clockMs:Math.max(0,state.clockMs-1000/TICK_RATE)};const msg:ServerMessage={type:"snapshot",payload:state};const data=JSON.stringify(msg);for(const client of wss.clients)if(client.readyState===client.OPEN)client.send(data);},1000/TICK_RATE);
console.log(`ForgedArena authoritative server :${port} @ ${TICK_RATE}Hz`);
