import SnakeModel from "./SnakeModel.js";
import State from "./State.js";
import Helpers from "./Helpers.js";

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
        this.counters = {
            level: 1,
            counter: 0,
            counterLimit: 50,
            stepSize: 25,
            initialSpeed: 50,
        }
    }

    /**
     * Initializates the application
     */
    static init() {
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
        this.helpers.getLevelInfo()
        this.snakeModelInstance = new this.SnakeModel(this.match.color)
    }

    /**
     * If you win
     */
    levelPass() {

    }

    /**
     * If you loose
     */
    levelFail() {

    }

}