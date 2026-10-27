import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';

// 1. HOMEVIEW COM LEGO BOARD
export function HomeView() {
    const navigate = useNavigate();
    return (
        <section className="view active">
            <div className="hero">
                <div>
                    <div className="hero-eyebrow">
                        GUIA DIDÁTICO DE HARDWARE
                    </div>
                    <h1>
                        Entenda o que tem dentro de um computador - sem complicação.
                    </h1>
                    <p className="lead">
                        Um jeito simples e visual de aprender sobre placa-mãe, processador, memória e todos os componentes.
                    </p>
                </div>

                {/* CSS Animated Illustration */}
                <div className="hero-illustration">
                    <div className="lego-board">
                        <div className="board-traces t1"></div>
                        <div className="board-traces t2"></div>
                        <div className="board-traces t3"></div>

                        <div className="board-vrm vrm1"></div>
                        <div className="board-vrm vrm2"></div>
                        <div className="board-chipset"></div>
                        <div className="board-pcie pcie-extra1"></div>
                        <div className="board-pcie pcie-extra2"></div>

                        {/* CPU */}
                        <div className="lego-slot slot-cpu"></div>
                        <div className="lego-piece piece-cpu">
                            <div className="cpu-ihs"></div>
                            <span className="label">CPU</span>
                        </div>

                        {/* RAM */}
                        <div className="lego-slot slot-ram"></div>
                        <div className="lego-piece piece-ram">
                            <div className="ram-chip"></div>
                            <div className="ram-chip"></div>
                            <div className="ram-chip"></div>
                            <div className="ram-chip"></div>
                        </div>

                        <div className="lego-slot slot-ram2"></div>
                        <div className="lego-piece piece-ram2">
                            <div className="ram-chip"></div>
                            <div className="ram-chip"></div>
                            <div className="ram-chip"></div>
                            <div className="ram-chip"></div>
                        </div>

                        {/* M.2 SSD */}
                        <div className="lego-slot slot-m2"></div>
                        <div className="lego-piece piece-m2">
                            <div className="m2-sticker"></div>
                            <div className="m2-chip"></div>
                        </div>

                        {/* GPU */}
                        <div className="lego-slot slot-gpu"></div>
                        <div className="lego-piece piece-gpu">
                            <div className="gpu-fans">
                                <div className="fan">+</div>
                                <div className="fan">+</div>
                            </div>
                            <span className="label">GPU</span>
                        </div>

                        {/* FONTE (PSU) */}
                        <div className="lego-slot slot-psu"></div>
                        <div className="lego-piece piece-psu">
                            <div className="psu-side">
                                <div className="psu-fan">+</div>
                                <div className="psu-io">
                                    <div className="psu-switch"></div>
                                    <div className="psu-plug"></div>
                                </div>
                            </div>
                            <span className="label">PSU</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="paths">
                <button
                    className="path-card build"
                    onClick={() => navigate('/platform')}
                >
                    <h3>Guia de Montagem por Plataforma</h3>
                    <p>
                        Escolha entre Intel ou AMD e veja o que observar na hora de montar.
                    </p>
                    <span className="path-cta">Explorar Plataformas &rarr;</span>
                </button>
                <button
                    className="path-card learn"
                    onClick={() => navigate('/learn-grid')}
                >
                    <h3>Glossário de Componentes</h3>
                    <p>
                        Entenda o que cada peça faz com analogias e curiosidades.
                    </p>
                    <span className="path-cta">Explorar Peças &rarr;</span>
                </button>
            </div>
        </section>
    );
}

// 2. ESCOLHER PLATAFORMA (Intel ou AMD)
export function PlatformView() {
    const navigate = useNavigate();
    return (
        <section className="view active">
            <div className="section-head">
                <Link to="/dashboard" className="back-link">
                    &larr; Voltar ao Dashboard
                </Link>
                <div className="tag blue">GUIA VISUAL</div>
                <h2>Qual plataforma você vai usar?</h2>
            </div>
            <div className="platform-grid">
                <button
                    className="platform-card intel"
                    onClick={() => navigate('/build-grid/intel')}
                >
                    <div className="platform-mark">IN</div>
                    <h3>Intel</h3>
                    <p className="desc">
                        Linha Core (i3, i5, i7, i9) e Core Ultra. Ecossistema consolidado.
                    </p>
                </button>
                <button
                    className="platform-card amd"
                    onClick={() => navigate('/build-grid/amd')}
                >
                    <div className="platform-mark">AM</div>
                    <h3>AMD</h3>
                    <p className="desc">
                        Linha Ryzen (3, 5, 7, 9) nas plataformas AM4 e AM5. Excelente longevidade.
                    </p>
                </button>
            </div>
        </section>
    );
}

// 3. GRADE DE COMPONENTES
export function BuildGridView() {
    const { platform } = useParams();
    const navigate = useNavigate();
    const [componentes, setComponentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const isIntel = platform === 'intel';

    useEffect(() => {
        api.get('/dados')
            .then((res) => {
                setComponentes(res.components || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center py-12 text-slate-400">Carregando componentes...</div>;

    return (
        <section className="view active">
            <div className="section-head">
                <Link to="/platform" className="back-link">
                    &larr; Escolher outra plataforma
                </Link>
                <div className={`tag ${isIntel ? 'blue' : 'red'}`}>
                    PLATAFORMA {platform?.toUpperCase()}
                </div>
                <h2>Componentes para montagem</h2>
            </div>
            <div className={`component-grid ctx-${platform}`}>
                {componentes.map((c) => (
                    <button
                        key={c._id || c.id_slug}
                        className="component-card"
                        onClick={() => navigate(`/build-detail/${platform}/${c.id_slug || c.id}`)}
                    >
                        <div className="comp-top">
                            <span className="comp-code">{c.code}</span>
                        </div>
                        <h4>{c.name}</h4>
                        <p className="blurb">{c.blurb}</p>
                    </button>
                ))}
            </div>
        </section>
    );
}

// 4. DETALHE DO COMPONENTE NA PLATAFORMA
export function BuildDetailView() {
    const { platform, id } = useParams();
    const navigate = useNavigate();
    const [comp, setComp] = useState(null);
    const [loading, setLoading] = useState(true);
    const isIntel = platform === 'intel';

    useEffect(() => {
        api.get('/dados')
            .then((res) => {
                const found = (res.components || []).find((x) => x.id_slug === id || x.id === id);
                setComp(found);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="text-center py-12 text-slate-400">Carregando...</div>;
    if (!comp) return <p className="text-center py-12 text-slate-400">Componente não encontrado.</p>;

    const data = comp.build?.[platform] || { specs: [], tip: '' };

    return (
        <section className="view active">
            <div className="detail-wrap">
                <button
                    onClick={() => navigate(`/build-grid/${platform}`)}
                    className="back-link"
                >
                    &larr; Voltar para a lista de componentes
                </button>
                <div className="detail-head">
                    <div>
                        <h2>{comp.name}</h2>
                        <div className="code-line">
                            {comp.code} • plataforma {platform}
                        </div>
                        <p className="blurb">{comp.blurb}</p>
                    </div>
                </div>
                <div className="detail-body">
                    <div className={`info-block ${isIntel ? 'blue' : 'red'}`}>
                        <h3>O que observar nesta plataforma</h3>
                        <ul>
                            {(data.specs || []).map((spec, idx) => (
                                <li
                                    key={idx}
                                    dangerouslySetInnerHTML={{ __html: spec }}
                                />
                            ))}
                        </ul>
                    </div>
                    {data.tip && (
                        <div className="tip-box">
                            <span className="mark">DICA</span>
                            <span>{data.tip}</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

// 5. GRADE DE APRENDIZADO
export function LearnGridView() {
    const navigate = useNavigate();
    const [componentes, setComponentes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/dados')
            .then((res) => {
                setComponentes(res.components || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center py-12 text-slate-400">Carregando...</div>;

    return (
        <section className="view active">
            <div className="section-head">
                <Link to="/dashboard" className="back-link">
                    &larr; Início
                </Link>
                <div className="tag teal">APRENDER</div>
                <h2>Escolha um componente para entender</h2>
            </div>
            <div className="component-grid ctx-learn">
                {componentes.map((c) => (
                    <button
                        key={c._id || c.id_slug}
                        className="component-card"
                        onClick={() => navigate(`/learn-detail/${c.id_slug || c.id}`)}
                    >
                        <div className="comp-top">
                            <span className="comp-code">{c.code}</span>
                        </div>
                        <h4>{c.name}</h4>
                        <p className="blurb">{c.blurb}</p>
                    </button>
                ))}
            </div>
        </section>
    );
}

// 6. DETALHE DE APRENDIZADO
export function LearnDetailView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [comp, setComp] = useState(null);
    const [learnInfo, setLearnInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/dados')
            .then((res) => {
                const found = (res.components || []).find((x) => x.id_slug === id || x.id === id);
                setComp(found);
                setLearnInfo(res.learn?.[id] || found?.learn);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="text-center py-12 text-slate-400">Carregando...</div>;
    if (!comp || !learnInfo) return <p className="text-center py-12 text-slate-400">Informação não encontrada.</p>;

    return (
        <section className="view active">
            <div className="detail-wrap">
                <button
                    onClick={() => navigate('/learn-grid')}
                    className="back-link"
                >
                    &larr; Todos os componentes
                </button>
                <div className="detail-head">
                    <div>
                        <h2>{comp.name}</h2>
                        <div className="code-line">
                            {comp.code} • verbete didático
                        </div>
                        <p className="blurb">{comp.blurb}</p>
                    </div>
                </div>
                <div className="detail-body">
                    <div className="info-block teal">
                        <h3>Explicando de um jeito simples</h3>
                        <p>{learnInfo.explain}</p>
                    </div>
                    {learnInfo.analogy && (
                        <div className="analogy-box">
                            <b>PENSE ASSIM</b>
                            <span>{learnInfo.analogy}</span>
                        </div>
                    )}
                    {learnInfo.fact && (
                        <div className="fact-box">
                            <b>CURIOSIDADE</b>
                            <span>{learnInfo.fact}</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
