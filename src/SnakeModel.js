export default class SnakeModel {
    constructor(color) {
        this.length = 1
        this.color = Snake.match.color ?? 'pink'
        //NOTE: stepped direction is the last move made direction is the next move to do
        this.direction = 'right'
        this.steppedDirection = 'right'
        this.actualPosition = [Math.trunc(Snake.canvasBounds[0] / 2), Math.trunc(Snake.canvasBounds[1] / 2)]
        this.snakeTrace = [this.actualPosition]
    }

    /**
     * Set a new coordinates position for "this" snake.
     */
    step() {
        /**
         * Move
         */
        if (Snake.state.state === 'start level') {
            /**
             * Snake crash with itself
             */
            if (this.isInTrace(this.actualPosition)) {
                this.crash()
            }

            /**
             * Snake Crash
             */
            if (this.actualPosition[0] === 0 && this.direction === 'left' ||
                this.actualPosition[1] === 0 && this.direction === 'up' ||
                this.actualPosition[0] > Snake.canvasBounds[0] && this.direction === 'right' ||
                this.actualPosition[1] > Snake.canvasBounds[1] && this.direction === 'down') {
                this.crash()
            }

            /**
             * Snake is full
             */
            if (this.length === (Snake.canvasBounds[0] * Snake.canvasBounds[1])) {
                this.full()
            }

            /**
             * Snake Detects a fruit
             */
            let target = Snake.match.target
            if (target[0] === this.actualPosition[0] && target[1] === this.actualPosition[1]) {
                this.eat()
            }
            if(this.direction !== 'stop') {
                this.move()
            }
        }
    }

    isInTrace(coord) {
        for (let traceIndex = 0; traceIndex < Snake.snakeModelInstance.snakeTrace.length - 1; traceIndex++) {
            if (Snake.snakeModelInstance.snakeTrace[traceIndex][0] === coord[0] && Snake.snakeModelInstance.snakeTrace[traceIndex][1] === coord[1]) {
                return true
            }
        }
        return false
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
        this.steppedDirection = this.direction
        this.snakeTrace.push(this.actualPosition)
    }

    crash() {
        console.log('crash')
        this.steppedDirection = this.direction = 'stop'
        Snake.state.changeState('level fail')
    }

    full() {
        console.log('crash')
        this.steppedDirection = this.direction = 'stop'
        Snake.state.changeState('level pass')
    }

    searchNewTarget(resolve) {
        const randomTest = Snake.helpers.getRandomCoords()
        if (!this.isInTrace(randomTest)) {
            Snake.match.target = randomTest
            resolve()
        } else {
            console.log('new target duplicated snake body coord, searching a new one.')
            Snake.snakeModelInstance.searchNewTarget(resolve)
        }
    }


    eat() {
        new Promise(resolve => {
            Snake.snakeModelInstance.searchNewTarget(resolve)
        }).then(() => {
            this.length++
            if ((this.length) % 10 == 0) {
                console.log('speed increased')
                document.querySelector('canvas').style.background = Snake.helpers.randomColor()
                --Snake.match.speed
                --Snake.counters.counterLimit
            }
            Snake.helpers.drawScreen(Snake.state.state)
        })
    }
}