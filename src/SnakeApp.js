import Helpers from './Helpers.js';
import SnakeModel from './SnakeModel.js';
import State from './State.js';

/**
 * TODO:
 * onscreen controls toggle
 * main menu stage
 * main menu screen
 * options component
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
        this.isFull = false
        this.counters = {
            level: 1,
            counter: 0,
            counterLimit: 20,
            stepSize: 20,
            initialSpeed: 20,
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
        console.log(this.state.state)
        Snake.helpers.drawScreen(Snake.state.state)
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
        this.helpers.fullScreenFunctionality()
        window.addEventListener('keydown', this.helpers.processKeyDown)
        window.addEventListener('resize', this.helpers.getCanvas);
        // window.addEventListener('blur', () => this.helpers.processKeyDown({ key: 'p' }));
        // window.addEventListener('focus', () => this.helpers.processKeyDown({ key: 'p' }));
    }

    /**
     * Start level
     */
    startLevel() {
        if (!Snake.paused) {
            Snake.helpers.getLevelInfo()
            Snake.snakeModelInstance = new Snake.SnakeModel()
        }
    }
}