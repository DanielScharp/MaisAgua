<div align="center">

# 💧 Mais Água · Uma jornada 3D pelo sertão

**Uma experiência 3D interativa no navegador em que você caminha por um trecho do sertão nordestino e vê, passo a passo, a terra seca se transformar em uma paisagem viva quando a água chega.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r183-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-9-000000?style=for-the-badge&logo=react&logoColor=white)](https://r3f.docs.pmnd.rs/)
[![Zustand](https://img.shields.io/badge/Zustand-5-443E38?style=for-the-badge)](https://zustand.docs.pmnd.rs/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

</div>

---

> [!NOTE]
> **Status do projeto: prova de conceito em andamento.** O mundo 3D, o personagem, a transição de paisagem e os pontos informativos já funcionam. Outras partes, como a trilha sonora completa e o efeito das doações sobre o cenário, ainda estão em construção. O sistema de doação é **apenas uma simulação**: nenhum pagamento é processado. O que falta está listado em [Próximos passos](#️-próximos-passos).

---

## 📌 Sobre o projeto

Para quem vive nas grandes cidades, a falta de água no sertão costuma ser só uma notícia. Números sobre seca e estiagem são importantes, mas raramente fazem alguém **sentir** o que significa viver em um lugar onde o chão racha e nada cresce, nem perceber a diferença enorme que um poço pode fazer na vida de uma comunidade inteira.

Este projeto nasceu da vontade de **aproximar as pessoas dessa realidade** e mostrar por que iniciativas sociais de acesso à água são tão necessárias. A inspiração veio de projetos como o **"Mais Água", do Instituto Livres**, que trabalha para levar água a comunidades do sertão.

Em vez de explicar com texto, a aplicação convida o visitante a **atravessar o caminho a pé**:

- o percurso começa no **sertão árido**, com terra cor de areia, árvores secas, céu enevoado e o som do vento;
- conforme o personagem avança, a paisagem entra em **transição**: surgem arbustos e os primeiros sinais de verde;
- no final, o visitante chega a um **sertão fértil**, com árvores cheias, um curso d'água e um céu mais limpo.

No meio do caminho, pontos de parada explicam as etapas reais de um projeto de acesso à água, da perfuração do poço até a distribuição para as famílias.

> [!IMPORTANT]
> Este é um projeto pessoal e independente, criado como estudo e homenagem a iniciativas como o "Mais Água". **Ele não é um produto oficial do Instituto Livres** nem tem vínculo formal com a instituição.

---

## ✨ Funcionalidades

### 🌵 Um mundo que conta uma história

| | Funcionalidade | O que faz |
|---|---|---|
| 🏜️ | **Três zonas de paisagem** | Sertão Árido, Transição e Sertão Fértil, ao longo de um terreno contínuo de 200 metros. |
| 🎨 | **Terreno que muda de cor** | O solo passa gradualmente de tons de areia para verde intenso, conforme a distância percorrida. |
| 🌳 | **Vegetação que ganha vida** | Cerca de 300 árvores espalhadas pelo mapa: troncos secos no início, arbustos na transição e copas cheias no trecho fértil, com folhas balançando ao vento. |
| 🌊 | **Água no trecho fértil** | Um curso d'água com movimento suave aparece na parte final do percurso. |
| ☀️ | **Céu e luz que reagem ao progresso** | O céu fica menos enevoado, a neblina se dissipa e a luz do sol muda de tom à medida que o visitante avança. |
| 🌬️ | **Som ambiente gerado no código** | O vento do sertão é sintetizado em tempo real e vai ficando mais baixo conforme a paisagem se transforma. |

### 🧑‍🌾 Explorar o sertão

| | Funcionalidade | O que faz |
|---|---|---|
| 🚶 | **Personagem animado** | Um agricultor em 3D com animações de parado, andando, correndo e de esbarrão. |
| 🎮 | **Controles de jogo** | `W A S D` ou setas para andar, `Shift` para correr e `Espaço` para pular, sempre na direção para onde a câmera aponta. |
| 🎥 | **Câmera em terceira pessoa** | Segue o personagem e pode ser girada com o mouse, com limites para não atravessar o chão. |
| ⛰️ | **Relevo e física simples** | O personagem acompanha as ondulações do terreno, tem gravidade no pulo e não atravessa os troncos das árvores. |

### 📍 Aprender pelo caminho

| | Funcionalidade | O que faz |
|---|---|---|
| 💠 | **Quatro pontos de parada** | Marcadores luminosos ao longo do trajeto: Perfuração de Poço, Instalação de Bomba, Tratamento de Água e Distribuição. |
| 📖 | **Explicação de cada etapa** | Ao chegar a um ponto, uma janela explica aquela fase do projeto e o personagem fica parado até o visitante continuar. |
| ✅ | **Pontos já visitados** | Marcadores visitados ficam acinzentados, para o visitante saber o que ainda falta ver. |
| 🧭 | **Painel de orientação** | Mostra a zona atual, a distância percorrida e a legenda dos controles. |

### 💙 Doação simulada

| | Funcionalidade | O que faz |
|---|---|---|
| 💧 | **Botão "Doar Agora"** | Sempre visível, abre uma janela com valores rápidos (R$ 10, 25, 50 ou 100). |
| 📊 | **Barra de meta** | Mostra quanto já foi "arrecadado" e o percentual de uma meta de demonstração. |
| 🧪 | **Fluxo de pagamento fictício** | Simula o processamento e a tela de agradecimento, deixando claro na interface que é uma demonstração. |

---

## 🧰 Tecnologias

**Base da aplicação**
- **[React 19](https://react.dev/)** e **[TypeScript](https://www.typescriptlang.org/)**: componentes e estado tipados.
- **[Vite 8](https://vite.dev/)**: servidor de desenvolvimento e build.

**3D no navegador**
- **[Three.js](https://threejs.org/)**: motor de renderização 3D em WebGL.
- **[React Three Fiber](https://r3f.docs.pmnd.rs/)**: permite montar a cena 3D com componentes React, como qualquer outra interface.
- **[Drei](https://drei.docs.pmnd.rs/)**: utilitários prontos para céu, câmera orbital, sombras, textos 3D e carregamento de modelos com animação.
- Modelo **GLB** do personagem com animações embutidas.

**Estado, som e interface**
- **[Zustand](https://zustand.docs.pmnd.rs/)**: estado global leve compartilhado entre a cena 3D e a interface 2D.
- **Web Audio API**: geração de som ambiente direto no navegador, sem arquivos de áudio.
- **CSS puro** com efeito *glassmorphism* nos painéis sobre a cena.

**Ferramentas**
- **ESLint** com regras para React Hooks e TypeScript.

---

## 🧠 Decisões e diferenciais

**A mensagem está no próprio cenário.**
O progresso do visitante é calculado pela distância percorrida no mapa, de 0% a 100%. Esse único número alimenta a cor do céu, a densidade da neblina, a luz do sol, o volume do vento e a zona exibida no painel. Assim, toda a experiência "conta" a mesma história ao mesmo tempo: quanto mais perto da água, mais vivo o mundo fica.

**Uma única cena 3D, conectada a uma interface comum.**
A parte 3D (dentro do `Canvas`) e os painéis 2D (HUD, barra de meta, janelas) não se conhecem diretamente. Os dois leem e escrevem no mesmo *store* do Zustand: quando o personagem toca um ponto de parada, a cena registra isso no estado, a interface abre a janela e o controle de movimento pausa sozinho.

**Desempenho com *instanced meshes*.**
As cerca de 300 árvores não são 300 objetos separados. Cada parte da árvore (tronco, duas camadas de copa e arbusto) é desenhada com uma única **InstancedMesh**, ou seja, a placa de vídeo desenha centenas de cópias em poucas chamadas. O tamanho de cada parte é calculado uma vez, conforme a posição da árvore no mapa, o que cria a transição de "seco" para "verde" sem custo extra a cada quadro.

**Terreno procedural, sem texturas.**
O relevo é gerado por uma função matemática simples (seno e cosseno), e as cores vão direto nos vértices da malha, sem imagens de textura. A **mesma função** é usada pelo personagem e pelas árvores para saber a altura do chão em qualquer ponto, garantindo que tudo fique apoiado no terreno.

**Movimento pensado para quem joga.**
A direção de `W A S D` é calculada a partir de onde a câmera está olhando, como em jogos em terceira pessoa. O giro do personagem sempre pega o caminho mais curto entre dois ângulos, evitando aquelas voltas de 360° estranhas. Ao esbarrar em uma árvore, a posição é desfeita e uma animação de impacto é tocada uma única vez.

**Som sem nenhum arquivo de áudio.**
O vento é ruído branco gerado no código e suavizado por um filtro passa-baixa. O áudio só começa após o primeiro clique, respeitando a política dos navegadores contra reprodução automática.

**Planejado antes de codificado.**
O projeto começou por um plano de implementação (`implementation_plan.md`) com arquitetura, componentes, paleta de cores por zona e critérios de verificação. O código segue essa estrutura, o que facilita retomar o trabalho e ver com clareza o que já foi feito e o que falta.

---

## 🗂️ Estrutura do projeto

```text
mais-agua/
├── public/
│   └── glb/Farmer.glb              # Modelo 3D do personagem, com animações
├── src/
│   ├── App.tsx                     # Monta a cena 3D e a interface por cima dela
│   ├── store/
│   │   └── useGameStore.ts         # Estado global: posição, progresso, árvores, doações, pontos de parada
│   ├── hooks/
│   │   ├── usePlayerMovement.ts    # Teclado, corrida, pulo, gravidade e colisão
│   │   └── useProgress.ts          # Zona atual e progresso derivados da posição
│   ├── components/
│   │   ├── World/                  # Terreno, vegetação e água
│   │   ├── Player/                 # Personagem e câmera em terceira pessoa
│   │   ├── Environment/            # Iluminação, céu e neblina, som ambiente
│   │   ├── Checkpoints/            # Marcadores 3D e textos das etapas do projeto
│   │   └── UI/                     # HUD, barra de meta, botão e janelas de doação e de etapa
│   └── utils/
│       ├── terrain.ts              # Função de altura do relevo, compartilhada
│       └── colors.ts               # Paleta de cores de cada zona
├── scratch/                        # Scripts auxiliares para inspecionar o modelo GLB
└── implementation_plan.md          # Plano de arquitetura que guiou o desenvolvimento
```

---

## 🚀 Como rodar localmente

**Pré-requisitos:** [Node.js](https://nodejs.org/) 20 ou superior e um navegador com suporte a WebGL.

```bash
# 1. Clone o repositório
git clone https://github.com/DanielScharp/MaisAgua.git
cd MaisAgua

# 2. Instale as dependências
npm install

# 3. Rode em modo de desenvolvimento
npm run dev
```

A aplicação fica disponível no endereço exibido no terminal (normalmente `http://localhost:5173`). Não é preciso configurar nenhuma variável de ambiente.

### Comandos disponíveis

| Comando | Para quê |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Verifica os tipos e gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente a versão de produção |
| `npm run lint` | Analisa o código com o ESLint |

### Controles

| Tecla | Ação |
|---|---|
| `W` `A` `S` `D` ou setas | Andar |
| `Shift` | Correr |
| `Espaço` | Pular |
| Mouse (arrastar) | Girar a câmera |
| Clique na tela | Ativar o som ambiente |

---

## 🛣️ Próximos passos

**Completar a experiência**
- [ ] Sons de água e de pássaros nas zonas de transição e fértil (as camadas de áudio já existem, falta o conteúdo)
- [ ] Fazer as doações acelerarem a transformação visual do mundo (o cálculo já existe, falta ligá-lo ao cenário)
- [ ] Leito de rio seco no início e pequenas poças na transição, antes do rio do trecho fértil
- [ ] Cactos e vegetação típica da caatinga no trecho árido
- [ ] Tela de abertura explicando a proposta e uma tela de encerramento ao final do percurso

**Conteúdo e propósito**
- [ ] Revisar os textos dos pontos de parada com informações reais sobre projetos de acesso à água
- [ ] Adicionar dados sobre a seca no semiárido, com as fontes citadas
- [ ] Indicar caminhos oficiais para quem quiser conhecer e apoiar iniciativas como o "Mais Água"

**Qualidade e acesso**
- [ ] Controles por toque para celulares e tablets
- [ ] Versão publicada online para acesso sem instalação
- [ ] Remover a dependência de pagamento enquanto a doação for apenas simulada, ou integrá-la de verdade em parceria com uma instituição
- [ ] Ajustes de desempenho para computadores mais modestos

---

## 📫 Contato

<div align="center">

Gostou do projeto ou quer conversar sobre uma oportunidade? Vou adorar ouvir você.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-daniel--scharp-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-scharp/)
[![E-mail](https://img.shields.io/badge/E--mail-contato@danielscharp.com.br-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:contato@danielscharp.com.br)
[![GitHub](https://img.shields.io/badge/GitHub-DanielScharp-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DanielScharp)

Feito com dedicação por **Daniel Scharp**

</div>
