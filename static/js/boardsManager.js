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
            domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
        }
    },
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board)
            domManager.addChild("#root", content)
            domManager.addEventListener(`.toggle-board-button[data-board-id="${board.id}"]`, "click", showHideButtonHandler)
            domManager.addEventListener(`.change-board-name[data-board-id="${board.id}"]`, "click", renameTable)
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
    const renameButton = clickEvent.target
    initRenameButton(boardId, renameButton)
}
