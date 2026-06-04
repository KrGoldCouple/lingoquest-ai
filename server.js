const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const DB_PATH = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do frontend (HTML, CSS, JS)
app.use(express.static(__dirname));

// ==========================================================================
// BANCO DE DADOS LOCAL EM ARQUIVO (db.json)
// ==========================================================================
function readDatabase() {
    if (!fs.existsSync(DB_PATH)) {
        return {
            level: 1,
            xp: 0,
            streak: 0,
            last_study_date: null,
            completedLessons: [],
            vocab: {},
            studentName: "Jovem Explorador"
        };
    }
    try {
        const rawData = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(rawData);
    } catch (e) {
        console.error("Erro ao ler db.json, usando padrão:", e);
        return {
            level: 1,
            xp: 0,
            streak: 0,
            vocab: {},
            completedLessons: []
        };
    }
}

function writeDatabase(data) {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (e) {
        console.error("Erro ao gravar em db.json:", e);
        return false;
    }
}

// ==========================================================================
// ROTAS DA API
// ==========================================================================

// 1. Obter Progresso do Aluno
app.get('/api/progress', (req, res) => {
    const data = readDatabase();
    res.json(data);
});

// 2. Salvar/Sincronizar Progresso do Aluno
app.post('/api/progress', (req, res) => {
    const newProgress = req.body;
    
    // Validações básicas de payload
    if (newProgress.level === undefined || newProgress.xp === undefined) {
        return res.status(400).json({ error: "Progresso inválido recebido no servidor." });
    }
    
    const success = writeDatabase(newProgress);
    if (success) {
        res.json({ message: "Progresso salvo com sucesso no servidor da VM!" });
    } else {
        res.status(500).json({ error: "Erro ao salvar os dados no disco da VM." });
    }
});

// 3. Proxy Seguro para Chat do Tutor AI (Gemini 2.5 Flash)
app.post('/api/chat', async (req, res) => {
    const { chatHistory } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        return res.status(500).json({ 
            error: "A chave API do Gemini não foi configurada no servidor (arquivo .env)." 
        });
    }
    
    if (!chatHistory || !Array.isArray(chatHistory)) {
        return res.status(400).json({ error: "Histórico do chat ausente ou inválido." });
    }
    
    try {
        // Instrução do sistema injetada de forma segura do lado do servidor
        const systemInstruction = 
            "You are Roby, a super friendly AI English Tutor for a child learning English. " +
            "You must speak only in English. Keep your responses very simple, encouraging, and under 3 sentences. " +
            "VERY IMPORTANT: If the child makes a grammar, vocabulary or spelling mistake in their English input, " +
            "gently correct it. Explain the correction in Portuguese inside parentheses at the end of your response, " +
            "like this: (Dica: 'He like' está incorreto, o certo é 'He likes' porque usamos o 's' para he/she/it). " +
            "If they speak correctly, just continue the conversation normally in English and do not include the parentheses.";
            
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: chatHistory.map(h => ({ role: h.role, parts: h.parts })),
                    systemInstruction: {
                        parts: [{ text: systemInstruction }]
                    },
                    generationConfig: {
                        maxOutputTokens: 200,
                        temperature: 0.7
                    }
                })
            }
        );
        
        if (response.ok) {
            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't hear that.";
            res.json({ response: textResponse });
        } else {
            const errBody = await response.text();
            console.error("Erro na chamada da API Gemini:", errBody);
            res.status(502).json({ error: "Erro de processamento com o Tutor AI." });
        }
    } catch (e) {
        console.error("Erro no Proxy do Gemini:", e);
        res.status(500).json({ error: "Falha de conexão com a inteligência artificial." });
    }
});

// 4. Proxy Seguro para Geração de Histórias com IA (Portal da IA)
app.post('/api/generate-lesson', async (req, res) => {
    const { theme, targetLevel } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        return res.status(500).json({ error: "A chave API do Gemini não está configurada no servidor." });
    }
    
    try {
        const systemPrompt = 
            `You are an expert language course content creator. Write a short children's adventure story in English ` +
            `about the topic: "${theme}". The difficulty level must strictly be: ${targetLevel}. ` +
            `The story should be simple, around 5 paragraphs. Make sure to naturally incorporate at least 3 of these structural phrases (Sentence patterns): ` +
            `"need to", "make sure to", "better than", "whenever you", "instead of", "as soon as". ` +
            `Return ONLY the text of the story, with no headers, comments or markdown format. Just the plain text paragraphs separated by line breaks.`;
            
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
                    generationConfig: {
                        maxOutputTokens: 500,
                        temperature: 0.7
                    }
                })
            }
        );
        
        if (response.ok) {
            const data = await response.json();
            const generatedStory = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
            res.json({ story: generatedStory });
        } else {
            const errBody = await response.text();
            console.error("Erro na geração da história:", errBody);
            res.status(502).json({ error: "Erro na geração automática da história." });
        }
    } catch (e) {
        console.error("Erro de rede no gerador de história:", e);
        res.status(500).json({ error: "Erro de conexão com o gerador do Gemini." });
    }
});

// Inicialização do Servidor
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`===================================================`);
        console.log(`🚀 LingoQuest AI rodando com sucesso!`);
        console.log(`🔗 Acesse localmente: http://localhost:${PORT}`);
        console.log(`⚠️  Lembre-se de criar o arquivo .env com sua GEMINI_API_KEY`);
        console.log(`===================================================`);
    });
}

module.exports = app;
