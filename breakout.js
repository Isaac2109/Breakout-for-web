var margim_left_bar = 170
var keycode = ''
var body = window.document.getElementById('corpo')
var bar = window.document.getElementById('barra')
var ball = document.getElementById('bola')
var board = window.document.getElementById('quadro')
var width_board = window.document.getElementById('quadro').clientWidth
var height_board = window.document.getElementById('quadro').clientHeight
window.onload = clock
var blocks = []

for (let i = 1; i < 56; i++) {
    let block = window.document.getElementById(`bloco${i}`)
    blocks.push(block)
}

var rangeintersect = function(min0, max0, min1, max1) {
    return Math.max(min0, max0) >= Math.min(min1,max1) && Math.min(min0,max0) <= Math.max(min1,max1)
}

var rectintersect = function (r0, r1) {
    return rangeintersect(r0.left, r0.right, r1.left, r1.right) && rangeintersect(r0.top, r0.bottom, r1.top, r1.bottom)
}

// movimento da barra

document.body.addEventListener('keydown', function (event) {
    keycode = event.keyCode
    //window.alert(`Key: ${key}, Code ${code}`);
    if (keycode == 39 && (margim_left_bar + 105) < width_board) {
        margim_left_bar += 10
        bar.style.marginLeft = `${margim_left_bar}px`
    }
    if (keycode == 37 && margim_left_bar > 0) {
        margim_left_bar -= 10
        bar.style.marginLeft = `${margim_left_bar}px`
    }
})

//movimento da bola

var temporizador;
var UP_RIGHT = 0
var DOWN_RIGHT = 1
var UP_LEFT = 2
var DOWN_LEFT = 3
var ball_direction = DOWN_LEFT
var margim_top_ball = 400
var margim_left_ball = 500

function clock() {
    var rect_bar = bar.getBoundingClientRect()
    var rect_ball = ball.getBoundingClientRect()

    //colisão da bola com bloco

    for (var block of blocks) {
        var rect_block = block.getBoundingClientRect()
        if (rectintersect(rect_block, rect_ball) && ball_direction == UP_LEFT) {
            ball_direction = DOWN_LEFT
            block.remove()
        }
        else if (rectintersect(rect_block, rect_ball) && ball_direction == UP_RIGHT) {
            ball_direction = DOWN_RIGHT
            block.remove()
        }
        else if (rectintersect(rect_block, rect_ball) && ball_direction == DOWN_LEFT) {
            ball_direction = UP_LEFT
            block.remove()
        }
        else if (rectintersect(rect_block, rect_ball) && ball_direction == DOWN_RIGHT) {
            ball_direction = UP_RIGHT
            block.remove()
        }
    }

    if (ball_direction == UP_RIGHT) {
        margim_top_ball -= 5
        margim_left_ball += 5
        ball.style.marginTop = `${margim_top_ball}px`
        ball.style.marginLeft = `${margim_left_ball}px`
    }
    if (ball_direction == DOWN_RIGHT){
        margim_top_ball += 5
        margim_left_ball += 5
        ball.style.marginTop = `${margim_top_ball}px`
        ball.style.marginLeft = `${margim_left_ball}px`
    }
    if (ball_direction == UP_LEFT) {
        console.log('foi')
        margim_top_ball -= 5
        margim_left_ball -= 5
        ball.style.marginTop = `${margim_top_ball}px`
        ball.style.marginLeft = `${margim_left_ball}px`
    }
    if (ball_direction == DOWN_LEFT) {
        margim_top_ball += 5
        margim_left_ball -= 5
        ball.style.marginTop = `${margim_top_ball}px`
        ball.style.marginLeft = `${margim_left_ball}px`
    }

    //tabela da bola

    if (margim_top_ball < 5 && ball_direction == UP_RIGHT) {
        ball_direction = DOWN_RIGHT
    }
    if (margim_top_ball < 5 && ball_direction == UP_LEFT) {
        ball_direction = DOWN_LEFT
    }
    if (margim_left_ball < 0 && ball_direction == UP_LEFT) {
        ball_direction = UP_RIGHT
    }
    if (margim_left_ball < 0 && ball_direction == DOWN_LEFT) {
        ball_direction = DOWN_RIGHT
    }
    if ((margim_left_ball + 15) > width_board && ball_direction == DOWN_RIGHT) {
        ball_direction = DOWN_LEFT
    }
    if ((margim_left_ball + 15) > width_board && ball_direction == UP_RIGHT) {
        ball_direction = UP_LEFT
    }


    // kick da bola na barra

    if (rectintersect(rect_ball, rect_bar) && ball_direction == DOWN_LEFT) {
        ball_direction = UP_LEFT
    }

    if (rectintersect(rect_ball, rect_bar) && ball_direction == DOWN_RIGHT) {
        ball_direction = UP_RIGHT
    }

    temporizador = setTimeout(clock, 30);
    
    //queda da bola

    if (margim_top_ball > 600) {
        window.location.reload(true)
    }
}

