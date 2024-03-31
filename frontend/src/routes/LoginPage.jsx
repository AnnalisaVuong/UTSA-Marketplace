import { Form, Link } from "react-router-dom";
import "@style/Admin.css";
import { useState } from "react";


/**
 * Route: Login Page
 *
 * URI: /
 *
 * @description The login page for returning users
 *
 * @returns {React.ReactElement} Component to be rendered at the login page route.
 */
export default function LoginPage() {


return (
    <>
    <div className="container">
        <h1 className="color header">Create Account </h1>
        <form >
            <div>
                <label htmlFor="username" className="color bold">User Name</label>
                <input type="text" id="username" name="username" className="inputStyling" required placeholder="Enter a User Name"/><br/>
            </div>
            <div>
                <label htmlFor="pwd" className="color bold">Password</label>
                <input type="password" id="password" name="pwd" className="inputStyling" required placeholder="Enter a Password"/><br/>
            </div>
            <div>
                <input type="submit" value="Login" className="bold big-text"/>
                <Link to="/CreateAccount" className="px-8 py-2 rounded-lg hover:!border-orange-500 hover:text-orange-500">Create Acount</Link>
            </div>
        </form>
    </div>
    </>
);
}