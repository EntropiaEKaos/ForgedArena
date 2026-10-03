# Architecture — ForgedArena

## Princípio central

O servidor é autoritativo. O cliente envia inputs; o servidor valida e resolve o estado oficial da partida.

## Camadas

- **Three.js:** arena, personagens, bola, câmera, iluminação e efeitos 3D.
- **PixiJS:** HUD, placar, nomes, Momentum, indicadores e menus in-game.
- **Rapier:** colisões e física da partida.
- **GameCore:** regras independentes do modo.
- **Protocol:** contratos de mensagens e snapshots.
- **Server:** simulação autoritativa, salas e lifecycle de partidas.
- **Matchmaking:** filas, parties, presença e alocação.
- **PostgreSQL:** contas, inventário, ranking, temporadas e progressão.
- **Redis:** filas, presença e estado efêmero.

## Rede

Começar com WebSockets. Cliente usa interpolation/prediction para apresentação; nunca decide o resultado oficial de chute, colisão ou gol.

## Modos

Competitive: modifiers OFF.
Arcade: modifiers definidos pela missão.
Chaos: modifiers selecionados pelas regras da partida.

Todos usam o mesmo GameCore.

## Pipeline visual

Blender -> glTF/GLB -> Three.js. Um esqueleto-base compartilhado deve permitir reutilização de corrida, sprint, domínio, passe, chute, carrinho, cabeçada, voleio e comemorações.
