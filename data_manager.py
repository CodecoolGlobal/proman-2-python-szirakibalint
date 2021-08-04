import os
import psycopg2
import psycopg2.extras


def establish_connection():
    connection_string = os.environ.get('DATABASE_URL')
    connection = psycopg2.connect(connection_string)
    return connection


def execute_statement(statement, variables=None, fetchall=True, select=True):
    result_set = []
    with establish_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
            cursor.execute(statement, variables)
            if select:
                result_set = cursor.fetchall() if fetchall else cursor.fetchone()
    return result_set
