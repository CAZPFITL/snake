import Game from './Game.js'

export default class Canvas extends Game {
    /**
     * returns a brand new canvas for the Snake
     * @returns canvas created
     */
    static getCanvas() {
        let canvas = document.querySelector('canvas') ?? document.createElement('canvas')
        let step = Snake.counters.stepSize
        let Width = (window.innerWidth - step) - window.innerWidth.toString().slice(-1)
        let Height = (window.innerHeight - step) - window.innerHeight.toString().slice(-1)
        let border = (window.innerHeight - Height) / 2

        canvas.id = canvas.id ?? 'SnakeApp'
        canvas.width = (Width / step) % 1 === 0 ? Width : Width + step / 2
        canvas.height = (Height / step) % 1 === 0 ? Height : Height + step / 2
        canvas.style.borderTop = `${border}px solid #333333`

        Width = (Width / step) % 1 === 0 ? (Width / step) : (Width / step) + 0.5
        Height = (Height / step) % 1 === 0 ? (Height / step) : (Height / step) + 0.5

        Snake.canvasBounds = [Width - 2, Height - 2]

        return canvas
    }

    /**
     * Screen contains the game controls
     * @returns On game Screen
     */
    static getScreen() {
        let screen = document.createElement('div')
        screen.id = 'screen'
        screen.width = window.innerWidth
        screen.height = window.innerHeight
        return screen
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
     * Create canvas in DOM and Snake Global
     */
    static createCanvas() {
        let canvas = Snake.helpers.getCanvas()
        let screen = Snake.helpers.getScreen()
        Snake.ctx = canvas.getContext('2d')
        document.getElementsByTagName('body')[0].prepend(screen)
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