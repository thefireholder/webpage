from flask import Flask, render_template

app = Flask(__name__,
            static_folder='./',
            template_folder='./')

@app.route('/')
def index():
    # return render_template('simple.html')
    return render_template('slide.html')

if __name__ == '__main__':
    app.run(debug=True)
