from flask import Flask, Blueprint, request, jsonify

def create_app():
    app = Flask(__name__)

    user_bp = Blueprint('user', __name__)

    @user_bp.route('/user/create', methods=['POST'])
    def user_create():
         if request.is_json:
            data = request.json
            username = data.get('username')
            password = data.get('password')
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            email = data.get('email')
            phone_number = data.get('phone_number')

            
            print(f"Received data: Username: {username}, Password: {password}, First Name: {first_name}, Last Name: {last_name}, Email: {email}, Phone Number: {phone_number}")

            return jsonify({'message': 'User account created successfully'})
         else:
            return jsonify({'error': 'Invalid JSON'}), 400




 
    app.register_blueprint(user_bp)


    @app.route('/')
    def hello_world():
        return 'Hello, World!'
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
    
