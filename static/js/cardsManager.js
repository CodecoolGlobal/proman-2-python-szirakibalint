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
            domManager.addEventListener(`.card-remove[data-card-id="${card.id}"]`, "click", deleteButtonHandler)
        }
    },
    initCardRenameFunctions: () => {
        const cards = document.querySelectorAll('.card')
        for (let card of cards) card.onkeydown = cardTitleChangeHandler
    }
}

async function cardTitleChangeHandler (e) {
    if (e.key === 'Enter') {
        const card = e.target.parentElement
        const column = card.parentElement
        const boardId = parseInt(column.parentElement.getAttribute('data-board-id'))
        const cardId = parseInt(card.getAttribute('data-card-id'))
        const statusId = parseInt(column.getAttribute('data-column-id'))
        const updatedTitle = card.innerText.replaceAll('\n', '').slice(0, 15)
        if (updatedTitle) await dataHandler.updateCard(cardId, statusId, boardId, updatedTitle)
        await reset()
    }
}

async function deleteButtonHandler(clickEvent) {
    const cardId = clickEvent.currentTarget.dataset.cardId;
    await dataHandler.deleteCard(cardId);
    await reset();
}

