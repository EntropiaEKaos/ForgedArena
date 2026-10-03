# Forged Football Engine — Engineering Standard

O motor é um produto técnico dentro do ForgedArena. O objetivo não é apenas renderizar futebol: é produzir uma simulação online responsiva, testável e competitivamente confiável.

## Pilares

1. **Server authority** — resultado oficial de movimento, bola, contato, chute e gol pertence ao servidor.
2. **Ball feel** — domínio, impulso, spin, quique, passe, chute e parede devem ser ajustáveis por dados e testáveis.
3. **Responsiveness** — prediction/interpolation escondem latência sem transferir autoridade ao cliente.
4. **Deterministic rules** — regras e eventos do GameCore devem ser reproduzíveis a partir de estado + inputs quando possível.
5. **Fixed simulation tick** — simulação independente de FPS de renderização.
6. **Data-driven tuning** — parâmetros de futebol fora do código de apresentação.
7. **Mode independence** — Competitive, Arcade e Chaos compõem regras sobre o mesmo núcleo.
8. **Observability** — ticks, RTT, jitter, corrections, possession, shots e eventos críticos devem ser mensuráveis.
9. **Replayability** — protocolo deve evoluir para permitir replay/diagnóstico por inputs e snapshots.
10. **Performance budget** — cada sistema novo precisa conhecer seu custo de CPU, rede e render.

## Ball Model alvo

- velocidade linear e angular;
- atrito de piso;
- restituição;
- spin/topspin/backspin;
- curva;
- impulso de chute parametrizado;
- passe rasteiro e alto;
- recepção/domínio assistido apenas dentro de regras explícitas;
- colisão com jogadores, paredes, traves e chão;
- bola aérea, cabeceio e voleio;
- estados sem teleporte visual arbitrário.

## Network Model alvo

Client input sequence -> authoritative simulation -> snapshot -> reconciliation -> interpolation.

Métricas mínimas futuras: RTT, jitter, packet/input loss, snapshot age, reconciliation distance e server tick time.

## Gates

- Physics unit tests.
- GameCore rule tests.
- Protocol compatibility tests.
- Network simulation under latency/jitter/loss.
- Multi-client soak tests.
- Replay regression fixtures.
- Browser performance budgets.

## Regra

Nenhuma sensação de controle será considerada pronta apenas porque “parece boa” localmente. Ela precisa continuar boa sob condições reais de rede.
