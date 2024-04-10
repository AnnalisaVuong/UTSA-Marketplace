import os
from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from models import (
    db,
    TransactionHistory,
    TradingPost,
    ItemListing,
    UserInformation,
    AdminInformation,
)
from hashpass import hash_salt, verify_hash
from uuid import uuid4

load_dotenv()

app = Flask(__name__)


CORS(app)  # Enable CORS

# Database Config
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"postgresql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@db:5432/{os.getenv('DB_NAME')}"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)


user_bp = Blueprint("user", __name__)
admin_bp = Blueprint("admin", __name__)


# User Create Route
@user_bp.route("/user/create", methods=["POST"])
def user_create():
    if request.is_json:
        try:
            data = request.get_json()
            username = data.get("username")
            password = data.get("password")
            confirm = data.get("confirm_password")
            first_name = data.get("first_name")
            last_name = data.get("last_name")
            email = data.get("email")
            phone_number = data.get("phone_number")
        except:
            return jsonify({"error": "Invalid user data provided"}), 400

        if confirm != password:
            return jsonify({"error": "Confirm password must match password."}), 400

        hashed_password, salt = hash_salt(password)
        collision = UserInformation.query.filter_by(useremail=email).first()

        if collision:
            return jsonify({"error": "A user with the same email already exists."}), 400

        new_user = UserInformation()
        new_user.username = username
        new_user.password = hashed_password
        new_user.password_salt = salt
        new_user.user_fname = first_name
        new_user.user_lname = last_name
        new_user.user_email = email
        new_user.user_phone = phone_number

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User account created successfully"})

    else:
        return jsonify({"error": "Invalid JSON"})


# User Login Route
@user_bp.route("/user/login", methods=["POST"])
def user_login():
    res = None
    if request.is_json:
        request_data = request.get_json()
        res = jsonify(
            {"message": "User successfully logged in.", "data": str(request_data)}
        )
        res.status_code = 200

    else:
        res = jsonify({"message": "Error in request object."})
        res.status_code = 200

    return res


# Admin Create Route
@admin_bp.route("/admin/create", methods=["POST"])
def admin_create():
    if request.is_json:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        phone_number = data.get("phone_number")

        to_print = f"Received data: Username: {username}, Password: {password}, First Name: {first_name}, Last Name: {last_name}, Email: {email}, Phone Number: {phone_number}"

        return jsonify(
            {"message": "User account created successfully", "msg": to_print}
        )
    else:
        return jsonify({"error": "Invalid JSON"}), 400


@app.route("/test/db")
def test_db_connection():
    try:
        return jsonify({"message": "DB connected"})
    except Exception as e:
        return jsonify({"error": "failed", "details": str(e)}), 500


@app.route("/")
def hello():
    return "Hello World"


app.register_blueprint(user_bp)
app.register_blueprint(admin_bp)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000,
    )
