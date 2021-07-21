import * as htmlFactory from "./htmlFactory.js";
import {domManager} from "./domManager.js";
import {dataHandler} from "./dataHandler.js";
import { reset } from "./main.js";

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
            const boardTitle = document.querySelector('#new-board-title').value
            await dataHandler.createNewBoard(boardTitle)
            reset()
        })
    })
}

export function initRenameButton (boardId) {
    const renameSpan = document.querySelector(`#change-board-title-${boardId}`)
    renameSpan.innerHTML = htmlFactory.newBoardInput(boardId)
    domManager.addEventListener(`#submit-new-board-title-${boardId}`, 'click', async () => {
        const newBoardTitle = document.querySelector(`#new-board-title-${boardId}`).value
        await dataHandler.changeBoardTitle(boardId, newBoardTitle)
        reset()
    })
}

export function initAddNewColumnButton(boardId) {
    const buttonSpan = document.querySelector(`#add-new-column-${boardId}`)
    buttonSpan.innerHTML = htmlFactory.newColumnInput(boardId)
    domManager.addEventListener(`#submit-new-column-title-${boardId}`, 'click', async () => {
        const newColumnTitle = document.querySelector(`#new-column-title-${boardId}`).value
        await dataHandler.createNewColumn(boardId, newColumnTitle)
        reset()
    })
}

export function initRenameColumnButton(boardId, columnId) {
    const buttonSpan = document.querySelector(`#change-column-title-${boardId}-${columnId}`)
    buttonSpan.innerHTML = htmlFactory.newColumnInput(boardId, columnId)
    domManager.addEventListener(`#submit-new-column-title-${boardId}-${columnId}`,'click', async () => {
        const newColumnTitle = document.querySelector(`#new-column-title-${boardId}-${columnId}`).value
        await dataHandler.changeColumnTitle(boardId, columnId, newColumnTitle)
        reset()
    })
}

export function initDeleteColumnButton(boardId, columnId) {
    const buttonSpan = document.querySelector(`delete-column-${boardId}-${columnId}`)
    dataHandler.deleteColumn(boardId, columnId).then()
    reset()
}
