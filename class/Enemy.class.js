export class Enemy {

    constructor(x, y, radius, color, targetX, targetY, multiplier, context) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.x_vel = 0;
        this.y_vel = 0;
        this.multiplier = multiplier
        this.calculateXYVel(targetX, targetY);
        this.context = context;
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.context.fillStyle = this.color;
        this.context.fill();
    }

    update() {
        this.x += this.x_vel;
        this.y += this.y_vel;
        this.draw();
    }

    calculateXYVel(targetX, targetY){
        const angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.x_vel = Math.cos(angle) * this.multiplier;
        this.y_vel = Math.sin(angle) * this.multiplier;
    }
}