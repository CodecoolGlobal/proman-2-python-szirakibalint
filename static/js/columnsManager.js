import {dataHandler} from "./dataHandler.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {domManager} from "./domManager.js";

export let columnsManager = {
    loadColumns: async function (boardId) {
        const columns = await dataHandler.getStatuses(boardId);
        for (let column of columns) {

            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(column);
            domManager.addChild(`.board[data-board-id="${boardId}"] .board-columns`, content);
        }
    }
}
