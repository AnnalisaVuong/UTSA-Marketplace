import secrets
import flask
import requests
from os import environ as env
from urllib.parse import urlencode


oauth = flask.Blueprint("oauth", __name__)

TOKEN_LINK = "https://oauth2.googleapis.com/token"
OAUTH_LINK = "https://accounts.google.com/o/oauth2/v2/auth"
SCOPES = ["https://www.googleapis.com/auth/userinfo.email", "openid"]


@oauth.route("/oauth/<string:service>", methods=["GET"])
def oauth_entry(service: str):
    if service == "google":
        # Generate a random state variable and add it to the session.
        state = secrets.token_urlsafe(16)
        flask.session["state"] = state

        # Request a token via building a link and send the user to it.
        url_params = {
            "endpoint": OAUTH_LINK,
            "client_id": env["OAUTH_CLIENT_ID"],
            "redirect_uri": flask.url_for("oauth.callback", _external=True),
            "response_type": "code",
            "scope": " ".join(SCOPES),
            "access_type": "offline",
            "state": state,
            "_external": True,
        }

        # Encode the url parameters into a query string: https://en.wikipedia.org/wiki/Query_string
        encoded_params = urlencode(url_params)
        oauth_link = f"{OAUTH_LINK}?{encoded_params}"

        # Redirect the user to this link.
        return flask.redirect(oauth_link)
    else:
        return "Request Invalid.", 400


@oauth.route("/oauth/callback", methods=["GET"])
def callback():
    # Fetch the query parameters from the link used to access this route.
    get_link_query_param = lambda x: flask.request.args[x]
    code = get_link_query_param("code")
    state = get_link_query_param("state")

    # Declare a failure response.
    res_failure = flask.jsonify({"err": "Callback failed"})

    # Check to make sure that the state matches.
    if state != flask.session["state"]:
        return res_failure

    # Link Query Parameters.
    params = {
        "client_id": env["OAUTH_CLIENT_ID"],
        "client_secret": env["OAUTH_CLIENT_SECRET"],
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": flask.url_for("oauth.callback", _external=True),
    }

    # Declare the content type of this request.
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    # Exchange the token "code" with the authorization server.
    exchange_res = requests.post(TOKEN_LINK, data=params, headers=headers)

    if exchange_res.status_code != 200:
        return "Unable to find token associated with account.", 400

    exchange_response_data = exchange_res.json()
    token = exchange_response_data["access_token"]

    # Set the session for the user to the data that was returned.
    flask.session["credentials"] = {
        "token": exchange_response_data["access_token"],
        "expiration_time": exchange_response_data["expires_in"],
        "type": exchange_response_data["token_type"],
        "scopes": exchange_response_data["scope"],
        "refresh_token": exchange_response_data["id_token"],
    }

    # Get the email address and associated user id.
    EMAIL_LINK = "https://www.googleapis.com/oauth2/v2/userinfo"
    email_res = requests.get(EMAIL_LINK, headers={"Authorization": f"Bearer {token}"})

    # For now, respond with a json of the user data returned from the email probe.
    if email_res.status_code == 200:
        # TODO: Add or update a user object in the database with the email in response.
        return flask.jsonify(email_res)
    else:
        return "Unable to get the user email.", 400
