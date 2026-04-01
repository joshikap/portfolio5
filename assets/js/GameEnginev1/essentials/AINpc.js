/**
 * AiNpc.js - Reusable AI-powered NPC conversation system
 * (LOCAL VERSION — NO BACKEND REQUIRED)
 */

import DialogueSystem from './DialogueSystem.js';

class AiNpc {
    static showInteraction(npcInstance) {
        const npc = npcInstance;
        const data = npc.spriteData;

        if (npc.dialogueSystem?.isDialogueOpen()) {
            npc.dialogueSystem.closeDialogue();
        }

        if (!npc.dialogueSystem) {
            npc.dialogueSystem = new DialogueSystem({
                dialogues: data.dialogues || [data.greeting || "Hello!"],
                gameControl: npc.gameControl
            });
        }

        npc.dialogueSystem.showRandomDialogue(data.id, data.src, data);

        const ui = AiNpc.createChatUI(data);
        AiNpc.attachEventHandlers(npc, data, ui);
        AiNpc.attachToDialogue(npc.dialogueSystem, ui.container);
    }

    static createChatUI(spriteData) {
        const container = document.createElement('div');
        container.className = 'ai-npc-container';

        const inputField = document.createElement('textarea');
        inputField.className = 'ai-npc-input';

        let placeholder = `Ask about ${spriteData.expertise}...`;
        const topics = spriteData.knowledgeBase?.[spriteData.expertise] || [];

        if (topics.length > 0) {
            const randomTopic = topics[Math.floor(Math.random() * topics.length)];
            placeholder = randomTopic.question;
        }

        inputField.placeholder = placeholder;
        inputField.rows = 2;

        const buttonRow = document.createElement('div');
        buttonRow.className = 'ai-npc-button-row';

        const historyBtn = document.createElement('button');
        historyBtn.textContent = '📋 Chat History';
        historyBtn.className = 'ai-npc-history-btn';

        const responseArea = document.createElement('div');
        responseArea.className = 'ai-npc-response-area';
        responseArea.style.display = 'none';

        buttonRow.appendChild(historyBtn);
        container.appendChild(inputField);
        container.appendChild(buttonRow);
        container.appendChild(responseArea);

        return { container, inputField, historyBtn, responseArea };
    }

    static attachEventHandlers(npcInstance, spriteData, ui) {
        const { inputField, historyBtn, responseArea } = ui;

        historyBtn.onclick = () => AiNpc.showChatHistory(spriteData);

        const sendMessage = async () => {
            const userMessage = inputField.value.trim();
            if (!userMessage) return;

            inputField.value = '';

            await AiNpc.sendPromptToBackend(spriteData, userMessage, responseArea);
        };

        AiNpc.preventGameInput(inputField);

        inputField.onkeypress = e => {
            e.stopPropagation();
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        };

        setTimeout(() => inputField.focus(), 100);
    }

    static attachToDialogue(dialogueSystem, container) {
        const dialogueBox = document.getElementById('custom-dialogue-box-' + dialogueSystem.safeId);

        if (dialogueBox) {
            const existingContainers = dialogueBox.querySelectorAll('.ai-npc-container');
            existingContainers.forEach(e => e.remove());

            const closeBtn = document.getElementById('dialogue-close-btn-' + dialogueSystem.safeId);

            if (closeBtn && closeBtn.parentNode === dialogueBox) {
                dialogueBox.insertBefore(container, closeBtn);
            } else {
                dialogueBox.appendChild(container);
            }
        }
    }

    /**
     * ✅ LOCAL AI LOGIC (THIS IS THE FIX)
     */
    static async sendPromptToBackend(spriteData, userMessage, responseArea) {
        spriteData.chatHistory.push({ role: 'user', message: userMessage });

        responseArea.textContent = "Thinking...";
        responseArea.style.display = 'block';

        setTimeout(() => {
            const msg = userMessage.toLowerCase();
            const topics = spriteData.knowledgeBase?.[spriteData.expertise] || [];

            let reply = "";

            // 🔥 1. Check knowledge base first
            for (let topic of topics) {
                if (
                    msg.includes(topic.question.toLowerCase().slice(0, 10)) ||
                    topic.question.toLowerCase().includes(msg)
                ) {
                    reply = topic.answer;
                    break;
                }
            }

            // 🔥 2. Keyword fallback
            if (!reply) {
                if (msg.includes("hello") || msg.includes("hi")) {
                    reply = "Hello there!";
                } else if (msg.includes("who are you")) {
                    reply = `I am ${spriteData.name || "an NPC"}!`;
                } else if (msg.includes("help")) {
                    reply = "You can ask me questions about my expertise!";
                } else {
                    reply = "I don't know that yet, but try asking about something related to my expertise!";
                }
            }

            spriteData.chatHistory.push({ role: 'ai', message: reply });

            AiNpc.showResponse(reply, responseArea);

        }, 500);
    }

    static showResponse(text, element, speed = 25) {
        element.textContent = '';
        element.style.display = 'block';

        let index = 0;

        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index++);
                setTimeout(type, speed);
            }
        };

        type();
    }

    static preventGameInput(element) {
        ['keydown', 'keyup', 'keypress'].forEach(eventType => {
            element.addEventListener(eventType, e => e.stopPropagation());
        });
    }

    static showChatHistory(spriteData) {
        const modal = document.createElement('div');
        modal.className = 'ai-npc-modal';

        const title = document.createElement('h3');
        title.textContent = 'Chat History';
        modal.appendChild(title);

        spriteData.chatHistory.forEach(msg => {
            const div = document.createElement('div');
            div.textContent = msg.message;
            div.className = msg.role === 'user' ? 'user-message' : 'ai-message';
            modal.appendChild(div);
        });

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.onclick = () => modal.remove();

        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
    }

    static async testAPI() {
        console.warn("API disabled in local mode.");
        return true;
    }

    static async resetConversation() {
        console.warn("API disabled in local mode.");
    }
}

export default AiNpc;
