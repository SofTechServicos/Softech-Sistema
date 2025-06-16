// Arquivo: server.js

// --- 1. CONFIGURAÇÃO INICIAL ---
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const info = require('./info.js');

dotenv.config();

// Validação da Chave de API
if (!process.env.GEMINI_API_KEY) {
    console.error('ERRO: GEMINI_API_KEY não definida no arquivo .env');
    process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

// --- A MÁGICA PARA SERVIR OS ARQUIVOS ESTÁTICOS ---
// Define a pasta PAI ('Softech Sistema') como o diretório para servir arquivos estáticos.
const pastaPai = path.join(__dirname, '..');
app.use(express.static(pastaPai));
// O que isso faz:
// - Quando o navegador pedir '/Styles/main.css', o Express vai procurar por 'D:\...\Softech Sistema\Styles\main.css'.
// - Quando o navegador pedir '/Scripts/script.js', o Express vai procurar por 'D:\...\Softech Sistema\Scripts\script.js'.
// - Quando pedir '/chatbot-gemini/script.js', vai procurar em 'D:\...\Softech Sistema\chatbot-gemini\script.js'.

// --- 2. CONSTRUÇÃO DO CONTEXTO DE SISTEMA ---
function formatarBaseDeConhecimento(servicos) {
    return servicos.map(servico => 
        `Serviço: ${servico.nome} | Descrição: ${servico.descricao} | Valor: ${servico.valor.toFixed(2)}`
    ).join('\n');
}

const systemInstruction = `
${info.contexto}


--- BASE DE CONHECIMENTO DE SERVIÇOS ---
A seguir está a lista completa de serviços que você oferece. Use esta lista para responder às perguntas dos usuários sobre detalhes, preços e recomendações.
${formatarBaseDeConhecimento(info.servicos)}
------------------------------------------
`;

// --- 3. CONFIGURAÇÃO DO GEMINI ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash-lite",
    systemInstruction: systemInstruction,
});

// --- 4. ENDPOINT PRINCIPAL DO CHATBOT ---
app.post('/chat', async (req, res) => {
    try {
        // Recebe o histórico da conversa do frontend
        const { history } = req.body;
        if (!history || history.length === 0) {
            return res.status(400).json({ error: 'Histórico da conversa não recebido.' });
        }

        // Pega a última mensagem do usuário do histórico
        const userMessage = history[history.length - 1].parts[0].text;
        
        // Remove a última mensagem do usuário do histórico para passá-la separadamente
        const chatHistoryForApi = history.slice(0, -1);

        // Inicia um chat com o histórico anterior!
        const chat = model.startChat({
            history: chatHistoryForApi
        });

        // Envia a nova mensagem do usuário
        const result = await chat.sendMessage(userMessage);
        const botResponse = result.response.text();
        
        res.json({ reply: botResponse });

    } catch (error) {
        console.error('Erro detalhado no endpoint /chat:', error);
        res.status(500).json({ error: 'Desculpe, ocorreu um erro interno.' });
    }
});

// --- 5. ROTAS E INICIALIZAÇÃO ---
app.get('/', (req, res) => {
    res.sendFile(path.join(pastaPai, 'Home.html'));
});

// --- 6. INICIALIZAÇÃO DO SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando!`);
    console.log(`Acesse seu site em http://localhost:${PORT}`);
});