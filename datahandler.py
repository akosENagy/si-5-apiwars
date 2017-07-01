import psycopg2
from flask import session
from werkzeug import security

CONNECTION_STRING = "dbname='swapi' user='aakeeka' host='localhost' password='postgresql'"


def init_db_connection(connection_string=CONNECTION_STRING):
    '''
    Returns a psycopg2 cursor after connecting with the specified string.
    Connection string format: "dbname='dbname' user='user' host='host' password='password'"
    '''
    try:
        conn = psycopg2.connect(connection_string)
        # set autocommit option, to do every query when we call it
        conn.autocommit = True
        # create a psycopg2 cursor that can execute queries
        cursor = conn.cursor()
    except psycopg2.DatabaseError as e:  # TODO don't use this, remember: "raise PythonicError("Errors should never go silently.")
        print(e)
        return [[e]] 

    return cursor


def insert_user(username, password):
    '''
    Inserts a un-pw pair into the database with hashed pw.
    '''
    password = security.generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)
    try:
        cursor = init_db_connection(connection_string=CONNECTION_STRING)
        cursor.execute("""INSERT INTO users (username, password) VALUES (%s, %s);""", (username, password))
        return True
    except psycopg2.ProgrammingError as e:
        return False
    except psycopg2.IntegrityError as e:
        return False


def validate_user(username, password):
    try:
        cursor = init_db_connection(connection_string=CONNECTION_STRING)
        cursor.execute("""SELECT username, password FROM users
                          WHERE username=%s;""", (username,))

        try:
            results = cursor.fetchall()[0]
        except IndexError as e:
            return False

        if security.check_password_hash(results[1], password):  # successful login
            return True

    except Exception as e:
        print(e)
        return [[e]]
