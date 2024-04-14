import { useFormState } from "@hooks/formHooks";
const BACKEND_URL = "http://localhost:5000";
import { Form } from "react-router-dom";
import { useState } from 'react';
//import "@style/Admin.css";


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

//px=right and left
//py=top and bottom
//mx==left+r   my==top+b


export default function Admin() {
  const [setFormData, submitData] = useFormState(
    new URL(BACKEND_URL + "/admin/create"),
  );

    const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = (/** @type {import("react").ChangeEvent<HTMLInputElement>} */ event) => {
    const input = event.target.value.replace(/\D/g, '').substring(0, 10); // Remove non-numeric characters and limit to 10 digits
    const areaCode = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    let formattedPhoneNumber = '';
    if (input.length > 6) {
      formattedPhoneNumber = `(${areaCode}) ${middle}-${last}`;
    } else if (input.length > 3) {
      formattedPhoneNumber = `(${areaCode}) ${middle}`;
    } else if (input.length > 0) {
      formattedPhoneNumber = `(${areaCode}`;
    }

    setPhoneNumber(formattedPhoneNumber);
  };

return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0c2340] text-white">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white mb-10">Create Account </h1>
        <form 
        className="w-full max-w-md"
        onSubmit={submitData}>
          {/* div for username */}
            <div className="flex flex-row items-center">
                <label htmlFor="username" className="basis-1/4">
                    Username: 
                </label>
                <input
                onChange={setFormData} 
                type="text" 
                id="username" 
                name="username" 
                className="py-2 px-10 w-full my-3 mx-0 box-border text-black basis-3/4
                focus:outline-none focus:ring focus:ring-orange-300 rounded" 
                required 
                placeholder="Enter a User Name"/>
                <br/>
            </div>
            {/* div for password */}
            <div className="flex flex-row items-center">
                <label htmlFor="password" className="basis-1/4">
                    Password: 
                </label>
                <input 
                onChange={setFormData}
                type="password" 
                id="password" 
                name="password" 
                className="py-2 px-10 w-full my-3 mx-0 box-border text-black basis-3/4 
                focus:outline-none focus:ring focus:ring-orange-300 rounded" 
                required 
                placeholder="Enter a Password"/>
                <br/>
            </div>
            {/* div for confirm password */}
            <div className="flex flex-row items-center">
                <label htmlFor="confirm-password" className="basis-1/4">
                    Confirm Password: 
                </label>
                <input 
                onChange={setFormData}
                type="confirm-password" 
                id="confirm_password" 
                name="confirm-password" 
                className="py-2 px-10 w-full my-3 mx-0 box-border text-black basis-3/4 
                focus:outline-none focus:ring focus:ring-orange-300 rounded" 
                required 
                placeholder="Confirm Password"/>
                <br/>
            </div>
            {/* div for first name */}
            <div className="flex flex-row items-center">
                <label htmlFor="first-name" className="basis-1/4">
                    First Name: 
                </label>
                <input 
                onChange={setFormData}
                type="text" 
                id="first-name" 
                name="first-name" 
                className="py-2 px-10 w-full my-3 mx-0 box-border text-black basis-3/4 
                focus:outline-none focus:ring focus:ring-orange-300 rounded" 
                required 
                placeholder="First Name"/>
                <br/>
            </div>
            {/* div for last name */}
            <div className="flex flex-row items-center">
                <label htmlFor="last-name" className="basis-1/4">
                    Last Name: 
                </label>
                <input 
                onChange={setFormData}
                type="text" 
                id="last-name" 
                name="last-name" 
                className="py-2 px-10 w-full my-3 mx-0 box-border text-black basis-3/4 
                focus:outline-none focus:ring focus:ring-orange-300 rounded" 
                required 
                placeholder="Last Name"/>
                <br/>
            </div>
            {/* div for email */}
            <div className="flex flex-row items-center">
                <label htmlFor="email" className="basis-1/4">
                    Email: 
                </label>
                <input 
                onChange={setFormData}
                type="email" 
                id="email" 
                name="email" 
                className="py-2 px-10 w-full my-3 mx-0 box-border text-black basis-3/4 
                focus:outline-none focus:ring focus:ring-orange-300 rounded" 
                required 
                placeholder="example@domain.com"/>
                <br/>
            </div>
            {/* div for phone number */}
            <div className="flex flex-row items-center">
                <label htmlFor="phoneNumber" className="basis-1/4">
                    Phone Num: 
                </label>
                <input
                type="tel" 
                id="phone-number" 
                name="phone-number" 
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                className="py-2 px-10 w-full my-3 mx-0 box-border text-black basis-3/4 
                focus:outline-none focus:ring focus:ring-orange-300 rounded" 
                required 
                placeholder="(000)-000-0000"
                value={phoneNumber}
                //include onChange={setFormData}
                onChange={(e) => {
                    handleChange(e);
                    setFormData(e);
                }}
                />
                <br/>
            </div>
            {/* Submit and Reset Div */}
            <div className="flex flex-row gap-4 mt-10">
                <input type="submit" value="Create" className="bg-white hover:bg-orange-300 text-[#ab6809] font-bold py-3 px-4 rounded basis-2/4
                focus:outline-none focus:ring focus:ring-orange-200 rounded"/>
                <input type="reset" value="Clear Form" className="bg-white hover:bg-orange-300 text-[#ab6809] font-bold py-3 px-4 rounded basis-2/4
                focus:outline-none focus:ring focus:ring-orange-200 rounded"/>
            </div>
        </form>
      </div>
    </>
  );
}
