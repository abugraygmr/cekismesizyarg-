class AIChat {
    constructor() {
        this.chatContainer = document.querySelector('.ai-chat-container');
        this.chatBody = document.querySelector('.ai-chat-body');
        this.chatInput = document.querySelector('.ai-chat-input input');
        this.sendButton = document.querySelector('.ai-chat-input button');
        this.toggleButton = document.querySelector('.ai-chat-toggle');
        
        // Başlangıçta chat'i kapalı olarak ayarla
        this.chatContainer.classList.add('collapsed');
        
        this.initializeEventListeners();
        this.addWelcomeMessage();
    }

    initializeEventListeners() {
        // Toggle chat window
        this.toggleButton.addEventListener('click', () => {
            this.chatContainer.classList.toggle('collapsed');
        });

        // Send message on button click
        this.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        // Send message on Enter key
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    addWelcomeMessage() {
        const welcomeMessage = {
            type: 'assistant',
            content: 'Merhaba! Ben hukuki işlemlerinizde size yardımcı olmak için buradayım. Size nasıl yardımcı olabilirim?'
        };
        this.addMessage(welcomeMessage);
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage({
            type: 'user',
            content: message
        });

        // Clear input
        this.chatInput.value = '';

        // TODO: Implement API call when API key is available
        // For now, just show a placeholder response
        setTimeout(() => {
            this.addMessage({
                type: 'assistant',
                content: 'Üzgünüm, şu anda API anahtarı olmadığı için yanıt veremiyorum. API anahtarı eklendiğinde size yardımcı olabileceğim.'
            });
        }, 1000);
    }

    addMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('ai-chat-message', message.type);
        messageElement.textContent = message.content;
        
        this.chatBody.appendChild(messageElement);
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIChat();
}); 