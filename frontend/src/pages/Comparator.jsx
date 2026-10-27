import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function Comparator() {
    const [id1, setId1] = useState('');
    const [id2, setId2] = useState('');
    const [kb, setKb] = useState([]);
    const [userBuilds, setUserBuilds] = useState([]);
    const [comparison, setComparison] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Busca KB e Builds do usuário
        Promise.all([
            api.get('/builds/kb').catch(() => []),
            api.get('/builds/recent').catch(() => []),
        ]).then(([kbData, buildsData]) => {
            setKb(Array.isArray(kbData) ? kbData : []);
            if (Array.isArray(buildsData)) {
                setUserBuilds(buildsData);
                if (buildsData.length > 0) setId1(buildsData[0].id);
                if (buildsData.length > 1) setId2(buildsData[1].id);
                else if (buildsData.length > 0) setId2(buildsData[0].id);
            }
        });
    }, []);

    const resolveName = (id) => kb.find((c) => c.id === id)?.name || id;

    const handleCompare = async () => {
        if (!id1 || !id2) {
            setError('Selecione duas builds para comparar.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const data = await api.get(`/builds/compare?id1=${id1}&id2=${id2}`);
            setComparison(data);
        } catch (err) {
            setError(err.message || 'Erro ao comparar builds');
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { key: 'cpu', label: 'Processador' },
        { key: 'motherboard', label: 'Placa-Mãe' },
        { key: 'ram', label: 'Memória RAM' },
        { key: 'gpu', label: 'Placa de Vídeo' },
        { key: 'psu', label: 'Fonte (PSU)' },
        { key: 'storage', label: 'Armazenamento' },
        { key: 'case', label: 'Gabinete' },
        { key: 'cooler', label: 'Cooler' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h1 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
                    <span>⚖️</span> Comparador de Builds
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                    Avalie diferenças de especificações e peças entre configurações salvas.
                </p>
            </div>

            {userBuilds.length === 0 ? (
                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center space-y-3">
                    <p className="text-slate-300">Você ainda não possui builds salvas para comparar.</p>
                    <Link
                        to="/build"
                        className="inline-block bg-sky-600 hover:bg-sky-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition"
                    >
                        Criar minha primeira build
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row gap-3 bg-slate-800 p-4 rounded-2xl border border-slate-700">
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Build 1</label>
                        <select
                            value={id1}
                            onChange={(e) => setId1(e.target.value)}
                            className="w-full p-2.5 bg-slate-700 rounded-lg border border-slate-600 text-white text-sm focus:border-purple-500 focus:outline-none"
                        >
                            <option value="" disabled>Selecione a Build 1</option>
                            {userBuilds.map((b) => (
                                <option key={`b1-${b.id}`} value={b.id}>
                                    {b.name || `Build #${b.id}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Build 2</label>
                        <select
                            value={id2}
                            onChange={(e) => setId2(e.target.value)}
                            className="w-full p-2.5 bg-slate-700 rounded-lg border border-slate-600 text-white text-sm focus:border-purple-500 focus:outline-none"
                        >
                            <option value="" disabled>Selecione a Build 2</option>
                            {userBuilds.map((b) => (
                                <option key={`b2-${b.id}`} value={b.id}>
                                    {b.name || `Build #${b.id}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={handleCompare}
                            disabled={loading || !id1 || !id2}
                            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 px-6 py-2.5 rounded-xl font-semibold disabled:opacity-50 text-white text-sm transition"
                        >
                            {loading ? 'Comparando...' : 'Comparar'}
                        </button>
                    </div>
                </div>
            )}

            {error && (
                <div className="text-red-300 bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-sm">
                    {error}
                </div>
            )}

            {comparison && (
                <div className="overflow-x-auto bg-slate-800 rounded-2xl border border-slate-700 p-4 shadow-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-700 text-sm">
                                <th className="p-3 text-slate-400 font-semibold">Categoria</th>
                                <th className="p-3 text-sky-400 font-semibold">Build 1</th>
                                <th className="p-3 text-purple-400 font-semibold">Build 2</th>
                                <th className="p-3 text-slate-400 font-semibold">Relação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50 text-sm">
                            {categories.map(({ key, label }) => {
                                const c1 = resolveName(comparison.build1?.find((c) => c.type === key)?.component_id || '');
                                const c2 = resolveName(comparison.build2?.find((c) => c.type === key)?.component_id || '');

                                if (!c1 && !c2) return null;

                                return (
                                    <tr key={key} className="hover:bg-slate-750/50 transition">
                                        <td className="p-3 font-semibold text-slate-200">{label}</td>
                                        <td className="p-3 text-sky-300">{c1 || '-'}</td>
                                        <td className="p-3 text-purple-300">{c2 || '-'}</td>
                                        <td className="p-3">
                                            {c1 === c2 ? (
                                                <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                                    Equivalente
                                                </span>
                                            ) : c1 && c2 ? (
                                                <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                                    Diferente
                                                </span>
                                            ) : (
                                                <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-slate-700 text-slate-400">
                                                    Ausente
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
