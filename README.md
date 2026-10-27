# 🖥️ Easy Build - Plataforma Completa de Hardware

Bem-vindo ao **Easy Build**, um ecossistema interativo e educativo para entusiastas, estudantes e montadores de computadores.

---

## 🚀 Funcionalidades Integradas

1. **🔐 Autenticação Segura (JWT & Bcrypt)**:
   - Registro e login de usuários com persistência segura de tokens e senhas criptografadas via MongoDB Atlas.
2. **🛠️ Builder de PC (Montador Interativo)**:
   - Seleção de componentes por categoria (CPU, Placa-mãe, RAM, GPU, Fonte, etc.).
   - Cálculo automático do investimento total estimado (R$).
   - Validador inteligente de compatibilidade (soquete CPU x Placa-mãe, tipo de memória DDR4/DDR5, e dimensionamento de potência da fonte com margem de 30%).
   - Salvamento de configurações na conta do usuário.
3. **⚖️ Comparador de Builds**:
   - Comparação lado a lado entre builds salvas pelo usuário com detecção visual de diferenças por categoria.
4. **📚 Minicurso Didático de Hardware**:
   - Guia visual estruturado em plataformas (AMD AM4, AMD AM5, Intel LGA1700, Intel LGA1851), chipsets (A620, B650, X670, H610, B760, Z790, Z890) e tiers de performance com silhuetas vetoriais.
5. **🤖 Assistente IA de Hardware (Chat)**:
   - Chat inteligente treinado com conhecimento especializado para tirar dúvidas sobre gargalos (bottleneck), dimensionamento elétrico, recomendações de upgrade e diferenças tecnológicas.
6. **👤 Perfil & Orçamento Personalizado**:
   - Definição do objetivo do PC (Jogos, Trabalho, Estudo, Multimídia) e orçamento planejado (R$) para recomendações personalizadas.
   - Listagem completa do histórico de builds salvas.
7. **🧩 Guia Interativo por Plataforma (Lego Board)**:
   - A ilustração interativa e lúdica da placa-mãe com componentes encaixáveis e guias específicos para Intel e AMD.
8. **🔒 Painel Administrativo**:
   - Gerenciamento e cadastro de novos componentes e cards didáticos protegidos por senha.

---

## 🛠️ Tecnologias Utilizadas

- **Backend**:
  - Node.js & Express
  - MongoDB Atlas & Mongoose
  - JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
  - Arquitetura MVC com rotas modulares (`/api/auth`, `/api/builds`, `/api/profile`, `/api/chat`, `/api/dados`)
- **Frontend**:
  - React 19 + Vite
  - TailwindCSS v3 (tema escuro moderno e responsivo com menu mobile)
  - React Router DOM v7
  - Cliente de API centralizado com interceptor de autenticação (`services/api.js`)

---

## 📦 Como Executar o Projeto Localmente (Sem Docker)

### 1. Iniciar o Backend
```bash
cd backend
npm install
npm run dev
# Ou para iniciar diretamente:
npm start
```
> O backend rodará em `http://localhost:3000` conectado ao MongoDB Atlas.

### 2. Iniciar o Frontend
```bash
cd frontend
npm install
npm run dev
```
> O frontend rodará em `http://localhost:5173`.

---

## 🌐 Variáveis de Ambiente

### `backend/.env`
```env
DATABASE_URL="mongodb+srv://drkdb:thNikULHbytSRv4P@drk.roxpf.mongodb.net/easybuild?retryWrites=true&w=majority&appName=DrK"
ADMIN_PASSWORD="easybuild2025"
JWT_SECRET="easybuild_super_secret_jwt_key_2026"
PORT=3000
```

### `frontend/.env`
```env
VITE_API_URL=http://localhost:3000/api
```
