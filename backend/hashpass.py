import hashlib
import os


def hash_salt(password: str) -> tuple[str, str]:
    """
    This will perform a sha256 hash on the password and return it alongside the salt.

    Parameters:
        password (str): The string to hash.

    Returns:
        tuple[str, str]: A tuple with the hashed string on the left side and the salt on the right.

    Usage:
        password = "apple"
        hashed_password, salt = hash_salt(password)
    """
    hash = hashlib.sha256(password.encode())
    salt = os.urandom(16)
    hash.update(salt)
    encrypted = hash.hexdigest()

    return encrypted, salt.hex()


def verify_hash(plain: str, hashed: str, salt: str) -> bool:
    """
    Checks if the plaintext password matches the encrypted password.

    Parameters:
        plain (str): The plaintext password.
        hashed (str): The already hashed password.
        salt (str): The salt for the hashed password.

    Returns:
        bool: Representing whether the password represents the hashed password.

    Usage:
        # User enters password
        password = user_form_data["password"]
        # Just an example of grabbing the user data from the db.
        encrypted, salt = grab_from_database("user_form_data["email"]")
        if verify_hash(password, encrypted, salt):
            # User entered valid password.
        else:
            # User specified incorrect password for their account.

    Additional Info:
        This is mainly used to check if the hashed password is already stored at the desired location.
        Since the salt will be stored alongside the hashed password in the DB,
            we can validate the user with just the plaintext password.
    """
    hash = hashlib.sha256(plain.encode())
    hash.update(bytes.fromhex(salt))
    encrypted = hash.hexdigest()

    return encrypted == hashed
