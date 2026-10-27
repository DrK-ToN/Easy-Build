const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

function generateHardwareAdvice(message) {
    const text = message.toLowerCase();

    if (text.includes('am5') || text.includes('ryzen 7000') || text.includes('ryzen 9000')) {
        return 'A plataforma **AMD AM5** é a geração atual da AMD (Ryzen 7000/9000). Requer obrigatoriamente memórias **DDR5**. O melhor custo-benefício para placas-mãe costuma ser o chipset **B650**, enquanto **X670/X870** são ideais para quem busca overclock extremo e mais pistas PCIe 5.0.';
    }

    if (text.includes('am4') || text.includes('5600') || text.includes('5700x') || text.includes('5800x3d')) {
        return 'A plataforma **AMD AM4** ainda é uma excelente escolha para orçamentos econômicos. Suporta memórias **DDR4** e processadores consagrados como o Ryzen 5 5600 e o Ryzen 7 5700X3D/5800X3D. Placas-mãe **B550** oferecem suporte a PCIe 4.0 a ótimo custo.';
    }

    if (text.includes('intel') || text.includes('lga1700') || text.includes('13400') || text.includes('13600k') || text.includes('14600k')) {
        return 'O soquete **Intel LGA1700** abrange a 12ª, 13ª e 14ª gerações Intel Core. A vantagem é suportar tanto placas-mãe com DDR4 (mais baratas) quanto DDR5 (mais rápidas). Para uso comum e jogos, o chipset **B760** é o mais recomendado; para CPUs com sufixo "K" que você pretenda fazer overclock, opte por **Z790**.';
    }

    if (text.includes('fonte') || text.includes('psu') || text.includes('watts') || text.includes('w')) {
        return 'Para a fonte de alimentação (PSU), a regra de ouro é calcular o TDP combinado da CPU e GPU e adicionar uma **margem de 30% a 40%** para segurança e eficiência. Priorize marcas com certificação 80 Plus Bronze ou Gold comprovadas e PFC ativo.';
    }

    if (text.includes('gargalo') || text.includes('bottleneck')) {
        return 'O "gargalo" ocorre quando um componente (geralmente CPU ou GPU) limita o desempenho do outro. Por exemplo: uma GPU topo de linha (RTX 4080) com um processador de entrada causará perda de taxa de quadros e engasgos. Para equilibrar, mire em processadores intermediários modernos (Ryzen 5 7600 ou Core i5-13600K) para placas como RTX 4070 / RX 7800 XT.';
    }

    if (text.includes('ddr4') && text.includes('ddr5')) {
        return 'Diferenças principais: **DDR4** atinge em média 3200-3600MHz e é bem mais em conta; **DDR5** começa em 4800MHz e opera comumente em 6000MHz (ponto ideal para Ryzen 7000). Se estiver montando um PC novo do zero focado em longevidade, DDR5 é a melhor escolha.';
    }

    if (text.includes('orçamento') || text.includes('recomenda') || text.includes('indica') || text.includes('montar')) {
        return 'Para uma recomendação sob medida, confira o nosso **Montador (Builder)** ou me informe seu objetivo (ex: Jogos competitivos em 1080p, Edição 4K, Trabalho geral) e orçamento aproximado em R$. Posso sugerir a melhor combinação de CPU, Placa-mãe, RAM e GPU!';
    }

    return `Entendi sua dúvida sobre "${message}". Como especialista do Easy Build, recomendo verificar a compatibilidade de soquete e memórias no nosso Montador. Posso ajudar detalhando qualquer componente (Processador, Placa-mãe, Placa de Vídeo, Fonte ou RAM)!`;
}

// POST /api/chat - Assistente de Hardware
router.post('/', auth, (req, res) => {
    try {
        const { message } = req.body;
        if (!message || !message.trim()) {
            return res.status(400).json({ error: 'Mensagem é obrigatória' });
        }

        const reply = generateHardwareAdvice(message.trim());
        setTimeout(() => {
            res.json({ reply });
        }, 350);
    } catch (err) {
        console.error('Erro no chat:', err);
        res.status(500).json({ error: 'Falha ao processar mensagem do chat' });
    }
});

module.exports = router;
