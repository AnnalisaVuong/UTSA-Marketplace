import React from 'react'

/**
 * Route: Login Page
 *
 * URI: /
 *
 * @description The login page 
 *
 * @returns {React.ReactElement} Component to be rendered at the login page route.
 */
export default function Login(){
    return (
        <div className= 'd-flex justifying-content-center align-items-center bg-primary vh-100' >
            <div className='bg-white p-3 rounded w-25'>
                <form action="">
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password'/>
                    </div>
                    <button className='btn btn-sucess w-100'><strong>Log in</strong></button>
                    <button className='btn btn-default border w-100'>Creeate Account</button>
                </form>
            </div>
        </div>
    )
}