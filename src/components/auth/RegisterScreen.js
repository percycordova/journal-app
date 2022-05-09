import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWintEamilPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { formValues, handleInputChange } = useForm(initialValues);
  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(
        startRegisterWintEamilPasswordName({
          email: formValues.email,
          name: formValues.name,
          password: formValues.password,
        })
      );
    }
  };
  const isFormValid = () => {
    if (formValues.name.trim().length === 0) {
      dispatch(setError("name is required"));
      return false;
    } else if (!validator.isEmail(formValues.email)) {
      dispatch(setError("email is invalid"));
      return false;
    } else if (
      formValues.password !== formValues.confirmPassword ||
      formValues.password.length < 5
    ) {
      dispatch(setError("password is invalid, must be at least 5 characters"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
          value={formValues.name}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
          value={formValues.email}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          onChange={handleInputChange}
          value={formValues.password}
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          className="auth__input"
          onChange={handleInputChange}
          value={formValues.confirmPassword}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
