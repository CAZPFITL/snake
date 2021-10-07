import Game from './Game.js'

export default class Canvas extends Game {
    /**
     * returns a brand new canvas for the Snake
     * @returns canvas created
     */
    static getCanvas() {
        let canvas = document.createElement('canvas')
        canvas.id = 'SnakeApp'
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        return canvas
    }

    /**
     * Create canvas in DOM and Snake Global
     */
    static createCanvas() {
        let canvas = Snake.helpers.getCanvas()
        let step = Snake.counters.stepSize
        Snake.ctx = canvas.getContext('2d')
        Snake.canvasBounds = [Math.trunc(canvas.width / step), Math.trunc(canvas.height / step)]
        document.getElementsByTagName('body')[0].prepend(canvas)
        Snake.helpers.requestAnimation()
    }

    /**
     * Renews the canvas on every draw loop
     */
    static clearCanvas() {
        Snake.ctx.clearRect(0, 0, Snake.ctx.canvas.width, Snake.ctx.canvas.height);
    }

    /**
     * draw
     */
    static draw() {
        Snake.helpers.step()
        Snake.helpers.clearCanvas()
        Snake.helpers.drawTarget()
        Snake.helpers.drawSnake()
        Snake.helpers.requestAnimation()
    }

    /**
     * Feeds the stepper and gets a stepProcess method.
     */
    static step() {
        Snake.counters.counter++
        //NOTE: stepProcess At Speed Selected
        if (Snake.counters.counter % Snake.match.speed === 0) {
            Snake.snakeModelInstance.step()
        }
        //NOTE: avoids a big and slow calculations
        if (Snake.counters.counter === Snake.counters.counterLimit) {
            Snake.counters.counter = 0
        }
    }

    /**
     * Request Animation Frame
     * @param {drawing function} draw 
     */
    static requestAnimation() {
        window.requestAnimationFrame(Snake.helpers.draw)
    }

    /**
     * Draws next target
     */
    static drawTarget() {
        Snake.ctx.fillStyle = 'red'
        Snake.ctx.fillRect(
            Snake.match.target[0] * Snake.counters.stepSize,
            Snake.match.target[1] * Snake.counters.stepSize,
            Snake.counters.stepSize,
            Snake.counters.stepSize)
    }

    /**
     * draw snake
     */
    static drawSnake() {
        /**
         * Draws Body
         */
        Snake.ctx.fillStyle = Snake.snakeModelInstance.color
        Snake.snakeModelInstance.snakeTrace.forEach((step) => {
            Snake.ctx.fillRect(
                step[0] * Snake.counters.stepSize,
                step[1] * Snake.counters.stepSize,
                Snake.counters.stepSize,
                Snake.counters.stepSize)
        })
        /**
         * Draws Head
         */
        Snake.ctx.fillStyle = '#333333'
        Snake.ctx.fillRect(
            Snake.snakeModelInstance.snakeTrace[Snake.snakeModelInstance.snakeTrace.length - 1][0] * Snake.counters.stepSize,
            Snake.snakeModelInstance.snakeTrace[Snake.snakeModelInstance.snakeTrace.length - 1][1] * Snake.counters.stepSize,
            Snake.counters.stepSize,
            Snake.counters.stepSize)
    }
}