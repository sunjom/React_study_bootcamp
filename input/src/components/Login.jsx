import { useRef, useState } from "react";

export default function Login() {
  const [EmailValiation,setEmailValiation] = useState(false); 
  const emailRef = useRef();
  const passwordRef = useRef();
  function handleSubmit(e){
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const check = enteredEmail.includes('@');

    if(!check){
      setEmailValiation(true);
      return;
    }

    setEmailValiation(false);

    console.log('Sending HTTP requese');
    
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" 
            ref={emailRef}
          />
          <div className="control-error">{EmailValiation && <p>Please enter a valid email address</p>}</div>
        </div>
        

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" 
            ref={passwordRef}
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
