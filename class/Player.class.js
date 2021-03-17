export class Player {
    
    constructor(x, y, color, context, image_left, image_right) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.context = context;
        this.image_left = image_left;
        this.image_right = image_right;
        this.image = this.image_right;
        this._BASE_VEL = 10;
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y);
        // this.context.beginPath();
        // this.context.arc(this.y, this.y, this.radius, 0, Math.PI * 2, false);
        // this.context.fillStyle = this.color;
        // this.context.fill();
    }

    move(key) {
        switch(key){
            case 'KeyD':
                this.image = this.image_right;
                this.x += this._BASE_VEL; 
                break;
            case 'KeyA':
                this.image = this.image_left;
                this.x -= this._BASE_VEL;
                break;
            case 'KeyW':
                this.y -= this._BASE_VEL;
                break;
            case 'KeyS':
                this.y += this._BASE_VEL;
                break;
            default:
                break;
        }
    }
}