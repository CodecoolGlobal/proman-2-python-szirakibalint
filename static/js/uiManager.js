import * as htmlFactory from "./htmlFactory.js";
import {domManager} from "./domManager.js";
import {dataHandler} from "./dataHandler.js";
import { reset, updateIsOpen } from "./main.js";

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
            const privateBoard = document.querySelector('#private-checkbox').checked
            console.log("checkbox value:", privateBoard)
            await dataHandler.createNewBoard(boardTitle, privateBoard)
            await updateIsOpen();
            await reset()
        })
    })
}

export function initRenameButton (boardId) {
    const renameSpan = document.querySelector(`#change-board-title-${boardId}`)
    renameSpan.innerHTML = htmlFactory.newBoardInput(boardId)
    domManager.addEventListener(`#submit-new-board-title-${boardId}`, 'click', async () => {
        const newBoardTitle = document.querySelector(`#new-board-title-${boardId}`).value
        await dataHandler.changeBoardTitle(boardId, newBoardTitle)
        await reset()
    })
}


export function initAddNewColumnButton(boardId) {
    const buttonSpan = document.querySelector(`#add-new-column-${boardId}`)
    buttonSpan.innerHTML = htmlFactory.newColumnInput(boardId)
    domManager.addEventListener(`#submit-new-column-title-${boardId}`, 'click', async () => {
        const newColumnTitle = document.querySelector(`#new-column-title-${boardId}`).value
        await dataHandler.createNewColumn(boardId, newColumnTitle)
        await reset()
    })
}

export async function initDeleteColumnButton(boardId, columnId) {
    dataHandler.deleteColumn(boardId, columnId).then()
    await reset()
}

export async function initDeleteBoardButton(boardId) {
    await dataHandler.deleteBoard(boardId)
    await reset()
}

export function initCardForm (boardId) {
    const span = document.querySelector(`#add-new-card-${boardId}`)
    span.innerHTML = htmlFactory.newCardInput(boardId);
    domManager.addEventListener(`#submit-new-card-${boardId}`, 'click', async () =>
    {
        const newCardTitle = document.querySelector(`#new-card-title-${boardId}`).value
        const firstColumn = document.querySelector(`.board[data-board-id="${boardId}"] .board-column`)
        console.log(firstColumn)
        let statusId = firstColumn.dataset.columnId;
        console.log(statusId);
        await dataHandler.createNewCard(newCardTitle, boardId, statusId)
        await reset()
} );
}



