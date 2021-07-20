export const htmlTemplates = {
    board: 1,
    card: 2,
    column: 3
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.column:
            return columnBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}

function boardBuilder(board) {
    return `<section class="board" data-board-id=${board.id}>
            <div class="board-header">
                <div class="board" >${board.title}</div>
                <div id="change-board-name-${board.id}"><button class="change-board-name" data-board-id=${board.id}>Change Title</button></div>
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
            </div>
            <div class="board-columns">
            </div>
            </section>`;
}


function columnBuilder(column) {
    return `<div class="board-column">
                <div class="board-column-title"> ${column.title} </div>
                <div class="board-column-content"></div>
             </div>`;
}


function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}

export function newBoardInput (board_id="") {
    board_id = board_id ? `-${board_id}` : ""
    return `<input type="text" placeholder="Enter new board name" id="new-board-name${board_id}" required autofocus autocomplete="off"><button id="submit-new-board-title${board_id}">Save</button>`
}

export function newBoardButton () {
    return `<button type="button" id="load-new-board-form">Create new board</button>`
}
