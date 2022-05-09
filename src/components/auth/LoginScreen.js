import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { starLoginEmailPassword, startGoogleLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import SpinnerButton from "../spinners/spinnerButtons/SpinnerButton";
const initialForm = {
  email: "",
  password: "",
};
export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const { formValues, handleInputChange } = useForm(initialForm);
  const { email, password } = formValues;

   

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("login");
      dispatch(starLoginEmailPassword(email, password));
    } else {
      Swal.fire({
        icon: "warning",
        title: "Incomplete data",
        text: "please fill all the fields",
      });
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };
  const validateForm = () => {
    if (email.trim().length === 0) {
      return false;
    }
    if (password.trim().length === 0) {
      return false;
    }

    return true;
  };
  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          {loading ? <SpinnerButton /> : "Login"}
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
};
