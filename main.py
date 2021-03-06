from flask import Flask, render_template, url_for, request, redirect, session
from util import json_response, hash_pw, check_pw

import queries

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.before_first_request
def before_first_request():
    session.clear()


@app.route("/", methods=['GET', 'POST', 'PUT', 'DELETE'])
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/boards", methods=['POST'])
def create_board():
    board_name = request.get_json()["board_title"]
    private = request.get_json()["private"]
    user_id = session.get("id", None) if private else None
    queries.create_new_board(board_name, user_id)
    return redirect('/')


@app.route("/boards/<board_id>", methods=['DELETE'])
def delete_board(board_id):
    status_ids = queries.delete_board(board_id)
    for status_id in status_ids:
        if not queries.check_status_id(status_id["status_id"]):
            queries.delete_status(status_id["status_id"])
    return redirect('/')


@app.route("/boards/<board_id>", methods=['PUT'])
def update_board(board_id):
    request_json = request.get_json()
    new_board_name = request_json["new_title"]
    queries.update_board_name(board_id, new_board_name)
    return redirect('/')


@app.route("/columns", methods=['POST'])
def columns():
    column_name = request.get_json()["column_title"]
    board_id = request.get_json()["board_id"]
    status_id = queries.get_status_id(column_name)
    queries.create_new_column(board_id, status_id)
    return redirect('/')


@app.route("/columns/<board_id>/<status_id>", methods=['PUT'])
def update_column(board_id, status_id):
    request_json = request.get_json()
    column_title = request_json["column_title"]
    status_id_new = queries.get_status_id(column_title)
    queries.update_column(board_id, status_id, status_id_new)
    if not queries.check_status_id(status_id):
        queries.delete_status(status_id)
    return redirect('/')


@app.route("/columns/<board_id>/<status_id>", methods=['DELETE'])
def delete_column(board_id, status_id):
    queries.delete_column(board_id, status_id)
    queries.delete_cards_by_column(board_id, status_id)
    if not queries.check_status_id(status_id):
        queries.delete_status(status_id)
    return redirect('/')


@app.route("/get-boards")
@json_response
def get_boards():
    user_id = session.get("id", None)
    print(queries.get_boards(user_id))
    return queries.get_boards(user_id)


@app.route("/get-board/<board_id>")
@json_response
def get_specific_board(board_id):
    return queries.get_board_by_id(board_id)


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.route("/get-archived-cards")
@json_response
def get_archived_cards():
    return queries.get_archived_cards()


@app.route("/get-statuses/<int:board_id>")
@json_response
def get_statuses_for_board(board_id: int):
    return queries.get_statuses_for_board(board_id)


@app.route('/registration', methods=['GET', 'POST'])
def registration():
    message = ''
    if request.method == 'POST':
        username = dict(request.form)['username']
        password = dict(request.form)['password']
        if queries.get_user_by_username(username):
            message = 'This username already exists.'
            return render_template('registration.html', message=message)
        else:
            queries.create_new_user(username, hash_pw(password))
            return redirect(url_for('index'))
    return render_template('registration.html', message=message)


@app.route('/login', methods=['GET', 'POST'])
def login():
    message = ''
    if request.method == 'POST':
        username = dict(request.form)['username']
        password = dict(request.form)['password']
        user = queries.get_user_by_username(username)
        if user:
            if check_pw(password, user['password']):
                session['username'] = username
                session['id'] = user['id']
                return redirect(url_for('index'))
        message = 'Invalid username or password'

    return render_template('login.html', message=message)


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


@app.route('/cards/<card_id>', methods=['DELETE'])
def delete_card(card_id):
    queries.delete_card(card_id)
    return "ok"


@app.route('/cards/<card_id>', methods=['PUT'])
def update_card(card_id):
    request_json = request.get_json()
    if 'updated_title' in request_json.keys():
        updated_title = request_json['updated_title']
        queries.update_card_title(card_id, updated_title)
    else:
        status_id = request_json["status_id"]
        board_id = request_json["board_id"]
        queries.update_card_status(card_id, status_id, board_id)
    return "ok"


@app.route('/cards/archive/<card_id>', methods=['PUT'])
def modify_archive(card_id):
    archive = request.get_json()["archive"]
    print(archive)
    queries.modify_archive(card_id, archive)
    return "ok"


@app.route('/cards', methods=['POST'])
def create_card():
    if request.method == 'POST':
        card = request.get_json()
        queries.create_card(card)
    return "ok"


def main():
    app.run(debug=True, port=8001)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


# if __name__ == '__main__':
#     main()
