import React, { useState } from "react";
import SignUpPage from "./SignUpPage";
import LogInPage from "./LogInPage";
function FormContainer() {
    const [ShowSignUP, SetSignUp] = useState(false);
    const handleSetSignUp = (e)=>{
        SetSignUp(!ShowSignUP)
    }
  return (
    <div className="userForm__Container">
      {
        ShowSignUP ? <SignUpPage CBFun = {handleSetSignUp}/> : <LogInPage CBFun = {handleSetSignUp}/>
      }
    </div>
  )
}

export default FormContainer
