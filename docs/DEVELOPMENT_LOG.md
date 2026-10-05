# Development Log

## 2026-10-03 — M0 Foundation / primeira vertical slice técnica

### Entregue
- Monorepo pnpm + TypeScript.
- `@forged-arena/protocol` com contratos de input/snapshot.
- `@forged-arena/game-core` com estado inicial, tick rate e placar.
- Servidor WebSocket autoritativo inicial a 30 Hz.
- Cliente Vite + Three.js com câmera ortográfica isométrica.
- PixiJS como camada de HUD.
- Rapier inicializado no cliente com chão e bola dinâmica.
- Campo, jogador placeholder e bola já renderizados.
- GitHub Actions executando typecheck, test e build.

### Decisões
- O cliente não será autoridade da partida.
- A apresentação visual será construída desde cedo, mas separada do GameCore.
- Placeholders geométricos atuais são infraestrutura de cena, não direção artística final.

### Próximo gate
1. Validar CI do M0.
2. Criar arena isométrica com marcações, gols, paredes e câmera viva.
3. Implementar input/movimento do jogador.
4. Mover simulação física autoritativa relevante para o servidor.
5. Sincronizar primeiro jogador e bola por snapshots.
