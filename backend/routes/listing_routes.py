from flask import jsonify, Blueprint, redirect, request, session, url_for
from api_utils import jsonify_error, jwt_password
from models import ItemListing, db
from sqlalchemy import func
import jwt

bp = Blueprint("listing", __name__, url_prefix="/listing")
validate_user = False


# These routes will be protected by this authentication function.
def authenticate() -> tuple[bool, dict | None]:
    if "user_token" not in session:
        return False, None

    try:
        data = jwt.decode(session["user_token"], jwt_password)
    except KeyError or jwt.DecodeError:
        return False, None

    return True, data


@bp.before_request
def before():
    if validate_user and not authenticate():
        redirect(url_for("user_bp.user_login"))


@bp.route("/create", methods=["POST"])
def create():
    if not request.is_json:
        return jsonify_error(
            msg="The mime type of the request is not application/json",
            err="Invalid Mime Type.",
            status=400,
        )

    try:
        new_listing = ItemListing()
        post_creation_data = request.get_json()
        new_listing.itemtitle = post_creation_data["title"]
        new_listing.itemdescription = post_creation_data["description"]
        new_listing.itemprice = post_creation_data["price"]
        new_listing.itemavailability = post_creation_data["available"]
        new_listing.itemposteddate = post_creation_data["date"]
    except KeyError:
        return jsonify_error(
            msg="The shape of the creation data is invalid.",
            err="Malformed Request.",
            status=400,
        )

    db.session.add(new_listing)
    db.session.commit()

    return jsonify({"message": "Post created successfully."})


@bp.get("/retrieve")
def retrieve():
    posts_current_user = (
        ItemListing.query.filter_by(userid=id).order_by(func.random()).limit(10)
    )

    posts_other_users = (
        ItemListing.query.filter(ItemListing.userid != id)
        .order_by(func.random())
        .limit(10)
    )

    return_listings = {
        "listings_self": [
            {
                "title": post.itemtitle,
                "desc": post.itemdescription,
                "price": post.itemprice,
                "available": post.itemavailability,
                "data": post.itemposteddate,
            }
            for post in posts_current_user
        ],
        "listings_other": [
            {
                "title": post.itemtitle,
                "desc": post.itemdescription,
                "price": post.itemprice,
                "available": post.itemavailability,
                "data": post.itemposteddate,
            }
            for post in posts_other_users
        ],
    }

    return jsonify(return_listings)
