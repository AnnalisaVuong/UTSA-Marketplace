from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

#Transaction Info Table
class TransactionHistory(db.Model):
    __tablename__ = "transaction_history"

    trans_id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('item_listing.item_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user_information.userid'), nullable=False)
    transdate = db.Column(db.DateTime, nullable=False)
    trans_status = db.Column(db.String(50), nullable=False)

class TradingPost(db.Model):
    __tablename__ = "trading_post"

    post_id = db.Column(db.Integer, primary_key=True)
    postlocation = db.Column(db.String(100), nullable=False)
    post_availability = db.Column(db.Boolean, nullable=False)


