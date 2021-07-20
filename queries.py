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


def create_new_board(board_name):
    data_manager.execute_select(
        """
        INSERT INTO boards(title)
        VALUES(%(board_name)s)
        """
        , {"board_name": board_name}, select=False)

    
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
  