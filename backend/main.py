import os
from models import db
from routes import admin_routes, user_routes, listing_routes
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS


# Create the configuration string for the database.
def create_config_string():
    database_user = os.getenv("DB_USERNAME") or "default_user"
    database_password = os.getenv("DB_PASSWORD") or "default_password"
    database_name = os.getenv("DB_NAME") or "default_db_name"
    return f"postgresql://{database_user}:{database_password}@db:5432/{database_name}"


# Factory function to create the app.
def create_app():
    app = Flask(__name__)

    app.secret_key = os.getenv("SECRET_KEY") or os.urandom(16)

    CORS(app)  # Enable CORS

    app.config["SQLALCHEMY_DATABASE_URI"] = create_config_string()
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # Register Blueprints
    app.register_blueprint(admin_routes.bp)
    app.register_blueprint(user_routes.bp)
    app.register_blueprint(listing_routes.bp)

    return app


# Entry Point
if __name__ == "__main__":
    load_dotenv()
    app = create_app()

    with app.app_context():
        db.create_all()

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000,
    )
