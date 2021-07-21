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
                    <span class="board-title" >${board.title}</span>
                    <span id="change-board-title-${board.id}"><button class="change-board-title" data-board-id=${board.id}>Change Title</button></span>
                    <span id="add-new-column-${board.id}"><button class="add-new-column" data-board-id=${board.id}>Add new column</button></span>
                    <button class="board-toggle" data-toggle-state="hide" data-board-id="${board.id}">
                        Show Cards
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
                <div class="board-columns"></div>
            </section>`
}

function columnBuilder(column) {
    return `<div class="board-column" data-column-id="${column.id}">
                <div class="board-column-title"> ${column.title} </div>
                <div class="board-column-content"></div>
             </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">
                <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title">${card.title}</div>
            </div>`;
}

export function newBoardInput (board_id="") {
    board_id = board_id ? `-${board_id}` : ""
    return `<input type="text" placeholder="Enter new board title" id="new-board-title${board_id}" required autofocus autocomplete="off"><button id="submit-new-board-title${board_id}">Save</button>`
}

export function newBoardButton () {
    return `<button type="button" id="load-new-board-form">Create new board</button>`
}
