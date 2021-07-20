import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";
import { cardsManager } from "./cardsManager.js";
import { initRenameButton } from "./uiManager.js";


export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board)
            domManager.addChild("#root", content)
            domManager.addEventListener(`.toggle-board-button[data-board-id="${board.id}"]`, "click", showHideButtonHandler)
            domManager.addEventListener(`.change-board-name[data-board-id="${board.id}"]`, "click", renameTable)
        }
    },
}

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    cardsManager.loadCards(boardId)
}

function renameTable(clickEvent) {
    const boardId =clickEvent.target.dataset.boardId
    initRenameButton(boardId)
}
