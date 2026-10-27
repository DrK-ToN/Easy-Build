import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getToken, setToken } from './services/api';

// Páginas Principais
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Builder from './pages/Builder';
import Comparator from './pages/Comparator';
import Minicurso from './pages/Minicurso';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import AdminView from './pages/AdminView';
import NotFound from './pages/NotFound';

// Vistas Interativas do Guia
import {
    HomeView,
    PlatformView,
    BuildGridView,
    BuildDetailView,
    LearnGridView,
    LearnDetailView,
} from './pages/PlatformViews';

export default function App() {
    const [token, setTokenState] = useState(getToken());

    const handleLogin = (newToken) => {
        setToken(newToken);
        setTokenState(newToken);
    };

    const handleLogout = () => {
        setToken(null);
        setTokenState(null);
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* Rota pública de Login / Registro */}
                <Route
                    path="/login"
                    element={token ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
                />

                {/* Estrutura com Layout Comum (Navbar & Footer) */}
                <Route element={<Layout onLogout={handleLogout} />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Módulos do Montador e Comparador */}
                    <Route
                        path="/build"
                        element={token ? <Builder /> : <Navigate to="/login" replace />}
                    />
                    <Route
                        path="/compare"
                        element={token ? <Comparator /> : <Navigate to="/login" replace />}
                    />

                    {/* Educação e Minicurso */}
                    <Route path="/minicurso" element={<Minicurso />} />

                    {/* Chat com Especialista em Hardware */}
                    <Route
                        path="/chat"
                        element={token ? <Chat /> : <Navigate to="/login" replace />}
                    />

                    {/* Perfil & Preferências */}
                    <Route
                        path="/profile"
                        element={token ? <Profile onLogout={handleLogout} /> : <Navigate to="/login" replace />}
                    />

                    {/* Guia Didático e Ilustração Interativa */}
                    <Route path="/home" element={<HomeView />} />
                    <Route path="/platform" element={<PlatformView />} />
                    <Route path="/build-grid/:platform" element={<BuildGridView />} />
                    <Route path="/build-detail/:platform/:id" element={<BuildDetailView />} />
                    <Route path="/learn-grid" element={<LearnGridView />} />
                    <Route path="/learn-detail/:id" element={<LearnDetailView />} />

                    {/* Painel Administrativo */}
                    <Route path="/admin" element={<AdminView />} />

                    {/* Rota 404 */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
