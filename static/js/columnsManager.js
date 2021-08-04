import {dataHandler} from "./dataHandler.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {domManager} from "./domManager.js";
import * as uiManager from "./uiManager.js";


export let columnsManager = {
    loadColumns: async function (boardId) {
        const columns = await dataHandler.getStatuses(boardId);
        for (let column of columns) {
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(column, boardId);
            domManager.addChild(`.board[data-board-id="${boardId}"] .board-columns`, content);
            domManager.addEventListener(`#board-column-title-${boardId}-${column.id}`, "keydown", renameColumn)
            domManager.addEventListener(`#delete-column-button-${boardId}-${column.id}`, "click", deleteColumn)
        }
    }
}

async function renameColumn(event) {
    if (event.key === 'Enter') {
        const boardId = event.target.getAttribute('data-board-id');
        const columnId = event.target.getAttribute('data-column-id');
        const newColumnTitle = event.target.innerText.replaceAll('\n', '').slice(0, 15)
        if (newColumnTitle) {
            event.target.innerText = newColumnTitle
            await dataHandler.changeColumnTitle(boardId, columnId, newColumnTitle)
            event.target.blur()
        }
    }
}

async function deleteColumn(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    const columnId = clickEvent.target.dataset.columnId
    await uiManager.initDeleteColumnButton(boardId, columnId)
}
