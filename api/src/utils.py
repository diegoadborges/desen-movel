import bcrypt


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def compare_password(source: str, target: str) -> bool:
    return bcrypt.checkpw(source.encode("utf-8"), target.encode("utf-8"))
