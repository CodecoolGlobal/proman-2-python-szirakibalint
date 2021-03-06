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
            return () => {
                return ""
            }
    }
}

function boardBuilder(board) {
    if (board.id !== 0) {
        console.log(board)
        return `<section class="board" data-board-id=${board.id}>
                <div class="board-header">
                    <span class="board-title" >${board.title}</span>
                    <span id="change-board-title-${board.id}"><button class="change-board-title" data-board-id=${board.id}>Change Title</button></span>
                    <span id="add-new-column-${board.id}"><button class="add-new-column" data-board-id=${board.id}>Add new column</button></span>
                    <span id="delete-board-${board.id}"><button class="delete-board" data-board-id=${board.id}>Delete board</button></span>
                    <span id="add-new-card-${board.id}"><button class="board-add" data-board-id=${board.id}>Add card</button></span>
                    <span id="show-archived-${board.id}"><button class="show-archived" data-board-id=${board.id}>Archived boards</button></span>
                    <button class="board-toggle" data-toggle-state="hide" data-board-id="${board.id}">Show Cards <i class="fas fa-chevron-down"></i></button>
                </div>
                <div class="board-columns"></div>
            </section>`
    }
    else {
        return `
            <div class="modal" id="modal">
            <div class="modal-content">
            <section class="board" data-board-id=${board.id}>
                <div class="board-header">
                    <span class="board-title" >${board.title}</span>
                    <span id="close-modal-${board.id}"><button class="close-modal" data-board-id=${board.id}>Close</button></span>
                    <button class="board-toggle" data-toggle-state="hide" data-board-id="${board.id}">Show Cards<i class="fas fa-chevron-down"></i></button>
                </div>
                <div class="board-columns"></div>
            </section>
            </div>
            </div>`
    }
}


function columnBuilder(column, boardId) {
    if (boardId !== 0) {
        return `<div class="board-column" data-column-id="${column.id}" data-board-id="${boardId}">
                <div class="board-column-header">
                    <div class="board-column-title" id="board-column-title-${boardId}-${column.id}" data-board-id="${boardId}" data-column-id="${column.id}" contenteditable="true" spellcheck="false">${column.title}</div>
                    <span class="delete-column-button"><i class="fas fa-trash-alt" id="delete-column-button-${boardId}-${column.id}" data-board-id=${boardId} data-column-id=${column.id}></i></span>
                </div>
                <div class="board-column-content" data-column-id="${column.id}" data-board-id="${boardId}"></div>
             </div>`;
    } else {
        return `<div class="board-column" data-column-id="${column.id}" data-board-id="${boardId}">
                <div class="board-column-title"> ${column.title} </div>
                <div class="board-column-content" data-column-id="${column.id}" data-board-id="${boardId}"></div>
             </div>`;
    }
}


function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}" data-card-order="${card.card_order}" draggable="true">
                <div class="card-archive" data-card-id="${card.id}"><i class="fas fa-archive"></i></div>
                <div class="card-remove" data-card-id="${card.id}"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title" contenteditable="true" spellcheck="false">${card.title}</div>
            </div>`;
}

export function newBoardInput(boardId = "") {
    boardId = boardId ? `-${boardId}` : ""
    return `<input type="text" 
                    placeholder="Enter new board title" 
                    id="new-board-title${boardId}" 
                    required 
                    autofocus 
                    autocomplete="off">
            <input type="checkbox" value="true" id="private-checkbox${boardId}">
            <label for="private-checkbox${boardId}">Private</label>
           <button id="submit-new-board-title${boardId}">Save</button>`
}

export function newBoardButton() {
    return `<button type="button" id="load-new-board-form">Create new board</button>`
}

export function newColumnInput (board_id, column_id="") {
    column_id = column_id ? `-${column_id}` : ""
    return `<input type="text" placeholder="Enter new column title" id="new-column-title-${board_id}${column_id}" required autofocus autocomplete="off"><button id="submit-new-column-title-${board_id}${column_id}">Save</button>`
}


export function newCardInput(boardId = "") {

    return `<input type="text" 
                    placeholder="Enter new card title" 
                    id="new-card-title-${boardId}" 
                    required 
                    autofocus 
                    autocomplete="off">
            <button id="submit-new-card-${boardId}" data-board-id="${boardId}">
                    Save
              </button>`
}

