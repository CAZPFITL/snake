import Helpers from './Helpers.js';
import SnakeModel from './SnakeModel.js';
import State from './State.js';

/**
 * TODO: avoid create targets over the snake * 
 */
export default class SnakeApp {
    constructor() {
        this.state = new State(this)
        this.helpers = Helpers
        this.SnakeModel = SnakeModel
        this.snakeModelInstance = {}
        this.canvasBounds = []
        this.match = {}
        this.paused = false
        this.counters = {
            level: 1,
            counter: 0,
            counterLimit: 20,
            stepSize: 25,
            initialSpeed: 20,
        }
    }

    /**
     * Initializates the application
     */
    static init() {
        console.log('init game')
        Helpers.createGlobal(this)
        Snake.state.changeState('request load')
        Snake.state.changeState('start level')
    }

    /**
     * Here you can process any state change from the app, reading "this.state.name" // create canvas -> createCanvas()
     */
    notification() {
        console.log('New state: ' + this.state.state)

        let funct = this.helpers.getStateFunction()
        if (Snake[funct]) {
            Snake[funct](this)
        }
    }

    /**
     * Load Game
     */
    requestLoad() {
        this.helpers.createCanvas()
        window.addEventListener('keydown', this.helpers.processKeyDown)
    }

    /**
     * Start level
     */
    startLevel() {
        if (!Snake.paused){
            console.log('new instance')
            Snake.helpers.getLevelInfo()
            Snake.snakeModelInstance = new Snake.SnakeModel()
        }
    }
}