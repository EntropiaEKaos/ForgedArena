# ForgedArena

ForgedArena é um jogo de futebol multiplayer de arena, com câmera isométrica, identidade visual estilizada e uma única base de gameplay para três experiências: Competitive, Arcade e Chaos.

## Visão

- Futebol de arena 3v3 como foco competitivo inicial.
- Cliente visual forte desde o começo, sem protótipo descartável.
- Câmera isométrica viva, arena 3D, paredes e verticalidade.
- Habilidade do jogador acima de progressão numérica; sem pay-to-win.
- Competitive, Arcade e Chaos compartilham o mesmo GameCore.
- Personagens reconhecíveis por silhueta, com Avatar + Style + Signature Move.
- Momentum recompensa jogadas coletivas e espetaculares sem garantir gols.

## Stack inicial

- TypeScript
- Three.js — mundo 3D e câmera isométrica
- PixiJS — HUD e interface da partida
- Rapier — física
- Node.js — servidor autoritativo
- WebSockets — transporte inicial em tempo real
- PostgreSQL — persistência
- Redis — presença, matchmaking e estado efêmero
- Blender/glTF — pipeline de personagens e assets

## Estrutura planejada

```text
apps/
  client/
  server/
  web/
  admin/
packages/
  game-core/
  protocol/
  physics/
  matchmaking/
  characters/
docs/
```

## Primeiro marco — Pre-Alpha 0.1

Entregar uma vertical slice apresentável com arena isométrica, personagem controlável, bola física, câmera, HUD, placar, cronômetro e conexão multiplayer inicial.

Consulte `docs/GAME_VISION.md`, `docs/ARCHITECTURE.md` e `docs/ROADMAP.md`.

## Regra de ouro

> O jogo precisa continuar excelente mesmo com todas as habilidades especiais desligadas.

O fundamento é correr, dominar, passar, tabelar, driblar, defender, usar as paredes e marcar.
