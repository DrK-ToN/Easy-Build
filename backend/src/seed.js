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
            explain:
                'A placa-mãe é a peça que fisicamente conecta todos os outros componentes entre si — processador, memória, armazenamento, placa de vídeo — e permite que eles conversem.',
            analogy:
                'Pense nela como a planta baixa de uma casa: define onde cada cômodo se encaixa e por onde passam os "canos" (cabos e conexões) que ligam tudo.',
            fact: 'O termo "chipset" vem justamente do conjunto de chips na placa-mãe que controla a comunicação entre as peças — é ele quem decide, por exemplo, quantos SSDs ou placas de vídeo dá para usar ao mesmo tempo.',
        },
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
            explain:
                'O processador (CPU) é quem executa as instruções dos programas — literalmente faz os cálculos que fazem o computador funcionar.',
            analogy:
                'É como o cérebro do computador: cada "núcleo" dentro dele é como uma pessoa capaz de resolver uma tarefa sozinha. More núcleos, mais tarefas em paralelo sem atropelo.',
            fact: 'Os primeiros processadores domésticos, nos anos 1970, tinham um único núcleo rodando a poucos milhões de operações por segundo. Um processador atual comum já passa de bilhões de operações por segundo, com vários núcleos trabalhando juntos.',
        },
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
            explain:
                'A memória RAM guarda temporariamente o que está sendo usado agora — programas abertos, abas do navegador, o jogo rodando. Ela é apagada quando o computador desliga.',
            analogy:
                'Imagine uma mesa de trabalho: quanto maior a mesa, mais papéis (programas) você consegue deixar abertos ao mesmo tempo sem precisar guardar tudo na gaveta (armazenamento) e buscar de novo depois.',
            fact: '"RAM" significa "memória de acesso aleatório" — o nome vem do fato de o processador conseguir acessar qualquer posição dela quase na mesma velocidade, sem precisar "percorrer" a memória em ordem.',
        },
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
            explain:
                'É onde os arquivos, fotos, programas e o próprio sistema operacional ficam guardados de forma permanente, mesmo com o computador desligado.',
            analogy:
                'Se a RAM é a mesa de trabalho, o armazenamento é o armário de arquivos: mais lento para pegar algo, mas guarda tudo mesmo quando você "fecha o escritório" no fim do dia.',
            fact: 'Um SSD não tem partes móveis — ele guarda dados em chips de memória flash, o que o torna bem mais rápido e resistente a quedas do que um HD tradicional, que grava em discos giratórios.',
        },
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
            explain:
                'A placa de vídeo (GPU) processa imagens, vídeos e gráficos 3D. Ela é essencial para jogos, edição de vídeo e qualquer tarefa que dependa de imagem em movimento.',
            analogy:
                'Se o processador é um profissional generalista que resolve qualquer tarefa, a GPU é um artista especializado só em desenhar — e desenha centenas de quadros por segundo em paralelo.',
            fact: 'GPUs modernas são tão boas em fazer muitos cálculos simples ao mesmo tempo que passaram a ser usadas também para treinar modelos de inteligência artificial, não só para jogos.',
        },
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
            explain:
                'A fonte de alimentação (PSU) converte a energia elétrica da tomada — corrente alternada — na energia estável que cada componente do PC realmente usa.',
            analogy:
                'Ela funciona como o coração do sistema: bombeia energia de forma constante para todas as partes, na medida certa que cada uma precisa.',
            fact: 'O selo "80 Plus" que aparece nas fontes indica o quanto de energia da tomada realmente vira energia útil para o PC — o resto se perde como calor. Uma fonte 80 Plus Gold desperdiça bem menos energia que uma sem certificação nenhuma.',
        },
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
            explain:
                'O gabinete é a estrutura física que protege e organiza todos os componentes, além de ajudar (ou atrapalhar) a circulação de ar que resfria o sistema.',
            analogy:
                'É como a casa que abriga todos os moradores (componentes): o tamanho dos cômodos e as janelas (ventoinhas) determinam se todo mundo vai conseguir "respirar" bem lá dentro.',
            fact: 'O formato mais comum de gabinete, chamado ATX, segue um padrão de medidas criado pela Intel em 1995 — e até hoje a maioria das placas-mãe é feita para caber nesse padrão.',
        },
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
            explain:
                'O cooler é responsável por tirar o calor gerado pelo processador (e outros componentes) para fora do sistema, evitando que ele superaqueça e perca desempenho.',
            analogy:
                'Pense nele como um ventilador pessoal apontado direto para quem está "trabalhando mais": o processador esquenta com o esforço, e o cooler cuida para que ele não passe do limite.',
            fact: 'Em coolers líquidos (water coolers), o calor é levado por um líquido até um radiador com ventoinhas — o mesmo princípio usado no radiador de um carro para resfriar o motor.',
        },
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
