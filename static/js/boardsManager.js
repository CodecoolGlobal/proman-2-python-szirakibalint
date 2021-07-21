import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";
import { cardsManager } from "./cardsManager.js";
import { initRenameButton } from "./uiManager.js";


export let boardsManager = {
    loadColumns: async function (boardId) {
        const columns = await dataHandler.getStatuses(boardId);
        for (let column of columns) {
            console.log(column);
            const columnBuilder = htmlFactory(htmlTemplates.column) ;
            const content = columnBuilder(column) ;
            domManager.addChild(`.board[data-board-id="${boardId} board-columns"]`, content);
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
            this.loadColumns(board.id)
        }
    },
}

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    cardsManager.loadCards(boardId)
}

function renameTable(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    initRenameButton(boardId)
}
