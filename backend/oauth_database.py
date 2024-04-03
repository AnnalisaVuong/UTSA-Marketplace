from sqlalchemy import MetaData, create_engine, Engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, Session


class Base(DeclarativeBase):
    pass


class OauthUser(Base):
    __tablename__ = "oauth_user"

    oauth_user_id: Mapped[int] = mapped_column(primary_key=True)
    oauth_token: Mapped[str]
    oauth_refresh_token: Mapped[str]
    email_id: Mapped[int] = relationship("email", back_populates="email_id")

    def __repr__(self) -> str:
        to_ret = ""
        for key, value in self.__dict__.items():
            to_ret += f"{key} : {value}\n"
        return to_ret


# Proposed email table to link oauth and regular users together.
class Email(Base):
    __tablename__ = "email"

    email_id: Mapped[int]
    email_string: Mapped[str]
    oauth_user_id: Mapped[int] = relationship(
        "oauth_user", back_populates="oauth_user_id"
    )
    # classic_user_session: Mapped[int] = mapped_column(ForeignKey("user"))


# Connection strings have the following general format:
def create_postgres_engine(username, password, hostname, port, database):
    metadata = MetaData()
    database_link = f"postgresql://{username}:{password}@{hostname}:{port}/{database}"
    engine = create_engine(database_link)
    metadata.create_all(engine)
    return engine


def add_oauth_user(
    engine: Engine,
    oauth_user_id: int,
    oauth_token: str,
    oauth_refresh_token: str,
    email_id: int,
):
    with Session(engine) as session:
        new_user = OauthUser(
            oauth_user_id=oauth_user_id,
            oauth_token=oauth_token,
            oauth_refresh_token=oauth_refresh_token,
            email_id=email_id,
        )

        session.commit()
