from flask import Flask, render_template, request, redirect, url_for, session
import datahandler


app = Flask(__name__, static_url_path='/static')
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


@app.route('/')
def render_index_page():
    if 'username' in session:
        return render_template('index.html', message="Signed in as " + session['username'])
    return render_template('index.html', message="You are not signed in.")


@app.route('/register')
def render_reg_page():
    return render_template('userform.html', eventUrl='/register_user')


@app.route('/register_user', methods=["POST"])
def register_user():
    username = request.form["username"]
    password = request.form["password"]
    if datahandler.insert_user(username, password):
        session['username'] = username
        return redirect(url_for('render_index_page'))
    else:
        return render_template('userform.html', eventUrl='/register_user', error_msg="Username already exists!")


@app.route('/login')
def render_login_page():
    return render_template('userform.html', eventUrl="/login_user")


@app.route('/login_user', methods=["POST"])
def login_user():
    username = request.form["username"]
    password = request.form["password"]
    if datahandler.validate_user(username, password):
        session['username'] = username
        return redirect(url_for('render_index_page'))

    return render_template('userform.html', eventUrl="/login_user", error_msg="Invalid username/password combination.")


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('render_index_page'))


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
