import Canvas from './Canvas.js'

export default class Helpers extends Canvas {
    constructor() {
        super()
    }

    /**
     * Creates Snake on window global variable
     * @param {AppClass} App 
     */
    static createGlobal(App) {
        window.Snake = new App()
        Snake.state.add(Snake)
    }

    /**
     * returns a random number
     * @param {Max Limit} max 
     * @returns 
     */
    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    /**
     * returns the String capitalized
     * @param {String} str 
     * @returns 
     */
    static capitalize(str) {
        if (typeof str === 'undefined') {
            return false
        } else {
            let fistLetter = str.charAt(0).toUpperCase()
            let slicedWord = str.slice(1)
            return fistLetter + slicedWord
        }
    }

    /**
     * This function helps to get the relative coordenate for your game canvas
     * @param {number to be converted} num 
     * @returns number converted
     */
    static getStepSize(num) {
        return Snake.counters.stepSize * num
    }

    /**
     * returns state function related
     * @returns processed state
     */
    static getStateFunction() {
        let func = Snake.state.state.split(' ')
        func[1] = Helpers.capitalize(func[1])
        return func.join('')
    }
}