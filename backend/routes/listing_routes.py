from flask import jsonify, Blueprint, request, g
from api_utils import jsonify_error, jwt_password
from models import ItemListing, db
from sqlalchemy import func
import jwt


bp = Blueprint("listing", __name__, url_prefix="/listing")


@bp.before_request
def before():
    invalid_response = jsonify_error(
        err="Not Authorized",
        msg="User does not have permission to access this resource",
        status=401,
    )

    header = request.headers.get("Authorization")

    if not header or not header.startswith("Bearer "):
        return invalid_response

    try:
        token = header.split(" ")[1]
        decoded = jwt.decode(token, jwt_password, ["HS256"])
        setattr(g, "user_data", decoded)
    except:
        return invalid_response


@bp.route("/create", methods=["POST"])
def create():
    user_data = getattr(g, "user_data", None)
    if not user_data or not (user_id := user_data["userid"]):
        return jsonify_error(
            err="User ID Not found.",
            msg="User ID was not found in the request token.",
            status=401,
        )

    if not request.is_json:
        return jsonify_error(
            msg="The mime type of the request is not application/json",
            err="Invalid Mime Type.",
            status=400,
        )

    try:
        post_creation_data = request.get_json()
        new_listing = ItemListing()
        new_listing.itemtitle = post_creation_data["title"]
        new_listing.itemdescription = post_creation_data["description"]
        new_listing.itemprice = post_creation_data["price"]
        new_listing.itemavailability = post_creation_data["available"]
        new_listing.itemposteddate = post_creation_data["date"]
        new_listing.userid = user_id
        db.session.add(new_listing)
        db.session.commit()
    except KeyError:
        return jsonify_error(
            msg="The shape of the creation data is invalid.",
            err="Malformed Request.",
            status=400,
        )
    except:
        return jsonify_error(
            msg="An unknown error has occurred.",
            err="Unknown Error",
            status=400,
        )

    return jsonify({"message": "Post successfully created."})


@bp.get("/retrieve/<string:target>")
def retrieve(target: str):
    user_data = getattr(g, "user_data", None)
    if not user_data or not (user_id := user_data["userid"]):
        return jsonify_error(
            err="User ID Not found.",
            msg="User ID was not found in the request token.",
            status=401,
        )

    if target == "self":
        items = ItemListing.query.filter(ItemListing.userid == user_id)
    elif target.isdigit():
        items = ItemListing.query.filter(ItemListing.userid == int(target))
    else:
        items = ItemListing.query.filter(ItemListing.userid != user_id)

    if items.first():
        post_list = items.order_by(func.random()).limit(10)
    else:
        return jsonify_error(
            err="Nonexistent listings.",
            msg="No listings currently exist.",
            status=400,
        )

    listings_toreturn = {
        post.item_id: {
            "user_id": post.userid,
            "data": {
                "title": post.itemtitle,
                "desc": post.itemdescription,
                "price": post.itemprice,
                "available": post.itemavailability,
                "date": post.itemposteddate,
            },
        }
        for post in post_list
    }

    return jsonify(listings_toreturn)
