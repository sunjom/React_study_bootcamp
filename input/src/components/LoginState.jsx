import { useRef, useState } from "react";
import Input from "./Input";
import {isEmail, isNotEmpty, hasMinLength} from '../util/validation'
import { useInput } from "../hooks/useInput";

export default function LoginState() {
    const {
        data:email,
        errorCheck:showEmailValidation,
        handleChange:handleEmailChange,
        handleBlur:handleEmailBlur,
    } = useInput('',(data) => isEmail(data) || isNotEmpty(data));

    const {
        data:password,
        errorCheck:showPasswordValidation,
        handleChange:handlePasswordChange,
        handleBlur:handlePasswordBlur,
     } = useInput('',(data) => hasMinLength(data,6))

    function handleSubmit(e){
        e.preventDefault();
        console.log(data);
        
    }

    return (
        <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="control-row">
            <Input
                Label="Email"
                Id="email"
                error={showEmailValidation && 'Please enter a valid email!'}
                type="email" 
                name="email" 
                onChange={handleEmailChange}
                value={email}
                onBlur={handleEmailBlur}
            />
            <Input
                Label="Password"
                Id="password"
                error={showPasswordValidation && 'Please enter a valid password!'}
                type="password" 
                name="password" 
                onChange={handlePasswordChange}
                value={password}
                onBlur={handlePasswordBlur}
            />
        </div>

        <p className="form-actions">
            <button className="button button-flat">Reset</button>
            <button className="button">Login</button>
        </p>
        </form>
    );
}
