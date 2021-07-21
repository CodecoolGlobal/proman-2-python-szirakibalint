from flask import Flask, render_template, url_for, request, jsonify, redirect, session
from util import json_response, hash_pw, check_pw

import queries

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route("/", methods=['GET', 'POST', 'PUT'])
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/boards", methods=['POST', 'PUT'])
def boards():
    if request.method == 'POST':
        board_name = request.get_json()["board_title"]
        queries.create_new_board(board_name)
    elif request.method == 'PUT':
        request_json = request.get_json()
        board_id = request_json["board_id"]
        new_board_name = request_json["new_title"]
        queries.update_board_name(board_id, new_board_name)
    return redirect('/')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


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
        print(user['password'])
        if user:
            if check_pw(password, user['password']):
                session['username'] = username
                return redirect(url_for('index'))
        message = 'Invalid username or password'

    return render_template('registration.html', message=message)


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
