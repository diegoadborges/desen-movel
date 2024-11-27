from flask import Blueprint, request
from db.models import User
from db import db
from pydantic import BaseModel, EmailStr, Field

from utils import compare_password, hash_password


bp = Blueprint("auth", __name__, url_prefix="/auth")


class LoginUser(BaseModel):
    email: EmailStr = Field(max_length=256)
    password: str = Field(min_length=8, max_length=256)


class RegisterUser(LoginUser):
    name: str = Field(max_length=256)

    def to_model(self) -> User:
        return User(
            name=self.name,
            email=self.email,
            password=hash_password(self.password),
        )


@bp.post("/login")
def login_user():
    req_body = LoginUser.model_validate(request.get_json())

    user = db.session.query(User).where(User.email == req_body.email).one_or_none()
    if user is None:
        return {"error": "Email or password invalid"}, 401

    if not compare_password(req_body.password, user.password):
        return {"error": "Email or password invalid"}, 401

    return "", 200


@bp.post("/register")
def register_new_user():
    req_body = RegisterUser.model_validate(request.get_json())

    if (
        db.session.query(User).where(User.email == req_body.email).one_or_none()
        is not None
    ):
        return {"error": "User with this email already exists"}, 409

    db.session.add(req_body.to_model())
    db.session.commit()

    return "", 201
