import { Link } from 'react-router-dom';

export default function Dashboard() {
    const cards = [
        {
            title: 'Builder de PC',
            desc: 'Monte seu computador peça por peça com cálculo automático de preço e checagem de compatibilidade.',
            icon: '🖥️',
            path: '/build',
            badge: 'Interativo',
            badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
            borderHover: 'hover:border-sky-500',
        },
        {
            title: 'Comparador de Builds',
            desc: 'Compare especificações de componentes e configurações lado a lado para tomar a melhor decisão.',
            icon: '⚖️',
            path: '/compare',
            badge: 'Análise',
            badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            borderHover: 'hover:border-purple-500',
        },
        {
            title: 'Minicurso de Hardware',
            desc: 'Aprenda sobre soquetes, chipsets, arquiteturas (AM4, AM5, LGA1700, LGA1851) e categorias.',
            icon: '📚',
            path: '/minicurso',
            badge: 'Educativo',
            badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            borderHover: 'hover:border-emerald-500',
        },
        {
            title: 'Assistente IA de Hardware',
            desc: 'Tire dúvidas sobre gargalos, upgrades, memórias e recomendações personalizadas com nossa IA.',
            icon: '🤖',
            path: '/chat',
            badge: 'IA Integrada',
            badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
            borderHover: 'hover:border-indigo-500',
        },
        {
            title: 'Meu Perfil & Orçamento',
            desc: 'Configure seu orçamento em R$ e objetivo (Jogos, Estudo, Trabalho) para recomendações sob medida.',
            icon: '👤',
            path: '/profile',
            badge: 'Personalização',
            badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            borderHover: 'hover:border-blue-500',
        },
        {
            title: 'Guia Interativo de Montagem',
            desc: 'Explore o hardware em perspectiva lúdica dividida por plataforma Intel e AMD.',
            icon: '🧩',
            path: '/platform',
            badge: 'Prático',
            badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            borderHover: 'hover:border-amber-500',
        },
    ];

    return (
        <div className="max-w-5xl mx-auto py-4 space-y-8">
            <div className="bg-gradient-to-r from-slate-800 to-slate-850 p-6 sm:p-8 rounded-2xl border border-slate-700/80 shadow-lg relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 border border-sky-500/30 rounded-full mb-3">
                        Plataforma Completa
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                        Bem-vindo ao Easy Build
                    </h1>
                    <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
                        Seu ecossistema especializado para montar, validar compatibilidade, comparar configurações e aprender sobre hardware de computadores sem complicações.
                    </p>
                </div>
                <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cards.map((c) => (
                    <Link
                        key={c.path}
                        to={c.path}
                        className={`group block p-6 bg-slate-800/90 rounded-xl border border-slate-700/70 ${c.borderHover} transition-all duration-200 hover:-translate-y-1 shadow-md hover:shadow-xl flex flex-col justify-between`}
                    >
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-3xl">{c.icon}</span>
                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${c.badgeColor}`}>
                                    {c.badge}
                                </span>
                            </div>
                            <h2 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                                {c.title}
                            </h2>
                            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                                {c.desc}
                            </p>
                        </div>
                        <div className="mt-5 pt-3 border-t border-slate-700/50 flex items-center text-xs font-semibold text-sky-400 group-hover:text-sky-300">
                            <span>Acessar</span>
                            <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
