import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Builder() {
    const [components, setComponents] = useState([]);
    const [selected, setSelected] = useState({});
    const [verifyResult, setVerifyResult] = useState(null);
    const [buildName, setBuildName] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);
    const [loadingKB, setLoadingKB] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/builds/kb')
            .then((data) => {
                setComponents(Array.isArray(data) ? data : []);
                setLoadingKB(false);
            })
            .catch(() => {
                setComponents([]);
                setLoadingKB(false);
            });
    }, []);

    const grouped = components.reduce((acc, comp) => {
        if (!acc[comp.type]) acc[comp.type] = [];
        acc[comp.type].push(comp);
        return acc;
    }, {});

    const typeLabels = {
        cpu: 'Processador (CPU)',
        motherboard: 'Placa-Mãe',
        ram: 'Memória RAM',
        gpu: 'Placa de Vídeo (GPU)',
        psu: 'Fonte de Alimentação (PSU)',
        storage: 'Armazenamento (SSD/HDD)',
        case: 'Gabinete',
        cooler: 'Refrigeração (Cooler)',
    };

    const handleSelect = (type, id) => {
        setSelected((prev) => ({ ...prev, [type]: id }));
        setVerifyResult(null);
        setMessage({ text: '', type: '' });
    };

    const verifyBuild = async () => {
        const ids = Object.values(selected).filter(Boolean);
        if (ids.length === 0) {
            setMessage({ text: 'Selecione ao menos um componente para verificar a compatibilidade.', type: 'warning' });
            return;
        }

        setLoading(true);
        try {
            const result = await api.post('/builds/verify', { componentIds: ids });
            setVerifyResult(result);
        } catch (err) {
            setMessage({ text: 'Erro ao verificar compatibilidade: ' + err.message, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const saveBuild = async () => {
        if (!buildName.trim()) {
            setMessage({ text: 'Dê um nome para identificar sua build.', type: 'warning' });
            return;
        }
        const ids = Object.values(selected).filter(Boolean);
        if (ids.length === 0) {
            setMessage({ text: 'Selecione componentes antes de salvar.', type: 'warning' });
            return;
        }

        setLoading(true);
        try {
            const data = await api.post('/builds', { name: buildName.trim(), componentIds: ids });
            setMessage({ text: `Build salva com sucesso! (ID: ${data.buildId})`, type: 'success' });
            setBuildName('');
        } catch (err) {
            setMessage({ text: 'Erro ao salvar build: ' + err.message, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = Object.values(selected)
        .filter(Boolean)
        .reduce((acc, id) => {
            const comp = components.find((c) => c.id === id);
            return acc + (comp?.price || 0);
        }, 0);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <div>
                    <h1 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
                        <span>🖥️</span> Montador de PC
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Escolha suas peças, valide soquete/TDP/memória e salve sua configuração.
                    </p>
                </div>
                <button
                    onClick={() => navigate('/compare')}
                    className="bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 px-4 py-2 rounded-xl text-sm font-semibold transition"
                >
                    ⚖️ Comparar Builds Salvas
                </button>
            </div>

            {message.text && (
                <div
                    className={`p-4 rounded-xl text-sm border flex items-center gap-2 ${
                        message.type === 'success'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : message.type === 'warning'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                            : 'bg-red-500/10 border-red-500/30 text-red-300'
                    }`}
                >
                    <span>{message.type === 'success' ? '✅' : message.type === 'warning' ? '⚠️' : '❌'}</span>
                    <span>{message.text}</span>
                </div>
            )}

            {loadingKB ? (
                <div className="text-center py-12 text-slate-400 animate-pulse">
                    Carregando base de componentes...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(grouped).map(([type, comps]) => (
                        <div key={type} className="bg-slate-800 p-4 rounded-xl border border-slate-700/80 hover:border-slate-600 transition">
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-300">
                                {typeLabels[type] || type}
                            </label>
                            <select
                                value={selected[type] || ''}
                                onChange={(e) => handleSelect(type, e.target.value)}
                                className="w-full p-2.5 bg-slate-700/80 rounded-lg border border-slate-600 focus:border-sky-500 focus:outline-none text-white text-sm"
                            >
                                <option value="">-- Selecione um modelo --</option>
                                {comps.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name} • R$ {c.price ? Number(c.price).toFixed(2) : '0.00'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            )}

            {/* Painel de Resumo & Salvar */}
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="text-xs text-slate-400 uppercase font-semibold">Investimento Estimado:</span>
                        <div className="text-3xl font-extrabold text-emerald-400">
                            R$ {totalPrice.toFixed(2)}
                        </div>
                    </div>
                    <div className="w-full sm:w-auto flex-1 max-w-sm">
                        <input
                            type="text"
                            placeholder="Nome da build (ex: Setup Gamer 2026)"
                            value={buildName}
                            onChange={(e) => setBuildName(e.target.value)}
                            className="w-full p-2.5 bg-slate-700 rounded-lg border border-slate-600 text-sm text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                    <button
                        onClick={verifyBuild}
                        disabled={loading}
                        className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 px-5 py-2.5 rounded-xl font-semibold text-white transition text-sm flex items-center gap-2"
                    >
                        <span>🔍</span>
                        <span>Verificar Compatibilidade</span>
                    </button>
                    <button
                        onClick={saveBuild}
                        disabled={loading}
                        className="bg-sky-600 hover:bg-sky-500 disabled:opacity-50 px-5 py-2.5 rounded-xl font-semibold text-white transition text-sm flex items-center gap-2"
                    >
                        <span>💾</span>
                        <span>Salvar Build</span>
                    </button>
                </div>
            </div>

            {/* Resultado da Verificação */}
            {verifyResult && (
                <div
                    className={`p-5 rounded-2xl border ${
                        verifyResult.valid
                            ? 'bg-emerald-500/10 border-emerald-500/30'
                            : 'bg-red-500/10 border-red-500/30'
                    }`}
                >
                    <h3 className={`font-bold text-base mb-2 flex items-center gap-2 ${
                        verifyResult.valid ? 'text-emerald-300' : 'text-red-300'
                    }`}>
                        <span>{verifyResult.valid ? '✅' : '⚠️'}</span>
                        <span>{verifyResult.valid ? 'Build 100% Compatível!' : 'Atenção aos Alertas de Compatibilidade:'}</span>
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-300">
                        {verifyResult.warnings.map((w, i) => (
                            <li key={i}>{w}</li>
                        ))}
                        {verifyResult.warnings.length === 0 && (
                            <li>Todos os soquetes, memórias e dimensionamento de fonte estão alinhados. Excelente configuração!</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
