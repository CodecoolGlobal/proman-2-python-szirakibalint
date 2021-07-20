export const htmlTemplates = {
    board: 1,
    card: 2
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}

function boardBuilder(board) {
    return `<div class="board-container">
                <div class="board" data-board-id=${board.id}>${board.title}</div>
                <div id="change-board-name-${board.id}"><button class="change-board-name" data-board-id=${board.id}>Change Title</button></div>
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}

export function newBoardInput () {
    return `<input type="text" placeholder="Enter new board name" id="new-board-name" required autofocus autocomplete="off"><button id="submit-new-board-title">Save</button>`
}

export function newBoardButton () {
    return `<button type="button" id="load-new-board-form">Create new board</button>`
}
