from flask import Blueprint, request, jsonify

bp = Blueprint("admin", __name__, url_prefix="/admin")


# Admin Create Route
@bp.route("/create", methods=["POST"])
def create():
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
