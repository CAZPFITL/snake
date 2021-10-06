export default class SnakeModel {
    constructor(color) {
        this.color = color ?? '#D3D3'
        this.length = 1
        this.direction = SnakeModel.getRandomDirection()
        this.actualPosition = [Math.trunc(Snake.canvasBounds[0] / 2), Math.trunc(Snake.canvasBounds[1] / 2)]
        this.snakeTrace = [this.actualPosition]
    }

    /**
     * getRandomDirection
     * @returns random direction generated
     */
    static getRandomDirection() {
        return Snake.helpers.getRandomInt(3) === 0 ? 'left' : Snake.helpers.getRandomInt(3) === 1 ? 'right' : Snake.helpers.getRandomInt(3) === 2 ? 'up' : 'down'
    }

    /**
     * Set a new coordinates position for "this" snake.
     */
    step() {
        /**
         * Snake Detects a fruit
         */
        let target = Snake.match.target
        if (target[0] === this.actualPosition[0] && target[1] === this.actualPosition[1]) {
            this.eat()
        }

        /**
         * Snake is full
         */
        if (this.length === (Snake.canvasBounds[0] * Snake.canvasBounds[1])) {
            this.full()
        }

        /**
         * Snake Crash
         */
        if (this.actualPosition[0] < 0 ||
            this.actualPosition[1] < 0 ||
            this.actualPosition[0] > Snake.canvasBounds[0] ||
            this.actualPosition[1] > Snake.canvasBounds[1]) {
            this.crash()
        }

        /**
         * Snake crash with itself ---------------------------------------------------------------------
         */


        for (var i = 0, l = Snake.snakeModelInstance.snakeTrace.length - 1; i < l; i++) {
            if (this.snakeTrace[i][0] === this.actualPosition[0] && this.snakeTrace[i][1] === this.actualPosition[1]) {
                console.log('crash')
                this.crash()
                break;
            } else {
                break;
            }
        }

        /**
         * Move
         */
        if (this.direction !== 'stop') {
            this.move()
        }
    }

    move() {
        /**
         * Helps to draw the snake moving
         */
        if (this.snakeTrace.length === this.length) {
            this.snakeTrace.shift()
        }
        /**
         * Process Math from the step
         */
        let x = this.direction === 'left' ? (this.actualPosition[0] - 1) : this.direction === 'right' ? (this.actualPosition[0] + 1) : this.actualPosition[0]
        let y = this.direction === 'down' ? (this.actualPosition[1] + 1) : this.direction === 'up' ? (this.actualPosition[1] - 1) : this.actualPosition[1]
        this.actualPosition = [x, y]
        this.snakeTrace.push(this.actualPosition)
        this.steppedDirection = this.direction
    }

    crash() {
        this.direction = 'stop'
        Snake.state.changeState('level fail')
    }

    full() {
        this.direction = 'stop'
        Snake.state.changeState('level pass')
    }

    eat() {
        Snake.match.target = Snake.helpers.getRandomCoords()
        this.length++ // 1 more in snake
        if(this.length % 5 == 0) {
            console.log('speed increased')
            --Snake.match.speed
            --Snake.counters.counterLimit
        }
    }
}