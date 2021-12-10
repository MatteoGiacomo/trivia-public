import React, { useState, SyntheticEvent, useEffect } from "react";
import style from "./LoginForm.module.css";
import { GenericLoader, ErrorBanner, Button } from "../../sharedComponents";
import {
  loginUser,
  LoginUserDetails,
  isLoginModalVisible,
  setLoginModalStatus,
  getLoginStatus,
  getErrorMessage,
  resetError,
} from "./userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export function LoginForm() {
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [nicknameValue, setNicknameValue] = useState("");
  const [isPending, setPendingStatus] = useState(false);
  const [type, setFormType] = useState<LoginUserDetails["mode"]>("signup");

  const dispatch = useAppDispatch();
  const isModalVisible = useAppSelector(isLoginModalVisible);
  const loginStatus = useAppSelector(getLoginStatus);
  const errorMessage = useAppSelector(getErrorMessage);

  /**
   * Handles submit form event.
   *
   * @param e SubmitForm event
   */
  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setPendingStatus(true);

    await dispatch(
      loginUser({
        mode: type,
        email: emailValue,
        password: passwordValue,
        nickname: nicknameValue,
      })
    );
  };

  /**
   * Reset error message banner after 5s
   */
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        dispatch(resetError());
      }, 5000);
    }
  }, [dispatch, errorMessage]);

  /**
   * Hide login modal as soon as the login process is fulfilled
   */
  useEffect(() => {
    if (loginStatus === "success" && isPending) {
      setPendingStatus(false);
      dispatch(setLoginModalStatus("hidden"));
    }
  }, [loginStatus, dispatch, isPending]);

  /**
   * customize copy based on signup or login flows
   */
  let title = "Signup";
  let changeButtonText = "Already registered? Click here to login";
  let nextMode: LoginUserDetails["mode"] = "login";

  if (type === "login") {
    title = "Login";
    changeButtonText = "Are you a newbie? Click here to signup";
    nextMode = "signup";
  }

  return (
    <>
      {isModalVisible && (
        <section className={style.overlay}>
          <form onSubmit={handleFormSubmit} className={style.form}>
            {loginStatus === "failed" && <ErrorBanner message={errorMessage} />}
            {loginStatus === "loading" && (
              <GenericLoader message="we are logging you" />
            )}
            <Button
              status="secondary"
              label="close modal"
              className={style.closeButton}
              onClick={() => {
                dispatch(setLoginModalStatus("hidden"));
              }}
            />
            <h3>{title}</h3>
            {/* "nickname" input - only present in signup flow */}
            {type === "signup" && (
              <div className={style.inputWrapper}>
                <label htmlFor="nickname">Nickname:</label>
                <input
                  type="text"
                  id="nickname"
                  onChange={(e) => setNicknameValue(e.target.value)}
                />
              </div>
            )}
            <div className={style.inputWrapper}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </div>
            <div className={style.inputWrapper}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <p>Password length should be at least 6 characters.</p>
            </div>
            <Button type="submit" label={title} />

            {/* button to switch between "signup" and "login" flows */}
            <Button
              type="button"
              status="secondary"
              className={style.changeTypeButton}
              onClick={() => {
                setFormType(nextMode);
              }}
              label={changeButtonText}
            />
          </form>
        </section>
      )}
    </>
  );
}
