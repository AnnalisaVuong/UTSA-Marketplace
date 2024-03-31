import { useState } from "react";

const BACKEND_URL = "http://localhost:5000";

//@TODO: USE JS TO CONFIRM BOTH PASSWORDS ARE THE SAME
//       ONCE I LEARN MORE ABOUT REACT
// var password = document.getElementById("password")
//     , confirm_password = document.getElementById("confirm_password");

// function validatePassword() {
//     if(password.value != confirm_password.value) {
//         confirm_password.setCustomValidity("Password Don't Match");
//     } else {
//         confirm_password.setCustomValidity('');
//     }
// }

// password.onchange = validatePassword;
// confirm_password.onkeyup = validatePassword;

export default function Admin() {
  const [formData, setFormData] = useState({});

  /** @param {React.FormEvent<HTMLFormElement>} event */
  async function handleSubmit(event) {
    event.preventDefault();

    const formDataString = JSON.stringify(formData);

    const extraHeaders = new Headers();
    extraHeaders.append("Accept", "application/json");
    extraHeaders.append("Content-Type", "application/json");

    const res = await fetch(BACKEND_URL + "/admin/create", {
      method: "POST",
      headers: extraHeaders,
      body: formDataString,
    });

    const responseJson = await res.json();

    // For now simply log the response from the backend.
    console.log(responseJson);
  }

  /** @param {React.ChangeEvent<HTMLInputElement>} event */
  function handleFormChange(event) {
    const escaped = event.target.name.replace("-", "_");
    setFormData({
      ...formData,
      [escaped]: event.target.value,
    });
  }

  return (
    <>
      <div className="container">
        <h1 className="color header">Create Account </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="color bold">
              User Name
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              id="username"
              name="username"
              className="inputStyling"
              required
              placeholder="Enter a User Name"
            />
            <br />
          </div>
          <div>
            <label htmlFor="password" className="color bold">
              Password
            </label>
            <input
              onChange={handleFormChange}
              type="password"
              id="password"
              name="password"
              className="inputStyling"
              required
              placeholder="Enter a Password"
            />
            <br />
          </div>
          <div>
            <label htmlFor="confirm-password" className="color bold">
              Confirm Password
            </label>
            <input
              onChange={handleFormChange}
              type="confirm-password"
              id="confirm-password"
              name="confirm-password"
              className="inputStyling"
              required
              placeholder="Confirm Password"
            />
            <br />
          </div>
          <div>
            <label htmlFor="first-name" className="color bold">
              First Name
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              id="first-name"
              name="first-name"
              className="inputStyling"
              required
              placeholder="First Name"
            />
            <br />
          </div>
          <div>
            <label htmlFor="last-name" className="color bold">
              Last Name
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              id="last-name"
              name="last-name"
              className="inputStyling"
              required
              placeholder="Last Name"
            />
            <br />
          </div>
          <div>
            <label htmlFor="email" className="color bold">
              Email Address
            </label>
            <input
              onChange={handleFormChange}
              type="email"
              id="email"
              name="email"
              className="inputStyling"
              required
              placeholder="john@your-domain.com"
            />
            <br />
          </div>
          <div>
            <label htmlFor="phone-number" className="color bold">
              Phone Number
            </label>
            <input
              onChange={handleFormChange}
              type="tel"
              id="phone-number"
              name="phone-number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              className="inputStyling"
              required
              placeholder="000-000-0000"
            />
            <br />
          </div>
          <div>
            <input type="submit" value="Create" className="bold big-text" />
            <input type="reset" value="Clear Form" className="bold big-text" />
          </div>
        </form>
      </div>
    </>
  );
}
