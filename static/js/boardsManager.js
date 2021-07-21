import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";
import { cardsManager } from "./cardsManager.js";
import {initCardForm, initRenameButton} from "./uiManager.js";
import {columnsManager} from "./columnsManager.js";
import * as uiManager from "./uiManager.js";


export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        let boardContainer = document.createElement('div')
        boardContainer.className = 'board-container'
        const root = document.querySelector('#root')
        root.appendChild(boardContainer)
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board)
            domManager.addChild(".board-container", content)
            domManager.addEventListener(`.board-toggle[data-board-id="${board.id}"]`, "click", showHideButtonHandler)
            domManager.addEventListener(`.change-board-title[data-board-id="${board.id}"]`, "click", renameTable)

            domManager.addEventListener(`.add-new-column[data-board-id="${board.id}"]`, "click", addNewColumn)
            domManager.addEventListener(`.delete-board[data-board-id="${board.id}"]`, "click", deleteBoard)

            domManager.addEventListener(`.board-add[data-board-id="${board.id}"]`, "click", addCard)

        }
    },
}

async function showHideButtonHandler(clickEvent) {
    const button = clickEvent.target;
    const boardId = button.dataset.boardId
    if (button.dataset.toggleState === "hide") {
        await columnsManager.loadColumns(boardId)
        await cardsManager.loadCards(boardId)
        button.dataset.toggleState = "show";
        button.innerHTML= ` Hide cards <i class=\"fas fa-chevron-up\"></i> `
    } else {
        const columnContent = document.querySelector(`.board[data-board-id="${boardId}"] .board-columns`)
        columnContent.innerHTML = '';
        button.dataset.toggleState = "hide";
        button.innerHTML= ` Show cards <i class=\"fas fa-chevron-down\"></i> `
    }
}

function renameTable(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    uiManager.initRenameButton(boardId)
}

function addNewColumn(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    uiManager.initAddNewColumnButton(boardId)
}



function deleteBoard(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    uiManager.initDeleteBoardButton(boardId)
}

async function addCard(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;

    const button = document.querySelector(`.board[data-board-id="${boardId}"] .board-toggle`);
    console.log(button);
    if (button.dataset.toggleState === "hide") {
        await columnsManager.loadColumns(boardId)
        await cardsManager.loadCards(boardId)
        button.dataset.toggleState = "show";
        button.innerHTML= ` Hide cards <i class=\"fas fa-chevron-up\"></i> `
    }
    initCardForm(boardId);
}
