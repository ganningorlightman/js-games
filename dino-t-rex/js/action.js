const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');

function jump() {
    const dinoClassList = dino.classList;
    if (!dinoClassList.contains('jump')) {
        dinoClassList.add('jump');
    }
    setTimeout(function() {
        dinoClassList.remove('jump');
    }, 300)
}

document.addEventListener('keydown', function(event) {
    jump();
})

const isAlive = setInterval(function() {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        alert('Game Over');
    }
}, 10)