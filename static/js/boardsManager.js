import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates, newBoardButton, newBoardInput } from "./htmlFactory.js";
import { domManager } from "./domManager.js";
import { cardsManager } from "./cardsManager.js";


function initNewBoardButton () {
    domManager.addChild("#root", `<div id="new-table-form"></div>`)
    let newButton = newBoardButton()
    domManager.addChild('#new-table-form', newButton)
    domManager.addEventListener('#load-new-table-form', 'click', () => {
        const form = document.querySelector('#new-table-form')
        form.innerHTML = newBoardInput()
        domManager.addEventListener('#submit-new-board-title', 'click', async () => {
            let boardTitle = document.querySelector('#new-table-name')
            console.log(boardTitle.value)
            await dataHandler.createNewBoard(boardTitle.value)
        })
    })
}

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        initNewBoardButton()
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board)
            domManager.addChild("#root", content)
            domManager.addEventListener(`.toggle-board-button[data-board-id="${board.id}"]`, "click", showHideButtonHandler)
        }
    },
}

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    cardsManager.loadCards(boardId)
}
