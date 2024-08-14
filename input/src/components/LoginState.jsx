import { useRef, useState } from "react";

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
        validation.email && !data.email.includes('@');
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
            <div className="control no-margin">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" 
                onChange={(e) => handleChange('email',e.target.value)}
                value={data.email}
                onBlur={() => handleBlur('email')}
            />
            </div>
            <div className="control-error">{showEmailValidation && <p>Please enter a valid email address.</p>}</div>
            <div className="control no-margin">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" 
                onChange={(e) => handleChange('password',e.target.value)}
                value={data.password}
            />
            
            </div>
        </div>

        <p className="form-actions">
            <button className="button button-flat">Reset</button>
            <button className="button">Login</button>
        </p>
        </form>
    );
}
