from datetime import datetime
from enum import StrEnum
from typing import Any, Dict
from sqlalchemy import DateTime, Enum, Integer, String
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    MappedAsDataclass,
    mapped_column,
)


class Base(DeclarativeBase, MappedAsDataclass): ...


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, init=False
    )

    name: Mapped[str] = mapped_column(String(256), nullable=False)
    email: Mapped[str] = mapped_column(String(256), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)

    def to_dict(self) -> Dict[str, Any]:
        return {"id": self.id, "name": self.name, "email": self.email}


class FoodCategory(StrEnum):
    PRATO_PRINCIPAL = "Prato Principal"
    LANCHE = "Lanche"
    SOBREMESA = "Sobremesa"
    SALADA = "Salada"
    BEBIDA = "Bebida"
    CAFE_DA_MANHA = "Café da Manhã"


class DateTimeTZ(DateTime):
    def __init__(self):
        super().__init__(timezone=True)


class Recipe(Base):
    __tablename__ = "recipe"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, init=False
    )
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    image_url: Mapped[str] = mapped_column(String(256), nullable=False)
    instructions: Mapped[str] = mapped_column(String(512), nullable=False)
    ingredients: Mapped[str] = mapped_column(String(1024), nullable=False)
    category: Mapped[FoodCategory] = mapped_column(Enum(FoodCategory), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTimeTZ, nullable=False)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "title": self.title,
            "image_url": self.image_url,
            "instructions": self.instructions,
            "ingredients": self.ingredients.split("#"),
            "category": self.category,
            "created_at": self.created_at.isoformat(),
        }
