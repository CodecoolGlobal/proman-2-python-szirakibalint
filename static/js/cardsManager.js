import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";
import {reset} from "./main.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        if (parseInt(boardId) !== 0) {
            const cards = await dataHandler.getCardsByBoardId(boardId);
            for (let card of cards) {
                const cardBuilder = htmlFactory(htmlTemplates.card);
                const content = cardBuilder(card)
                domManager.addChild(`.board[data-board-id="${boardId}"] .board-column[data-column-id="${card.status_id}"] .board-column-content`, content)
                domManager.addEventListener(`.card-archive[data-card-id="${card.id}"]`, "click", archiveButtonHandler)
                domManager.addEventListener(`.card-remove[data-card-id="${card.id}"]`, "click", deleteButtonHandler)
            }
        } else {
            const cards = await dataHandler.getArchivedCards()
            for (let card of cards) {
                const cardBuilder = htmlFactory(htmlTemplates.card);
                const content = cardBuilder(card)

                domManager.addChild(`.board[data-board-id="0"] .board-column[data-column-id="0"] .board-column-content`, content)
                domManager.addEventListener(`.card-archive[data-card-id="${card.id}"]`, "click", removeArchiveButtonHandler)
                domManager.addEventListener(`.card-remove[data-card-id="${card.id}"]`, "click", deleteButtonHandler)
            }
        }
    },
}

async function deleteButtonHandler(clickEvent) {
    const cardId = clickEvent.currentTarget.dataset.cardId;
    await dataHandler.deleteCard(cardId);
    await reset();
}

async function archiveButtonHandler(clickEvent) {
    const cardId = clickEvent.currentTarget.dataset.cardId;
    await dataHandler.modifyArchive(cardId, false);
    await reset();
}

async function removeArchiveButtonHandler(clickEvent) {
    const cardId = clickEvent.currentTarget.dataset.cardId;
    await dataHandler.modifyArchive(cardId, true);
    await reset();
}

