// frontend/src/AdminView.jsx
import { useEffect, useState } from 'react';

const API = 'http://localhost:3000/api';
const SENHA_KEY = 'eb_admin_senha';

// ─── Formulário vazio padrão ──────────────────────────────────────────────────
const FORM_VAZIO = {
    id_slug: '',
    code: '',
    name: '',
    icon: '',
    blurb: '',
    build: {
        intel: { specs: '', tip: '' },
        amd: { specs: '', tip: '' },
    },
    learn: { explain: '', analogy: '', fact: '' },
};

// ─── Helper: converte specs string ↔ array ───────────────────────────────────
function specsParaString(arr) {
    return Array.isArray(arr) ? arr.join('\n') : '';
}
function stringParaSpecs(str) {
    return str
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function AdminView() {
    const [senha, setSenha] = useState(sessionStorage.getItem(SENHA_KEY) || '');
    const [autenticado, setAutenticado] = useState(false);
    const [erroLogin, setErroLogin] = useState('');
    const [componentes, setComponentes] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [idEditando, setIdEditando] = useState(null);
    const [form, setForm] = useState(FORM_VAZIO);
    const [salvando, setSalvando] = useState(false);
    const [erroForm, setErroForm] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [confirmarDelete, setConfirmarDelete] = useState(null);

    // ── Carrega lista após autenticação ──────────────────────────────────────
    useEffect(() => {
        if (autenticado) carregarComponentes();
    }, [autenticado]);

    // ── Verificar se já tem senha salva na sessão ────────────────────────────
    useEffect(() => {
        if (senha) verificarSenha(senha, false);
    }, []);

    async function verificarSenha(s, mostrarErro = true) {
        try {
            const res = await fetch(`${API}/admin/componente`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': s,
                },
                body: JSON.stringify({ _check: true }),
            });
            // Se 400 (bad request de validação) ainda passou no auth; 401 = errado
            if (res.status !== 401) {
                sessionStorage.setItem(SENHA_KEY, s);
                setAutenticado(true);
                setErroLogin('');
            } else {
                sessionStorage.removeItem(SENHA_KEY);
                if (mostrarErro) setErroLogin('Senha incorreta. Tente novamente.');
            }
        } catch {
            if (mostrarErro) setErroLogin('Não foi possível conectar ao servidor.');
        }
    }

    async function carregarComponentes() {
        setCarregando(true);
        try {
            const res = await fetch(`${API}/dados`);
            const data = await res.json();
            setComponentes(data.components || []);
        } catch {
            setErroForm('Erro ao carregar componentes.');
        } finally {
            setCarregando(false);
        }
    }

    function abrirCriar() {
        setForm(FORM_VAZIO);
        setModoEdicao(false);
        setIdEditando(null);
        setErroForm('');
        setModalAberto(true);
    }

    function abrirEditar(comp) {
        setForm({
            id_slug: comp.id_slug || '',
            code: comp.code || '',
            name: comp.name || '',
            icon: comp.icon || '',
            blurb: comp.blurb || '',
            build: {
                intel: {
                    specs: specsParaString(comp.build?.intel?.specs),
                    tip: comp.build?.intel?.tip || '',
                },
                amd: {
                    specs: specsParaString(comp.build?.amd?.specs),
                    tip: comp.build?.amd?.tip || '',
                },
            },
            learn: {
                explain: comp.learn?.explain || '',
                analogy: comp.learn?.analogy || '',
                fact: comp.learn?.fact || '',
            },
        });
        setModoEdicao(true);
        setIdEditando(comp._id);
        setErroForm('');
        setModalAberto(true);
    }

    function fecharModal() {
        setModalAberto(false);
        setErroForm('');
    }

    function handleChange(e) {
        const { name, value } = e.target;
        const partes = name.split('.');
        if (partes.length === 1) {
            setForm((f) => ({ ...f, [name]: value }));
        } else if (partes.length === 2) {
            const [secao, campo] = partes;
            setForm((f) => ({ ...f, [secao]: { ...f[secao], [campo]: value } }));
        } else if (partes.length === 3) {
            const [secao, sub, campo] = partes;
            setForm((f) => ({
                ...f,
                [secao]: {
                    ...f[secao],
                    [sub]: { ...f[secao][sub], [campo]: value },
                },
            }));
        }
    }

    async function salvar(e) {
        e.preventDefault();
        setSalvando(true);
        setErroForm('');

        const payload = {
            id_slug: form.id_slug,
            code: form.code,
            name: form.name,
            icon: form.icon,
            blurb: form.blurb,
            build: {
                intel: {
                    specs: stringParaSpecs(form.build.intel.specs),
                    tip: form.build.intel.tip,
                },
                amd: {
                    specs: stringParaSpecs(form.build.amd.specs),
                    tip: form.build.amd.tip,
                },
            },
            learn: form.learn,
        };

        try {
            const url = modoEdicao
                ? `${API}/admin/componente/${idEditando}`
                : `${API}/admin/componente`;
            const method = modoEdicao ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': senha,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                setErroForm(data.erro || 'Erro ao salvar.');
            } else {
                fecharModal();
                await carregarComponentes();
                mostrarSucesso(
                    modoEdicao ? 'Componente atualizado!' : 'Componente criado!'
                );
            }
        } catch {
            setErroForm('Erro de conexão com o servidor.');
        } finally {
            setSalvando(false);
        }
    }

    async function deletar(id) {
        try {
            const res = await fetch(`${API}/admin/componente/${id}`, {
                method: 'DELETE',
                headers: { 'x-admin-password': senha },
            });
            if (res.ok) {
                setConfirmarDelete(null);
                await carregarComponentes();
                mostrarSucesso('Componente removido.');
            }
        } catch {
            mostrarSucesso('Erro ao deletar.');
        }
    }

    function mostrarSucesso(msg) {
        setSucesso(msg);
        setTimeout(() => setSucesso(''), 3500);
    }

    function sair() {
        sessionStorage.removeItem(SENHA_KEY);
        setSenha('');
        setAutenticado(false);
        setComponentes([]);
    }

    // ── TELA DE LOGIN ─────────────────────────────────────────────────────────
    if (!autenticado) {
        return (
            <section className="admin-login-wrap">
                <div className="admin-login-card">
                    <div className="admin-login-icon">🔐</div>
                    <h1>Área Restrita</h1>
                    <p className="admin-login-sub">
                        Painel de Administração — Easy Build
                    </p>
                    <form
                        className="admin-login-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            verificarSenha(senha);
                        }}
                    >
                        <div className="admin-field-group">
                            <label htmlFor="admin-senha">Senha de acesso</label>
                            <input
                                id="admin-senha"
                                type="password"
                                placeholder="Digite a senha..."
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                autoFocus
                            />
                        </div>
                        {erroLogin && (
                            <div className="admin-form-error">{erroLogin}</div>
                        )}
                        <button type="submit" className="admin-btn-primary" id="btn-login-admin">
                            Entrar
                        </button>
                    </form>
                </div>
            </section>
        );
    }

    // ── DASHBOARD ─────────────────────────────────────────────────────────────
    return (
        <section className="admin-wrap">
            {/* Header do painel */}
            <div className="admin-header">
                <div className="admin-header-left">
                    <div className="admin-badge">ADMIN</div>
                    <h2>Gerenciamento de Componentes</h2>
                </div>
                <div className="admin-header-right">
                    <button className="admin-btn-primary" onClick={abrirCriar} id="btn-novo-componente">
                        + Novo Componente
                    </button>
                    <button className="admin-btn-ghost" onClick={sair} id="btn-sair-admin">
                        Sair
                    </button>
                </div>
            </div>

            {/* Toast de sucesso */}
            {sucesso && <div className="admin-toast">{sucesso}</div>}

            {/* Tabela */}
            <div className="admin-table-wrap">
                {carregando ? (
                    <div className="admin-loading">Carregando componentes...</div>
                ) : componentes.length === 0 ? (
                    <div className="admin-empty">
                        Nenhum componente cadastrado. Crie o primeiro!
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Nome</th>
                                <th>Slug</th>
                                <th>Blurb</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {componentes.map((c) => (
                                <tr key={c._id}>
                                    <td>
                                        <span className="admin-code-badge">{c.code}</span>
                                    </td>
                                    <td className="admin-td-name">{c.name}</td>
                                    <td>
                                        <span className="admin-slug">{c.id_slug}</span>
                                    </td>
                                    <td className="admin-td-blurb">{c.blurb}</td>
                                    <td>
                                        <div className="admin-actions">
                                            <button
                                                className="admin-btn-edit"
                                                onClick={() => abrirEditar(c)}
                                                title="Editar"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="admin-btn-delete"
                                                onClick={() => setConfirmarDelete(c)}
                                                title="Deletar"
                                            >
                                                Deletar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal de Criar / Editar */}
            {modalAberto && (
                <div className="admin-modal-overlay" onClick={fecharModal}>
                    <div
                        className="admin-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="admin-modal-header">
                            <h3>{modoEdicao ? 'Editar Componente' : 'Novo Componente'}</h3>
                            <button className="admin-modal-close" onClick={fecharModal}>
                                ×
                            </button>
                        </div>

                        <form className="admin-modal-form" onSubmit={salvar}>
                            <div className="admin-form-section">
                                <span className="admin-form-section-label">Informações Gerais</span>
                                <div className="admin-form-row">
                                    <div className="admin-field-group">
                                        <label>Slug (id único)</label>
                                        <input name="id_slug" value={form.id_slug} onChange={handleChange} placeholder="ex: placa-mae" required />
                                    </div>
                                    <div className="admin-field-group">
                                        <label>Code</label>
                                        <input name="code" value={form.code} onChange={handleChange} placeholder="ex: MB" required />
                                    </div>
                                    <div className="admin-field-group">
                                        <label>Ícone (emoji)</label>
                                        <input name="icon" value={form.icon} onChange={handleChange} placeholder="ex: 🖥️" required />
                                    </div>
                                </div>
                                <div className="admin-field-group">
                                    <label>Nome</label>
                                    <input name="name" value={form.name} onChange={handleChange} placeholder="ex: Placa-mãe" required />
                                </div>
                                <div className="admin-field-group">
                                    <label>Blurb (descrição curta)</label>
                                    <textarea name="blurb" value={form.blurb} onChange={handleChange} placeholder="Descrição resumida do componente..." rows={2} required />
                                </div>
                            </div>

                            <div className="admin-form-section">
                                <span className="admin-form-section-label admin-intel-label">Build — Intel</span>
                                <div className="admin-field-group">
                                    <label>Specs (uma por linha)</label>
                                    <textarea
                                        name="build.intel.specs"
                                        value={form.build.intel.specs}
                                        onChange={handleChange}
                                        placeholder={"LGA 1700\nSuporta DDR5\n..."}
                                        rows={4}
                                    />
                                </div>
                                <div className="admin-field-group">
                                    <label>Dica Intel</label>
                                    <textarea name="build.intel.tip" value={form.build.intel.tip} onChange={handleChange} placeholder="Dica de compra para Intel..." rows={2} />
                                </div>
                            </div>

                            <div className="admin-form-section">
                                <span className="admin-form-section-label admin-amd-label">Build — AMD</span>
                                <div className="admin-field-group">
                                    <label>Specs (uma por linha)</label>
                                    <textarea
                                        name="build.amd.specs"
                                        value={form.build.amd.specs}
                                        onChange={handleChange}
                                        placeholder={"AM5\nSuporta DDR5\n..."}
                                        rows={4}
                                    />
                                </div>
                                <div className="admin-field-group">
                                    <label>Dica AMD</label>
                                    <textarea name="build.amd.tip" value={form.build.amd.tip} onChange={handleChange} placeholder="Dica de compra para AMD..." rows={2} />
                                </div>
                            </div>

                            <div className="admin-form-section">
                                <span className="admin-form-section-label admin-learn-label">Aprendizado</span>
                                <div className="admin-field-group">
                                    <label>Explicação</label>
                                    <textarea name="learn.explain" value={form.learn.explain} onChange={handleChange} placeholder="Explique o componente de forma simples..." rows={3} required />
                                </div>
                                <div className="admin-field-group">
                                    <label>Analogia</label>
                                    <textarea name="learn.analogy" value={form.learn.analogy} onChange={handleChange} placeholder="Pense assim: ..." rows={2} required />
                                </div>
                                <div className="admin-field-group">
                                    <label>Curiosidade</label>
                                    <textarea name="learn.fact" value={form.learn.fact} onChange={handleChange} placeholder="Você sabia que ..." rows={2} required />
                                </div>
                            </div>

                            {erroForm && <div className="admin-form-error">{erroForm}</div>}

                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn-ghost" onClick={fecharModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className="admin-btn-primary" disabled={salvando}>
                                    {salvando ? 'Salvando...' : modoEdicao ? 'Salvar alterações' : 'Criar componente'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de confirmação de delete */}
            {confirmarDelete && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal admin-modal-confirm">
                        <div className="admin-confirm-icon">⚠️</div>
                        <h3>Confirmar exclusão</h3>
                        <p>
                            Tem certeza que deseja deletar{' '}
                            <strong>{confirmarDelete.name}</strong>? Esta ação não
                            pode ser desfeita.
                        </p>
                        <div className="admin-modal-footer">
                            <button
                                className="admin-btn-ghost"
                                onClick={() => setConfirmarDelete(null)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="admin-btn-danger"
                                onClick={() => deletar(confirmarDelete._id)}
                            >
                                Sim, deletar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
