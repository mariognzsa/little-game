import { Projectile } from "./Projectile.class.js";

export class Enemy {

    constructor(x, y, radius, color, targetX, targetY, multiplier, context, image) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.x_vel = 0;
        this.y_vel = 0;
        this.multiplier = multiplier;
        this.calculateXYVel(targetX, targetY);
        this.context = context;
        this.image = image;
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y);
        // this.context.beginPath();
        // this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // this.context.fillStyle = this.color;
        // this.context.fill();
    }

    update() {
        this.x += this.x_vel;
        this.y += this.y_vel;
        this.draw();
    }

    calculateXYVel(targetX, targetY) {
        const angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.x_vel = Math.cos(angle) * this.multiplier;
        this.y_vel = Math.sin(angle) * this.multiplier;
    }

    checkBoundries(projectile, width) {
        if((projectile.x > this.x && projectile.x < this.x + this.radius*2 && 
            projectile.y > this.y && projectile.y < this.y + this.radius*2) ||
            (this.x > projectile.x && this.x < projectile.x + width && 
            this.y > projectile.y && this.y < projectile.y + width))
            return true;
        else
            return false;
    }
}