import * as htmlFactory from "./htmlFactory.js";
import {domManager} from "./domManager.js";
import {dataHandler} from "./dataHandler.js";


export function initNewBoardDiv () {
    domManager.addChild("#root", `<div id="new-board-form"></div>`)
}

export function initNewBoardButton () {
    const newButton = htmlFactory.newBoardButton()
    const newBoardDiv = document.querySelector('#new-board-form')
    newBoardDiv.innerHTML = ''
    domManager.addChild('#new-board-form', newButton)
    domManager.addEventListener('#load-new-board-form', 'click', () => {
        const form = document.querySelector('#new-board-form')
        form.innerHTML = htmlFactory.newBoardInput()
        domManager.addEventListener('#submit-new-board-title', 'click', async () => {
            const boardTitle = document.querySelector('#new-board-name')
            await dataHandler.createNewBoard(boardTitle.value)
            initNewBoardButton()
        })
    })
}
