import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { getToken } from '../services/api';

export default function Layout({ onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const token = getToken();

    const handleLogoutClick = () => {
        onLogout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Montador', path: '/build' },
        { name: 'Comparar', path: '/compare' },
        { name: 'Minicurso', path: '/minicurso' },
        { name: 'Chat IA', path: '/chat' },
        { name: 'Guia Interativo', path: '/platform' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
            {/* Header de Navegação */}
            <header className="bg-slate-800/90 backdrop-blur border-b border-slate-700/80 shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/dashboard" className="text-xl font-bold text-sky-400 hover:text-sky-300 transition flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-base">
                                🖥️
                            </span>
                            <span>Easy Build</span>
                        </Link>

                        {/* Navegação Desktop */}
                        <nav className="hidden lg:flex gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                                        isActive(item.path)
                                            ? 'bg-sky-600 text-white shadow-sm'
                                            : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link
                            to="/admin"
                            className="hidden sm:inline-block px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-slate-700/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 transition"
                        >
                            Admin
                        </Link>

                        {token ? (
                            <>
                                <Link
                                    to="/profile"
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                                        isActive('/profile') ? 'text-sky-400 bg-slate-700/40' : 'text-slate-300 hover:text-white'
                                    }`}
                                >
                                    Perfil
                                </Link>
                                <button
                                    onClick={handleLogoutClick}
                                    className="bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition"
                                >
                                    Sair
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
                            >
                                Entrar
                            </Link>
                        )}

                        {/* Botão Hamburger Mobile */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition"
                            aria-label="Abrir menu"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Menu Dropdown Mobile */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-slate-700 bg-slate-800/95 px-4 pt-2 pb-4 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-lg text-base font-medium transition ${
                                    isActive(item.path)
                                        ? 'bg-sky-600 text-white'
                                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            to="/admin"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg text-base font-medium text-amber-400 hover:bg-slate-700"
                        >
                            Painel Administrativo
                        </Link>
                    </div>
                )}
            </header>

            {/* Conteúdo Principal */}
            <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
                <Outlet />
            </main>

            {/* Rodapé */}
            <footer className="bg-slate-800/80 border-t border-slate-700/80 py-4 px-6 text-center text-slate-400 text-xs">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                    <span>&copy; {new Date().getFullYear()} Easy Build - Guia e Especialista em Hardware</span>
                    <div className="flex gap-4">
                        <Link to="/platform" className="hover:text-slate-200 transition">Guia Didático</Link>
                        <Link to="/admin" className="hover:text-slate-200 transition">Admin</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
