function verifyCompatibility(components) {
    const warnings = [];
    const cpu = components.find((c) => c && c.type === 'cpu');
    const mb = components.find((c) => c && c.type === 'motherboard');
    const ram = components.find((c) => c && c.type === 'ram');
    const psu = components.find((c) => c && c.type === 'psu');

    if (cpu && mb && cpu.socket !== mb.socket) {
        warnings.push(`Socket incompatível: CPU (${cpu.socket}) vs Placa-mãe (${mb.socket})`);
    }
    if (ram && mb && ram.ramType !== mb.ramType) {
        warnings.push(`RAM incompatível: Memória ${ram.ramType} vs Suporte da placa-mãe (${mb.ramType})`);
    }
    const totalTDP = components.reduce((acc, c) => acc + (c?.tdp || 0), 0);
    if (psu && psu.watts < totalTDP * 1.3) {
        warnings.push(`Fonte subdimensionada: Consumo estimado com margem de segurança requer pelo menos ${Math.ceil(totalTDP * 1.3)}W (Fonte atual: ${psu.watts}W)`);
    }
    return { valid: warnings.length === 0, warnings };
}

module.exports = { verifyCompatibility };
