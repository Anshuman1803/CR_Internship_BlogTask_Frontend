import React from "react";
import { Link } from "react-router-dom";
function SignUpPage({CBFun}) {
  return (
    <form className="UserForm">
    <h1 className="UserForm__title">Create New Account</h1>



    <p className="UserForm__itemLINKBox">
      Already have an account:
      <Link className="UserForm__itemLINK" onClick={CBFun}>Sign in</Link>{" "}
    </p>
  </form>
  )
}

export default SignUpPage
