from flask import Flask, render_template

def sample1():
    app = Flask(__name__,
                static_folder='web/static',
                template_folder='web/templates')
                # static_folder='sandbox/Blender_To_ThreeJS/src/public/',
                # template_folder='sandbox/Blender_To_ThreeJS/')

    @app.route('/')
    def index():
        # return render_template('simple.html')
        return render_template('index.html')

    if __name__ == '__main__':
        app.run(debug=True)

def sample2():
    app = Flask(__name__,
                static_folder='web/static',
                template_folder='web/templates')

    @app.route('/')
    def index():
        return render_template('simple.html')
        # return render_template('index.html')

    if __name__ == '__main__':
        app.run(debug=True)

def sample3():
    app = Flask(__name__,
                static_folder='web/static',
                template_folder='web/templates')
                # static_folder='sandbox/Blender_To_ThreeJS/public/',
                # template_folder='sandbox/Blender_To_ThreeJS/')

    @app.route('/')
    def index():
        return render_template('blenderindex.html')

    if __name__ == '__main__':
        app.run(debug=True)

sample3()