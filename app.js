import { Enemy } from './class/Enemy.class.js';
import { Player } from './class/Player.class.js';
import { Projectile } from './class/Projectile.class.js';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const _PROJECTILE_RADIUS = 5;
const _ENEMY_RADIUS = 30;
const VEL_MULTIPLIER = 4;
const _projectiles = [];
const _enemies = [];
var score = 0;
var GAME_ENDED = false;

var _PLAYER_IMG_LEFT = new Image();
_PLAYER_IMG_LEFT.src = './src/img/lucy_left.png';
var _PLAYER_IMG_RIGHT = new Image();
_PLAYER_IMG_RIGHT.src = './src/img/lucy_right.png';
var _ENEMY_IMG = new Image();
_ENEMY_IMG.src = './src/img/pato.png';

canvas.width = innerWidth;
canvas.height = innerHeight;

const _player = new Player(100, 100, 'lightblue', context, _PLAYER_IMG_LEFT, _PLAYER_IMG_RIGHT);
_PLAYER_IMG_RIGHT.onload = () => { _player.draw(); }

function animate() {
    if(GAME_ENDED) return;
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    _player.draw();
    _projectiles.forEach((projectile) => {
        projectile.update();
        if(projectile.x > innerWidth || projectile.x < 0 || projectile.y > innerHeight || projectile.y < 0){
            _projectiles.splice(_projectiles.indexOf(projectile), 1);
        }
    });
    _enemies.forEach((enemy) => {
        enemy.calculateXYVel(_player.x, _player.y);
        enemy.update();
        _projectiles.forEach((projectile) => {
            if(enemy.checkBoundries(projectile, 10)){
                score += 100;
                _enemies.splice(_enemies.indexOf(enemy), 1);
                _projectiles.splice(_projectiles.indexOf(projectile), 1);
                return;
            }
        });
        if(enemy.checkBoundries(_player, 60)){
            GAME_ENDED = true;
            const score_element = document.getElementById('score');
            score_element.innerHTML = 'Tu score:&nbsp;<b>' + score + '</b>';
            document.getElementById('myModal').style.display = 'block';
            return;
        }
    });
}

function spawnEnemies() {
    setInterval (() => {
        _enemies.push(
            new Enemy(
                innerWidth, 
                innerHeight,
                _ENEMY_RADIUS,
                'red',
                _player.x,
                _player.y,
                VEL_MULTIPLIER,
                context,
                _ENEMY_IMG
                )
        );
    }, 3000);
}

addEventListener('click', (event) => {
    _projectiles.push(
        new Projectile(
            _player.x + 60, 
            _player.y + 30, 
            _PROJECTILE_RADIUS, 
            'black', 
            event.clientX,
            event.clientY,
            VEL_MULTIPLIER,
            context
            )
        );
});

addEventListener('keypress', (event) => {
    _player.move(event.code);
})

animate();
spawnEnemies();
