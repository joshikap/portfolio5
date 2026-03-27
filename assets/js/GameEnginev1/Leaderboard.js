class Leaderboard {
    constructor(options = {}) {
        this.scores = [];
        this.maxEntries = options.maxEntries || 10;
        this.containerId = options.containerId || 'leaderboard-container';
        this.title = options.title || 'Leaderboard';
        this.storageKey = options.storageKey || 'game-leaderboard';
        
        this.loadScores();
        this.createLeaderboardUI();
    }

    /**
     * Add a new score to the leaderboard
     */
    addScore(playerName, score, level = 'Unknown') {
        const entry = {
            name: playerName || 'Anonymous',
            score: score,
            level: level,
            timestamp: new Date().toLocaleString()
        };

        this.scores.push(entry);
        this.scores.sort((a, b) => b.score - a.score);
        
        // Keep only top scores
        this.scores = this.scores.slice(0, this.maxEntries);
        
        this.saveScores();
        this.updateUI();
        
        return entry;
    }

    /**
     * Save scores to localStorage
     */
    saveScores() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.scores));
        } catch (e) {
            console.warn('Could not save scores to localStorage:', e);
        }
    }

    /**
     * Load scores from localStorage
     */
    loadScores() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.scores = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Could not load scores from localStorage:', e);
            this.scores = [];
        }
    }

    /**
     * Create the leaderboard UI
     */
    createLeaderboardUI() {
        let container = document.getElementById(this.containerId);
        
        if (!container) {
            container = document.createElement('div');
            container.id = this.containerId;
            container.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                width: 300px;
                max-height: 400px;
                background: rgba(0, 0, 0, 0.95);
                border: 3px solid #FFD700;
                border-radius: 10px;
                padding: 15px;
                font-family: Arial, sans-serif;
                color: #FFD700;
                z-index: 999999;
                overflow-y: auto;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
                pointer-events: auto;
            `;
            document.body.appendChild(container);
        }

        let title = container.querySelector('h3');
        if (!title) {
            title = document.createElement('h3');
            title.style.cssText = `
                margin: 0 0 10px 0;
                text-align: center;
                font-size: 1.3em;
                border-bottom: 2px solid #FFD700;
                padding-bottom: 10px;
                color: #FFD700;
            `;
            title.textContent = this.title;
            container.appendChild(title);
        }
        
        let entries = container.querySelector('#leaderboard-entries');
        if (!entries) {
            entries = document.createElement('div');
            entries.id = 'leaderboard-entries';
            entries.style.fontSize = '0.9em';
            container.appendChild(entries);
        }

        this.updateUI();
    }

    /**
     * Update the leaderboard display
     */
    updateUI() {
        const entriesContainer = document.getElementById('leaderboard-entries');
        if (!entriesContainer) return;

        if (this.scores.length === 0) {
            entriesContainer.innerHTML = '<p style="text-align: center; color: #999;">No scores yet</p>';
            return;
        }

        let html = '<ol style="margin: 0; padding-left: 20px;">';
        this.scores.forEach((entry, index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
            html += `
                <li style="
                    margin: 8px 0;
                    padding: 5px;
                    background: rgba(255, 215, 0, 0.1);
                    border-radius: 5px;
                    border-left: 3px solid #FFD700;
                ">
                    <span style="font-weight: bold;">${medal} ${entry.name}</span><br>
                    <span style="color: #FFB700;">Score: ${entry.score}</span><br>
                    <span style="color: #999; font-size: 0.85em;">Level: ${entry.level}</span>
                </li>
            `;
        });
        html += '</ol>';

        entriesContainer.innerHTML = html;
    }

    /**
     * Get top score
     */
    getTopScore() {
        return this.scores.length > 0 ? this.scores[0] : null;
    }

    /**
     * Get player ranking
     */
    getPlayerRanking(playerName) {
        return this.scores.findIndex(entry => entry.name === playerName) + 1 || null;
    }

    /**
     * Clear all scores
     */
    clearScores() {
        this.scores = [];
        this.saveScores();
        this.updateUI();
    }

    /**
     * Toggle visibility
     */
    toggleVisibility() {
        const container = document.getElementById(this.containerId);
        if (container) {
            container.style.display = container.style.display === 'none' ? 'block' : 'none';
        }
    }
}

export default Leaderboard;
