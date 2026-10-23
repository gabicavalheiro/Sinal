# Design system · Sinal

A interface trata a câmera como um espaço de experimentação. A identidade combina verde profundo, papel claro, tons vegetais e um detalhe terracota. A voz é próxima, sem prometer fluência ou resultados não medidos.

## Fundamentos

Tokens em src/presentation/styles/foundations.css: cores semânticas, espaçamento de base 4 px e raios 8/12/16 px. DM Sans compõe a interface; Instrument Serif itálica dá expressão aos títulos. Arquivos de fonte são locais, com licenças OFL em public/fonts.

## Componentes

- Button: primary, secondary e ghost; ícones opcionais; estado disabled nativo.
- Tag: neutral, green e orange; legenda sempre textual.
- Toggle: checkbox semântico associado ao rótulo, descrição opcional e foco visível.
- HandIllustration: referências esquemáticas A–D, decorativas para tecnologias assistivas. As instruções textuais acompanham as referências.
- Cards de câmera, tradução, prática e guia: cada um com responsabilidade clara.

## Comportamento

A câmera inicia somente após clique. Estados: off, requesting, active e error. Há cancelamento, retry e desligamento explícito. O carregamento e as falhas do reconhecimento têm estados próprios. A confirmação exige estabilidade da previsão.

A demonstração usa dados ilustrativos identificados como exemplo. Enter adiciona letra, espaço separa palavras e Backspace apaga quando o foco não está em um botão ou campo. Texto demonstrativo pode ser copiado e baixado.

A prática é manual, sem acerto automático. As contagens persistem localmente; apagar histórico exige confirmação. Mobile usa menu com camada de fundo; o diálogo de ajuda usa dialog nativo, fechamento por Esc e foco modal.

## Acessibilidade e responsividade

Foco visível, nomes acessíveis para ícones, mensagens anunciadas por role=status e aria-live, controles nativos e prefers-reduced-motion. Verde discreto é decorativo; tarefas essenciais usam textos e botões claros. Interface de uma coluna no tablet e celular; painéis de conteúdo se reorganizam por espaço disponível.

A avaliação automatizada e a inspeção visual não substituem testes com pessoas com diferentes capacidades. Revisão adicional de contraste e alvos secundários faz parte da evolução do design system.
