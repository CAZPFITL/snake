export default class Game {
    /**
     * @returns RandomColor
     */
    static randomColor = () => {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
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
        let dir = Snake.snakeModelInstance.steppedDirection
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
         * change direction
         */
        Snake.snakeModelInstance.direction =
            (e.key === 'ArrowDown' && dir !== 'up') ?
                'down' : (e.key === 'ArrowUp' && dir !== 'down') ?
                    'up' : (e.key === 'ArrowLeft' && dir !== 'right') ?
                        'left' : (e.key === 'ArrowRight' && dir !== 'left') ?
                            'right' : dir
    }
}