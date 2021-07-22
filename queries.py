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


def check_status(status):
    exists = data_manager.execute_select(
        """
        SELECT 
        EXISTS(SELECT 1 FROM statuses
        WHERE title = %(status)s)
        """
        , {"status": status}, fetchall=False)
    exists = dict(exists)["exists"]
    return exists


def get_status_id(status):
    exists = check_status(status)
    if exists:
        data_id = data_manager.execute_select(
            """
            SELECT id
            FROM statuses
            WHERE title = %(status)s
            """
            , {"status": status}, fetchall=False)
    else:
        data_manager.execute_select(
            """
            INSERT INTO statuses(title)
            VALUES(%(status)s)
            """
            , {"status": status}, select=False)
        data_id = data_manager.execute_select(
            """
            SELECT MAX(id) AS id
            FROM statuses
            """
            , fetchall=False)
    status_id = data_id['id']
    return status_id


def create_new_column(board_id, status_id):
    if not check_if_column_exists(board_id, status_id):
        data_manager.execute_select(
            """
            INSERT INTO boards_statuses
            VALUES(%(board_id)s, %(status_id)s)
            """
            , {"board_id": board_id, "status_id": status_id}, select=False)


def update_column(board_id, status_id_old, status_id_new):
    if not check_if_column_exists(board_id, status_id_new):
        update_cards_by_column_change(board_id, status_id_old, status_id_new)
        data_manager.execute_select(
            """
            UPDATE boards_statuses
            SET status_id = %(status)s
            WHERE board_id = %(board)s AND status_id = %(old_status)s
            """
            , {"status": status_id_new, "board": board_id, "old_status": status_id_old}, select=False)


def check_status_id(status_id):
    exists = data_manager.execute_select(
        """
        SELECT 
        EXISTS(SELECT 1 FROM boards_statuses
        WHERE status_id = %(status_id)s)
        """
        , {"status_id": status_id}, fetchall=False)
    exists = dict(exists)["exists"]
    return exists


def delete_status(status_id):
    data_manager.execute_select(
        """
        DELETE from statuses
        WHERE id = %(status)s
        """
        , {"status": status_id}, select=False)


def delete_column(board_id, status_id):
    data_manager.execute_select(
        """
        DELETE 
        FROM boards_statuses
        WHERE board_id = %(board)s AND status_id = %(status)s
        """
        , {"board": board_id, "status": status_id}, select=False)


def delete_board(board_id):
    status_ids = data_manager.execute_select(
        """
        SELECT status_id
        FROM boards_statuses
        WHERE board_id = %(board)s
        """
        , {"board": board_id})
    data_manager.execute_select(
        """
        DELETE
        FROM boards_statuses
        WHERE board_id = %(board)s
        """
        , {"board": board_id}, select=False)
    data_manager.execute_select(
        """
        DELETE
        FROM cards
        WHERE board_id = %(board)s
        """
        , {"board": board_id}, select=False)
    data_manager.execute_select(
        """
        DELETE
        FROM boards
        WHERE id = %(board)s
        """
        , {"board": board_id}, select=False)
    return status_ids
  
  
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
                COALESCE(
                (SELECT MAX(CARD_ORDER) 
                    FROM cards 
                    WHERE STATUS_ID=%(status_id)s 
                    AND BOARD_ID=%(board_id)s),
                    0)+ 1)
        """, {"board_id": card["board_id"],
              "status_id": card["status_id"],
              "title": card["title"]
              },
        select=False)


def delete_cards_by_column(board_id, status_id):
    data_manager.execute_select(
        """
        DELETE
        FROM cards
        WHERE board_id = %(board)s AND status_id = %(status)s
        """
        , {"board": board_id, "status": status_id}, select=False)


def update_cards_by_column_change(board_id, status_id_old, status_id_new):
    data_manager.execute_select(
        """
        UPDATE cards
        SET status_id = %(status)s
        WHERE board_id = %(board)s AND status_id = %(old_status)s
        """
        , {"status": status_id_new, "board": board_id, "old_status": status_id_old}, select=False)


def check_if_column_exists(board_id, status_id):
    exists = data_manager.execute_select(
        """
        SELECT 
        EXISTS(SELECT 1 FROM boards_statuses
        WHERE status_id = %(status_id)s AND board_id = %(board_id)s)
        """
        , {"status_id": status_id, "board_id": board_id}, fetchall=False)
    exists = dict(exists)["exists"]
    return exists
