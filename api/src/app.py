from typing import Any, Dict, Tuple
from flask import Flask
from pydantic import ValidationError
from db import init_db
from routes import recipes, user
from http import HTTPStatus


app = Flask(__name__)

init_db(app)
app.register_blueprint(user.bp)
app.register_blueprint(recipes.bp)


def validation_error_handler(e: ValidationError) -> Tuple[Dict[str, Any], int]:
    errors = []
    for err_detail in e.errors():
        err_dict = {
            "type": err_detail["type"],
            "msg": err_detail["msg"],
            "input": err_detail["input"],
        }
        loc = err_detail["loc"]
        if len(loc) > 0:
            err_dict["loc"] = loc if len(loc) > 1 else loc[0]
        errors.append(err_dict)

    return {
        "code": "@tecsci/input-validation-error",
        "message": "Input validation error",
        "errors": errors,
    }, HTTPStatus.BAD_REQUEST


app.register_error_handler(ValidationError, validation_error_handler)

if __name__ == "__main__":
    app.run()
