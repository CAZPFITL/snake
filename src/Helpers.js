import Canvas from './Canvas.js'

export default class Helpers extends Canvas {
    /**
     * Creates Snake on window global variable
     * @param {AppClass} App 
     */
    static createGlobal(App) {
        window.Snake = new App()
        Snake.state.add(Snake)
    }

    /**
     * This functions gives to Snake the fullscreen functionality
     */
    static fullScreenFunctionality() {
        // Iniciar pantalla completa
        Snake.fullScreen = () => {
            console.log('Go to full')
            console.log(Snake.isFull)
            Snake.isFull = !Snake.isFull
            console.log(Snake.isFull)
            var docElm = document.documentElement
            //W3C   
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen()
            }
            //FireFox   
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen()
            }
            // Chrome, etc.   
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen()
            }
            //IE11   
            else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen()
            }
        }

        // Salir de pantalla completa
        Snake.normalScreen = () => {
            console.log('Go to normal')
            Snake.isFull = !Snake.isFull
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        }
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