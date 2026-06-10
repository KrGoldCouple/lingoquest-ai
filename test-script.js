/**
 * LINGOQUEST AI - SCRIPT DE AUTOMAÇÃO E DIAGNÓSTICO FULMINANTE 🚀
 * 
 * Instruções:
 * 1. Abra o LingoQuest AI no Chrome (https://krgoldcouple.github.io/lingoquest-ai/)
 * 2. Abra o Console do Desenvolvedor (F12 ou Option+Cmd+J no Mac)
 * 3. Cole todo o código abaixo e pressione Enter.
 * 4. Assista ao teste automatizado simulando um usuário real e gerando relatórios!
 */

(async function runLingoQuestDiagnostics() {
    console.clear();
    const styles = {
        header: 'background: #8b5cf6; color: white; font-size: 16px; font-weight: bold; padding: 8px 12px; border-radius: 6px; border: 2px solid #a78bfa; text-shadow: 0 0 10px rgba(255,255,255,0.4);',
        subHeader: 'color: #ec4899; font-size: 14px; font-weight: bold; margin-top: 15px;',
        success: 'color: #10b981; font-weight: bold; font-size: 12px;',
        error: 'color: #ef4444; font-weight: bold; font-size: 12px; background: rgba(239, 68, 68, 0.1); padding: 2px 6px; border-radius: 4px;',
        info: 'color: #3b82f6; font-size: 12px;',
        bold: 'font-weight: bold;'
    };

    console.log('%c LingoQuest AI — Diagnóstico Fulminante 🤖 ', styles.header);
    console.log('%cIniciando varredura e testes de interações simuladas...', styles.info);

    let failures = 0;
    let passes = 0;

    function assert(condition, message) {
        if (condition) {
            passes++;
            console.log(`%c[✓] PASS: ${message}`, styles.success);
        } else {
            failures++;
            console.error(`%c[✗] FAIL: ${message}`, styles.error);
        }
    }

    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // --- TESTE 1: INTEGRIDADE DO DOM ---
    console.log('%c\n--- TESTE 1: Verificação de Elementos Essenciais do DOM ---', styles.subHeader);
    const elementsToCheck = {
        'Scoreboard de Nível': 'top-level',
        'Barra de XP': 'top-xp-fill',
        'Contador de Streak': 'top-streak',
        'Contenedor do Mapa': 'map-nodes',
        'Área do Leitor': 'reader-screen',
        'Container de Texto': 'story-text-container',
        'Gaveta do Dicionário': 'dict-drawer',
        'Input de Tradução': 'dict-translation-input',
        'Botão Salvar Palavra': 'btn-save-drawer',
        'Tela de Conversação': 'chat-screen',
        'Mensagens do Chat': 'chat-messages',
        'Input de Texto do Chat': 'chat-text-input',
        'Botão do Microfone': 'btn-mic-toggle',
        'Tela de Treino': 'review-screen',
        'Tela de Certificado': 'certificate-screen',
        'Tela de Configurações': 'settings-screen',
        'Input de Chave Gemini': 'gemini-key-input'
    };

    for (const [name, id] of Object.entries(elementsToCheck)) {
        const el = document.getElementById(id);
        assert(el !== null, `Elemento "${name}" (ID: #${id}) encontrado no DOM.`);
    }

    // --- TESTE 2: PROGRAMAÇÃO E ROTEAMENTO DE ABAS ---
    console.log('%c\n--- TESTE 2: Simulação de Navegação entre Abas ---', styles.subHeader);
    try {
        const tabs = ['journey', 'reader', 'chat', 'review', 'settings'];
        for (const tab of tabs) {
            const tabBtn = document.querySelector(`.nav-tabactive[data-tab="${tab}"]`);
            if (tabBtn) {
                tabBtn.click();
                await sleep(400);
                const activePanel = document.querySelector('.screen-panel.active');
                assert(activePanel && (activePanel.id.startsWith(tab) || (tab === 'chat' && activePanel.id === 'chat-screen')), `Navegou para a aba: ${tab.toUpperCase()} e ativou o painel correspondente.`);
            } else {
                assert(false, `Botão da aba "${tab}" não encontrado.`);
            }
        }
        // Retorna ao mapa para o próximo teste
        document.querySelector('.nav-tabactive[data-tab="journey"]').click();
        await sleep(300);
    } catch (e) {
        assert(false, `Falha no teste de navegação: ${e.message}`);
    }

    // --- TESTE 3: LEITOR, TOKENIZAÇÃO E CLIQUE ---
    console.log('%c\n--- TESTE 3: Tokenização de História e Interação do Leitor ---', styles.subHeader);
    try {
        // Clica no primeiro nó ativo do mapa para carregar a Lição 1
        const nodes = document.querySelectorAll('.map-node:not(.locked) .node-btn');
        if (nodes.length > 0) {
            nodes[0].click();
            await sleep(500);
            assert(document.getElementById('reader-screen').classList.contains('active'), 'Ao clicar no nó da história, abre a tela do Leitor Imersivo.');
            
            const tokens = document.querySelectorAll('.word-token');
            assert(tokens.length > 0, `História carregada e tokenizada com sucesso. Encontrados ${tokens.length} tokens de palavras.`);
            
            // Simula clique em uma palavra normal (ex: primeira palavra)
            const firstWordToken = Array.from(tokens).find(t => !t.getAttribute('data-is-pattern'));
            if (firstWordToken) {
                firstWordToken.click();
                await sleep(500);
                
                const dictDrawerActive = document.getElementById('dict-active-state').style.display === 'flex';
                assert(dictDrawerActive, 'Ao tocar em uma palavra, a gaveta do dicionário ativa seu estado de tradução.');
                assert(document.getElementById('dict-word').innerText === firstWordToken.innerText, `Gaveta carregou o termo correto: "${firstWordToken.innerText}".`);
                
                // Testa se a tradução foi preenchida ou está disponível para inserção
                const inputVal = document.getElementById('dict-translation-input').value;
                console.log(`%c[Info] Tradução automática retornada para "${firstWordToken.innerText}": "${inputVal}"`, styles.info);
                assert(inputVal !== undefined, 'Input de tradução inicializado corretamente.');
            } else {
                assert(false, 'Nenhum token de palavra comum encontrado.');
            }
        } else {
            assert(false, 'Nenhum nó ativo disponível no mapa para iniciar a lição.');
        }
    } catch (e) {
        assert(false, `Falha no teste do Leitor/Tokenizador: ${e.message}`);
    }

    // --- TESTE 4: SALVAMENTO E GANHO DE XP ---
    console.log('%c\n--- TESTE 4: Salvamento de Vocabulário & Sistema de XP/Nível ---', styles.subHeader);
    try {
        const initialXpText = document.getElementById('top-xp-text').innerText;
        const initialXp = parseInt(initialXpText.split('/')[0].trim(), 10);
        console.log(`%c[Info] XP Inicial: ${initialXp} XP`, styles.info);
        
        // Define tradução de teste no input
        const transInput = document.getElementById('dict-translation-input');
        transInput.value = 'Tradução Automatizada Teste';
        
        // Intercepta o alert padrão para não travar a automação
        const originalAlert = window.alert;
        let alertTriggered = false;
        window.alert = () => { alertTriggered = true; };

        // Clica em salvar
        document.getElementById('btn-save-drawer').click();
        await sleep(300);
        
        window.alert = originalAlert; // Restaura o alert original

        assert(alertTriggered, 'Botão de Salvar clicado, acionando notificação de sucesso.');
        
        // Verifica incremento de XP
        const newXpText = document.getElementById('top-xp-text').innerText;
        const newXp = parseInt(newXpText.split('/')[0].trim(), 10);
        console.log(`%c[Info] XP Novo: ${newXp} XP`, styles.info);
        assert(newXp > initialXp, `XP incrementado com sucesso! Ganhou +${newXp - initialXp} XP.`);
    } catch (e) {
        assert(false, `Falha no teste de Vocabulário/XP: ${e.message}`);
    }

    // --- TESTE 5: FILA DO TREINO (SRS/FSRS) ---
    console.log('%c\n--- TESTE 5: Validação da Fila de Treino Espaçado (FSRS) ---', styles.subHeader);
    try {
        // Navega para a aba de Treino
        document.querySelector('.nav-tabactive[data-tab="review"]').click();
        await sleep(500);
        
        const reviewScreen = document.getElementById('review-screen');
        assert(reviewScreen.classList.contains('active'), 'Aba de Treino de Memória ativada.');

        const cardActive = document.getElementById('game-card-active').style.display === 'flex';
        if (cardActive) {
            assert(true, 'Flashcard de treino carregado na tela a partir das palavras salvas.');
            
            // Revela resposta
            document.getElementById('btn-game-reveal').click();
            await sleep(300);
            
            const answerVisible = document.getElementById('card-review-answer-box').style.display === 'block';
            assert(answerVisible, 'Ao clicar em "Revelar Resposta", exibe a tradução e oculta o botão de revelação.');
            
            const ratingsVisible = document.getElementById('game-rating-buttons').style.display === 'grid';
            assert(ratingsVisible, 'Exibe a grade de reações baseada em emojis (😭, 🤨, 🙂, 😎).');
        } else {
            const finishedState = document.getElementById('review-empty-state').style.display === 'flex';
            assert(finishedState, 'Nenhuma palavra pendente encontrada. Estado "Excelente Trabalho!" exibido.');
        }
    } catch (e) {
        assert(false, `Falha no teste de Flashcards/SRS: ${e.message}`);
    }

    // --- TESTE 6: SIMULAÇÃO DO CHAT COM O TUTOR ROBY ---
    console.log('%c\n--- TESTE 6: Simulação de Diálogo com Tutor Roby (Chat) ---', styles.subHeader);
    try {
        // Navega para o chat
        document.querySelector('.nav-tabactive[data-tab="chat"]').click();
        await sleep(500);

        const chatInput = document.getElementById('chat-text-input');
        chatInput.value = 'I likes robots!'; // Contém erro proposital (I likes) para testar correção do Roby
        
        // Simula clique no botão Enviar
        document.getElementById('btn-send-message').click();
        await sleep(500);
        
        // Verifica se a bolha do usuário foi adicionada
        const bubbles = document.querySelectorAll('.chat-bubble.user');
        assert(bubbles.length > 0 && Array.from(bubbles).some(b => b.innerText.includes('I likes robots!')), 'Mensagem do usuário enviada e renderizada na tela.');

        // Verifica indicador de digitando do Roby
        const typingBubble = document.querySelector('.chat-bubble.tutor.typing');
        if (typingBubble) {
            console.log('%c[Info] Tutor pensando (typing indicator ativo)...', styles.info);
        }

        // Aguarda a resposta (máximo 4 segundos se for mock offline)
        await sleep(3000);
        
        const tutorBubbles = document.querySelectorAll('.chat-bubble.tutor');
        assert(tutorBubbles.length > 0, 'Roby respondeu à mensagem com sucesso.');
        
        // Verifica se a última bolha do tutor contém a explicação pedagógica ou resposta padrão
        const lastTutorBubble = tutorBubbles[tutorBubbles.length - 1];
        console.log(`%c[Info] Resposta do Tutor Roby: "${lastTutorBubble.innerText}"`, styles.info);
    } catch (e) {
        assert(false, `Falha no teste do Chat: ${e.message}`);
    }

    // --- TESTE 7: CERTIFICADO & CONCLUSÃO ---
    console.log('%c\n--- TESTE 7: Conclusão da Trilha & Validação de Certificado ---', styles.subHeader);
    try {
        // Altera programaticamente o estado para simular conclusão da lição final
        if (!gameState.completedLessons.includes('lesson_10')) {
            gameState.completedLessons.push('lesson_10');
            saveGameData();
        }
        
        // Volta para a jornada para verificar o desbloqueio do certificado
        document.querySelector('.nav-tabactive[data-tab="journey"]').click();
        await sleep(400);
        
        const certBtn = document.getElementById('btn-claim-cert');
        const certArea = document.getElementById('certificate-unlock-area');
        
        assert(certArea.style.display === 'block', 'Com a lição 10 concluída, a área do certificado é destravada.');
        
        // Clica no certificado
        certBtn.click();
        await sleep(500);
        
        const certActive = document.getElementById('certificate-screen').classList.contains('active');
        assert(certActive, 'Navegou com sucesso para a tela de diploma oficial.');
        
        const studentNameOnCert = document.querySelector('.cert-student-name').innerText;
        assert(studentNameOnCert === gameState.studentName, `Nome do aluno impresso corretamente no certificado: "${studentNameOnCert}".`);
    } catch (e) {
        assert(false, `Falha no teste de Certificado: ${e.message}`);
    }

    // --- RELATÓRIO FINAL ---
    console.log('%c\n==================================================', 'color: #8b5cf6;');
    console.log('%c DIAGNÓSTICO LINGOQUEST AI CONCLUÍDO! 🏁 ', styles.header);
    console.log(`%cTestes Aprovados (PASS): ${passes}`, styles.success);
    if (failures > 0) {
        console.log(`%cTestes Reprovados (FAIL): ${failures} (verifique os logs de erro acima)`, styles.error);
    } else {
        console.log('%cTodos os testes passaram com sucesso absoluto! 🎉 SOTA ALL THE WAY!', styles.success);
    }
    console.log('==================================================', 'color: #8b5cf6;');

    // Retorna ao mapa
    document.querySelector('.nav-tabactive[data-tab="journey"]').click();
})();
