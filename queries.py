import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def get_statuses_for_board(board_id):
    matching_statuses = data_manager.execute_select(
        """
        SELECT * FROM boards_statuses
        LEFT JOIN statuses ON boards_statuses.status_id = statuses.id
        WHERE boards_statuses.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_statuses


def create_new_board(board_name):
    data_manager.execute_select(
        """
        INSERT INTO boards(title)
        VALUES(%(board_name)s)
        """
        , {"board_name": board_name}, select=False)
    for i in range(1, 5):
        data_manager.execute_select(
            """
            INSERT INTO boards_statuses
            VALUES((SELECT MAX(id) from boards ), %(status)s )
            """
            , {"status": i}, select=False)


    
def update_board_name(board_id, new_name):
    query = """UPDATE boards
               SET title = %(new_name)s
               WHERE id = %(board_id)s"""
    data_manager.execute_select(query,
                                variables={"board_id": board_id, "new_name": new_name},
                                select=False)

    
def create_new_user(username, password):
    data_manager.execute_select(
        """
        INSERT INTO users(username, password)
        VALUES(%(username)s, %(password)s)
        """
        , {"username": username, "password": password}, select=False)


def get_user_by_username(username):
    result = data_manager.execute_select(
        """
        SELECT * FROM users
        WHERE username = %(username)s;
        """
        , {"username": username},  fetchall=False)
    return result


def delete_card(card_id):
    data_manager.execute_select(
        """
        DELETE FROM cards 
        WHERE id = %(card_id)s;
        """, {"card_id": card_id}, select=False)


def create_card(card):
    data_manager.execute_select(
        """
        INSERT INTO cards (board_id, status_id, title, card_order) 
        VALUES (%(board_id)s, 
                %(status_id)s, 
                %(title)s, 
                (SELECT MAX(CARD_ORDER) FROM cards WHERE STATUS_ID=%(status_id)s AND BOARD_ID=%(board_id)s))
        """, {"board_id": card["board_id"],
              "status_id": card["status_id"],
              "title": card["title"]
              },
        select=False)