import jwt
from flask import Blueprint, request, jsonify, session
from api_utils import jsonify_error, jwt_password
from hashpass import hash_salt, verify_hash
from models import UserInformation, db
from sqlalchemy import or_


bp = Blueprint("user", __name__, url_prefix="/user")


# User Create Route
@bp.route("/create", methods=["POST"])
def create():
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

        return jsonify({"message": "User successfully created."})

    else:
        return jsonify_error(
            msg="Request must have mime type application/json",
            err="Invalid Mime Type",
            status=400,
        )


# User Login Route
@bp.route("/login", methods=["POST"])
def login():
    if not request.is_json:
        return jsonify_error(
            msg="Request must have mime type application/json",
            err="Invalid Mime Type",
            status=400,
        )

    try:
        login_data = request.get_json()
        email = login_data["email"]
        password = login_data["password"]
    except KeyError:
        return jsonify_error(
            msg="Request must have mime type application/json",
            err="Invalid Mime Type",
            status=400,
        )

    user = UserInformation.query.filter_by(useremail=email).first()

    if not (user and verify_hash(password, user.password, user.password_salt)):
        return jsonify_error(
            msg="User does not exist.",
            err="Invalid User.",
            status=400,
        )

    userdict = user.__dict__
    return_object = {key: userdict[key] for key in ["userid", "username", "useremail"]}

    encoded_jwt = jwt.encode(return_object, jwt_password)

    # Set the user's session to the jwt
    session["user_token"] = encoded_jwt

    # Return a jwt as a response.
    return jsonify({"token": encoded_jwt})
