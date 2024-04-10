from datetime import datetime
from flask import jsonify


def jsonify_error(err, msg, status):
    response = ErrorResponseJSON(msg, err, status)
    res = jsonify(vars(response))
    res.status_code = status
    return res


# Error JSON Object Template
class ErrorResponseJSON:
    timestamp = str(datetime.now())

    def __init__(self, message: str, error_name: str, status: int):
        self.status = status
        self.error = error_name
        self.message = message
