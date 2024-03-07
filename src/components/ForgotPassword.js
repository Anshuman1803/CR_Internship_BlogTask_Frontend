import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import valiDateEmails from "../helpers/ValidateEmail";
import valiDatePassword from "../helpers/ValidatePassword";
import Loader from "./Loader";
import axios from "axios";
function ForgotPassword({ CBFun, formTitle }) {
  const [ShowPassword, setShowPassword] = useState(false);
  const [isLoading, SetLoading] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const [error, SetError] = useState({
    emailError: false,
    passwordError: false,
    confirmationError: false,
    errorMsg: "",
  });

  const [userDetails, SetuserDetails] = useState({
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });

  const handleInputOnChange = (e) => {
    SetError({
      emailError: false,
      passwordError: false,
      confirmationError: false,
      errorMsg: "",
    });
    if (e.target.value.includes(" ")) {
      e.target.value = e.target.value.replaceAll(" ", "");
    }
    SetuserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleUpdatePasswordClick = (e) => {
    e.preventDefault();
    if (!valiDateEmails(userDetails.userEmail)) {
      SetError({
        emailError: true,
        passwordError: false,
        confirmationError: false,
        errorMsg: "Invalid email address",
      });
      emailRef.current.focus();
    } else if (!valiDatePassword(userDetails.userPassword)) {
      SetError({
        emailError: false,
        passwordError: true,
        confirmationError: false,
        errorMsg: "Minimun 8 characters required",
      });
      passRef.current.focus();
    } else if (userDetails.userPassword !== userDetails.confirmPassword) {
      SetError({
        emailError: false,
        passwordError: false,
        confirmationError: true,
        errorMsg: "Password not matched",
      });
    } else {
      SetLoading(true);
      axios
        .patch("https://cr-internship-blogtask-backend.onrender.com/api/user/update-password", userDetails)
        .then((response) => {
          if (response.data.resMsg === "Password Updated") {
            toast.success("Password updated successfully");
            SetLoading(false);
            CBFun();
          } else if (response.data.resMsg === "User Not Registred") {
            toast.error("User Not Registred");
            SetuserDetails({
              ...userDetails,
              userEmail: "",
            });
            emailRef.current.focus();
            SetLoading(false);
          } else {
            toast.error("Something went wrong, Try again !");
            SetuserDetails({
              userEmail: "",
              userPassword: "",
              confirmPassword: "",
            });
            SetLoading(false);
            emailRef.current.focus();
          }
        });
    }
  };

  return (
    <form className="forgotPassword__form">
      <h2 className="forgotPasswordform__heading">{formTitle}</h2>

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

      <div className="UserForm__ItemBox">
        <input
          type={`${ShowPassword ? "text" : "password"}`}
          name="confirmPassword"
          className={`UserForm__Item ${
            error.confirmationError && "UserForm__ErrorStateITEM"
          }`}
          placeholder="Confirm your password"
          value={userDetails.confirmPassword}
          onChange={handleInputOnChange}
          ref={confirmPassRef}
          autoComplete="new-password"
        />
        {error.confirmationError && (
          <>
            <p className="UserForm__ItemError">{error.errorMsg}</p>
            <i className="fa-solid fa-circle-exclamation UserForm__ItemErrorICON"></i>
          </>
        )}
      </div>

      <div className="UserForm__ButtonBox">
        <button className="UserForm__ItemButton" onClick={CBFun}>
          Back
        </button>
        <button
          className="UserForm__ItemButton"
          onClick={handleUpdatePasswordClick}
        >
          Update
        </button>
      </div>
      {isLoading && <Loader />}
    </form>
  );
}

export default ForgotPassword;
