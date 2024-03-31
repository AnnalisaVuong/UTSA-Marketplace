import { Form } from "react-router-dom";
import "@style/Admin.css";

/**
 * Route: Create Account Page
 *
 * URI: /
 *
 * @description Creates a new account for new users
 *
 * @returns {React.ReactElement} Component to be rendered at the Create account page route.
 */
export default function CreateAccount() {


return (
    <>
    <div className="container">
        <h1 className="color header">Create Account </h1>
        <form>
            <div>
                <label htmlFor="username" className="color bold">User Name</label>
                <input type="text" id="username" name="username" className="inputStyling" required placeholder="Enter a User Name"/><br/>
            </div>
            <div>
                <label htmlFor="pwd" className="color bold">Password</label>
                <input type="password" id="password" name="pwd" className="inputStyling" required placeholder="Enter a Password"/><br/>
            </div>
            <div>
                <label htmlFor="pwd" className="color bold">Confirm Password</label>
                <input type="password" id="confirm_password" name="pwd" className="inputStyling" required placeholder="Confirm Password"/><br/>
            </div>
            <div>
                <label htmlFor="fname" className="color bold">First Name</label>
                <input type="text" id="fname" name="fname" className="inputStyling" required placeholder="First Name"/><br/>
            </div>
            <div>
                <label htmlFor="lname" className="color bold">Last Name</label>
                <input type="text" id="lname" name="lname" className="inputStyling" required placeholder="Last Name"/><br/>
            </div>
            <div>
                <label htmlFor="email" className="color bold">Email Address</label>
                <input type="email" id="email" name="email" className="inputStyling" required placeholder="john@your-domain.com"/><br/>
            </div>
            <div>
                <label htmlFor="phone" className="color bold">Phone Number</label>
                <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="inputStyling" required placeholder="000-000-0000"/><br/>
            </div>
            <div>
                <input type="submit" value="Create" className="bold big-text"/>
                <input type="reset" value="Clear Form" className="bold big-text"/>
            </div>
        </form>
    </div>
    </>
);
}