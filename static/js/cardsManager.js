import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";
import {reset} from "./main.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card)

            domManager.addChild(`.board[data-board-id="${boardId}"] .board-column[data-column-id="${card.status_id}"] .board-column-content`, content)
            domManager.addEventListener(`.card[data-card-id="${card.id}"]`, "click", deleteButtonHandler)
        }
    },
}

async function deleteButtonHandler(clickEvent) {
    const cardId = clickEvent.currentTarget.dataset.cardId;
    await dataHandler.deleteCard(cardId);
    await reset();
}

