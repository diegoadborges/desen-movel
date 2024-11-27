from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from db.models import Base


db = SQLAlchemy(model_class=Base)


def init_db(app: Flask) -> None:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()
