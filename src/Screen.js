export default class Screen {
    static drawScreen(state) {
        const screen = document.querySelector('#screen')
        const body = document.querySelector('body')
        const isMobile = (() => { return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) })()
        const arrows = {
            left: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"/></svg>`,
            right: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"/></svg>`,
            up: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M8.12 14.71L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.39-.39-1.02-.39-1.41 0L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.38 1.03.39 1.42 0z"/></svg>`,
            down: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"/></svg>`,
        }

        switch (state) {
            case 'level paused':
                body.classList = []
                body.classList.add('pause')
                screen.innerHTML = `
                PAUSE
                `
                break;

            case 'start level':
                body.classList = []
                body.classList.add('start')
                screen.innerHTML = isMobile ? `
                <div class="wrapper">
                    <p>Targets: ${Snake.snakeModelInstance.length ?? 1}</p>
                    <div class="controls ${isMobile ? 'mobile' : ''}">
                        <div onclick="Snake.helpers.processKeyDown({key:'ArrowUp'});" class="button up">${arrows.up}</div>
                        <div class="middle">
                            <div onclick="Snake.helpers.processKeyDown({key:'ArrowLeft'});" class="button left">${arrows.left}</div>
                            <div onclick="Snake.helpers.processKeyDown({key:'ArrowRight'});" class="button right">${arrows.right}</div>
                            </div>
                            <div onclick="Snake.helpers.processKeyDown({key:'ArrowDown'});" class="button down">${arrows.down}</div>
                    </div>
                </div>
                ` : `
                <div class="wrapper">
                    <p>Targets: ${Snake.snakeModelInstance.length ?? 1}</p>
                    <div class="controls list">
                        <p class="control">Pause - <b>p</b></p>
                        <p class="control">Left - <b>Left arrow</b></p>
                        <p class="control">Right - <b>Right arrow</b></p>
                        <p class="control">Up - <b>Up arrow</b></p>
                        <p class="control">Down - <b>Down arrow</b></p>
                    </div>
                </div>
                `

                break;

            case 'level fail':
                body.classList = []
                body.classList.add('fail')
                screen.innerHTML = `
                    SNAKE IS DEAD X_X
                `
                break;

            default:
                break;
        }
    }
}