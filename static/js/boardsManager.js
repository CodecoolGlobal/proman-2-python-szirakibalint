import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";
import { cardsManager } from "./cardsManager.js";
import * as uiManager from "./uiManager.js";


export let boardsManager = {
    loadColumns: async function (boardId) {
        const columns = await dataHandler.getStatuses(boardId);
        for (let column of columns) {
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(column, boardId);
            domManager.addChild(`.board[data-board-id="${boardId}"] .board-columns`, content);
            domManager.addEventListener(`#change-column-title-button-${boardId}-${column.id}`, "click", renameColumn)
            domManager.addEventListener(`#delete-column-button-${boardId}-${column.id}`, "click", deleteColumn)
        }
    },
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
            await this.loadColumns(board.id)
        }
    },
}

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    cardsManager.loadCards(boardId)
}

function renameTable(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    uiManager.initRenameButton(boardId)
}

function addNewColumn(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    uiManager.initAddNewColumnButton(boardId)
}

function renameColumn(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    const columnId = clickEvent.target.dataset.columnId
    uiManager.initRenameColumnButton(boardId, columnId)
}

function deleteColumn(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    const columnId = clickEvent.target.dataset.columnId
    uiManager.initDeleteColumnButton(boardId, columnId)
}

function deleteBoard(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    uiManager.initDeleteBoardButton(boardId)
}
