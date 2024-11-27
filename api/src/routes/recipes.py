from datetime import timezone
from typing import List
from flask import Blueprint, request
from flask.helpers import datetime
from pydantic import BaseModel, Field, ValidationError, field_validator
from db.models import FoodCategory, Recipe
from db import db


bp = Blueprint("recipes", __name__, url_prefix="/recipes")


class CreateRecipe(BaseModel):
    title: str = Field(min_length=5, max_length=120)
    image_url: str = Field(min_length=5, max_length=256)
    instructions: str = Field(min_length=5, max_length=512)
    ingredients: str = Field(min_length=1)
    category: FoodCategory

    @field_validator("ingredients", mode="before")
    @classmethod
    def convert_to_str(cls, field: List[str]) -> str:
        if not isinstance(field, list):
            raise ValidationError("Invalid field type")
        return "#".join(field)

    def to_model(self) -> Recipe:
        return Recipe(
            title=self.title,
            image_url=self.image_url,
            instructions=self.instructions,
            ingredients=self.ingredients,
            category=self.category,
            created_at=datetime.now(timezone.utc),
        )


@bp.post("")
def create_recipe():
    req_body = CreateRecipe.model_validate(request.get_json())

    recipe = req_body.to_model()
    db.session.add(recipe)
    db.session.commit()

    return recipe.to_dict()


@bp.get("/<int:recipe_id>")
def get_recipe_by_id(recipe_id: int):
    recipe = db.session.query(Recipe).filter(Recipe.id == recipe_id).one_or_none()

    if not recipe:
        return f"Recipe with id {recipe_id} was not found", 404

    return recipe.to_dict()


@bp.get("")
def get_recipes():
    query = db.session.query(Recipe)

    order_by_fields = {"created_at": Recipe.created_at}

    filter_by_fields = {"category": Recipe.category, "id": Recipe.id}

    if (order_field := order_by_fields.get(request.args.get("order_by"))) is not None:
        query = query.order_by(order_field)

    for k, v in filter_by_fields.items():
        val = request.args.get(k)
        if val is None:
            continue
        query = query.filter(v == val)

    return [r.to_dict() for r in query.all()]
