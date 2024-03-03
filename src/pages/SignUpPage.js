import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import valiDateName from "../helpers/ValidateName";
import valiDateEmails from "../helpers/ValidateEmail";
import valiDatePhones from "../helpers/ValidatePhone";
import valiDatePassword from "../helpers/ValidatePassword";
import axios from "axios";
function SignUpPage({ CBFun }) {
  const [ShowPassword, setShowPassword] = useState(false);
  const [isLoading, SetLoading] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passRef = useRef();
  const [error, SetError] = useState({
    nameError: false,
    emailError: false,
    phoneError: false,
    passwordError: false,
    errorMsg: "",
  });

  const [userDetails, SetuserDetails] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    userPassword: "",
    isAdmin: false,
  });

  const clearFields = () => {
    SetuserDetails({
      userName: "",
      userEmail: "",
      userPhone: "",
      userPassword: "",
      isAdmin: false,
    });

    SetError({
      nameError: false,
      emailError: false,
      phoneError: false,
      passwordError: false,
      errorMsg: "",
    });
  };

  const handleClearClick = (e) => {
    e.preventDefault();
    nameRef.current.focus();
    clearFields();
  };

  const handleInputOnChange = (e) => {
    SetError({
      emailError: false,
      passwordError: false,
      errorMsg: "",
    });
    if (e.target.value.includes(" ") && e.target.name !== "userName") {
      e.target.value = e.target.value.replaceAll(" ", "");
    }
    SetuserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    if (!valiDateName(userDetails.userName)) {
      SetError({
        nameError: true,
        emailError: false,
        phoneError: false,
        passwordError: false,
        errorMsg: "Invalid name",
      });
      nameRef.current.focus();
    } else if (!valiDateEmails(userDetails.userEmail)) {
      SetError({
        nameError: false,
        emailError: true,
        phoneError: false,
        passwordError: false,
        errorMsg: "Invalid email",
      });
      emailRef.current.focus();
    } else if (!valiDatePhones(userDetails.userPhone)) {
      SetError({
        nameError: false,
        emailError: false,
        phoneError: true,
        passwordError: false,
        errorMsg: "Invalid mobile number",
      });
      phoneRef.current.focus();
    } else if (!valiDatePassword(userDetails.userPassword)) {
      SetError({
        nameError: false,
        emailError: false,
        phoneError: false,
        passwordError: true,
        errorMsg: "Minimun 8 characters required",
      });
      passRef.current.focus();
    } else {
      SetLoading(true);
      axios
        .post("/user/register", userDetails)
        .then((response) => {
          SetLoading(false);
          if (response.data.resMsg === "User Already Exists") {
            toast.error("User Already Exists");
            clearFields();
            nameRef.current.focus();
          } else if (response.data.resMsg === "User Registred Successfully") {
            toast.success("User Registred Successfully");
            CBFun();
            clearFields();
          } else {
            toast.error("Something Went Wrong ! Try Again");
            clearFields();
          }
        });
    }
  };

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <form className="UserForm">
      {isLoading && <Loader />}
      <h1 className="UserForm__title">Create New Account</h1>

      <div className="UserForm__ItemBox">
        <input
          type="text"
          name="userName"
          className={`UserForm__Item ${
            error.nameError && "UserForm__ErrorStateITEM"
          }`}
          placeholder="Enter your full name"
          value={userDetails.userName}
          onChange={handleInputOnChange}
          ref={nameRef}
          autoComplete="new-user"
        />
        {error.nameError && (
          <>
            <p className="UserForm__ItemError">{error.errorMsg}</p>
            <i className="fa-solid fa-circle-exclamation UserForm__ItemErrorICON"></i>
          </>
        )}
      </div>

      <div className="UserForm__ItemBox">
        <input
          type="text"
          name="userEmail"
          className={`UserForm__Item ${
            error.emailError && "UserForm__ErrorStateITEM"
          }`}
          placeholder="Enter your email address"
          value={userDetails.userEmail}
          onChange={handleInputOnChange}
          ref={emailRef}
          autoComplete="new-user"
        />
        {error.emailError && (
          <>
            <p className="UserForm__ItemError">{error.errorMsg}</p>
            <i className="fa-solid fa-circle-exclamation UserForm__ItemErrorICON"></i>
          </>
        )}
      </div>

      <div className="UserForm__ItemBox">
        <input
          type="text"
          name="userPhone"
          className={`UserForm__Item ${
            error.phoneError && "UserForm__ErrorStateITEM"
          }`}
          placeholder="Enter your mobile number"
          value={userDetails.userPhone}
          onChange={handleInputOnChange}
          ref={phoneRef}
          autoComplete="new-user"
        />
        {error.phoneError && (
          <>
            <p className="UserForm__ItemError">{error.errorMsg}</p>
            <i className="fa-solid fa-circle-exclamation UserForm__ItemErrorICON"></i>
          </>
        )}
      </div>

      <div className="UserForm__ItemBox">
        <input
          type={`${ShowPassword ? "text" : "password"}`}
          name="userPassword"
          className={`UserForm__Item ${
            error.passwordError && "UserForm__ErrorStateITEM"
          }`}
          placeholder="Enter your password"
          value={userDetails.userPassword}
          onChange={handleInputOnChange}
          ref={passRef}
          autoComplete="new-password"
        />
        {!error.passwordError && (
          <i
            className={`fa-solid ${
              ShowPassword ? "fa-eye-slash" : "fa-eye"
            }  UserForm__PassItemICON`}
            onClick={() => setShowPassword(!ShowPassword)}
          ></i>
        )}
        {error.passwordError && (
          <>
            <p className="UserForm__ItemError">{error.errorMsg}</p>
            <i className="fa-solid fa-circle-exclamation UserForm__ItemErrorICON"></i>
          </>
        )}
      </div>

      <div className="UserForm__ButtonBox">
        <button className="UserForm__ItemButton" onClick={handleClearClick}>
          Clear
        </button>
        <button className="UserForm__ItemButton" onClick={handleRegisterClick}>
          Register
        </button>
      </div>
      <p className="UserForm__itemLINKBox">
        Already have an account:
        <Link className="UserForm__itemLINK" onClick={CBFun}>
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default SignUpPage;
