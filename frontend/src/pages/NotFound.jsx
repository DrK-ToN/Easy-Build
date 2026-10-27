import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <span className="text-6xl mb-4">🔍</span>
            <h1 className="text-4xl font-extrabold text-white mb-2">404</h1>
            <h2 className="text-xl font-bold text-slate-300 mb-2">Página não encontrada</h2>
            <p className="text-slate-400 text-sm max-w-md mb-6">
                A página ou componente que você está procurando não existe ou foi movido.
            </p>
            <Link
                to="/dashboard"
                className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-2.5 rounded-xl transition text-sm shadow-md"
            >
                Voltar ao Início
            </Link>
        </div>
    );
}
