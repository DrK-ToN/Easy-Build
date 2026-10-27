import { useState } from 'react';

// --- Dados do Minicurso de Hardware ---
const hardwareData = {
  'placa-mae': {
    id: 'placa-mae',
    name: 'Placa Mãe',
    summary: 'A placa-mãe é o esqueleto do computador. Ela interliga o processador, a memória RAM, a placa de vídeo e o armazenamento, permitindo que todos conversem entre si.',
    brands: [
      {
        id: 'amd',
        name: 'AMD',
        color: '#ed1c24',
        platforms: [
          {
            id: 'am5',
            name: 'Plataforma AM5',
            releaseDate: '2022',
            description: 'Plataforma mais recente da AMD, com suporte exclusivo a memórias DDR5 e PCIe 5.0.',
            tiers: [
              { id: 'a', name: 'Entrada (A)', summary: 'Placas básicas (ex: A620). Ideais para uso cotidiano e jogos leves, sem suporte a overclock avançado.', items: ['A620', 'A620M'] },
              { id: 'b', name: 'Intermediária (B)', summary: 'O melhor custo-benefício. Suportam overclock, várias conexões e são ideais para a maioria dos gamers e criadores.', items: ['B650', 'B650E'] },
              { id: 'x', name: 'Entusiasta (X)', summary: 'Focadas em alta performance. Oferecem mais pistas PCIe e construção mais robusta (VRM) para overclock extremo.', items: ['X670', 'X670E', 'X870'] },
              { id: 'e', name: 'Extreme (E)', summary: 'O sufixo "E" (ex: B650E, X670E) indica suporte total ao padrão PCIe 5.0 tanto para placa de vídeo quanto para armazenamento M.2.', items: ['B650E', 'X670E', 'X870E'] }
            ]
          },
          {
            id: 'am4',
            name: 'Plataforma AM4',
            releaseDate: '2017',
            description: 'Plataforma lendária da AMD. Utiliza DDR4 e possui uma imensa variedade de processadores compatíveis de excelente custo-benefício.',
            tiers: [
              { id: 'a', name: 'Entrada (A)', summary: 'Modelos de baixo custo, sem suporte oficial a overclock.', items: ['A320', 'A520'] },
              { id: 'b', name: 'Intermediária (B)', summary: 'Excelente custo-benefício com suporte a overclock.', items: ['B350', 'B450', 'B550'] },
              { id: 'x', name: 'Entusiasta (X)', summary: 'O topo de linha para a geração AM4, com máximo de conexões e recursos.', items: ['X370', 'X470', 'X570'] }
            ]
          }
        ]
      },
      {
        id: 'intel',
        name: 'Intel',
        color: '#0068b5',
        platforms: [
          {
            id: 'lga1700',
            name: 'LGA 1700',
            releaseDate: '2021',
            description: 'Plataforma que suporta as 12ª, 13ª e 14ª gerações de processadores Intel Core, com opções para DDR4 ou DDR5.',
            tiers: [
              { id: 'h', name: 'Entrada (H)', summary: 'Focadas no básico. Geralmente com menos slots de RAM e conexões limitadas, ideais para CPUs sem a letra "K".', items: ['H610', 'H670'] },
              { id: 'b', name: 'Intermediária (B)', summary: 'A escolha mais popular para Intel. Equilibra recursos e preço, suportando memórias rápidas, mas sem overclock na CPU.', items: ['B660', 'B760'] },
              { id: 'z', name: 'Entusiasta (Z)', summary: 'Permitem overclock de processadores terminados em "K" (ex: i7-13700K) e possuem a melhor construção e refrigeração.', items: ['Z690', 'Z790'] }
            ]
          },
          {
            id: 'lga1851',
            name: 'LGA 1851',
            releaseDate: '2024',
            description: 'Plataforma para os novos processadores Intel Core Ultra.',
            tiers: [
              { id: 'z890', name: 'Entusiasta (Z)', summary: 'Máximo desempenho e conectividade para a nova geração.', items: ['Z890'] }
            ]
          }
        ]
      }
    ]
  },
  'cpu': { 
    id: 'cpu', 
    name: 'Processador (CPU)', 
    summary: 'O cérebro do computador. Responsável por realizar todos os cálculos e executar os programas.', 
    brands: [
      {
        id: 'amd',
        name: 'AMD Ryzen',
        color: '#ed1c24',
        platforms: [
          {
            id: 'am5',
            name: 'Ryzen Série 7000/8000 (AM5)',
            releaseDate: '2022',
            description: 'Alta performance com arquitetura Zen 4/Zen 5 e suporte a DDR5.',
            tiers: [
              { id: 'r5', name: 'Ryzen 5', summary: 'Excelente para jogos e multitarefa básica.', items: ['Ryzen 5 7600'] },
              { id: 'r7', name: 'Ryzen 7', summary: 'Alto desempenho para criadores e jogadores exigentes. Os modelos X3D possuem cache 3D para mais FPS.', items: ['Ryzen 7 7700X', 'Ryzen 7 7800X3D'] },
              { id: 'r9', name: 'Ryzen 9', summary: 'O topo da cadeia para produtividade extrema e renderização.', items: ['Ryzen 9 7900X', 'Ryzen 9 7950X'] }
            ]
          },
          {
            id: 'am4',
            name: 'Ryzen Série 5000 (AM4)',
            releaseDate: '2020',
            description: 'Geração lendária focada em DDR4 com um custo-benefício imbatível.',
            tiers: [
              { id: 'r5', name: 'Ryzen 5', summary: 'Bom desempenho para jogos em Full HD.', items: ['Ryzen 5 5600', 'Ryzen 5 5600X'] },
              { id: 'r7', name: 'Ryzen 7', summary: 'Ótimo para stream e jogos competitivos.', items: ['Ryzen 7 5700X', 'Ryzen 7 5800X3D'] }
            ]
          }
        ]
      },
      {
        id: 'intel',
        name: 'Intel Core',
        color: '#0068b5',
        platforms: [
          {
            id: 'ultra',
            name: 'Intel Core Ultra',
            releaseDate: '2024',
            description: 'Nova arquitetura da Intel (LGA1851) com foco em eficiência energética e IA.',
            tiers: [
              { id: 'u5', name: 'Core Ultra 5', summary: 'Desempenho versátil.', items: ['Core Ultra 5 245K'] },
              { id: 'u7', name: 'Core Ultra 7', summary: 'Alta performance.', items: ['Core Ultra 7 265K'] },
              { id: 'u9', name: 'Core Ultra 9', summary: 'Entusiasta absoluto.', items: ['Core Ultra 9 285K'] }
            ]
          },
          {
            id: 'gen1314',
            name: '13ª e 14ª Geração (LGA1700)',
            releaseDate: '2022/2023',
            description: 'Desempenho refinado usando núcleos de Performance (P-Cores) e Eficiência (E-Cores).',
            tiers: [
              { id: 'i5', name: 'Core i5', summary: 'O "sweet spot" para jogos e uso geral.', items: ['i5-13400F', 'i5-13600K', 'i5-14400F', 'i5-14600K'] },
              { id: 'i7', name: 'Core i7', summary: 'Mais núcleos para produtividade e jogos em altas resoluções.', items: ['i7-13700K', 'i7-14700K'] },
              { id: 'i9', name: 'Core i9', summary: 'Máximo desempenho sem olhar para o consumo de energia.', items: ['i9-13900K', 'i9-14900K'] }
            ]
          },
          {
            id: 'gen12',
            name: '12ª Geração (LGA1700)',
            releaseDate: '2021',
            description: 'Introduziu a arquitetura híbrida na Intel. Ótimo custo-benefício hoje.',
            tiers: [
              { id: 'i5', name: 'Core i5', summary: 'Excelente para setups de entrada/intermediários.', items: ['i5-12400F', 'i5-12600K'] },
              { id: 'i7', name: 'Core i7', summary: 'Ainda muito capaz para trabalho e jogos pesados.', items: ['i7-12700K'] },
              { id: 'i9', name: 'Core i9', summary: 'Topo de linha da sua época.', items: ['i9-12900K'] }
            ]
          }
        ]
      }
    ] 
  },
  'ram': { 
    id: 'ram', 
    name: 'Memória RAM', 
    summary: 'A memória de curto prazo. Guarda os dados que estão sendo usados no momento para acesso super rápido pelo processador.', 
    brands: [
      {
        id: 'tipos',
        name: 'Gerações de Memória',
        color: '#4caf50',
        platforms: [
          {
            id: 'ddr5',
            name: 'DDR5',
            releaseDate: '2021',
            description: 'O padrão atual. Frequências mais altas (geralmente acima de 5200MHz) e maior largura de banda.',
            tiers: [
              { id: '16gb', name: '16GB', summary: 'Requisito mínimo atual para jogos pesados.', items: ['1x16GB 5200MHz', '2x8GB 5200MHz'] },
              { id: '32gb', name: '32GB', summary: 'Padrão recomendado para não ter dor de cabeça com multitarefa e jogos de mundo aberto.', items: ['2x16GB 6000MHz'] },
              { id: '64gb', name: '64GB+', summary: 'Para criadores de conteúdo e edição de vídeo em 4K/8K.', items: ['2x32GB 6000MHz'] }
            ]
          },
          {
            id: 'ddr4',
            name: 'DDR4',
            releaseDate: '2014',
            description: 'Padrão anterior, mas ainda muito utilizado por ser acessível e apresentar ótimo desempenho.',
            tiers: [
              { id: '8gb', name: '8GB', summary: 'Apenas para PCs de escritório ou jogos muito leves.', items: ['1x8GB 3200MHz'] },
              { id: '16gb', name: '16GB', summary: 'Ideal para a maioria dos jogos e uso diário.', items: ['2x8GB 3200MHz', '1x16GB 3200MHz'] },
              { id: '32gb', name: '32GB', summary: 'Sobrando para a vida útil da máquina em DDR4.', items: ['2x16GB 3200MHz'] }
            ]
          },
          {
            id: 'ddr3',
            name: 'DDR3',
            releaseDate: '2007',
            description: 'Plataformas muito antigas e retro. Não recomendada para computadores novos.',
            tiers: [
              { id: 'legacy', name: 'Legado', summary: 'Máquinas de escritório antigas.', items: ['8GB 1600MHz', '16GB 1600MHz'] }
            ]
          }
        ]
      }
    ]
  },
  'gpu': { 
    id: 'gpu', 
    name: 'Placa de Vídeo', 
    summary: 'Responsável por gerar as imagens que você vê na tela. Essencial para jogos pesados, modelagem 3D e edição de vídeo.', 
    brands: [
      {
        id: 'nvidia',
        name: 'NVIDIA GeForce',
        color: '#76b900',
        platforms: [
          {
            id: 'rtx40',
            name: 'Série RTX 40',
            releaseDate: '2022',
            description: 'Foco na tecnologia DLSS 3 e Frame Generation. Extremamente eficientes.',
            tiers: [
              { id: 'entrada', name: 'Entrada (1080p)', summary: 'Para jogar em Full HD com ótima qualidade.', items: ['RTX 4060'] },
              { id: 'mid', name: 'Intermediária (1440p)', summary: 'Rodar tudo no ultra em 1440p.', items: ['RTX 4070'] },
              { id: 'high', name: 'High-End (4K)', summary: 'Foco no 4K com Ray Tracing no máximo.', items: ['RTX 4080', 'RTX 4090'] }
            ]
          },
          {
            id: 'rtx30',
            name: 'Série RTX 30',
            releaseDate: '2020',
            description: 'Ótimo custo-benefício atual para o mercado de entrada.',
            tiers: [
              { id: 'entrada', name: 'Entrada/Custo-Benefício', summary: 'Ainda dão um caldo para 1080p.', items: ['RTX 3050', 'RTX 3060'] }
            ]
          }
        ]
      },
      {
        id: 'amd',
        name: 'AMD Radeon',
        color: '#ed1c24',
        platforms: [
          {
            id: 'rx7000',
            name: 'Série RX 7000',
            releaseDate: '2022',
            description: 'Mais VRAM pelo mesmo preço das concorrentes. Excelentes para Rasterização.',
            tiers: [
              { id: 'entrada', name: 'Entrada (1080p)', summary: 'Ótimas para 1080p e FPS competitivos.', items: ['RX 7600'] },
              { id: 'mid', name: 'Intermediária (1440p)', summary: 'As queridinhas do 1440p pela abundância de VRAM.', items: ['RX 7800 XT'] },
              { id: 'high', name: 'High-End (4K)', summary: 'Competem com as topo de linha da NVIDIA em raster.', items: ['RX 7900 XTX'] }
            ]
          },
          {
            id: 'rx6000',
            name: 'Série RX 6000',
            releaseDate: '2020',
            description: 'Geração passada da AMD, ainda muito viáveis para o baixo orçamento.',
            tiers: [
              { id: 'entrada', name: 'Custo-Benefício', summary: 'A rainha do custo benefício Full HD.', items: ['RX 6600'] }
            ]
          }
        ]
      },
      {
        id: 'intel',
        name: 'Intel Arc',
        color: '#0068b5',
        platforms: [
          {
            id: 'arc',
            name: 'Intel Arc (Alchemist)',
            releaseDate: '2022',
            description: 'A primeira aposta real da Intel em GPUs dedicadas de mesa.',
            tiers: [
              { id: 'entrada', name: 'Entrada', summary: 'Opções baratas que dependem de ReBAR ativado na placa mãe.', items: ['Arc A380', 'Arc A750'] },
              { id: 'mid', name: 'Intermediária', summary: 'Competem com as RTX 3060 oferecendo bom desempenho em encoders de vídeo.', items: ['Arc A770'] }
            ]
          }
        ]
      }
    ]
  },
  'psu': { 
    id: 'psu', 
    name: 'Fonte (PSU)', 
    summary: 'O coração do PC. Fornece energia para todos os outros componentes funcionarem de maneira segura e estável.', 
    brands: [
      {
        id: 'potencia',
        name: 'Por Necessidade Energética',
        color: '#ff9800',
        platforms: [
          {
            id: 'basica',
            name: 'Até 600W (Básica)',
            releaseDate: 'Padrão',
            description: 'Fontes indicadas para PCs de escritório ou com placas de vídeo de entrada.',
            tiers: [
              { id: 'bronze', name: '80 Plus Bronze', summary: 'Garantem eficiência de cerca de 82-85%. Sempre compre de marcas conhecidas!', items: ['Corsair CV550'] }
            ]
          },
          {
            id: 'media',
            name: '650W a 850W (Intermediária)',
            releaseDate: 'Padrão',
            description: 'Recomendado para PCs Gamers com placas de vídeo intermediárias como RTX 4070 ou RX 7800 XT.',
            tiers: [
              { id: 'gold', name: '80 Plus Gold', summary: 'Eficiência superior (87-90%), garantindo que menos energia vire calor.', items: ['XPG Core Reactor 750W'] }
            ]
          },
          {
            id: 'alta',
            name: '1000W ou mais (Entusiasta)',
            releaseDate: 'Padrão',
            description: 'Para quem usa placas topo de linha (como RTX 4090) e processadores muito exigentes (como i9).',
            tiers: [
              { id: 'gold', name: '80 Plus Gold / Platinum', summary: 'Essencial para lidar com picos de consumo altíssimos e estabilidade extrema.', items: ['Corsair RM1000x'] }
            ]
          }
        ]
      }
    ]
  },
  'storage': { 
    id: 'storage', 
    name: 'HD/SSD', 
    summary: 'A memória de longo prazo. Onde o Windows, seus jogos, fotos e documentos ficam guardados mesmo quando o PC está desligado.', 
    brands: [
      {
        id: 'ssd',
        name: 'Tecnologias de SSD',
        color: '#9c27b0',
        platforms: [
          {
            id: 'nvme',
            name: 'SSD NVMe M.2',
            releaseDate: 'Padrão Atual',
            description: 'O formato mais rápido. Parecem um pente de memória e vão direto na placa-mãe. Chegam a velocidades insanas.',
            tiers: [
              { id: 'pcie3', name: 'PCIe 3.0 / Entrada', summary: 'Velocidades de até ~3500MB/s. Já resolve a vida de quase todo mundo.', items: ['Kingston NV2 (250GB - 2TB)'] },
              { id: 'pcie4', name: 'PCIe 4.0 / Intermediário', summary: 'Até ~5000MB/s. Indicados para edição pesada e DirectStorage.', items: ['WD Blue SN580', 'Samsung 990 PRO'] },
              { id: 'pcie4high', name: 'PCIe 4.0 / High-End', summary: 'Velocidades beirando os ~7300MB/s. Ideal para PS5 e PCs de altíssimo rendimento.', items: ['WD Black SN850X'] }
            ]
          },
          {
            id: 'sata',
            name: 'SSD SATA III',
            releaseDate: 'Padrão Antigo',
            description: 'Usam cabos convencionais, igual aos HDs antigos, mas muito mais rápidos que eles (limite de ~550MB/s).',
            tiers: [
              { id: 'sata', name: 'Uso Geral', summary: 'Ótimos para reviver notebooks e PCs velhos, ou para armazenamento em massa secundário.', items: ['Kingston A400', 'Crucial MX500', 'WD Blue', 'Samsung 870 EVO'] }
            ]
          }
        ]
      }
    ]
  },
  'cooler': { 
    id: 'cooler', 
    name: 'Cooler', 
    summary: 'O sistema de refrigeração. Mantém o processador (e o PC como um todo) em temperaturas seguras para não perder performance.', 
    brands: [
      {
        id: 'tipos',
        name: 'Tipos de Refrigeração',
        color: '#00bcd4',
        platforms: [
          {
            id: 'air',
            name: 'Air Coolers',
            releaseDate: 'Tradicional',
            description: 'Refrigeração a ar por meio de torres de alumínio (heatsinks) e ventoinhas.',
            tiers: [
              { id: 'box', name: 'Cooler Box (Padrão)', summary: 'Vem junto com o processador. Serve para CPUs de entrada e não permite overclock.', items: ['Wraith Stealth (AMD)', 'Laminar (Intel)'] },
              { id: 'tower', name: 'Air Cooler de Torre', summary: 'Uma ou duas torres gigantes. Duráveis e eficientes, competem com Water Coolers baratos.', items: ['Deepcool AK400', 'Noctua NH-D15'] }
            ]
          },
          {
            id: 'water',
            name: 'Water Coolers (AIO)',
            releaseDate: 'Entusiasta',
            description: 'Refrigeração líquida com radiador. Visualmente mais limpo e melhor controle de grandes dissipações térmicas.',
            tiers: [
              { id: '120', name: '120mm', summary: 'Não recomendado (um Air Cooler básico faz melhor por menos preço).', items: ['Water Coolers 120mm'] },
              { id: '240', name: '240mm / 280mm', summary: 'O ponto de equilíbrio. Ideal para processadores intermediários e high-end básicos.', items: ['Corsair H100i', 'NZXT Kraken 240'] },
              { id: '360', name: '360mm / 420mm', summary: 'Necessário para segurar os monstruosos i9 e Ryzen 9 trabalhando no limite.', items: ['Corsair H150i', 'Arctic Liquid Freezer III'] }
            ]
          }
        ]
      }
    ]
  }
};

const componentsList = [
  { id: 'placa-mae', icon: 'motherboard' },
  { id: 'cpu', icon: 'cpu' },
  { id: 'ram', icon: 'ram' },
  { id: 'gpu', icon: 'gpu' },
  { id: 'psu', icon: 'psu' },
  { id: 'storage', icon: 'storage' },
  { id: 'cooler', icon: 'cooler' }
];

// --- Silhuetas Cartoonizadas (SVGs) ---
const Silhueta = ({ type, size = 64, color = "var(--text)" }) => {
  switch (type) {
    case 'motherboard':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" color={color}>
          <rect x="12" y="4" width="40" height="56" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
          <rect x="24" y="16" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="42" y="12" width="4" height="24" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="18" y="44" width="28" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      );
    case 'cpu':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" color={color}>
          <rect x="14" y="14" width="36" height="36" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
          <rect x="22" y="22" width="20" height="20" rx="1" fill="currentColor" />
          <path d="M22 14V8M32 14V8M42 14V8 M22 50v6M32 50v6M42 50v6 M14 22H8M14 32H8M14 42H8 M50 22h6M50 32h6M50 42h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'ram':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" color={color}>
          <rect x="6" y="26" width="52" height="12" rx="1" stroke="currentColor" strokeWidth="3" fill="none" />
          <rect x="12" y="26" width="6" height="12" fill="currentColor" />
          <rect x="22" y="26" width="6" height="12" fill="currentColor" />
          <rect x="36" y="26" width="6" height="12" fill="currentColor" />
          <rect x="46" y="26" width="6" height="12" fill="currentColor" />
          <path d="M31 38v8M33 38v8" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'gpu':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" color={color}>
          <rect x="8" y="20" width="48" height="24" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="24" cy="32" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="40" cy="32" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M12 44v4M52 44v4" stroke="currentColor" strokeWidth="3" />
          <rect x="4" y="24" width="4" height="16" fill="currentColor" />
        </svg>
      );
    case 'psu':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" color={color}>
          <rect x="12" y="16" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M32 22v20M22 32h20M25 25l14 14M25 39l14-14" stroke="currentColor" strokeWidth="1" />
          <path d="M52 24h6M52 28h6M52 32h6" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'storage':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" color={color}>
          <rect x="16" y="12" width="32" height="40" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="32" cy="28" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="32" cy="28" r="2" fill="currentColor" />
          <rect x="24" y="44" width="16" height="4" fill="currentColor" />
        </svg>
      );
    case 'cooler':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" color={color}>
          <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="32" cy="32" r="4" fill="currentColor" />
          <path d="M32 12C36 20 28 32 32 32 M32 52C28 44 36 32 32 32 M12 32C20 28 32 36 32 32 M52 32C44 36 32 28 32 32" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      );
    default:
      return null;
  }
};

const Minicurso = () => {
  const [viewState, setViewState] = useState({ level: 'home' });

  const handleBack = () => {
    setViewState(prev => {
      if (prev.level === 'tier') return { ...prev, level: 'platform', tierId: undefined };
      if (prev.level === 'platform') return { ...prev, level: 'brand', platformId: undefined };
      if (prev.level === 'brand') return { ...prev, level: 'component', brandId: undefined };
      if (prev.level === 'component') return { ...prev, level: 'home', componentId: undefined };
      return prev;
    });
  };

  const currentComponent = viewState.componentId ? hardwareData[viewState.componentId] : null;
  const currentBrand = currentComponent?.brands?.find((b) => b.id === viewState.brandId);
  const currentPlatform = currentBrand?.platforms?.find((p) => p.id === viewState.platformId);
  const currentTier = currentPlatform?.tiers?.find((t) => t.id === viewState.tierId);

  return (
    <div className="max-w-4xl mx-auto p-6 text-var(--text)">
      {/* HEADER DINÂMICO */}
      <div className="flex items-center mb-6">
        {viewState.level !== 'home' && (
          <button onClick={handleBack} className="p-2 mr-4 hover:bg-gray-700 rounded-lg transition">
            ← Back
          </button>
        )}
        <div>
          <h1 className="text-4xl font-bold">
            {viewState.level === 'home' ? 'Universo do Hardware' : currentComponent?.name}
          </h1>
          <p className="text-lg opacity-80 mt-1">
            {viewState.level === 'home'
              ? 'Conheça os componentes do seu PC sem complicação. Clique para explorar.'
              : viewState.level === 'component' ? currentComponent?.summary
                : viewState.level === 'brand' ? `Escolhendo sua plataforma ${currentBrand?.name}`
                  : viewState.level === 'platform' ? `${currentPlatform?.name} - Níveis de Performance`
                    : currentTier?.name
            }
          </p>
        </div>
      </div>

      <hr className="my-6 border-gray-600" />

      {/* VIEW: HOME (Silhuetas) */}
      {viewState.level === 'home' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {componentsList.map((item) => (
            <div
              key={item.id}
              onClick={() => setViewState({ level: 'component', componentId: item.id })}
              className="bg-gray-800 rounded-xl p-6 cursor-pointer transition transform hover:scale-105 shadow-lg"
            >
              <div className="flex flex-col items-center justify-center">
                <Silhueta type={item.icon} size={80} color="#1976d2" />
                <h3 className="font-bold text-center mt-4">{hardwareData[item.id].name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW: COMPONENT */}
      {viewState.level === 'component' && (
        <div>
          {currentComponent?.brands?.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Escolha a Categoria:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentComponent.brands.map((brand) => (
                  <div
                    key={brand.id}
                    onClick={() => setViewState({ ...viewState, level: 'brand', brandId: brand.id })}
                    className="bg-gray-800 rounded-lg p-8 cursor-pointer transition hover:scale-105 shadow-lg border-t-4"
                    style={{ borderTopColor: brand.color }}
                  >
                    <h3 className="text-3xl font-bold text-center" style={{ color: brand.color }}>
                      {brand.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <Silhueta type={componentsList.find(c => c.id === viewState.componentId)?.icon || ''} size={100} />
              <h3 className="text-xl mt-4">
                Sessão em construção. Em breve mais detalhes práticos sobre {currentComponent?.name}!
              </h3>
            </div>
          )}
        </div>
      )}

      {/* VIEW: BRAND (Lista de Plataformas) */}
      {viewState.level === 'brand' && currentBrand && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Plataformas / Tecnologias:</h2>
          <div className="flex flex-col gap-4">
            {currentBrand.platforms.map((platform) => (
              <div
                key={platform.id}
                onClick={() => setViewState({ ...viewState, level: 'platform', platformId: platform.id })}
                className="bg-gray-800 rounded-lg p-6 cursor-pointer transition hover:scale-105 shadow-lg border-l-4"
                style={{ borderLeftColor: currentBrand.color }}
              >
                <span className="inline-block mb-3 bg-gray-700 px-3 py-1 rounded text-sm">
                  Lançamento: {platform.releaseDate}
                </span>
                <h3 className="text-xl font-bold mb-2">{platform.name}</h3>
                <p className="opacity-80 mb-3">{platform.description}</p>
                <button className="border border-gray-500 px-4 py-2 rounded hover:bg-gray-700 transition text-white">
                  Ver Categorias
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: PLATFORM (Categorias de Placa Mãe) */}
      {viewState.level === 'platform' && currentPlatform && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Categorias de {currentPlatform.name}:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentPlatform.tiers.map((tier) => (
              <div
                key={tier.id}
                onClick={() => setViewState({ ...viewState, level: 'tier', tierId: tier.id })}
                className="bg-gray-800 rounded-lg p-6 cursor-pointer transition hover:scale-105 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-2 text-white">{tier.name}</h3>
                <p className="opacity-80 text-gray-300">{tier.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: TIER (Detalhes da Categoria e Lista) */}
      {viewState.level === 'tier' && currentTier && (
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Resumo da Categoria</h2>
          <p className="text-lg mb-6 text-gray-300">{currentTier.summary}</p>

          <hr className="my-6 border-gray-600" />

          <h3 className="text-xl font-bold mb-4 text-white">Modelos Comuns:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentTier.items.map((item, index) => (
              <div
                key={index}
                className="bg-gray-700 border border-gray-600 rounded-lg p-4 text-center font-bold text-white hover:bg-gray-600 transition"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Minicurso;

