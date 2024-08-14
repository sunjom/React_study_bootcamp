import { useRef, useState } from "react";
import Input from "./Input";
import {isEmail, isNotEmpty, hasMinLength} from '../util/validation'

export default function LoginState() {
    const [data,setData] = useState({
        email:'',
        password:'',
    })

    const [validation,setValidation] = useState({
        email:false,
        password:false,
    })

    const showEmailValidation = 
        validation.email &&
        (isEmail(data.email) ||
        isNotEmpty(data.email));
    
    const showPasswordValidation = 
        validation.password &&
        (hasMinLength(data.password,6) ||
        isNotEmpty(data.password));
    function handleSubmit(e){
        e.preventDefault();
        console.log(data);
    }

    function handleChange(identifier,value){
        setData((prevData) =>({
            ...prevData,
            [identifier]:value
        }))
        setValidation((prevVaildation)=>({
            ...prevVaildation,
            [identifier]:false
        }))

    }

    function handleBlur(identifier){
        setValidation((prevVaildation)=>({
            ...prevVaildation,
            [identifier]:true
        }))

    }
    return (
        <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="control-row">
            <Input
                Label="Email"
                Id="email"
                error={showEmailValidation}
                type="email" 
                name="email" 
                onChange={(e) => handleChange('email',e.target.value)}
                value={data.email}
                onBlur={() => handleBlur('email')}
            />
            <Input
                Label="Password"
                Id="password"
                error={showPasswordValidation}
                type="password" 
                name="password" 
                onChange={(e) => handleChange('password',e.target.value)}
                value={data.password}
                onBlur={() => handleBlur('password')}
            />
        </div>

        <p className="form-actions">
            <button className="button button-flat">Reset</button>
            <button className="button">Login</button>
        </p>
        </form>
    );
}
