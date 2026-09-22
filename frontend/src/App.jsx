import { useEffect, useState } from 'react';
import {
    BrowserRouter,
    Link,
    Route,
    Routes,
    useNavigate,
    useParams,
} from 'react-router-dom';
import './index.css';

export default function App() {
    const [dados, dadosSet] = useState(null);
    const [carregando, carregandoSet] = useState(true);

    // Busca os dados do Backend Express populado pelo seed
    useEffect(() => {
        fetch('http://localhost:3000/api/dados')
            .then((res) => res.json())
            .then((data) => {
                dadosSet(data);
                carregandoSet(false);
            })
            .catch((err) => {
                console.error('Erro ao carregar dados da API:', err);
                carregandoSet(false);
            });
    }, []);

    if (carregando)
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                Carregando Easy Build...
            </div>
        );
    if (!dados)
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                Erro ao conectar com o backend. O servidor está rodando?
            </div>
        );

    return (
        <BrowserRouter>
            <header className='topbar'>
                <div className='topbar-inner'>
                    <Link
                        to='/'
                        className='logo'
                        style={{ textDecoration: 'none' }}
                    >
                        <span className='logo-mark'>
                            <span></span>
                        </span>
                        Easy Build
                    </Link>
                </div>
            </header>

            <main className='shell'>
                <Routes>
                    <Route path='/' element={<HomeView />} />
                    <Route path='/platform' element={<PlatformView />} />
                    <Route
                        path='/build-grid/:platform'
                        element={
                            <BuildGridView componentes={dados.components} />
                        }
                    />
                    <Route
                        path='/build-detail/:platform/:id'
                        element={
                            <BuildDetailView componentes={dados.components} />
                        }
                    />
                    <Route
                        path='/learn-grid'
                        element={
                            <LearnGridView componentes={dados.components} />
                        }
                    />
                    <Route
                        path='/learn-detail/:id'
                        element={
                            <LearnDetailView
                                componentes={dados.components}
                                learnData={dados.learn}
                            />
                        }
                    />
                </Routes>
            </main>

            <footer>Easy Build — GUIA DE HARDWARE PARA INICIANTES</footer>
        </BrowserRouter>
    );
}

// 1. HOME
function HomeView() {
    const navigate = useNavigate();
    return (
        <section className='view active'>
            <div className='hero'>
                <div>
                    <div className='hero-eyebrow'>
                        GUIA INTERATIVO DE HARDWARE
                    </div>
                    <h1>
                        Entenda o que tem dentro de um computador — sem
                        enrolação.
                    </h1>
                    <p className='lead'>
                        Um jeito simples e direto de aprender sobre placa-mãe,
                        processador, memória e todo o resto.
                    </p>
                </div>
                
                {/* CSS Animated Illustration */}
                <div className='hero-illustration'>
                    <div className='lego-board'>
                        {/* Detalhes da Placa */}
                        <div className='board-traces t1'></div>
                        <div className='board-traces t2'></div>
                        <div className='board-traces t3'></div>
                        
                        {/* VRMs, Chipset, PCIe extras */}
                        <div className='board-vrm vrm1'></div>
                        <div className='board-vrm vrm2'></div>
                        <div className='board-chipset'></div>
                        <div className='board-pcie pcie-extra1'></div>
                        <div className='board-pcie pcie-extra2'></div>

                        {/* CPU */}
                        <div className='lego-slot slot-cpu'></div>
                        <div className='lego-piece piece-cpu'>
                            <div className='cpu-ihs'></div>
                            <span className='label'>CPU</span>
                        </div>

                        {/* RAM 1 & 2 */}
                        <div className='lego-slot slot-ram'></div>
                        <div className='lego-piece piece-ram'>
                            <div className='ram-chip'></div>
                            <div className='ram-chip'></div>
                            <div className='ram-chip'></div>
                            <div className='ram-chip'></div>
                        </div>

                        <div className='lego-slot slot-ram2'></div>
                        <div className='lego-piece piece-ram2'>
                            <div className='ram-chip'></div>
                            <div className='ram-chip'></div>
                            <div className='ram-chip'></div>
                            <div className='ram-chip'></div>
                        </div>

                        {/* M.2 SSD */}
                        <div className='lego-slot slot-m2'></div>
                        <div className='lego-piece piece-m2'>
                            <div className='m2-sticker'></div>
                            <div className='m2-chip'></div>
                        </div>

                        {/* GPU */}
                        <div className='lego-slot slot-gpu'></div>
                        <div className='lego-piece piece-gpu'>
                            <div className='gpu-fans'>
                                <div className='fan'>+</div>
                                <div className='fan'>+</div>
                            </div>
                            <span className='label'>GPU</span>
                        </div>

                        {/* FONTE (PSU) */}
                        <div className='lego-slot slot-psu'></div>
                        <div className='lego-piece piece-psu'>
                            <div className='psu-side'>
                                <div className='psu-fan'>+</div>
                                <div className='psu-io'>
                                    <div className='psu-switch'></div>
                                    <div className='psu-plug'></div>
                                </div>
                            </div>
                            <span className='label'>PSU</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='paths'>
                <button
                    className='path-card build'
                    onClick={() => navigate('/platform')}
                >
                    <h3>Montar meu PC</h3>
                    <p>
                        Escolha entre Intel ou AMD e veja o que observar na hora
                        de montar.
                    </p>
                    <span className='path-cta'>Começar a montagem →</span>
                </button>
                <button
                    className='path-card learn'
                    onClick={() => navigate('/learn-grid')}
                >
                    <h3>Aprender sobre componentes</h3>
                    <p>
                        Sem compromisso de montar nada — entenda o que cada peça
                        faz.
                    </p>
                    <span className='path-cta'>Explorar peças →</span>
                </button>
            </div>
        </section>
    );
}

// 2. ESCOLHER PLATAFORMA (Intel ou AMD)
function PlatformView() {
    const navigate = useNavigate();
    return (
        <section className='view active'>
            <div className='section-head'>
                <Link to='/' className='back-link'>
                    ← início
                </Link>
                <div className='tag blue'>MONTAR PC</div>
                <h2>Qual plataforma você vai usar?</h2>
            </div>
            <div className='platform-grid'>
                <button
                    className='platform-card intel'
                    onClick={() => navigate('/build-grid/intel')}
                >
                    <div className='platform-mark'>IN</div>
                    <h3>Intel</h3>
                    <p className='desc'>
                        Linha Core (i3, i5, i7, i9). Ecossistema consolidado.
                    </p>
                </button>
                <button
                    className='platform-card amd'
                    onClick={() => navigate('/build-grid/amd')}
                >
                    <div className='platform-mark'>AM</div>
                    <h3>AMD</h3>
                    <p className='desc'>
                        Linha Ryzen (3, 5, 7, 9). Boa relação custo-benefício.
                    </p>
                </button>
            </div>
        </section>
    );
}

// 3. GRADE DE COMPONENTES (MONTAGEM)
function BuildGridView({ componentes }) {
    const { platform } = useParams();
    const navigate = useNavigate();
    const isIntel = platform === 'intel';

    return (
        <section className='view active'>
            <div className='section-head'>
                <Link to='/platform' className='back-link'>
                    ← escolher plataforma
                </Link>
                <div className={`tag ${isIntel ? 'blue' : 'red'}`}>
                    PLATAFORMA {platform.toUpperCase()}
                </div>
                <h2>Componentes para montagem</h2>
            </div>
            <div className={`component-grid ctx-${platform}`}>
                {componentes.map((c) => (
                    <button
                        key={c.id}
                        className='component-card'
                        onClick={() =>
                            navigate(`/build-detail/${platform}/${c.id}`)
                        }
                    >
                        <div className='comp-top'>
                            <span className='comp-code'>{c.code}</span>
                        </div>
                        <h4>{c.name}</h4>
                        <p className='blurb'>{c.blurb}</p>
                    </button>
                ))}
            </div>
        </section>
    );
}

// 4. DETALHE DO COMPONENTE (MONTAGEM)
function BuildDetailView({ componentes }) {
    const { platform, id } = useParams();
    const navigate = useNavigate();
    const comp = componentes.find((x) => x.id === id);
    const isIntel = platform === 'intel';
    const data = comp?.build[platform];

    if (!comp) return <p>Componente não encontrado.</p>;

    return (
        <section className='view active'>
            <div className='detail-wrap'>
                <button
                    onClick={() => navigate(`/build-grid/${platform}`)}
                    className='back-link'
                >
                    ← todos os componentes
                </button>
                <div className='detail-head'>
                    <div>
                        <h2>{comp.name}</h2>
                        <div className='code-line'>
                            {comp.code} · plataforma {platform}
                        </div>
                        <p className='blurb'>{comp.blurb}</p>
                    </div>
                </div>
                <div className='detail-body'>
                    <div className={`info-block ${isIntel ? 'blue' : 'red'}`}>
                        <h3>O que observar nesta plataforma</h3>
                        <ul>
                            {data.specs.map((spec, idx) => (
                                <li
                                    key={idx}
                                    dangerouslySetInnerHTML={{ __html: spec }}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className='tip-box'>
                        <span className='mark'>DICA</span>
                        <span>{data.tip}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 5. GRADE DE APRENDIZADO
function LearnGridView({ componentes }) {
    const navigate = useNavigate();
    return (
        <section className='view active'>
            <div className='section-head'>
                <Link to='/' className='back-link'>
                    ← início
                </Link>
                <div className='tag teal'>APRENDER</div>
                <h2>Escolha um componente para entender</h2>
            </div>
            <div className='component-grid ctx-learn'>
                {componentes.map((c) => (
                    <button
                        key={c.id}
                        className='component-card'
                        onClick={() => navigate(`/learn-detail/${c.id}`)}
                    >
                        <div className='comp-top'>
                            <span className='comp-code'>{c.code}</span>
                        </div>
                        <h4>{c.name}</h4>
                        <p className='blurb'>{c.blurb}</p>
                    </button>
                ))}
            </div>
        </section>
    );
}

// 6. DETALHE DE APRENDIZADO
function LearnDetailView({ componentes, learnData }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const comp = componentes.find((x) => x.id === id);
    const info = learnData[id];

    if (!comp || !info) return <p>Informação não encontrada.</p>;

    return (
        <section className='view active'>
            <div className='detail-wrap'>
                <button
                    onClick={() => navigate('/learn-grid')}
                    className='back-link'
                >
                    ← todos os componentes
                </button>
                <div className='detail-head'>
                    <div>
                        <h2>{comp.name}</h2>
                        <div className='code-line'>
                            {comp.code} · verbete de aprendizado
                        </div>
                        <p className='blurb'>{comp.blurb}</p>
                    </div>
                </div>
                <div className='detail-body'>
                    <div className='info-block teal'>
                        <h3>Explicando de um jeito simples</h3>
                        <p>{info.explain}</p>
                    </div>
                    <div className='analogy-box'>
                        <b>PENSE ASSIM</b>
                        <span>{info.analogy}</span>
                    </div>
                    <div className='fact-box'>
                        <b>CURIOSIDADE</b>
                        <span>{info.fact}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
