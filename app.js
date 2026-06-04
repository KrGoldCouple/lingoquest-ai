// ==========================================================================
// TRILHA PRINCIPAL: SEQUÊNCIA LÓGICA DO 0 AO 100 (10 FASES DO CURRÍCULO)
// ==========================================================================
const STORY_LESSONS = [
    {
        id: "lesson_1",
        title: "1. Conhecendo os Heróis 🦸‍♂️",
        theme: "Superheroes",
        level: "A1",
        emoji: "🦸‍♂️",
        content: "Peter is a young boy. He lives in a big city. One day, he sees a puppy in danger. The puppy is on a high wall. Peter wants to help. He climbs the wall. He rescues the puppy. Everyone is happy. Peter is a superhero today! He likes superheroes very much."
    },
    {
        id: "lesson_2",
        title: "2. O Zoo Amigável 🦁",
        theme: "At the Zoo",
        level: "A1",
        emoji: "🦁",
        content: "This is a big zoo. Look at the tall giraffe. It likes to eat green leaves. The little lion is sleeping under a tree. A clever monkey swings on the branches. It eats a sweet banana. Children love to watch the animals. The zoo is a happy place today."
    },
    {
        id: "lesson_3",
        title: "3. Aventuras do Dia ⏰",
        theme: "Daily Life",
        level: "A1",
        emoji: "⏰",
        content: "Every morning, Lily wakes up at seven o'clock. She needs to wash her face. Then, she has a delicious breakfast. She eats toast and drinks fresh juice. She walks to school with her brother. They talk and laugh. After school, Lily likes to play in the park."
    },
    {
        id: "lesson_4",
        title: "4. O Mistério da Escola 🏫",
        theme: "School Mystery",
        level: "A2",
        emoji: "🔑",
        content: "Lucas and Sofia are best friends at school. During lunchtime, they discover a small key near the library. They follow a long dark corridor. At the end of the corridor, there is a mysterious wooden door. Sofia puts the key in the lock. The door opens slowly. Inside, they find a room full of forgotten antique toys. It is their new secret place."
    },
    {
        id: "lesson_5",
        title: "5. A Cozinha Mágica 🍕",
        theme: "Cooking",
        level: "A2",
        emoji: "🍕",
        content: "Today, we are in the kitchen. We want to make a big pizza. First, we need to make the dough. Then, we add tomato sauce and lots of cheese. Sofia likes to put olives, instead of onions. We bake it in the oven. It smells wonderful. Eating pizza is better than cleaning the kitchen."
    },
    {
        id: "lesson_6",
        title: "6. Viagem no Tempo ⏳",
        theme: "Time Travel",
        level: "A2",
        emoji: "⏳",
        content: "Leo found an old watch in the attic. Whenever you turn the dial, the watch glows. Suddenly, Leo was in a medieval castle. A friendly knight welcomed him. Leo used to read stories about knights, but seeing one was amazing. The knight showed him the swords and armor. Before leaving, Leo said thank you."
    },
    {
        id: "lesson_7",
        title: "7. O Jardim das Emoções 🌸",
        theme: "Feelings",
        level: "B1",
        emoji: "🌸",
        content: "In the emotion garden, flowers change colors. If you feel happy, the roses turn bright yellow. Whenever you feel sad, the lilies turn blue. The gardener explained that we need to understand our feelings in order to grow. It is better to talk about emotions instead of hiding them. Sofia felt calm and the flowers glowed pink."
    },
    {
        id: "lesson_8",
        title: "8. Missão a Marte 🚀",
        theme: "Space Mission",
        level: "B1",
        emoji: "🪐",
        content: "Captain Sarah adjusted her space suit. The spaceship was descending on the dusty orange surface of Mars. For years, scientists dreamed of this expedition. As she stepped onto the dry ground, she felt a sense of awe. She began collecting soil samples to analyze signs of water. This historic journey could change humanity's future in space."
    },
    {
        id: "lesson_9",
        title: "9. O Código Secreto 💻",
        theme: "Technology",
        level: "B1",
        emoji: "💻",
        content: "Alan is a young programmer who loves puzzles. He spent weeks trying to crack a secret digital code. In order to solve the mystery, he had to write a new software. As soon as he pressed enter, the screen lit up with a hidden map. If it weren't for his perseverance, the secret room would remain locked forever."
    },
    {
        id: "lesson_10",
        title: "10. A Formatura 🎓",
        theme: "Graduation",
        level: "B2",
        emoji: "🎓",
        content: "Today is the graduation day! All the students are gathered in the main hall. They used to struggle with English, but now they speak fluently. The principal congratulated everyone for going from zero to hero. As soon as they receive their certificate, they will start new journeys around the world. The future is bright."
    }
];

// ==========================================================================
// BANCO DE DADOS DE PADRÕES LINGUÍSTICOS (LÓGICAS FRASAIS / CHUNKS)
// ==========================================================================
const SENTENCE_PATTERNS = [
    { id: "pat_need", pattern: "need to", label: "need to (precisar de)", translation: "preciso [fazer algo]", level: "A1" },
    { id: "pat_make_sure", pattern: "make sure to", label: "make sure to (não deixar de)", translation: "não deixe de / certifique-se de", level: "A2" },
    { id: "pat_better_than", pattern: "better than", label: "better than (melhor do que)", translation: "melhor do que", level: "A1" },
    { id: "pat_whenever", pattern: "whenever you", label: "whenever you (sempre que você)", translation: "sempre que você", level: "A2" },
    { id: "pat_if_not_for", pattern: "if it weren't for", label: "if it weren't for (se não fosse por)", translation: "se não fosse por", level: "B1" },
    { id: "pat_instead_of", pattern: "instead of", label: "instead of (em vez de)", translation: "em vez de", level: "A2" },
    { id: "pat_as_soon", pattern: "as soon as", label: "as soon as (assim que)", translation: "assim que", level: "A2" },
    { id: "pat_used_to", pattern: "used to", label: "used to (costumava)", translation: "costumava [fazer algo]", level: "A2" },
    { id: "pat_have_to", pattern: "have to", label: "have to (ter que)", translation: "tenho que [fazer algo]", level: "A1" },
    { id: "pat_in_order", pattern: "in order to", label: "in order to (para / a fim de)", translation: "a fim de / para", level: "B1" }
];

// Mock do tutor para modo offline
const MOCK_TUTOR_RESPONSES = [
    "Awesome! How is your day going? Are you ready to play? (Dica: 'How is your day going' significa 'Como vai seu dia?')",
    "Nice! What is your favorite animal? I like robots! 🤖 (Dica: 'What is your favorite animal' significa 'Qual é seu animal favorito?')",
    "That is so cool! Tell me, what did you eat today? 🍕 (Dica: 'What did you eat today' significa 'O que você comeu hoje?')",
    "Great! Let's continue studying. You are doing an amazing job! (Dica: 'You are doing an amazing job' significa 'Você está fazendo um ótimo trabalho!')"
];
let mockResponseIndex = 0;

// ==========================================================================
// ESTADO INTERNO DO JOGO
// ==========================================================================
const gameState = {
    level: 1,
    xp: 0,
    streak: 0,
    last_study_date: null,
    completedLessons: [],
    studentName: "Jovem Explorador",
    
    // Configurações
    geminiKey: "",
    studentLevel: "A1",
    isStaticMode: true, // Determina se roda offline/estático ou com backend Express
    
    vocab: {}, 
    activeTab: 'journey',
    activeLesson: null,
    selectedWordInfo: null,
    reviewQueue: [],
    currentReviewIndex: 0,
    chatHistory: [
        { role: "model", parts: [{ text: "Hello! I am Roby. Are you ready for our mission? Let's talk in English! 🤖" }] }
    ]
};

let speechRecognition = null;
let isRecordingSpeech = false;

// ==========================================================================
// INICIALIZAÇÃO
// ==========================================================================
document.addEventListener("DOMContentLoaded", async () => {
    await detectMode();
    await loadGameData();
    initBottomNav();
    initSpeechEngine();
    renderJourneyMap();
    initSettingsView();
    updateHeaderScoreboard();
    initUIEvents();
    checkAndUpdateStreak();
});

// Detecta se o servidor Express está disponível ou se roda em hospedagem estática (ex: GitHub Pages)
async function detectMode() {
    try {
        const res = await fetch('/api/progress');
        if (res.ok) {
            gameState.isStaticMode = false;
            console.log("Modo de Execução: Full-Stack (Server ativo)");
        }
    } catch (e) {
        gameState.isStaticMode = true;
        console.log("Modo de Execução: Estático / Local fallback");
    }
}

// ==========================================================================
// PERSISTÊNCIA DOURADA (LOCAL + SYNC NO BACKEND SE DISPONÍVEL)
// ==========================================================================
async function loadGameData() {
    // 1. Carrega do localStorage rápido
    const savedLevel = localStorage.getItem("lq_level");
    const savedXp = localStorage.getItem("lq_xp");
    const savedStreak = localStorage.getItem("lq_streak");
    const savedLastStudy = localStorage.getItem("lq_last_study");
    const savedLessons = localStorage.getItem("lq_completed_lessons");
    const savedVocab = localStorage.getItem("lq_vocab");
    const savedName = localStorage.getItem("lq_student_name");
    const savedKey = localStorage.getItem("lq_gemini_key_client");
    
    if (savedLevel) gameState.level = parseInt(savedLevel, 10);
    if (savedXp) gameState.xp = parseInt(savedXp, 10);
    if (savedStreak) gameState.streak = parseInt(savedStreak, 10);
    if (savedLastStudy) gameState.last_study_date = savedLastStudy;
    if (savedLessons) gameState.completedLessons = JSON.parse(savedLessons);
    if (savedVocab) gameState.vocab = JSON.parse(savedVocab);
    if (savedName) gameState.studentName = savedName;
    if (savedKey) gameState.geminiKey = savedKey;

    // 2. Se houver backend, sincroniza com o db.json
    if (!gameState.isStaticMode) {
        try {
            const res = await fetch('/api/progress');
            if (res.ok) {
                const serverData = await res.json();
                if (serverData.level > 1 || Object.keys(serverData.vocab).length > 0 || serverData.completedLessons.length > 0) {
                    gameState.level = serverData.level;
                    gameState.xp = serverData.xp;
                    gameState.streak = serverData.streak;
                    gameState.last_study_date = serverData.last_study_date;
                    gameState.completedLessons = serverData.completedLessons || [];
                    gameState.vocab = serverData.vocab || {};
                    gameState.studentName = serverData.studentName || "Jovem Explorador";
                    saveToLocalStorage();
                }
            }
        } catch (e) {
            console.log("Falha ao sincronizar com servidor Express.");
        }
    }
    
    document.getElementById("student-name-input").value = gameState.studentName;
}

function saveToLocalStorage() {
    localStorage.setItem("lq_level", gameState.level.toString());
    localStorage.setItem("lq_xp", gameState.xp.toString());
    localStorage.setItem("lq_streak", gameState.streak.toString());
    localStorage.setItem("lq_last_study", gameState.last_study_date || "");
    localStorage.setItem("lq_completed_lessons", JSON.stringify(gameState.completedLessons));
    localStorage.setItem("lq_vocab", JSON.stringify(gameState.vocab));
    localStorage.setItem("lq_student_name", gameState.studentName);
}

async function saveGameData() {
    // 1. Grava no localStorage local
    saveToLocalStorage();
    
    // 2. Tenta sincronizar com o servidor da VM se estiver em modo full-stack
    if (!gameState.isStaticMode) {
        try {
            await fetch('/api/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    level: gameState.level,
                    xp: gameState.xp,
                    streak: gameState.streak,
                    last_study_date: gameState.last_study_date,
                    completedLessons: gameState.completedLessons,
                    vocab: gameState.vocab,
                    studentName: gameState.studentName
                })
            });
        } catch (e) {
            console.log("Erro de rede ao salvar progresso no servidor.");
        }
    }
}

// ==========================================================================
// GAMIFICAÇÃO & NÍVEIS
// ==========================================================================
function addXP(amount) {
    gameState.xp += amount;
    const xpNeeded = gameState.level * 100;
    
    playCorrectSound();
    
    if (gameState.xp >= xpNeeded) {
        gameState.xp = gameState.xp - xpNeeded;
        gameState.level += 1;
        triggerLevelUpAnimation();
    }
    
    saveGameData();
    updateHeaderScoreboard();
}

function updateHeaderScoreboard() {
    document.getElementById("top-level").innerText = gameState.level;
    document.getElementById("top-streak").innerText = gameState.streak;
    
    const xpNeeded = gameState.level * 100;
    const percent = (gameState.xp / xpNeeded) * 100;
    
    document.getElementById("top-xp-fill").style.width = `${percent}%`;
    document.getElementById("top-xp-text").innerText = `${gameState.xp} / ${xpNeeded} XP`;
    
    updateReviewBadge();
}

function playCorrectSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
        console.log("Erro de som:", e);
    }
}

function triggerLevelUpAnimation() {
    const alertDiv = document.createElement("div");
    alertDiv.className = "level-up-flash-alert";
    alertDiv.innerHTML = `
        <div class="level-up-content">
            <span class="level-up-emoji">🏆🌟✨</span>
            <h2>LEVEL UP!</h2>
            <p>Você alcançou o Nível <strong>${gameState.level}</strong>!</p>
        </div>
    `;
    document.body.appendChild(alertDiv);
    speakText(`Great job! You leveled up to level ${gameState.level}!`);
    setTimeout(() => {
        alertDiv.classList.add("fade-out");
        setTimeout(() => alertDiv.remove(), 500);
    }, 3000);
}

// ==========================================================================
// ROTEAMENTO DE TELAS
// ==========================================================================
function initBottomNav() {
    document.querySelectorAll(".nav-tabactive").forEach(tab => {
        tab.addEventListener("click", () => {
            const tabName = tab.getAttribute("data-tab");
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    gameState.activeTab = tabName;
    
    document.querySelectorAll(".nav-tabactive").forEach(tab => {
        tab.classList.remove("active");
        if (tab.getAttribute("data-tab") === tabName) {
            tab.classList.add("active");
        }
    });
    
    document.querySelectorAll(".screen-panel").forEach(panel => {
        panel.classList.remove("active");
    });
    
    const panelId = (tabName === 'chat') ? 'chat-screen' : (tabName === 'certificate' ? 'certificate-screen' : `${tabName}-screen`);
    document.getElementById(panelId).classList.add("active");
    
    if (tabName === 'journey') {
        renderJourneyMap();
    } else if (tabName === 'review') {
        startFlashcardReview();
    } else if (tabName === 'certificate') {
        renderCertificateDetails();
    }
    
    updateHeaderScoreboard();
}

// ==========================================================================
// JORNADA (TRILHA E CERTIFICADO)
// ==========================================================================
function renderJourneyMap() {
    const container = document.getElementById("map-nodes");
    container.innerHTML = "";
    
    STORY_LESSONS.forEach((lesson, index) => {
        const node = document.createElement("div");
        node.className = "map-node";
        
        const isUnlocked = index === 0 || gameState.completedLessons.includes(STORY_LESSONS[index - 1].id);
        const isFinished = gameState.completedLessons.includes(lesson.id);
        
        if (!isUnlocked) {
            node.classList.add("locked");
        } else {
            node.classList.add("active");
        }
        
        node.innerHTML = `
            <button class="node-btn" ${!isUnlocked ? 'disabled' : ''}>
                ${isUnlocked ? (isFinished ? "✅" : lesson.emoji) : "🔒"}
                <span class="node-lang-tag">${lesson.level}</span>
            </button>
            <div class="node-label">${lesson.title}</div>
        `;
        
        if (isUnlocked) {
            node.querySelector(".node-btn").addEventListener("click", () => {
                startLesson(lesson);
            });
        }
        
        container.appendChild(node);
    });
    
    const certArea = document.getElementById("certificate-unlock-area");
    if (gameState.completedLessons.includes("lesson_10")) {
        certArea.style.display = "block";
    } else {
        certArea.style.display = "none";
    }
}

function startLesson(lesson) {
    gameState.activeLesson = lesson;
    
    document.getElementById("reader-story-title").innerText = lesson.title;
    document.getElementById("reader-story-lang").innerText = lesson.level;
    
    renderStoryText(lesson.content);
    resetDictionaryDrawer();
    switchTab("reader");
}

function renderCertificateDetails() {
    document.querySelector(".cert-student-name").innerText = gameState.studentName;
}

// ==========================================================================
// TOKENIZADOR INTELIGENTE DE CHUNKS / LÓGICAS FRASAIS (LEITOR)
// ==========================================================================
function renderStoryText(content) {
    const container = document.getElementById("story-text-container");
    container.innerHTML = "";
    
    const paragraphs = content.split(/\n+/);
    
    paragraphs.forEach((para, paraIndex) => {
        const paraEl = document.createElement("p");
        paraEl.className = "story-paragraph";
        
        const tokens = parseParagraphToTokens(para);
        
        tokens.forEach((token, index) => {
            if (token.type === 'space') {
                paraEl.appendChild(document.createTextNode(token.text));
            } else {
                const span = document.createElement("span");
                span.innerText = token.text;
                
                if (token.type === 'pattern') {
                    span.className = "word-token pattern";
                    span.setAttribute("data-word", token.text);
                    span.setAttribute("data-is-pattern", "true");
                    span.setAttribute("data-pat-id", token.pattern.id);
                    
                    const card = gameState.vocab[token.pattern.pattern];
                    if (card) {
                        applyCardStatusClass(span, card);
                    }
                } else {
                    span.className = "word-token";
                    span.setAttribute("data-word", token.text);
                    
                    const lower = token.text.toLowerCase();
                    const card = gameState.vocab[lower];
                    if (card) {
                        applyCardStatusClass(span, card);
                    }
                }
                
                span.addEventListener("click", () => {
                    handleTokenSelect(span, token);
                });
                
                paraEl.appendChild(span);
            }
        });
        
        container.appendChild(paraEl);
    });

    const finishBtn = document.createElement("button");
    finishBtn.className = "btn btn-save btn-block";
    finishBtn.style.marginTop = "35px";
    
    const isAlreadyDone = gameState.completedLessons.includes(gameState.activeLesson.id);
    finishBtn.innerText = isAlreadyDone ? "🏁 Voltar ao Mapa (Missão Concluída)" : "🏁 Concluir Missão (+25 XP)";
    
    finishBtn.addEventListener("click", completeActiveLesson);
    container.appendChild(finishBtn);
}

function completeActiveLesson() {
    if (!gameState.activeLesson) return;
    
    const lessonId = gameState.activeLesson.id;
    const isAlreadyDone = gameState.completedLessons.includes(lessonId);
    
    if (!isAlreadyDone) {
        gameState.completedLessons.push(lessonId);
        addXP(25);
        speakText("Congratulations! Mission completed! Plus twenty five experience points!");
        alert("🎉 Parabéns! Missão concluída com sucesso. Você ganhou +25 XP!");
    }
    
    saveGameData();
    switchTab("journey");
}

function applyCardStatusClass(element, card) {
    const now = new Date();
    if (card.state === 0 || new Date(card.next_review) <= now) {
        element.classList.add("due-review");
    } else if (card.stability >= 21) {
        element.classList.add("mastered");
    } else {
        element.classList.add("learning");
    }
}

function parseParagraphToTokens(paraText) {
    const tokens = [];
    const matches = [];
    
    SENTENCE_PATTERNS.forEach(pat => {
        const regex = new RegExp(`\\b${pat.pattern}\\b`, 'gi');
        let m;
        while ((m = regex.exec(paraText)) !== null) {
            matches.push({
                start: m.index,
                end: m.index + pat.pattern.length,
                text: m[0],
                patternObj: pat
            });
        }
    });
    
    matches.sort((a, b) => a.start - b.start);
    const cleanedMatches = [];
    let lastEnd = 0;
    matches.forEach(m => {
        if (m.start >= lastEnd) {
            cleanedMatches.push(m);
            lastEnd = m.end;
        }
    });
    
    let currentIndex = 0;
    cleanedMatches.forEach(m => {
        if (m.start > currentIndex) {
            tokenizeSegmentIntoWords(paraText.substring(currentIndex, m.start), tokens);
        }
        tokens.push({
            type: 'pattern',
            text: m.text,
            pattern: m.patternObj
        });
        currentIndex = m.end;
    });
    
    if (currentIndex < paraText.length) {
        tokenizeSegmentIntoWords(paraText.substring(currentIndex), tokens);
    }
    
    return tokens;
}

function tokenizeSegmentIntoWords(segment, tokenArray) {
    const wordRegex = /([a-zA-ZÀ-ÿ0-9_']+)/g;
    let lastIndex = 0;
    let match;
    while ((match = wordRegex.exec(segment)) !== null) {
        if (match.index > lastIndex) {
            tokenArray.push({
                type: 'space',
                text: segment.substring(lastIndex, match.index)
            });
        }
        tokenArray.push({
            type: 'word',
            text: match[1]
        });
        lastIndex = wordRegex.lastIndex;
    }
    if (lastIndex < segment.length) {
        tokenArray.push({
            type: 'space',
            text: segment.substring(lastIndex)
        });
    }
}

function resetDictionaryDrawer() {
    document.getElementById("dict-empty-state").style.display = "flex";
    document.getElementById("dict-active-state").style.display = "none";
}

async function handleTokenSelect(spanEl, token) {
    document.querySelectorAll(".word-token").forEach(el => el.classList.remove("selected"));
    spanEl.classList.add("selected");
    
    const isPattern = token.type === 'pattern';
    const textValue = isPattern ? token.pattern.pattern : token.text.toLowerCase();
    
    speakText(token.text);
    
    gameState.selectedWordInfo = {
        word: token.text,
        lowerWord: textValue,
        isPattern: isPattern,
        element: spanEl
    };
    
    document.getElementById("dict-empty-state").style.display = "none";
    document.getElementById("dict-active-state").style.display = "flex";
    document.getElementById("dict-word").innerText = token.text;
    
    const badge = document.getElementById("dict-chunk-badge");
    if (isPattern) {
        badge.style.display = "inline-block";
        badge.innerText = `⭐ Lógica Frasal (${token.pattern.level})`;
    } else {
        badge.style.display = "none";
    }
    
    const pElement = spanEl.parentElement;
    const sentenceContext = pElement.innerText || "";
    document.getElementById("dict-context-sentence").innerHTML = sentenceContext.replace(
        new RegExp(`\\b${token.text}\\b`, 'i'), 
        `<span class="highlight">${token.text}</span>`
    );
    
    const translationInput = document.getElementById("dict-translation-input");
    translationInput.value = "";
    translationInput.disabled = true;
    
    const existing = gameState.vocab[textValue];
    if (existing) {
        translationInput.value = existing.translation;
        translationInput.disabled = false;
    } else {
        translationInput.disabled = false;
        if (isPattern) {
            translationInput.value = token.pattern.translation;
        } else {
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textValue)}&langpair=en|pt`);
            if (res.ok) {
                const data = await res.json();
                const trans = data.responseData?.translatedText || "";
                translationInput.value = trans.replace(/[.]+$/, '').trim();
            }
        }
    }
}

function saveDrawerWord() {
    if (!gameState.selectedWordInfo) return;
    
    const info = gameState.selectedWordInfo;
    const translation = document.getElementById("dict-translation-input").value.trim();
    
    if (!translation) {
        alert("Preencha a tradução do termo!");
        return;
    }
    
    let card = gameState.vocab[info.lowerWord];
    const sentenceText = document.getElementById("dict-context-sentence").innerText;
    
    if (!card) {
        card = createCard(info.word, translation, sentenceText);
        if (info.isPattern) {
            card.isPattern = true;
        }
    } else {
        card.translation = translation;
        card.context = sentenceText;
    }
    
    gameState.vocab[info.lowerWord] = card;
    saveGameData();
    
    info.element.className = info.isPattern ? "word-token pattern learning" : "word-token learning";
    
    const xpAwarded = info.isPattern ? 20 : 10;
    addXP(xpAwarded);
    
    resetDictionaryDrawer();
    alert(`Termo salvo! Você ganhou +${xpAwarded} XP! ${info.isPattern ? '⭐' : '🌟'}`);
}

// ==========================================================================
// PROCESSAMENTO DE VOZ
// ==========================================================================
function initSpeechEngine() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        speechRecognition = new SpeechRecognition();
        speechRecognition.lang = "en-US";
        speechRecognition.continuous = false;
        
        speechRecognition.onstart = () => {
            isRecordingSpeech = true;
            document.getElementById("btn-mic-toggle").classList.add("recording");
            document.getElementById("voice-status").innerText = "Roby está te ouvindo... Fale agora!";
        };
        speechRecognition.onend = () => {
            isRecordingSpeech = false;
            document.getElementById("btn-mic-toggle").classList.remove("recording");
            document.getElementById("voice-status").innerText = "Toque no microfone para falar";
        };
        speechRecognition.onresult = (e) => {
            const text = e.results[0][0].transcript;
            document.getElementById("chat-text-input").value = text;
            sendChatMessage(text);
        };
    }
}

function speakText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    const englishOnlyText = text.replace(/\(.*?\)/g, "").trim();
    const utterance = new SpeechSynthesisUtterance(englishOnlyText);
    utterance.lang = "en-US";
    
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith("en-"));
    if (enVoice) utterance.voice = enVoice;
    
    window.speechSynthesis.speak(utterance);
}

function toggleVoiceRecording() {
    if (!speechRecognition) return;
    if (isRecordingSpeech) {
        speechRecognition.stop();
    } else {
        speechRecognition.start();
    }
}

// ==========================================================================
// PROXY SEGURO DO GEMINI (ROTA /API OU CHAMADA DIRETA CASO HOSPEDAGEM ESTÁTICA)
// ==========================================================================
async function sendChatMessage(overrideText = null) {
    const textInput = document.getElementById("chat-text-input");
    const text = overrideText || textInput.value.trim();
    if (!text) return;
    
    textInput.value = "";
    appendChatBubble(text, "user");
    
    gameState.chatHistory.push({ role: "user", parts: [{ text: text }] });
    const typing = appendChatBubble("Tutor pensando...", "tutor typing");
    
    let answer = "";
    
    // 1. Tenta chamar o servidor Express (Proxy Seguro)
    if (!gameState.isStaticMode) {
        try {
            const response = await fetch('/api/chat', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chatHistory: gameState.chatHistory.map(h => ({ role: h.role, parts: h.parts }))
                })
            });
            
            if (response.ok) {
                const serverRes = await response.json();
                answer = serverRes.response || "I didn't catch that.";
            } else {
                throw new Error("Erro de processamento.");
            }
        } catch (e) {
            console.log("Erro ao usar proxy de chat. Usando fallback.");
            answer = "I'm having connection issues. Please check the backend.";
        }
    } else {
        // 2. Hospedagem Estática (GitHub Pages): chama a API do Gemini diretamente do navegador
        if (gameState.geminiKey) {
            try {
                const systemInstruction = 
                    "You are Roby, a super friendly AI English Tutor for a child learning English. " +
                    "You must speak only in English. Keep your responses very simple, encouraging, and under 3 sentences. " +
                    "VERY IMPORTANT: If the child makes a grammar, vocabulary or spelling mistake in their English input, " +
                    "gently correct it. Explain the correction in Portuguese inside parentheses at the end of your response, " +
                    "like this: (Dica: 'He like' está incorreto, o certo é 'He likes' porque usamos o 's' para he/she/it). " +
                    "If they speak correctly, just continue the conversation normally in English and do not include the parentheses.";
                
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${gameState.geminiKey}`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            contents: gameState.chatHistory.map(h => ({ role: h.role, parts: h.parts })),
                            systemInstruction: { parts: [{ text: systemInstruction }] },
                            generationConfig: { maxOutputTokens: 200, temperature: 0.7 }
                        })
                    }
                );
                
                if (response.ok) {
                    const data = await response.json();
                    answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "I didn't catch that.";
                } else {
                    answer = "Gemini Key error. (Dica: Sua chave configurada no Painel do celular é inválida).";
                }
            } catch (e) {
                answer = "Error contacting Gemini. Check connection.";
            }
        } else {
            // Fallback offline total
            await new Promise(r => setTimeout(r, 1200));
            answer = MOCK_TUTOR_RESPONSES[mockResponseIndex];
            mockResponseIndex = (mockResponseIndex + 1) % MOCK_TUTOR_RESPONSES.length;
        }
    }
    
    typing.remove();
    appendChatBubble(answer, "tutor");
    speakText(answer);
    
    gameState.chatHistory.push({ role: "model", parts: [{ text: answer }] });
    
    addXP(5);
    checkAndUpdateStreak(true);
}

// ==========================================================================
// FLASHCARDS FSRS GAMIFICADOS
// ==========================================================================
function startFlashcardReview() {
    const list = Object.values(gameState.vocab);
    const now = new Date();
    
    gameState.reviewQueue = list.filter(card => {
        return card.state === 0 || new Date(card.next_review) <= now;
    });
    
    gameState.reviewQueue.sort(() => Math.random() - 0.5);
    gameState.currentReviewIndex = 0;
    
    renderGameCard();
}

function renderGameCard() {
    const emptyEl = document.getElementById("review-empty-state");
    const cardEl = document.getElementById("game-card-active");
    const countLabel = document.getElementById("review-due-count");
    
    const remaining = gameState.reviewQueue.length - gameState.currentReviewIndex;
    countLabel.innerText = `${remaining} pendentes`;
    
    if (gameState.reviewQueue.length === 0 || gameState.currentReviewIndex >= gameState.reviewQueue.length) {
        emptyEl.style.display = "flex";
        cardEl.style.display = "none";
        return;
    }
    
    emptyEl.style.display = "none";
    cardEl.style.display = "flex";
    
    const card = gameState.reviewQueue[gameState.currentReviewIndex];
    
    document.getElementById("game-card-type-label").innerText = card.isPattern ? "EXPRESSÃO FRASAL" : "COMPLETE A FRASE";
    
    const termToHide = card.word;
    const blank = "_".repeat(termToHide.length);
    const contextHtml = card.context.replace(new RegExp(`\\b${termToHide}\\b`, 'i'), `<span class="highlight">${blank}</span>`);
    
    document.getElementById("card-review-sentence").innerHTML = contextHtml;
    
    document.getElementById("card-review-answer-box").style.display = "none";
    document.getElementById("btn-game-reveal").style.display = "block";
    document.getElementById("game-rating-buttons").style.display = "none";
    
    document.getElementById("card-review-target").innerText = card.word;
    document.getElementById("card-review-translation").innerText = card.translation;
    
    speakText(card.word);
    
    const intervals = calculateGameCardIntervals(card);
    document.getElementById("time-again").innerText = intervals[1];
    document.getElementById("time-hard").innerText = intervals[2];
    document.getElementById("time-good").innerText = intervals[3];
    document.getElementById("time-easy").innerText = intervals[4];
}

function calculateGameCardIntervals(card) {
    const clone = (c) => JSON.parse(JSON.stringify(c));
    const nextAgain = reviewCard(clone(card), 1);
    const nextHard = reviewCard(clone(card), 2);
    const nextGood = reviewCard(clone(card), 3);
    const nextEasy = reviewCard(clone(card), 4);
    
    const getDaysStr = (isoString) => {
        const diffMs = new Date(isoString) - new Date();
        const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
        if (days <= 1) return "1 d";
        return `${days} d`;
    };
    
    return {
        1: "< 1 d",
        2: getDaysStr(nextHard.next_review),
        3: getDaysStr(nextGood.next_review),
        4: getDaysStr(nextEasy.next_review)
    };
}

function revealGameCardAnswer() {
    document.getElementById("card-review-answer-box").style.display = "block";
    document.getElementById("btn-game-reveal").style.display = "none";
    document.getElementById("game-rating-buttons").style.display = "grid";
    
    const card = gameState.reviewQueue[gameState.currentReviewIndex];
    speakText(`${card.word}... significa: ${card.translation}`);
}

function selectEmojiRating(rating) {
    const card = gameState.reviewQueue[gameState.currentReviewIndex];
    const updated = reviewCard(card, rating);
    
    gameState.vocab[card.word.toLowerCase()] = updated;
    saveGameData();
    
    addXP(5);
    checkAndUpdateStreak(true);
    
    gameState.currentReviewIndex++;
    renderGameCard();
}

function updateReviewBadge() {
    const list = Object.values(gameState.vocab);
    const now = new Date();
    const count = list.filter(c => c.state === 0 || new Date(c.next_review) <= now).length;
    
    const navBadge = document.getElementById("badge-nav-reviews");
    if (count > 0) {
        navBadge.innerText = count;
        navBadge.style.display = "flex";
    } else {
        navBadge.style.display = "none";
    }
}

// ==========================================================================
// GERADOR DE HISTÓRIAS DO PORTAL DE IA (HÍBRIDO COM OU SEM SERVIDOR)
// ==========================================================================
async function generateAILesson(e) {
    e.preventDefault();
    
    const theme = document.getElementById("ai-theme").value.trim();
    const targetLevel = document.getElementById("ai-level").value;
    const btn = document.getElementById("btn-generate-ai-lesson");
    
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = "✨ Criando história com IA (Aguarde)...";
    
    // 1. Tenta via Servidor Express (Proxy Seguro)
    if (!gameState.isStaticMode) {
        try {
            const response = await fetch('/api/generate-lesson', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ theme, targetLevel })
            });
            
            if (response.ok) {
                const data = await response.json();
                injectGeneratedStory(data.story, theme, targetLevel);
            } else {
                throw new Error();
            }
        } catch (err) {
            alert("Erro na geração. Certifique-se de que a API Key do Gemini está configurada no .env do servidor.");
        } finally {
            btn.disabled = false;
            btn.innerText = originalText;
        }
    } else {
        // 2. Se rodando no GitHub Pages (Estático): chama Gemini direto pelo navegador
        if (!gameState.geminiKey) {
            alert("Para gerar lições no modo estático, configure sua chave do Gemini na caixa de input acima e salve!");
            btn.disabled = false;
            btn.innerText = originalText;
            return;
        }
        
        try {
            const systemPrompt = 
                `You are an expert language course content creator. Write a short children's adventure story in English ` +
                `about the topic: "${theme}". The difficulty level must strictly be: ${targetLevel}. ` +
                `The story should be simple, around 5 paragraphs. Make sure to naturally incorporate at least 3 of these structural phrases (Sentence patterns): ` +
                `"need to", "make sure to", "better than", "whenever you", "instead of", "as soon as". ` +
                `Return ONLY the text of the story, with no headers, comments or markdown format. Just the plain text paragraphs separated by line breaks.`;
                
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${gameState.geminiKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
                        generationConfig: { maxOutputTokens: 500, temperature: 0.7 }
                    })
                }
            );
            
            if (response.ok) {
                const data = await response.json();
                const story = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
                injectGeneratedStory(story, theme, targetLevel);
            } else {
                alert("Erro ao contatar API do Gemini. Verifique sua chave no Painel.");
            }
        } catch (err) {
            alert("Erro de conexão com o Gemini.");
        } finally {
            btn.disabled = false;
            btn.innerText = originalText;
        }
    }
}

function injectGeneratedStory(storyText, theme, targetLevel) {
    if (!storyText) {
        alert("Erro: História vazia retornada.");
        return;
    }
    
    const newCustomId = "custom_lesson_" + Date.now();
    const newLesson = {
        id: newCustomId,
        title: `${theme} (IA) ✨`,
        theme: theme,
        level: targetLevel,
        emoji: "✨",
        content: storyText.trim()
    };
    
    STORY_LESSONS.push(newLesson);
    renderJourneyMap();
    document.getElementById("ai-generation-form").reset();
    alert(`Missão de IA sobre "${theme}" gerada e adicionada à sua Jornada!`);
}

// ==========================================================================
// CONFIGURAÇÕES GERAIS E BINDINGS
// ==========================================================================
function initSettingsView() {
    const geminiInput = document.getElementById("gemini-key-input");
    const saveKeyBtn = document.getElementById("btn-save-key");
    const descText = document.querySelector("#settings-screen .settings-section p.section-desc");

    if (!gameState.isStaticMode) {
        // Modo Servidor: Esconde input e avisa sobre .env
        geminiInput.value = "●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●";
        geminiInput.disabled = true;
        saveKeyBtn.style.display = "none";
        descText.innerHTML = `⚠️ <strong>Nota de Segurança:</strong> A chave API do Gemini está configurada no servidor backend da sua VM (arquivo <code>.env</code>). O celular do seu filho não tem acesso à chave, garantindo segurança máxima contra vazamentos!`;
    } else {
        // Modo Estático (GitHub Pages): Exibe para inserir no local
        geminiInput.value = gameState.geminiKey;
        geminiInput.disabled = false;
        saveKeyBtn.style.display = "block";
        descText.innerHTML = `🔑 <strong>Hospedagem Estática (Nuvem):</strong> Insira sua chave API do Gemini obtida de graça no Google AI Studio. Ela ficará salva localmente no navegador do celular.`;
        
        saveKeyBtn.addEventListener("click", () => {
            const key = geminiInput.value.trim();
            if (key) {
                gameState.geminiKey = key;
                localStorage.setItem("lq_gemini_key_client", key);
                alert("Chave do Gemini salva no navegador com sucesso!");
            }
        });
    }

    // Salvar Nome do Filho
    document.getElementById("btn-save-name").addEventListener("click", () => {
        const name = document.getElementById("student-name-input").value.trim();
        if (name) {
            gameState.studentName = name;
            saveGameData();
            alert(`Nome atualizado para "${name}".`);
        }
    });
    
    // Formulário do Portal da IA
    document.getElementById("ai-generation-form").addEventListener("submit", generateAILesson);
    
    // Reset geral
    document.getElementById("btn-reset-app").addEventListener("click", () => {
        if (confirm("Quer realmente apagar todo o progresso do seu filho? Essa ação é definitiva.")) {
            localStorage.clear();
            alert("Dados reiniciados com sucesso! Recarregando...");
            window.location.reload();
        }
    });
}

function initUIEvents() {
    // Backs
    document.getElementById("btn-reader-back").addEventListener("click", () => switchTab("journey"));
    document.getElementById("btn-chat-back").addEventListener("click", () => switchTab("journey"));
    document.getElementById("btn-review-go-map").addEventListener("click", () => switchTab("journey"));
    document.getElementById("btn-cert-back-map").addEventListener("click", () => switchTab("journey"));
    
    // Resgate de certificado
    document.getElementById("btn-claim-cert").addEventListener("click", () => switchTab("certificate"));
    
    // Drawer
    document.getElementById("btn-save-drawer").addEventListener("click", saveDrawerWord);
    
    // Chat e Áudio
    document.getElementById("btn-mic-toggle").addEventListener("click", toggleVoiceRecording);
    document.getElementById("btn-send-message").addEventListener("click", () => sendChatMessage());
    document.getElementById("chat-text-input").addEventListener("keypress", (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });
    
    // Flashcards
    document.getElementById("btn-game-reveal").addEventListener("click", revealGameCardAnswer);
    document.querySelectorAll(".btn-rating-emoji").forEach(btn => {
        btn.addEventListener("click", () => {
            const rating = parseInt(btn.getAttribute("data-rating"), 10);
            selectEmojiRating(rating);
        });
    });
    
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {};
    }
}

// Streak
function checkAndUpdateStreak(activityDone = false) {
    const todayStr = new Date().toDateString();
    
    if (activityDone) {
        if (gameState.last_study_date !== todayStr) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();
            
            if (gameState.last_study_date === yesterdayStr || gameState.streak === 0) {
                gameState.streak += 1;
            } else {
                gameState.streak = 1;
            }
            gameState.last_study_date = todayStr;
            saveGameData();
        }
    } else {
        if (gameState.last_study_date) {
            const lastStudy = new Date(gameState.last_study_date);
            const today = new Date();
            const diffTime = Math.abs(today - lastStudy);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 2) {
                gameState.streak = 0;
                saveGameData();
            }
        }
    }
}
