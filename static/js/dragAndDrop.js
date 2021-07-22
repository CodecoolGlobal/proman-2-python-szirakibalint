import {dataHandler} from "./dataHandler.js";

export function initDragAndDrop() {
    let dragged;
    document.addEventListener("dragstart", function (event) {
        dragged = event.target;
    }, false);

    document.addEventListener("drop", function (event) {
        event.preventDefault();
        if (event.target.getAttribute("class") === "board-column-content" && event.target.getAttribute("data-board-id") === dragged.parentNode.getAttribute("data-board-id")) {
            const cardId = parseInt(dragged.getAttribute("data-card-id"))
            const statusId = parseInt(event.target.getAttribute("data-column-id"))
            const boardId = parseInt(event.target.getAttribute("data-board-id"))
            dataHandler.updateCard(cardId, statusId, boardId)
            dragged.parentNode.removeChild(dragged);
            event.target.appendChild(dragged);
        }
        dragged = "";
        }, false);

        document.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
}