import { useState, useRef, useEffect } from 'react';
import { api } from '../services/api';

export default function Chat() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Olá! Sou o Assistente Especialista do Easy Build. Como posso te ajudar na sua montagem, escolha de peças ou compatibilidade hoje?',
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const suggestions = [
        'Diferença entre AM4 e AM5?',
        'Como dimensionar a fonte (PSU)?',
        'DDR4 vs DDR5: vale a pena mudar?',
        'O que causa gargalo na GPU?',
    ];

    const sendMessage = async (textToSend) => {
        const userMessage = (textToSend || input).trim();
        if (!userMessage || isLoading) return;

        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const data = await api.post('/chat', { message: userMessage });
            setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: `Erro ao processar: ${err.message}` },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };

    return (
        <div className="max-w-4xl mx-auto h-[80vh] flex flex-col bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
            {/* Header do Chat */}
            <div className="p-4 bg-slate-850 border-b border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-xl">
                        🤖
                    </div>
                    <div>
                        <h2 className="font-bold text-base text-white">Assistente Easy Build</h2>
                        <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online • Especialista em Hardware
                        </p>
                    </div>
                </div>
            </div>

            {/* Sugestões Rápidas */}
            <div className="px-4 py-2 bg-slate-800/80 border-b border-slate-700/50 flex gap-2 overflow-x-auto scrollbar-none">
                {suggestions.map((s, idx) => (
                    <button
                        key={idx}
                        onClick={() => sendMessage(s)}
                        disabled={isLoading}
                        className="whitespace-nowrap px-3 py-1 rounded-full text-xs bg-slate-700/80 hover:bg-slate-700 text-sky-300 hover:text-white border border-slate-600 transition"
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Área de Mensagens */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                                msg.role === 'user'
                                    ? 'bg-sky-600 text-white rounded-br-none shadow-md'
                                    : 'bg-slate-700/90 text-slate-100 rounded-bl-none border border-slate-600/80 shadow'
                            }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-700/80 text-slate-400 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-600 text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                            <span>Consultando conhecimento de hardware...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input e Envio */}
            <div className="p-4 bg-slate-850 border-t border-slate-700">
                <form onSubmit={handleFormSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Pergunte sobre peças, compatibilidade, gargalos ou orçamentos..."
                        className="flex-1 bg-slate-700 border border-slate-600 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 transition placeholder-slate-400"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold text-sm transition shadow-md"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}
