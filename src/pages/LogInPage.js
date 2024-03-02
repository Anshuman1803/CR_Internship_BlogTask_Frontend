import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import valiDateEmails from "../helpers/ValidateEmail";
import valiDatePassword from "../helpers/ValidatePassword";
import { useDispatch } from "react-redux";
import { UserLoggedIn } from "../Redux/ReduxSlice";
function LogInPage({ CBFun }) {
  const [ShowPassword, setShowPassword] = useState(false);
  const [isLoading, SetLoading] = useState(false);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passRef = useRef();
  const [error, SetError] = useState({
    emailError: false,
    passwordError: false,
    errorMsg: "",
  });

  const [userDetails, SetuserDetails] = useState({
    userEmail: "",
    userPassword: "",
  });

  const clearFields = () => {
    SetuserDetails({
      userEmail: "",
      userPassword: "",
    });

    SetError({
      emailError: false,
      passwordError: false,
      errorMsg: "",
    });
  };

  const handleClearClick = (e) => {
    e.preventDefault();
    emailRef.current.focus();
    clearFields();
  };

  const handleInputOnChange = (e) => {
    SetError({
      emailError: false,
      passwordError: false,
      errorMsg: "",
    });
    if (e.target.value.includes(" ")) {
      e.target.value = e.target.value.replaceAll(" ", "");
    }
    SetuserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleLogInClick = (e) => {
    e.preventDefault();
    if (!valiDateEmails(userDetails.userEmail)) {
      SetError({
        emailError: true,
        passwordError: false,
        errorMsg: "Invalid email address",
      });
      emailRef.current.focus();
    } else if (!valiDatePassword(userDetails.userPassword)) {
      SetError({
        emailError: false,
        passwordError: true,
        errorMsg: "Minimun 8 characters required",
      });
      passRef.current.focus();
    } else {
      SetLoading(true);
      axios
        .post("http://localhost:5000/api/user/login", userDetails)
        .then((response) => {
          if (response.data.resMsg === "User Logged In Successfully") {
            toast.success("Logged In Successfully");
            dispatch(UserLoggedIn({
              currentUser: response.data.currentUser[0],
              isActive : true
            }));
            SetLoading(false);
            clearFields();
          } else if (response.data.resMsg === "Password is not Correct") {
            toast.error("Password is not Correct");
            SetLoading(false);
            SetuserDetails({ ...userDetails, userPassword: "" });
            passRef.current.focus();
          } else {
            toast.error("Email not registered");
            SetLoading(false);
            clearFields();
          }
        });
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);
  return (
    <>
      <form className="UserForm UserLogInForm">
        <h1 className="UserForm__title">Get Access to Blogs</h1>

        <div className="UserForm__ItemBox">
          {/* UserForm__ErrorStateITEM */}
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

        <p className="UserForm__forgotLINK">Forgot password?</p>
        <div className="UserForm__ButtonBox">
          <button className="UserForm__ItemButton" onClick={handleClearClick}>
            Clear
          </button>
          <button className="UserForm__ItemButton" onClick={handleLogInClick}>
            Sign in
          </button>
        </div>

        <p className="UserForm__itemLINKBox">
          Don't have an account:{" "}
          <Link className="UserForm__itemLINK" onClick={CBFun}>
            Sign up
          </Link>{" "}
        </p>

        {isLoading && <Loader />}
      </form>
    </>
  );
}

export default LogInPage;
