from sqlalchemy import JSON, Integer, String
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    MappedAsDataclass,
    mapped_column,
    relationship,
)
from sqlalchemy.orm.properties import ForeignKey


class Base(DeclarativeBase, MappedAsDataclass): ...


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, init=False
    )

    name: Mapped[str] = mapped_column(String(256), nullable=False)
    email: Mapped[str] = mapped_column(String(256), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)


class Recipe(Base):
    __tablename__ = "recipe"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, init=False
    )
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    image_url: Mapped[str] = mapped_column(String(256), nullable=False)
    instructions: Mapped[str] = mapped_column(String(512), nullable=False)
    ingredients: Mapped[str] = mapped_column(JSON, nullable=False)

    user_id: Mapped[int] = mapped_column(Integer, ForeignKey(User.id), nullable=False)
    user: Mapped[User] = relationship(User, init=False)
