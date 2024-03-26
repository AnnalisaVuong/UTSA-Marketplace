from flask import Flask, Blueprint

def create_app():
    app = Flask(__name__)


    admin_bp = Blueprint('admin', __name__)

    @admin_bp.route('/admin/create')
    def admin_create():
        return 'Admin Create Page'

    @admin_bp.route('/admin/edit')
    def admin_edit():
        return 'Admin Edit Page'
     
    user_bp = Blueprint('user', __name__)

    @user_bp.route('/user/create')
    def user_create():
        return 'User Create Page'

    @user_bp.route('/user/edit')
    def user_edit():
        return 'User Edit Page'

 
    app.register_blueprint(admin_bp)
    app.register_blueprint(user_bp)


    @app.route('/')
    def hello_world():
        return 'Hello, World!'
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
    
