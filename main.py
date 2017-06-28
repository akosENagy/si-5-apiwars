from flask import Flask, render_template

app = Flask(__name__, static_url_path='/static')


@app.route('/')
def render_index_page():
    return render_template('index.html')


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
