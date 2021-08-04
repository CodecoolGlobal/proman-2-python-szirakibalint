import {dataHandler} from "./dataHandler.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {domManager} from "./domManager.js";
import * as uiManager from "./uiManager.js";
import {reset} from "./main.js";

export let columnsManager = {
    loadColumns: async function (boardId) {
        boardId = parseInt(boardId)
        const columns = await dataHandler.getStatuses(boardId);
        for (let column of columns) {
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(column, boardId);
            domManager.addChild(`.board[data-board-id="${boardId}"] .board-columns`, content);
            if (boardId !== 0) {
                domManager.addEventListener(`#delete-column-button-${boardId}-${column.id}`, "click", deleteColumn)
                domManager.addEventListener(`#board-column-title-${boardId}-${column.id}`, "keydown", renameColumn)
            }
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
            await reset()
        }
    }
}

async function deleteColumn(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    const columnId = clickEvent.target.dataset.columnId
    await uiManager.initDeleteColumnButton(boardId, columnId)
}
