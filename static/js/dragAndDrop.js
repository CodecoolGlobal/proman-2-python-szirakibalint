import {dataHandler} from "./dataHandler.js";

export function initDragAndDrop() {
    let dragged;
    document.addEventListener("dragstart", function (event) {
        dragged = event.target;
    }, false);
    const dropZones = document.querySelectorAll(".board-column-content, .card")
    for (const dropZone of dropZones) {
        dropZone.addEventListener("drop", async function (event) {
            event.preventDefault();
            if (event.currentTarget.classList.contains(".board-column-content")
                && event.currentTarget.dataset.boardId === dragged.parentNode.dataset.boardId)
            {
                const cardId = parseInt(dragged.dataset.cardId)
                const statusId = parseInt(event.currentTarget.dataset.columnId)
                const boardId = parseInt(event.currentTarget.dataset.boardId)
                await dataHandler.updateCard(cardId, statusId, boardId)
            } else if (event.currentTarget.classList.contains("card")
                && event.currentTarget.parentNode.dataset.boardId === dragged.parentNode.dataset.boardId)
            {
                const cardId = parseInt(dragged.dataset.cardId)
                const statusId = parseInt(event.currentTarget.parentNode.dataset.columnId)
                const boardId = parseInt(event.currentTarget.parentNode.dataset.boardId)
                await dataHandler.updateCard(cardId, statusId, boardId)
            }
            dragged = "";
        }, false);
        dropZone.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);

        dropZone.addEventListener("dragenter", function (event) {
            event.preventDefault();
            if (event.currentTarget.classList.contains("board-column-content")
                && event.currentTarget.dataset.boardId === dragged.parentNode.dataset.boardId) {
                event.currentTarget.appendChild(dragged);
            }
        })
    }


}