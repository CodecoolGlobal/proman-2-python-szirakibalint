import {dataHandler} from "./dataHandler.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {domManager} from "./domManager.js";
import * as uiManager from "./uiManager.js";

export let columnsManager = {
    loadColumns: async function (boardId) {
        boardId = parseInt(boardId)
        const columns = await dataHandler.getStatuses(boardId);
        for (let column of columns) {

            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(column, boardId);
            domManager.addChild(`.board[data-board-id="${boardId}"] .board-columns`, content);
            if (boardId !== 0) {
                domManager.addEventListener(`#change-column-title-button-${boardId}-${column.id}`, "click", renameColumn)
                domManager.addEventListener(`#delete-column-button-${boardId}-${column.id}`, "click", deleteColumn)
            }
        }
    }
}

function renameColumn(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    const columnId = clickEvent.target.dataset.columnId
    uiManager.initRenameColumnButton(boardId, columnId)
}

async function deleteColumn(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    const columnId = clickEvent.target.dataset.columnId
    await uiManager.initDeleteColumnButton(boardId, columnId)
}
