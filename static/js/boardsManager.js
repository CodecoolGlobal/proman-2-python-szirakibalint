import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";
import { cardsManager } from "./cardsManager.js";
import {columnsManager} from "./columnsManager.js";
import * as uiManager from "./uiManager.js";


export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        let boardContainer = document.createElement('div')
        boardContainer.className = 'board-container'
        const root = document.querySelector('#root')
        root.appendChild(boardContainer)
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board)
            domManager.addChild(".board-container", content)
            domManager.addEventListener(`.board-toggle[data-board-id="${board.id}"]`, "click", showHideButtonHandler)
            domManager.addEventListener(`.change-board-title[data-board-id="${board.id}"]`, "click", renameTable)
            domManager.addEventListener(`.add-new-column[data-board-id="${board.id}"]`, "click", addNewColumn)
            domManager.addEventListener(`.delete-board[data-board-id="${board.id}"]`, "click", deleteBoard)
            domManager.addEventListener(`.board-add[data-board-id="${board.id}"]`, "click", addCard)
            const isOpen = JSON.parse(localStorage.getItem("isOpen"));
            if (isOpen[board.id]){
                const button = document.querySelector(`.board-toggle[data-board-id="${board.id}"]`)
                await openBoard(board.id, button);
            }
        }
        const archiveBoard = await dataHandler.getBoard(0)
        await loadArchiveBoard(archiveBoard)
    },
}

async function loadArchiveBoard(archiveBoard){
    const boardBuilder = htmlFactory(htmlTemplates.board);
    const content = boardBuilder(archiveBoard)
    domManager.addChild(".board-container", content)
    domManager.addEventListener(`.board-toggle[data-board-id="${archiveBoard.id}"]`, "click", showHideButtonHandler)
    const isOpen = JSON.parse(localStorage.getItem("isOpen"));
    if (isOpen[archiveBoard.id]){
        const button = document.querySelector(`.board-toggle[data-board-id="${archiveBoard.id}"]`)
        await openBoard(archiveBoard.id, button);
    }
}

async function openBoard(boardId, button){
    await columnsManager.loadColumns(boardId);
    await cardsManager.loadCards(boardId);
    button.dataset.toggleState = "show";
    button.innerHTML= ` Hide cards <i class=\"fas fa-chevron-up\"></i> `;
}

async function closeBoard(boardId, button){
    const columnContent = document.querySelector(`.board[data-board-id="${boardId}"] .board-columns`)
    columnContent.innerHTML = '';
    button.dataset.toggleState = "hide";
    button.innerHTML= ` Show cards <i class=\"fas fa-chevron-down\"></i> `;
}


async function showHideButtonHandler(clickEvent) {
    const button = clickEvent.target;
    const boardId = button.dataset.boardId;
    const isOpen = JSON.parse(localStorage.getItem("isOpen"));
    if (isOpen[boardId] === false) {
        await openBoard(boardId, button)
        isOpen[boardId] = true;
    } else {
        await closeBoard(boardId, button)
        isOpen[boardId] = false;
    }
    localStorage.setItem("isOpen", JSON.stringify(isOpen));
    console.log(localStorage.getItem("isOpen"));
}

function renameTable(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    uiManager.initRenameButton(boardId)
}

function addNewColumn(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    uiManager.initAddNewColumnButton(boardId)
}



async function deleteBoard(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    await uiManager.initDeleteBoardButton(boardId)
}

async function addCard(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    const button = document.querySelector(`.board[data-board-id="${boardId}"] .board-toggle`);
    if (button.dataset.toggleState === "hide") {
        await openBoard(boardId, button);
        const isOpen = JSON.parse(localStorage.getItem("isOpen"));
        isOpen[boardId] = true;
        localStorage.setItem("isOpen", JSON.stringify(isOpen));
    }
    uiManager.initCardForm(boardId);
}
