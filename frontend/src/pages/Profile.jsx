import { useState, useEffect } from 'react';
import { api, getUserFromToken } from '../services/api';

export default function Profile({ onLogout }) {
    const [purpose, setPurpose] = useState('JOGO');
    const [budget, setBudget] = useState('4500');
    const [builds, setBuilds] = useState([]);
    const [kb, setKb] = useState([]);
    const [feedback, setFeedback] = useState({ text: '', type: '' });
    const [saving, setSaving] = useState(false);
    const user = getUserFromToken();

    useEffect(() => {
        // Carrega perfil, builds e KB
        api.get('/profile/me')
            .then((data) => {
                if (data) {
                    setPurpose(data.purpose || 'JOGO');
                    setBudget(data.budget ? data.budget.toString() : '4500');
                }
            })
            .catch(() => {});

        Promise.all([
            api.get('/builds/kb').catch(() => []),
            api.get('/builds/recent').catch(() => []),
        ]).then(([kbData, buildsData]) => {
            setKb(Array.isArray(kbData) ? kbData : []);
            setBuilds(Array.isArray(buildsData) ? buildsData : []);
        });
    }, []);

    const resolveComponent = (id) => {
        return kb.find((c) => c.id === id) || { id, name: id, type: 'Componente' };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setFeedback({ text: '', type: '' });

        try {
            await api.post('/profile', { purpose, budget: Number(budget) });
            setFeedback({ text: 'Perfil e preferências salvos com sucesso!', type: 'success' });
        } catch (err) {
            setFeedback({ text: 'Erro ao salvar perfil: ' + err.message, type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-700">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-2xl">
                        👤
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Meu Perfil & Preferências
                        </h1>
                        <p className="text-slate-400 text-sm">
                            {user?.username ? `Logado como: ${user.username}` : 'Configure seu objetivo e orçamento'}
                        </p>
                    </div>
                </div>

                {feedback.text && (
                    <div
                        className={`p-4 rounded-xl text-sm border mb-6 flex items-center gap-2 ${
                            feedback.type === 'success'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                : 'bg-red-500/10 border-red-500/30 text-red-300'
                        }`}
                    >
                        <span>{feedback.type === 'success' ? '✅' : '❌'}</span>
                        <span>{feedback.text}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                            Objetivo Principal do PC
                        </label>
                        <select
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            className="w-full p-3 bg-slate-700 rounded-xl border border-slate-600 focus:border-sky-500 focus:outline-none text-white text-sm"
                        >
                            <option value="JOGO">🎮 Jogos (Alto FPS e gráficos)</option>
                            <option value="TRABALHO">💼 Produtividade & Trabalho Pesado</option>
                            <option value="ESTUDO">📚 Estudo & Navegação Geral</option>
                            <option value="MULTIMIDIA">🎬 Criação de Conteúdo & Multimídia</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                            Orçamento Planejado (R$)
                        </label>
                        <input
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-full p-3 bg-slate-700 rounded-xl border border-slate-600 focus:border-sky-500 focus:outline-none text-white text-sm"
                            placeholder="Ex: 5000"
                            min="500"
                            step="100"
                        />
                    </div>

                    <div className="flex gap-3 pt-3">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl transition text-sm shadow-md"
                        >
                            {saving ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                        {onLogout && (
                            <button
                                type="button"
                                onClick={onLogout}
                                className="bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 font-semibold px-4 py-2.5 rounded-xl transition text-sm"
                            >
                                Sair da Conta
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Builds Salvas */}
            <div>
                <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                    <span>📦</span> Minhas Builds Salvas ({builds.length})
                </h2>

                {builds.length === 0 ? (
                    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center">
                        <p className="text-slate-400 text-sm">Você ainda não tem nenhuma build salva no Easy Build.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {builds.map((build) => (
                            <div
                                key={build.id}
                                className="bg-slate-800 p-5 rounded-2xl border border-slate-700 hover:border-sky-500/50 transition flex flex-col justify-between shadow-lg"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-3 pb-3 border-b border-slate-700">
                                        <div>
                                            <h3 className="text-lg font-bold text-sky-400">
                                                {build.name || `Build #${build.id}`}
                                            </h3>
                                            <span className="text-xs text-slate-400">
                                                ID: {build.id}
                                            </span>
                                        </div>
                                        <span className="text-xs text-slate-400 bg-slate-700/60 px-2 py-1 rounded">
                                            {build.created_at ? new Date(build.created_at).toLocaleDateString() : 'Recente'}
                                        </span>
                                    </div>

                                    <div className="space-y-1.5">
                                        {build.components && build.components.length > 0 ? (
                                            build.components.map((compId, idx) => {
                                                const comp = resolveComponent(compId);
                                                return (
                                                    <div
                                                        key={idx}
                                                        className="flex justify-between text-xs items-center bg-slate-700/40 p-2 rounded-lg"
                                                    >
                                                        <span className="text-slate-400 capitalize font-medium">{comp.type}</span>
                                                        <span className="text-slate-200 font-semibold truncate pl-2">{comp.name}</span>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p className="text-xs text-slate-500 italic">Nenhum componente associado.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
