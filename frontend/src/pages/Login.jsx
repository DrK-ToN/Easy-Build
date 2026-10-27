import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, setToken } from '../services/api';

export default function Login({ onLogin }) {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        setLoading(true);

        try {
            const endpoint = isRegister ? '/auth/register' : '/auth/login';
            const data = await api.post(endpoint, { username, password });

            if (isRegister) {
                setSuccessMsg('Conta criada com sucesso! Você já pode entrar com suas credenciais.');
                setIsRegister(false);
                setPassword('');
            } else {
                setToken(data.token);
                if (onLogin) onLogin(data.token);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Erro de conexão com o servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[75vh] px-4">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">
                <div className="text-center mb-6">
                    <span className="text-4xl inline-block mb-2">🖥️</span>
                    <h2 className="text-2xl font-bold text-sky-400">
                        {isRegister ? 'Criar Nova Conta' : 'Entrar no Easy Build'}
                    </h2>
                    <p className="text-slate-400 text-xs mt-1">
                        {isRegister
                            ? 'Cadastre-se para salvar e comparar suas builds'
                            : 'Acesse suas montagens e recomendações salvas'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                        <span>⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                {successMsg && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                        <span>✅</span>
                        <span>{successMsg}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                            Usuário
                        </label>
                        <input
                            type="text"
                            placeholder="Digite seu usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 bg-slate-700/80 rounded-lg border border-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none text-white text-sm transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                            Senha
                        </label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-slate-700/80 rounded-lg border border-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none text-white text-sm transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition shadow-md hover:shadow-sky-500/20"
                    >
                        {loading ? 'Processando...' : isRegister ? 'Cadastrar' : 'Entrar'}
                    </button>
                </form>

                <div className="mt-6 pt-4 border-t border-slate-700 text-center text-slate-400 text-sm">
                    {isRegister ? 'Já possui uma conta?' : 'Ainda não tem conta?'}{' '}
                    <button
                        type="button"
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setError('');
                            setSuccessMsg('');
                        }}
                        className="text-sky-400 hover:text-sky-300 font-semibold transition"
                    >
                        {isRegister ? 'Faça Login' : 'Cadastre-se grátis'}
                    </button>
                </div>
            </div>
        </div>
    );
}
