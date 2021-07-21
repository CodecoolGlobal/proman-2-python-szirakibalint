export let dataHandler = {
    getBoards: async function () {
        let response = await apiGet('/get-boards')
        return response
    },
    getBoard: async function(boardId) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function (boardId) {
        let response = await apiGet(`/get-statuses/${boardId}`)

        
        return response
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        let response = await apiGet(`/get-cards/${boardId}`)
        return response
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (boardTitle) {
        const payload = {"board_title": boardTitle}
        await apiPost('/boards', payload)
    },
    changeBoardTitle: async function (boardId, newBoardTitle) {
        const payload = {"board_id": boardId, "new_title": newBoardTitle}
        await apiPut('/boards', payload)
    },
    createNewColumn: async function (boardId, columnTitle) {
        const payload = {"board_id": boardId, "column_title": columnTitle}
        await apiPost('/columns', payload)
    },
    changeColumnTitle: async function (boardId, columnId, columnTitle) {
        const payload = {"board_id": boardId, "column_id": columnId, "column_title": columnTitle}
        await apiPut('/columns', payload)
    },
    deleteColumn: async function (boardId, columnId) {
        const payload = {"board_id": boardId, "column_id": columnId}
        await apiDelete('/columns', payload)
    },
    deleteBoard: async function (boardId) {
        const payload = {"board_id": boardId}
        await apiDelete('/boards', payload)
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
        const payload = {"title": cardTitle, "board_id":boardId, "status_id":statusId}
        await apiPost('/cards', payload)
    },

    deleteCard: async function (cardId) {
        await apiDelete(`cards/${cardId}`);
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: 'GET',
    })
    if (response.status === 200) {
        let data = response.json()
        return data
    }
}

async function apiPost(url, payload) {
    await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(payload)
    })
}


async function apiDelete(url, payload) {
    await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(payload)
    })

  
async function apiDelete(url) {
    await fetch(url, {method : 'DELETE'})
}

async function apiPut(url, payload) {
    await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify(payload)
})
}}
