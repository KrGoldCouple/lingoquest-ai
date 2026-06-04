/**
 * LingoQuest AI - Spaced Repetition Core (FSRS)
 * Map ratings:
 * 😭 (Again) -> 1
 * 🤨 (Hard) -> 2
 * 🙂 (Good) -> 3
 * 😎 (Easy) -> 4
 */

function createCard(word, translation, context = "") {
    return {
        id: 'vocab_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        word: word.trim(),
        translation: translation.trim(),
        context: context.trim(),
        state: 0, // 0 = New/Learning, 1 = Reviewing
        difficulty: 5.0, // 1.0 (easy) - 10.0 (hard)
        stability: 2.0, // Memory stability in days
        last_review: null,
        next_review: new Date().toISOString(),
        repetition_count: 0
    };
}

function reviewCard(card, rating) {
    const now = new Date();
    
    if (!card.repetition_count || card.repetition_count === 0) {
        // Initial review (first time discovering the word in card practice)
        switch (rating) {
            case 1: // 😭 Again
                card.stability = 0.5;
                card.difficulty = 9.0;
                card.state = 0;
                break;
            case 2: // 🤨 Hard
                card.stability = 1.2;
                card.difficulty = 7.0;
                card.state = 1;
                break;
            case 3: // 🙂 Good
                card.stability = 2.5;
                card.difficulty = 5.0;
                card.state = 1;
                break;
            case 4: // 😎 Easy
                card.stability = 6.0;
                card.difficulty = 3.0;
                card.state = 1;
                break;
            default:
                card.stability = 2.5;
                card.difficulty = 5.0;
                card.state = 1;
        }
    } else {
        // Subsequent reviews
        const lastReviewDate = new Date(card.last_review || now);
        const elapsedDays = Math.max(1, (now - lastReviewDate) / (1000 * 60 * 60 * 24));
        
        // Calculate current Retrievability R
        const R = Math.exp(Math.log(0.9) * (elapsedDays / card.stability));
        
        // Update Difficulty
        let diffChange = 0;
        switch (rating) {
            case 1: diffChange = 1.5; break;
            case 2: diffChange = 0.5; break;
            case 3: diffChange = -0.5; break;
            case 4: diffChange = -1.5; break;
        }
        card.difficulty = Math.max(1.0, Math.min(10.0, card.difficulty + diffChange));
        
        // Update Stability
        if (rating === 1) {
            // Forgotten
            card.stability = Math.max(0.3, card.stability * 0.25);
            card.state = 0; // Reset state
        } else {
            // Recalled
            let factor = 1.0;
            switch (rating) {
                case 2: factor = 1.3; break;
                case 3: factor = 2.4; break;
                case 4: factor = 4.8; break;
            }
            const difficultyPenalty = Math.pow(card.difficulty, -0.3);
            const spacingEffectMultiplier = (1 - R);
            card.stability = card.stability * (1 + factor * difficultyPenalty * (1 + spacingEffectMultiplier));
            card.state = 1;
        }
    }
    
    card.repetition_count = (card.repetition_count || 0) + 1;
    card.last_review = now.toISOString();
    
    // Set next review interval in days
    const intervalDays = Math.max(1, Math.round(card.stability));
    const nextReviewDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);
    card.next_review = nextReviewDate.toISOString();
    
    return card;
}
