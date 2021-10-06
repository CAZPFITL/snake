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
        Snake.snakeModelInstance.direction =
            (e.code === 'ArrowDown' && dir !== 'up') ?
                'down' : (e.code === 'ArrowUp' && dir !== 'down') ?
                    'up' : (e.code === 'ArrowLeft' && dir !== 'right') ?
                        'left' : (e.code === 'ArrowRight' && dir !== 'left') ?
                            'right' : dir
    }
}