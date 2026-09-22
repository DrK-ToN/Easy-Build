// backend/src/seed.js
const mongoose = require('mongoose');
require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Força o DNS do Google
const Componente = require('./models/Componente');

const dadosIniciais = [
    {
        id_slug: 'placa-mae',
        code: 'MB',
        name: 'Placa-mãe',
        icon: 'motherboard',
        blurb: 'A base que conecta processador, memória, armazenamento e todo o resto.',
        build: {
            intel: {
                specs: [
                    'Soquete <b>LGA1700</b> — compatível com Core de 12ª, 13ª e 14ª geração',
                    'Chipsets: <b>Z790</b> (overclock e topo de linha), <b>B760</b> (custo-benefício), <b>H610</b> (entrada)',
                    'Suporte a memória DDR4 ou DDR5, dependendo do modelo — confira antes de comprar a RAM',
                ],
                tip: 'Sempre confira o soquete da placa-mãe antes de escolher o processador. Um LGA1700 não aceita um processador AMD, e vice-versa.',
            },
            amd: {
                specs: [
                    'Soquete <b>AM5</b> — linha atual Ryzen 7000/8000/9000, memória DDR5 obrigatória',
                    'Soquete <b>AM4</b> — linha anterior Ryzen 1000 a 5000, memória DDR4',
                    'Chipsets: <b>X670</b> (topo), <b>B650</b> (custo-benefício), <b>A620</b> (entrada) no AM5',
                ],
                tip: 'O soquete AM4 da AMD ficou anos no mercado, então placas mais antigas às vezes aceitam processadores bem mais novos com uma atualização de BIOS.',
            },
        },
        learn: {
            explain: 'A placa-mãe é a peça que fisicamente conecta todos os outros componentes entre si — processador, memória, armazenamento, placa de vídeo — e permite que eles conversem.',
            analogy: 'Pense nela como a planta baixa de uma casa: define onde cada cômodo se encaixa e por onde passam os "canos" (cabos e conexões) que ligam tudo.',
            fact: 'O termo "chipset" vem justamente do conjunto de chips na placa-mãe que controla a comunicação entre as peças — é ele quem decide, por exemplo, quantos SSDs ou placas de vídeo dá para usar ao mesmo tempo.',
        },
        learnCards: [
            { titulo: 'O que é uma placa-mãe?', icone: '🖥️', ordem: 1, conteudo: 'A placa-mãe (também chamada de motherboard) é o circuito impresso principal do computador. Ela é literalmente a "base" onde todos os outros componentes se conectam: o processador vai no soquete, a RAM nos slots de memória, a GPU no slot PCIe e o SSD no slot M.2 ou na porta SATA. Sem ela, nenhum componente consegue se comunicar com outro.' },
            { titulo: 'Formatos: ATX, mATX e ITX', icone: '📐', ordem: 2, conteudo: 'As placas-mãe vêm em tamanhos padronizados chamados "form factors". O ATX (305×244mm) é o padrão mais comum, com mais slots e portas. O mATX (244×244mm) é menor e cabe em gabinetes compactos. O ITX (170×170mm) é para builds ultra-compactos. O formato da placa-mãe precisa ser compatível com o gabinete escolhido.' },
            { titulo: 'Chipsets: o que são?', icone: '⚙️', ordem: 3, conteudo: 'O chipset é um conjunto de chips soldados na placa-mãe que controla a comunicação entre o processador e os demais componentes. Para Intel, os principais são Z790 (overclock liberado, mais caro), B760 (custo-benefício) e H610 (entrada). Para AMD AM5: X670E/X670 (topo), B650 (custo-benefício) e A620 (entrada). Chipsets melhores oferecem mais slots PCIe, mais portas USB e overclock.' },
            { titulo: 'Plataformas e sockets', icone: '🔌', ordem: 4, conteudo: 'O soquete define qual processador a placa aceita. Os principais atuais são: LGA1700 (Intel Core 12ª, 13ª e 14ª geração), AM5 (AMD Ryzen 7000/9000, DDR5) e AM4 (AMD Ryzen até 5000, DDR4). Processadores Intel e AMD nunca são intercambiáveis — os soquetes são completamente diferentes tanto em formato quanto em pinagem.' },
            { titulo: 'Principais fabricantes', icone: '🏭', ordem: 5, conteudo: 'As marcas mais reconhecidas no mercado de placas-mãe são: ASUS (linhas ROG, TUF e Prime), MSI (linhas MEG, MPG e MAG), Gigabyte (linhas AORUS e UD) e ASRock. Para entrada, ASRock e Gigabyte costumam oferecer bom custo-benefício. Para topo de linha, ASUS ROG e MSI MEG se destacam em recursos e durabilidade.' },
        ],
    },
    {
        id_slug: 'processador',
        code: 'CPU',
        name: 'Processador',
        icon: 'cpu',
        blurb: 'O componente que executa os cálculos e comandos do sistema.',
        build: {
            intel: {
                specs: [
                    'Linhas <b>Core i3 / i5 / i7 / i9</b>, do básico ao alto desempenho',
                    '"K" no final do nome (ex: i5-13600K) indica multiplicador destravado para overclock',
                    'Cooler geralmente não acompanha os modelos "K" — é preciso comprar à parte',
                ],
                tip: 'Para uso geral e jogos, um Core i5 já entrega ótimo custo-benefício. Reserve o i7/i9 para edição de vídeo pesada ou produção de conteúdo.',
            },
            amd: {
                specs: [
                    'Linhas <b>Ryzen 3 / 5 / 7 / 9</b>, do básico ao alto desempenho',
                    'Sufixo "X" indica clocks mais altos de fábrica; "G" indica vídeo integrado incluso',
                    'A maioria dos Ryzen já acompanha um cooler-box adequado ao uso comum',
                ],
                tip: 'Se você não vai usar placa de vídeo dedicada de início, procure um Ryzen com "G" no nome — ele já tem vídeo integrado suficiente para o dia a dia.',
            },
        },
        learn: {
            explain: 'O processador (CPU) é quem executa as instruções dos programas — literalmente faz os cálculos que fazem o computador funcionar.',
            analogy: 'É como o cérebro do computador: cada "núcleo" dentro dele é como uma pessoa capaz de resolver uma tarefa sozinha. More núcleos, mais tarefas em paralelo sem atropelo.',
            fact: 'Os primeiros processadores domésticos, nos anos 1970, tinham um único núcleo rodando a poucos milhões de operações por segundo. Um processador atual comum já passa de bilhões de operações por segundo, com vários núcleos trabalhando juntos.',
        },
        learnCards: [
            { titulo: 'O que é um processador?', icone: '🧠', ordem: 1, conteudo: 'O processador (CPU — Central Processing Unit) é o componente responsável por executar todas as instruções dos programas. Cada vez que você abre um app, joga, edita um arquivo ou navega na web, é o processador quem está realizando os cálculos por trás disso. Ele lê instruções da memória RAM, processa-as e devolve os resultados.' },
            { titulo: 'Núcleos e threads', icone: '🔢', ordem: 2, conteudo: 'Um processador moderno tem múltiplos núcleos físicos — cada um capaz de executar tarefas independentemente. Além disso, a maioria tem hyperthreading (Intel) ou SMT (AMD), que cria núcleos virtuais (threads). Um processador de 8 núcleos e 16 threads consegue trabalhar em 16 tarefas ao mesmo tempo. Para jogos, 6–8 núcleos é suficiente; para edição pesada, 12 ou mais ajudam muito.' },
            { titulo: 'Clock e desempenho', icone: '⚡', ordem: 3, conteudo: 'O clock (frequência) indica quantas operações o processador executa por segundo, medido em GHz. Um processador de 5GHz executa 5 bilhões de ciclos por segundo. No entanto, clock mais alto não significa sempre mais rápido — a arquitetura interna importa muito. Um Ryzen de 4,5GHz pode ser mais rápido que um de geração anterior a 5GHz.' },
            { titulo: 'Intel vs AMD: diferenças práticas', icone: '⚔️', ordem: 4, conteudo: 'Intel (Core i-series) e AMD (Ryzen) são os dois grandes fabricantes. Historicamente, a Intel liderava em desempenho single-core (ideal para jogos), enquanto AMD se destacava em custo-benefício e multi-core. Hoje, as diferenças são menores: AMD AM5 com Ryzen 9000 compete de igual para igual com Intel Core Ultra. A escolha do ecossistema (placa-mãe e RAM disponível) muitas vezes decide mais do que a marca.' },
            { titulo: 'Geração e compatibilidade', icone: '🔄', ordem: 5, conteudo: 'Processadores são lançados em gerações anuais ou bianuais. Cada geração pode ou não ser compatível com a geração anterior no mesmo soquete. A AMD AM4 suportou Ryzen 1000 a 5000 no mesmo soquete por anos — vantagem enorme. A Intel muda de soquete com mais frequência. Sempre verifique a compatibilidade do processador com a placa-mãe antes de comprar — às vezes é necessária uma atualização de BIOS.' },
        ],
    },
    {
        id_slug: 'ram',
        code: 'RAM',
        name: 'Memória RAM',
        icon: 'ram',
        blurb: 'Guarda temporariamente o que o processador está usando agora.',
        build: {
            intel: {
                specs: [
                    'Placas mais recentes trabalham com <b>DDR5</b>; modelos de entrada ainda usam <b>DDR4</b>',
                    'Use sempre pares iguais de pente (ex: 2x8GB) para ativar o dual channel',
                    '16GB é o mínimo confortável em 2026; 32GB para multitarefa pesada',
                ],
                tip: 'Nunca misture um pente DDR4 com um DDR5 — eles nem encaixam fisicamente no slot, então isso evita erro por engano.',
            },
            amd: {
                specs: [
                    'Soquete AM5 exige <b>DDR5</b>; soquete AM4 usa <b>DDR4</b>',
                    'Ryzen se beneficia bastante de memórias com frequência mais alta (acima de 6000MHz em AM5)',
                    'Use sempre pares iguais de pente para ativar o dual channel',
                ],
                tip: 'Em plataformas AMD AM5, vale a pena investir um pouco mais na frequência da RAM — o ganho de desempenho é mais perceptível do que em outras plataformas.',
            },
        },
        learn: {
            explain: 'A memória RAM guarda temporariamente o que está sendo usado agora — programas abertos, abas do navegador, o jogo rodando. Ela é apagada quando o computador desliga.',
            analogy: 'Imagine uma mesa de trabalho: quanto maior a mesa, mais papéis (programas) você consegue deixar abertos ao mesmo tempo sem precisar guardar tudo na gaveta (armazenamento) e buscar de novo depois.',
            fact: '"RAM" significa "memória de acesso aleatório" — o nome vem do fato de o processador conseguir acessar qualquer posição dela quase na mesma velocidade, sem precisar "percorrer" a memória em ordem.',
        },
        learnCards: [
            { titulo: 'O que é memória RAM?', icone: '💾', ordem: 1, conteudo: 'RAM (Random Access Memory) é a memória de trabalho do computador. Ela armazena temporariamente os dados e programas que o processador está usando agora. Ao contrário do SSD ou HD, a RAM perde tudo o que guardou quando o computador é desligado. Quanto mais RAM, mais programas conseguem rodar ao mesmo tempo sem lentidão.' },
            { titulo: 'DDR4 vs DDR5', icone: '🔄', ordem: 2, conteudo: 'DDR4 e DDR5 são gerações diferentes de RAM. O DDR5 é mais rápido, consome menos energia e suporta capacidades maiores por pente. No entanto, é mais caro. A escolha depende da placa-mãe: placas com chipset Intel Z790/B760 recentes e AMD AM5 usam DDR5. Placas mais antigas com Intel B460/H510 e AMD AM4 usam DDR4. Os conectores são fisicamente diferentes — não há risco de encaixar errado.' },
            { titulo: 'Quantidade: quanto precisar?', icone: '📊', ordem: 3, conteudo: 'Em 2026, 16GB é o mínimo confortável para uso geral e jogos. Com 16GB você consegue rodar jogos modernos, ter o navegador aberto com várias abas e ainda ter programas em background. 32GB é recomendado para multitarefa intensa, edição de vídeo em 4K ou streaming enquanto joga. 64GB ou mais é território de workstations profissionais.' },
            { titulo: 'Frequência e dual channel', icone: '⚡', ordem: 4, conteudo: 'A frequência da RAM (ex: 3200MHz, 6000MHz) indica quantos dados ela transfere por segundo. Mais MHz = mais rápido, mas com retornos diminuindo. Em AMD AM5, a frequência tem impacto maior no desempenho dos Ryzen. Dual channel significa usar dois pentes iguais nos slots corretos (geralmente slots 2 e 4) — isso quase dobra a largura de banda e melhora o desempenho perceptivelmente.' },
            { titulo: 'Principais marcas', icone: '🏭', ordem: 5, conteudo: 'As marcas mais confiáveis em RAM são: Corsair (séries Vengeance e Dominator), Kingston (HyperX e Fury), G.Skill (Trident Z e Ripjaws), Crucial (Ballistix) e TeamGroup. Para uso geral, qualquer dessas marcas entrega boa qualidade. Para overclock extremo, G.Skill Trident Z e Corsair Dominator são referências no mercado.' },
        ],
    },
    {
        id_slug: 'armazenamento',
        code: 'SSD',
        name: 'Armazenamento',
        icon: 'storage',
        blurb: 'Onde os arquivos, programas e o sistema ficam guardados permanentemente.',
        build: {
            intel: {
                specs: [
                    'Prefira <b>SSD NVMe M.2</b> em vez de HD — o ganho de velocidade no dia a dia é enorme',
                    'Verifique quantos slots M.2 a placa-mãe oferece antes de comprar mais de um',
                    'HD ainda vale para guardar arquivos grandes por um custo menor por GB',
                ],
                tip: 'Instale o sistema operacional sempre no SSD. É a troca que mais se sente na hora de ligar o PC e abrir programas.',
            },
            amd: {
                specs: [
                    'Placas AM5 costumam trazer <b>M.2 com PCIe 4.0 ou 5.0</b>, bem mais rápido que SATA',
                    'Confira a geração do slot M.2 antes de comprar um SSD de ponta — nem toda placa aproveita o máximo de velocidade',
                    'HD continua útil como armazenamento secundário, mais barato por GB',
                ],
                tip: 'Um SSD de 500GB a 1TB já cobre bem sistema e programas para a maioria dos usuários — some um HD depois se precisar de mais espaço.',
            },
        },
        learn: {
            explain: 'É onde os arquivos, fotos, programas e o próprio sistema operacional ficam guardados de forma permanente, mesmo com o computador desligado.',
            analogy: 'Se a RAM é a mesa de trabalho, o armazenamento é o armário de arquivos: mais lento para pegar algo, mas guarda tudo mesmo quando você "fecha o escritório" no fim do dia.',
            fact: 'Um SSD não tem partes móveis — ele guarda dados em chips de memória flash, o que o torna bem mais rápido e resistente a quedas do que um HD tradicional, que grava em discos giratórios.',
        },
        learnCards: [
            { titulo: 'SSD vs HD: qual a diferença?', icone: '💿', ordem: 1, conteudo: 'Um HD (Hard Disk Drive) usa discos magnéticos giratórios para gravar dados — é lento, mas barato por GB. Um SSD (Solid State Drive) usa chips de memória flash, sem partes móveis — é muito mais rápido, silencioso e resistente a impactos. Para o sistema operacional e programas, o SSD faz toda a diferença no tempo de inicialização e resposta. HDs ainda são úteis como armazenamento secundário para arquivos grandes.' },
            { titulo: 'M.2 NVMe vs SATA', icone: '🔌', ordem: 2, conteudo: 'SSDs existem em diferentes interfaces. SATA é a interface mais antiga (também usada por HDs), com velocidade máxima de ~550MB/s. M.2 NVMe é a interface moderna, encaixada diretamente na placa-mãe, com velocidades de 3500MB/s (PCIe 3.0), 7000MB/s (PCIe 4.0) ou até 14000MB/s (PCIe 5.0). Para o sistema operacional, um SSD M.2 NVMe transforma completamente a experiência de uso.' },
            { titulo: 'Quanto de armazenamento?', icone: '📦', ordem: 3, conteudo: '500GB é o mínimo prático para uso geral e alguns jogos. 1TB é o "ponto doce" para a maioria: cobre sistema, programas e vários jogos confortavelmente. 2TB é recomendado para quem tem muitos jogos, edita vídeos ou trabalha com arquivos grandes. Para arquivos históricos e backups, um HD externo ou secundário de 4TB+ pode ser mais econômico do que SSDs em grande capacidade.' },
            { titulo: 'PCIe 4.0 vs 5.0: vale a pena?', icone: '⚡', ordem: 4, conteudo: 'SSDs PCIe 5.0 chegam a 14.000MB/s — impressionante no papel, mas na prática a diferença para o usuário comum é quase imperceptível. O gargalo costuma estar no software e no sistema, não no SSD. PCIe 4.0 (7.000MB/s) já é mais do que suficiente para qualquer uso. SSDs PCIe 5.0 também costumam esquentar mais e precisam de dissipadores. Para a maioria dos usuários, um bom SSD PCIe 4.0 é a escolha mais inteligente.' },
            { titulo: 'Principais marcas', icone: '🏭', ordem: 5, conteudo: 'No segmento de SSDs, as marcas mais recomendadas são: Samsung (870 EVO para SATA, 990 PRO para NVMe), WD (WD Blue para SATA, SN850X para NVMe), Seagate (Barracuda para HDs), Kingston, Crucial e Lexar. Para SSDs, Samsung e WD lideram em confiabilidade. Para HDs, Seagate e WD são os padrões da indústria há décadas.' },
        ],
    },
    {
        id_slug: 'placa-de-video',
        code: 'GPU',
        name: 'Placa de vídeo',
        icon: 'gpu',
        blurb: 'Processa imagens e gráficos, essencial para jogos e edição visual.',
        build: {
            intel: {
                specs: [
                    'Encaixa no slot <b>PCIe x16</b> da placa-mãe, presente em praticamente todos os modelos',
                    'Confira se a fonte tem os conectores de energia certos para a placa escolhida',
                    'Processadores "K" da Intel geralmente não têm vídeo integrado — a GPU dedicada passa a ser obrigatória',
                ],
                tip: 'Confirme o espaço físico dentro do gabinete: placas de vídeo modernas são compridas e podem não caber em gabinetes compactos.',
            },
            amd: {
                specs: [
                    'Também usa o slot <b>PCIe x16</b> — compatível com GPUs de qualquer marca, não só AMD',
                    'Se o processador tiver vídeo integrado ("G"), dá para começar sem GPU dedicada e adicionar depois',
                    'Verifique a potência recomendada da placa antes de escolher a fonte',
                ],
                tip: 'Não existe "GPU exclusiva para AMD" — uma placa de vídeo Intel Arc, AMD Radeon ou NVIDIA GeForce funciona com processador de qualquer marca.',
            },
        },
        learn: {
            explain: 'A placa de vídeo (GPU) processa imagens, vídeos e gráficos 3D. Ela é essencial para jogos, edição de vídeo e qualquer tarefa que dependa de imagem em movimento.',
            analogy: 'Se o processador é um profissional generalista que resolve qualquer tarefa, a GPU é um artista especializado só em desenhar — e desenha centenas de quadros por segundo em paralelo.',
            fact: 'GPUs modernas são tão boas em fazer muitos cálculos simples ao mesmo tempo que passaram a ser usadas também para treinar modelos de inteligência artificial, não só para jogos.',
        },
        learnCards: [
            { titulo: 'O que é uma GPU?', icone: '🎮', ordem: 1, conteudo: 'A GPU (Graphics Processing Unit) é um processador especializado em calcular imagens e gráficos. Enquanto o processador (CPU) tem poucos núcleos super-rápidos, a GPU tem milhares de núcleos menores trabalhando em paralelo — perfeito para renderizar os milhões de pixels de um jogo em alta resolução. Ela é indispensável para jogos, edição de vídeo, criação 3D e IA.' },
            { titulo: 'NVIDIA vs AMD vs Intel Arc', icone: '⚔️', ordem: 2, conteudo: 'NVIDIA (série GeForce RTX/GTX) lidera o mercado em desempenho e recursos como Ray Tracing e DLSS (upscaling por IA). AMD (série Radeon RX) oferece boa concorrência com preços competitivos e tecnologia FSR (alternativa ao DLSS, open-source). Intel Arc é a linha mais recente, voltada para entrada e médio desempenho, com preços agressivos. Qualquer GPU funciona com processador de qualquer marca.' },
            { titulo: 'VRAM: memória da GPU', icone: '💾', ordem: 3, conteudo: 'A VRAM (Video RAM) é a memória própria da placa de vídeo, usada para guardar texturas, frames e dados gráficos. Em jogos 1080p, 8GB são suficientes. Em 1440p, 12GB são confortáveis. Em 4K com texturas ultra, 16GB ou mais fazem diferença. Jogos e aplicativos que excedem a VRAM disponível sofrem quedas graves de FPS ou travamentos. É um dos fatores mais importantes na escolha de uma GPU.' },
            { titulo: 'Ray Tracing e DLSS/FSR', icone: '✨', ordem: 4, conteudo: 'Ray Tracing simula o comportamento real da luz nos jogos, criando reflexos, sombras e iluminação muito mais realistas. É pesado para a GPU. Para compensar, NVIDIA criou o DLSS e AMD o FSR — tecnologias que renderizam o jogo em resolução menor e usam IA (no caso do DLSS) ou algoritmos (FSR) para reconstruir a imagem em resolução maior, mantendo boa qualidade com menos custo de processamento.' },
            { titulo: 'Consumo de energia e fonte', icone: '🔋', ordem: 5, conteudo: 'GPUs modernas de alto desempenho consomem entre 150W e 450W. Isso exige uma fonte de alimentação com potência suficiente e conectores adequados (PCIe 8-pin ou o novo 16-pin). Sempre consulte o consumo recomendado pelo fabricante da GPU. Como regra geral, some o TDP da CPU ao TDP da GPU e acrescente 20-30% de margem para escolher a potência da fonte. Uma fonte insuficiente pode causar instabilidade ou até danificar componentes.' },
        ],
    },
    {
        id_slug: 'fonte',
        code: 'PSU',
        name: 'Fonte de alimentação',
        icon: 'psu',
        blurb: 'Converte a energia da tomada para o que cada componente precisa.',
        build: {
            intel: {
                specs: [
                    'Some o consumo estimado de CPU + GPU + demais peças e deixe uma margem de folga',
                    'Certificação <b>80 Plus Bronze</b> é o mínimo recomendado; Gold para mais eficiência',
                    'Confira se ela tem os conectores de CPU (4+4 pinos) e PCIe para a GPU escolhida',
                ],
                tip: 'Nunca escolha a fonte pelo preço mais baixo — uma fonte fraca ou de má qualidade pode danificar os outros componentes.',
            },
            amd: {
                specs: [
                    'Processadores Ryzen de alto desempenho podem ter picos de consumo elevados — calcule com folga',
                    'Certificação <b>80 Plus Bronze</b> no mínimo; Gold para maior eficiência energética',
                    'Verifique conectores de CPU e PCIe compatíveis com a placa-mãe e a GPU',
                ],
                tip: 'Use uma calculadora de wattagem online somando todos os componentes escolhidos antes de decidir a potência da fonte.',
            },
        },
        learn: {
            explain: 'A fonte de alimentação (PSU) converte a energia elétrica da tomada — corrente alternada — na energia estável que cada componente do PC realmente usa.',
            analogy: 'Ela funciona como o coração do sistema: bombeia energia de forma constante para todas as partes, na medida certa que cada uma precisa.',
            fact: 'O selo "80 Plus" que aparece nas fontes indica o quanto de energia da tomada realmente vira energia útil para o PC — o resto se perde como calor. Uma fonte 80 Plus Gold desperdiça bem menos energia que uma sem certificação nenhuma.',
        },
        learnCards: [
            { titulo: 'O que faz a fonte de alimentação?', icone: '⚡', ordem: 1, conteudo: 'A PSU (Power Supply Unit) converte a corrente alternada (CA) da tomada em corrente contínua (CC) nos voltages que os componentes precisam: 12V para CPU e GPU, 5V para armazenamento e periféricos, 3.3V para circuitos lógicos. Sem uma fonte de qualidade, todo o resto pode falhar — ela é literalmente a base energética do sistema.' },
            { titulo: 'Certificação 80 Plus explicada', icone: '🏅', ordem: 2, conteudo: 'O programa 80 Plus certifica fontes que convertem ao menos 80% da energia da tomada em energia útil (o resto vira calor). Os níveis são: 80 Plus (básico), Bronze, Silver, Gold, Platinum e Titanium. Para uso doméstico, Bronze é o mínimo aceitável. Gold é o ponto ideal de custo-benefício em eficiência. Platinum e Titanium são para servidores ou quem quer eficiência máxima.' },
            { titulo: 'Quanto watts preciso?', icone: '🔢', ordem: 3, conteudo: 'Para calcular: some o TDP (consumo) da CPU + GPU + uma margem de 100-150W para outros componentes e headroom. Um build com i5 + RTX 4060 consome ~300W; uma fonte de 550W é confortável. Um build i9 + RTX 4090 pode chegar a 600W; uma fonte de 850-1000W é mais adequada. Use calculadoras como a PCPartPicker ou o Cooler Master Power Supply Calculator para estimativas precisas.' },
            { titulo: 'Modular vs não-modular', icone: '🔌', ordem: 4, conteudo: 'Fontes não-modulares têm todos os cabos fixos — mais baratas, mas o excesso de cabos bagunça o gabinete. Semi-modulares têm os cabos essenciais fixos e os opcionais removíveis. Totalmente modulares permitem conectar apenas os cabos necessários — resultado é uma organização de cabos muito melhor, melhor fluxo de ar e visual mais limpo. Vale o investimento extra para quem se importa com organização interna.' },
            { titulo: 'Principais fabricantes', icone: '🏭', ordem: 5, conteudo: 'Marcas confiáveis de fonte incluem: Seasonic (referência do mercado, fabrica para outras marcas), Corsair (séries RM e HX), EVGA, be quiet! (silenciosas e premium), Cooler Master e XFX. Evite marcas genéricas sem procedência — uma fonte ruim pode danificar todos os outros componentes. Sempre veja avaliações técnicas de sites como JonnyGURU ou Tom\'s Hardware antes de comprar.' },
        ],
    },
    {
        id_slug: 'gabinete',
        code: 'CASE',
        name: 'Gabinete',
        icon: 'case',
        blurb: 'A estrutura física que abriga e protege todos os componentes.',
        build: {
            intel: {
                specs: [
                    'Confira o tamanho da placa-mãe (ATX, mATX ou ITX) e se o gabinete comporta esse formato',
                    'Bom fluxo de ar é essencial para manter processadores Intel de alto desempenho refrigerados',
                    'Veja o espaço disponível para a placa de vídeo antes de comprar',
                ],
                tip: 'Gabinetes com frente em malha (mesh) geralmente respiram melhor que os com vidro fechado na frente.',
            },
            amd: {
                specs: [
                    'Mesma lógica: confirme o tamanho da placa-mãe (ATX, mATX, ITX) contra o gabinete',
                    'Coolers de processador AMD de alto desempenho costumam ser mais altos — confira o espaço vertical',
                    'Espaço para a placa de vídeo e ventoinhas extras também merece atenção',
                ],
                tip: 'Se pretende usar water cooler, confirme o suporte a radiadores (120mm, 240mm, 360mm) no topo ou frente do gabinete.',
            },
        },
        learn: {
            explain: 'O gabinete é a estrutura física que protege e organiza todos os componentes, além de ajudar (ou atrapalhar) a circulação de ar que resfria o sistema.',
            analogy: 'É como a casa que abriga todos os moradores (componentes): o tamanho dos cômodos e as janelas (ventoinhas) determinam se todo mundo vai conseguir "respirar" bem lá dentro.',
            fact: 'O formato mais comum de gabinete, chamado ATX, segue um padrão de medidas criado pela Intel em 1995 — e até hoje a maioria das placas-mãe é feita para caber nesse padrão.',
        },
        learnCards: [
            { titulo: 'O que é o gabinete?', icone: '🏠', ordem: 1, conteudo: 'O gabinete (ou case) é a estrutura metálica e/ou plástica que abriga fisicamente todos os componentes do PC: placa-mãe, processador, GPU, fonte, HDDs/SSDs. Além de proteger as peças, o gabinete influencia diretamente o fluxo de ar interno, o nível de ruído e a facilidade de montagem.' },
            { titulo: 'Tamanhos: Full Tower, Mid Tower, Mini ITX', icone: '📐', ordem: 2, conteudo: 'Full Tower: gabinetes grandes, comportam placas E-ATX e muito espaço para refrigeração. Ideal para builds extremos. Mid Tower: o tamanho mais comum, comporta placas ATX. Equilíbrio entre espaço e praticidade. Micro ATX Tower: menor, comporta placas mATX. ITX Case: ultra-compacto, apenas para placas Mini-ITX. Quanto menor o gabinete, mais desafios de temperatura e organização de cabos.' },
            { titulo: 'Fluxo de ar (airflow)', icone: '💨', ordem: 3, conteudo: 'O airflow é o caminho que o ar faz dentro do gabinete. O ideal é ter ventoinhas na frente puxando ar frio e ventoinhas na traseira/topo expelindo ar quente. Gabinetes com frente em malha (mesh) têm muito melhor entrada de ar. Gabinetes com frente de vidro ou fechados restringem o fluxo e podem aumentar as temperaturas em 5-10°C. Um bom airflow é essencial especialmente em builds com CPUs e GPUs de alto desempenho.' },
            { titulo: 'Compatibilidades importantes', icone: '✅', ordem: 4, conteudo: 'Antes de comprar um gabinete, verifique: (1) Tamanho da placa-mãe suportado (ATX, mATX, ITX). (2) Comprimento máximo da GPU — placas longas como RTX 4090 precisam de espaço. (3) Altura máxima do cooler de CPU — coolers grandes como NH-D15 precisam de folga. (4) Suporte a radiadores (120mm, 240mm, 360mm) para water coolers. (5) Número de baias para HDs e SSDs.' },
            { titulo: 'Principais marcas', icone: '🏭', ordem: 5, conteudo: 'As marcas mais conceituadas em gabinetes são: Fractal Design (elegantes e silenciosos, como o Define e o Torrent), Lian Li (premium em alumínio, como o O11 Dynamic), NZXT (design limpo, fácil de montar), be quiet! (foco em silêncio), Phanteks e Corsair. Para o budget, Cougar, DeepCool e Aerocool oferecem boa relação custo-benefício. Sempre veja reviews em vídeo antes de decidir — a experiência de montagem varia muito.' },
        ],
    },
    {
        id_slug: 'cooler',
        code: 'FAN',
        name: 'Cooler',
        icon: 'cooler',
        blurb: 'Resfria o processador para manter o desempenho estável.',
        build: {
            intel: {
                specs: [
                    'Processadores "K" quase sempre exigem cooler à parte — não vêm com um incluso',
                    'Water cooler (AIO) costuma valer a pena a partir do Core i7 em diante',
                    'Confira a compatibilidade do cooler com o soquete LGA1700 antes de comprar',
                ],
                tip: 'Aplique pasta térmica em quantidade moderada — o excesso não melhora o resfriamento e pode até atrapalhar.',
            },
            amd: {
                specs: [
                    'A maioria dos Ryzen já vem com um cooler-box suficiente para uso comum',
                    'Modelos "X" de ponta se beneficiam de um cooler maior ou water cooler',
                    'Confira a compatibilidade do cooler com o soquete AM5 ou AM4',
                ],
                tip: 'Guarde o cooler-box original mesmo trocando por um melhor — ele é uma boa reserva caso precise transportar o PC.',
            },
        },
        learn: {
            explain: 'O cooler é responsável por tirar o calor gerado pelo processador (e outros componentes) para fora do sistema, evitando que ele superaqueça e perca desempenho.',
            analogy: 'Pense nele como um ventilador pessoal apontado direto para quem está "trabalhando mais": o processador esquenta com o esforço, e o cooler cuida para que ele não passe do limite.',
            fact: 'Em coolers líquidos (water coolers), o calor é levado por um líquido até um radiador com ventoinhas — o mesmo princípio usado no radiador de um carro para resfriar o motor.',
        },
        learnCards: [
            { titulo: 'Por que o cooler é importante?', icone: '🌡️', ordem: 1, conteudo: 'Processadores geram muito calor quando trabalham. Sem refrigeração adequada, a temperatura sobe e o processador ativa o "thermal throttling" — reduz automaticamente a velocidade para não queimar. Isso causa quedas de desempenho e pode danificar o componente a longo prazo. Um bom cooler mantém o processador em temperatura ideal, garantindo desempenho máximo e vida útil longa.' },
            { titulo: 'Air Cooler vs Water Cooler (AIO)', icone: '💧', ordem: 2, conteudo: 'Air coolers usam um dissipador de alumínio/cobre com heatpipes e ventoinhas para espalhar e expelir o calor. São silenciosos, confiáveis e sem risco de vazamento. Water coolers AIO (All-In-One) usam líquido para transportar o calor até um radiador com ventoinhas — mais eficientes para CPUs de alto consumo e visualmente impressionantes. AIOs custam mais e têm vida útil de 5-7 anos. Air coolers duram décadas.' },
            { titulo: 'Pasta térmica: o que é?', icone: '🔧', ordem: 3, conteudo: 'A pasta térmica é um composto aplicado entre o processador e o cooler para preencher as microscópicas imperfeições entre as superfícies metálicas, melhorando a transferência de calor. Sem ela (ou com ela ressecada), as temperaturas aumentam drasticamente. A maioria dos coolers vem com pasta pré-aplicada, mas pastas de qualidade superior como Arctic MX-4 ou Thermal Grizzly Kryonaut podem reduzir as temperaturas em 2-5°C.' },
            { titulo: 'TDP e compatibilidade', icone: '⚙️', ordem: 4, conteudo: 'O TDP (Thermal Design Power) do processador indica o calor que ele gera sob carga. Um cooler precisa dissipar pelo menos esse valor. Processadores de entrada (65W) podem usar cooler-box ou um air cooler básico. Processadores de alto desempenho (125W, 170W) exigem um air cooler robusto como o Noctua NH-U12S ou um AIO de 240mm+. Sempre verifique a compatibilidade do cooler com o soquete da sua placa-mãe (LGA1700, AM5, AM4).' },
            { titulo: 'Marcas de referência', icone: '🏆', ordem: 5, conteudo: 'Nos air coolers, as marcas de referência são: Noctua (NH-D15 e NH-U12S são benchmarks da indústria), be quiet! (Dark Rock Pro 4), Deepcool, ARCTIC e Thermalright. Para AIOs, Corsair (H series), NZXT (Kraken), Lian Li (Galahad) e be quiet! (Silent Loop). Noctua é sinônimo de qualidade máxima e baixíssimo ruído, mas tem visual característico "marrom". be quiet! oferece excelente silêncio com visual mais discreto.' },
        ],
    },
];

async function popularBanco() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('📦 Conectado ao banco para popular os dados...');

        // Limpa registros anteriores para evitar duplicatas baseadas no ID
        await Componente.deleteMany({});
        console.log('🧹 Dados antigos limpos.');

        // Insere todos os dados originais do easybuild
        await Componente.insertMany(dadosIniciais);
        console.log(
            '✅ Todos os componentes do Easy Build foram inseridos com sucesso no MongoDB!',
        );

        process.exit(0);
    } catch (error) {
        console.error('❌ Erro ao popular o banco de dados:', error);
        process.exit(1);
    }
}

popularBanco();
