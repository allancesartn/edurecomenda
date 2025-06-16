
from flask import Flask
from controllers.curso_controller import curso_bp
from utils.error_handlers import register_error_handlers
from flasgger import Swagger
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    Swagger(app)
    app.register_blueprint(curso_bp)
    register_error_handlers(app)
    return app

def create_app():
    app = Flask(__name__)
    CORS(app)
    Swagger(app)
    app.register_blueprint(curso_bp)
    register_error_handlers(app)
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
