import Screen from './Screen.js'
export default class Game extends Screen {
    /**
     * @returns RandomColor
     */
    static randomColor = () => {
        return  `rgb(${Snake.helpers.getRandomInt(255)},${Snake.helpers.getRandomInt(255)},${Snake.helpers.getRandomInt(255)})`
    }

    /**
     * @returns SnakeColor
     */
    static getSnakeColor = () => {
        return Snake.helpers.randomColor()
    }

    /**
     * Makes Snake.match equals to object: 
     * { color, speed, targets, totalTargets }
     */
    static getLevelInfo = () => {
        const color = Snake.helpers.getSnakeColor()
        const speed = Snake.counters.initialSpeed
        const target = Snake.helpers.getRandomCoords()
        Snake.match = {
            color: color,
            speed: speed,
            target: target,
        }
    }

    /**
     * Get random coordenates (1 pair of coordenates (x,y))
     * @returns [random x, random y]
     */
    static getRandomCoords = () => {
        const coord = index => { return Snake.helpers.getRandomInt(Snake.canvasBounds[index]) }
        return [coord(0), coord(1)]
    }

    /**
     * process keydown event
     * @param {keydown event} e 
     */
    static processKeyDown = e => {
        // console.log(e)
        /**
         * restart game
         */
        if(Snake.state.state === 'level fail' || Snake.state.state === 'level pass') {
            Snake.state.changeState('start level')
        } 

        /**
         * pause game
         */
        if(e.key === 'p') {

            if(Snake.state.state === 'start level') {
                Snake.state.changeState('level paused')
                Snake.paused = true
            } else if(Snake.state.state === 'level paused') {
                Snake.state.changeState('start level')
                Snake.paused = false
            }
        } else {
            
        }

        /**
         * change direction (stepped direction is the last move made direction is the next move to do)
         */
        let dir = Snake.snakeModelInstance.steppedDirection
        Snake.snakeModelInstance.direction =
            (e.key === 'ArrowDown' && dir !== 'up') ?
                'down' : (e.key === 'ArrowUp' && dir !== 'down') ?
                    'up' : (e.key === 'ArrowLeft' && dir !== 'right') ?
                        'left' : (e.key === 'ArrowRight' && dir !== 'left') ?
                            'right' : dir
    }
}