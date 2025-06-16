document.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    
    const API_URL = 'http://localhost:3000/chat';

    // A "MEMÓRIA" DO NOSSO CHAT!
    // Usaremos o formato que a API do Gemini entende.
    let conversationHistory = [];

    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleSendMessage = async () => {
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return;

        addMessage(userMessage, 'user');
        chatInput.value = '';

        // Adiciona a mensagem do usuário ao histórico
        conversationHistory.push({ role: 'user', parts: [{ text: userMessage }] });

        try {
            // Agora enviamos o HISTÓRICO COMPLETO junto com a nova mensagem
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ history: conversationHistory }),
            });

            if (!response.ok) {
                throw new Error('A resposta do servidor não foi OK.');
            }

            const data = await response.json();
            const botResponse = data.reply;
            
            addMessage(botResponse, 'bot');

            // Adiciona a resposta do bot ao histórico para a próxima rodada
            conversationHistory.push({ role: 'model', parts: [{ text: botResponse }] });

        } catch (error) {
            console.error('Erro ao conectar com o backend:', error);
            addMessage('Desculpe, estou com problemas para me conectar. Tente novamente mais tarde.', 'bot');
        }
    };

    sendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });
});