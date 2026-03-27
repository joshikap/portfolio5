import Npc from './Npc.js';
import Player from './Player.js';

class AINpc extends Npc {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        
        // AI-specific properties
        this.aiSpeed = data?.aiSpeed || 2;
        this.aiType = data?.aiType || 'patrol'; // 'patrol', 'follow', 'random'
        this.detectionRange = data?.detectionRange || 200;
        this.patrolPoints = data?.patrolPoints || [];
        this.currentPatrolIndex = 0;
        this.moveDirection = 1; // 1 for right, -1 for left
        this.aiMoveTimer = 0;
        this.aiMoveInterval = data?.aiMoveInterval || 1; // frames between movements
    }

    update() {
        this.draw();
        
        // Run AI movement logic
        this.updateAI();
        
        // Check if player is still in collision
        const players = this.gameEnv.gameObjects.filter(
            obj => obj && obj.state && obj.state.collisionEvents && obj.state.collisionEvents.includes(this.spriteData.id)
        );
        
        if (players.length > 0 && !this.isInteracting) {
            this.showReactionDialogue();
        }
    }

    updateAI() {
        // Find the player
        const player = this.gameEnv.gameObjects.find(obj => obj instanceof Player);
        
        if (!player) return;

        this.aiMoveTimer++;
        if (this.aiMoveTimer < this.aiMoveInterval) return;
        this.aiMoveTimer = 0;

        const dx = player.position.x - this.position.x;
        const dy = player.position.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        switch (this.aiType) {
            case 'follow':
                this.followPlayer(player, dx, dy, distance);
                break;
            case 'patrol':
                this.patrol();
                break;
            case 'random':
                this.moveRandom();
                break;
        }

        // Keep within canvas
        this.stayWithinCanvas();
    }

    followPlayer(player, dx, dy, distance) {
        // Only follow if within detection range
        if (distance > this.detectionRange) {
            this.patrol(); // Fall back to patrol if out of range
            return;
        }

        // Move towards player
        if (Math.abs(dx) > 0) {
            this.position.x += Math.sign(dx) * this.aiSpeed;
            this.state.direction = dx > 0 ? 'right' : 'left';
        }

        if (Math.abs(dy) > 1) {
            this.position.y += Math.sign(dy) * this.aiSpeed;
        }
    }

    patrol() {
        if (this.patrolPoints.length === 0) {
            // Default patrol: move left and right
            this.position.x += this.aiSpeed * this.moveDirection;
            
            // Reverse direction at canvas edges
            const scaledWidth = this.canvas.width / this.spriteData.SCALE_FACTOR;
            if (this.position.x <= 0 || this.position.x + scaledWidth >= this.gameEnv.innerWidth) {
                this.moveDirection *= -1;
            }
            
            this.state.direction = this.moveDirection > 0 ? 'right' : 'left';
        } else {
            // Patrol between specific points
            const currentPoint = this.patrolPoints[this.currentPatrolIndex];
            const dx = currentPoint.x - this.position.x;
            const dy = currentPoint.y - this.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 10) {
                // Reached patrol point, move to next
                this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
            } else {
                // Move towards current patrol point
                this.position.x += Math.sign(dx) * this.aiSpeed;
                this.position.y += Math.sign(dy) * this.aiSpeed * 0.5;
                this.state.direction = dx > 0 ? 'right' : 'left';
            }
        }
    }

    moveRandom() {
        // Random movement with occasional direction changes
        if (Math.random() > 0.95) {
            this.moveDirection = Math.random() > 0.5 ? 1 : -1;
        }

        this.position.x += this.aiSpeed * this.moveDirection;
        
        // Random vertical movement
        if (Math.random() > 0.9) {
            this.position.y += (Math.random() - 0.5) * this.aiSpeed;
        }

        this.state.direction = this.moveDirection > 0 ? 'right' : 'left';
    }

    stayWithinCanvas() {
        const scaledWidth = this.canvas.width / this.spriteData.SCALE_FACTOR;
        const scaledHeight = this.canvas.height / this.spriteData.SCALE_FACTOR;

        if (this.position.x <= 0) {
            this.position.x = 0;
            this.moveDirection = 1;
        }
        if (this.position.x + scaledWidth >= this.gameEnv.innerWidth) {
            this.position.x = this.gameEnv.innerWidth - scaledWidth;
            this.moveDirection = -1;
        }
        if (this.position.y <= 0) {
            this.position.y = 0;
        }
        if (this.position.y + scaledHeight >= this.gameEnv.innerHeight) {
            this.position.y = this.gameEnv.innerHeight - scaledHeight;
        }
    }

    showReactionDialogue() {
        if (this.isInteracting) return;
        this.isInteracting = true;

        if (this.dialogueSystem) {
            this.dialogueSystem.startDialogue();
        } else if (this.spriteData.greeting) {
            alert(this.spriteData.greeting);
        }

        setTimeout(() => {
            this.isInteracting = false;
            if (this.dialogueSystem) {
                this.dialogueSystem.cleanup();
            }
        }, 3000);
    }
}

export default AINpc;
