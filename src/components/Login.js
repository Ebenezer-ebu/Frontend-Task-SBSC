import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faEnvelope,
  faLock,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { register, login } from "../utils/api";
import Error from "./Error";

const Login = () => {
  let navigate = useNavigate();
  const [inputtext, setinputtext] = useState({
    email: "",
    password: "",
  });
  const [entry, setEntry] = useState({
    register: true,
    login: false,
  });
  const [error, setError] = useState({ status: false, message: "" });
  const [warnemail, setwarnemail] = useState(false);
  const [warnpassword, setwarnpassword] = useState(false);

  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");
  const [type, settype] = useState(false);

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setinputtext((lastValue) => {
      return {
        ...lastValue,
        [name]: value,
      };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setwarnemail(false);
    setwarnpassword(false);
    setError((prev) => ({ ...prev, status: false }));
    let response;
    if (entry.register) {
      response = await register(inputtext);
    } else {
      response = await login(inputtext);
    }

    if (
      (response.warningEmail && response.warningEmail.status) ||
      (response.warningPassword && response.warningPassword.status)
    ) {
      setwarnemail(response.warningEmail.status);
      setwarnpassword(response.warningPassword.status);
      let emailError =
        response.warningEmail.message.length > 0
          ? "*" + response.warningEmail.message
          : "";
      let passwordError =
        response.warningPassword.message.length > 0
          ? "*" + response.warningPassword.message
          : "";
      setError({
        status: response.warningEmail.status || response.warningPassword.status,
        message: (
          <p>
            {emailError.length ? (
              <>
                {emailError}
                <br />
              </>
            ) : null}
            {passwordError.length ? passwordError : null}
          </p>
        ),
      });
    } else if (response.error) {
      setError({ message: response.error, status: true });
    } else {
      if (entry.register) {
        let data = JSON.stringify(response);
        localStorage.setItem("user", data);
        localStorage.setItem("isAuthenticated", "true");
      } else {
        let token = response.token;
        let obj = JSON.parse(localStorage.getItem("user"));
        obj.token = token;
        let data = JSON.stringify(obj);
        localStorage.setItem("user", data);
        localStorage.setItem("isAuthenticated", "true");
      }
      navigate("/user");
    }
  };

  const Eye = () => {
    if (password === "password") {
      setpassword("text");
      seteye(false);
      settype(true);
    } else {
      setpassword("password");
      seteye(true);
      settype(false);
    }
  };

  return (
    <>
      <div className="container">
        <div>
          {error.status && <Error error={error} />}
          <div className="card">
            <div className="text">
              <h3>SBSC</h3>
            </div>
            <form onSubmit={submitForm}>
              <div className="input-text">
                <input
                  type="text"
                  className={` ${warnemail ? "warning" : ""}`}
                  placeholder="Enter your email"
                  value={inputtext.email}
                  onChange={inputEvent}
                  name="email"
                />
                <FontAwesomeIcon icon={faEnvelope} className="fa fa-envelope" />
              </div>
              <div className="input-text">
                <input
                  type={password}
                  className={` ${warnpassword ? "warning" : ""} ${
                    type ? "type_password" : ""
                  }`}
                  placeholder="Enter your password"
                  value={inputtext.password}
                  onChange={inputEvent}
                  name="password"
                />
                <FontAwesomeIcon icon={faLock} className="fa fa-lock" />
                <FontAwesomeIcon
                  icon={eye ? faEye : faEyeSlash}
                  className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={Eye}
                />
              </div>
              {entry.login && (
                <>
                  <div className="buttons">
                    <button type="submit">Login</button>
                  </div>
                  <p className="notice">
                    If not registered proceed to{" "}
                    <span
                      onClick={() =>
                        setEntry((prev) => ({
                          ...prev,
                          register: true,
                          login: false,
                        }))
                      }
                    >
                      Register
                    </span>
                  </p>
                </>
              )}
              {entry.register && (
                <>
                  <div className="buttons">
                    <button type="submit">Sign Up</button>
                  </div>
                  <p className="notice">
                    If you are already registered proceed to{" "}
                    <span
                      onClick={() =>
                        setEntry((prev) => ({
                          ...prev,
                          register: false,
                          login: true,
                        }))
                      }
                    >
                      Login
                    </span>
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
