import os
from hashpass import hash_salt, verify_hash
from flask import Flask, Blueprint, Response, request, jsonify, redirect
from sqlalchemy import or_
from flask_cors import CORS
from dotenv import load_dotenv
from api_utils import jsonify_error
import jwt

from models import (
    db,
    TransactionHistory,
    TradingPost,
    ItemListing,
    UserInformation,
    AdminInformation,
)

load_dotenv()

app = Flask(__name__)


CORS(app)  # Enable CORS


# Create the configuration string for the database.
def create_config_string():
    database_user = os.getenv("DB_USERNAME") or "administrator"
    database_password = os.getenv("DB_PASSWORD") or "default_password"
    database_name = os.getenv("DB_NAME") or "utsa_marketplace"
    return f"postgresql://{database_user}:{database_password}@db:5432/{database_name}"


# Database Config
app.config["SQLALCHEMY_DATABASE_URI"] = create_config_string()

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
            username = data["username"]
            password = data["password"]
            confirm = data["confirm_password"]
            first_name = data["first_name"]
            last_name = data["last_name"]
            email = data["email"]
            phone_number = data["phone_number"]
        except KeyError:
            return jsonify_error(
                msg="Invalid Form Data Provided.",
                err="Invalid Data",
                status=400,
            )

        if confirm != password:
            return jsonify_error(
                msg="Confirm password must match password.",
                err="Password Confirmation Mismatch",
                status=400,
            )

        hashed_password, salt = hash_salt(password)
        collision = UserInformation.query.filter(
            or_(
                UserInformation.useremail == email,
                UserInformation.username == username,
            )
        ).first()

        if collision:
            email_collision = collision.useremail == email
            return jsonify_error(
                msg=f"A user with the same {'email' if email_collision else 'username'} already exists.",
                err=f"{'User Email' if email_collision else 'Username'} Conflict",
                status=400,
            )

        new_user = UserInformation()
        new_user.username = username
        new_user.password = hashed_password
        new_user.password_salt = salt
        new_user.user_fname = first_name
        new_user.user_lname = last_name
        new_user.useremail = email
        new_user.user_phone = phone_number

        db.session.add(new_user)
        db.session.commit()

        # Redirect the user to the login screen.
        return redirect(request.url_root + "Login")

    else:
        return jsonify_error(
            msg="Request must have mime type application/json",
            err="Invalid Mime Type",
            status=400,
        )


# User Login Route
@user_bp.route("/user/login", methods=["POST"])
def user_login():
    if not request.is_json:
        return jsonify_error(
            msg="Request must have mime type application/json",
            err="Invalid Mime Type",
            status=400,
        )

    try:
        login_data = request.get_json()
        username = login_data["username"]
        password = login_data["password"]
    except KeyError:
        return jsonify_error(
            msg="Request must have mime type application/json",
            err="Invalid Mime Type",
            status=400,
        )

    user = UserInformation.query.filter_by(username=username).first()

    if not (user and verify_hash(password, user.password, user.password_salt)):
        return jsonify_error(
            msg="User does not exist.",
            err="Invalid User.",
            status=400,
        )

    userdict = user.__dict__
    return_object = {
        key: userdict[key] for key in ["userid", "user_phone", "username", "useremail"]
    }

    # Return a jwt as a response.
    return jsonify(
        {"token": jwt.encode(return_object, os.getenv("JWT_KEY") or "password")}
    )


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
