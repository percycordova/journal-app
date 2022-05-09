import Swal from "sweetalert2";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
//asi se maneja las llamadas asincronas
export const starLoginEmailPassword = (emial, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(emial, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
        //  console.log('resp:', res)
      })
      .catch((err) => {
        // console.log("err:", err.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
        dispatch(finishLoading());
      });
  };
};

export const startRegisterWintEamilPasswordName = ({
  email,
  password,
  name,
}) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
        Swal.fire({
          icon: "success",
          title: "successfully registered user",
          text: "welecome to our app",
        })

      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      });
  };
};
export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.logout,
});
