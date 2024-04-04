from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# Transaction Info Table
class TransactionHistory(db.Model):
    __tablename__ = "transaction_history"

    trans_id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(
        db.Integer, db.ForeignKey("item_listing.item_id"), nullable=False
    )
    user_id = db.Column(
        db.Integer, db.ForeignKey("user_information.userid"), nullable=False
    )
    transdate = db.Column(db.DateTime, nullable=False)
    trans_status = db.Column(db.String(50), nullable=False)


# Trading Post Table
class TradingPost(db.Model):
    __tablename__ = "trading_post"

    post_id = db.Column(db.Integer, primary_key=True)
    postlocation = db.Column(db.String(100), nullable=False)
    post_availability = db.Column(db.Boolean, nullable=False)


# Item Listing Table
class ItemListing(db.Model):
    __tablename__ = "item_listing"

    item_id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(
        db.Integer, db.ForeignKey("user_information.userid"), nullable=False
    )
    itemtitle = db.Column(db.String(100), nullable=False)
    itemdescription = db.Column(db.Text, nullable=False)
    itemprice = db.Column(db.Float, nullable=False)
    itemavailability = db.Column(db.Boolean, nullable=False)
    itemposteddate = db.Column(db.DateTime, nullable=False)


# User Info Table
class UserInformation(db.Model):
    __tablename__ = "user_information"

    userid = db.Column(db.Integer, primary_key=True)
    userfullname = db.Column(db.String(100), nullable=False)
    useremail = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    password_salt = db.Column(db.String(100), nullable=False)
    # userprofilepic = db.Column(db.String(100), nullable=True)


# admin info table (add more to match user info?)
class AdminInformation(db.Model):
    __tablename__ = "admin_information"

    adminid = db.Column(db.Integer, primary_key=True)
    admin_username = db.Column(db.String(100), unique=True, nullable=False)
    admin_password = db.Column(db.String(100), nullable=False)
