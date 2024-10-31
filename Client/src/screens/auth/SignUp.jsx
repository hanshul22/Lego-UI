import React, { useState } from "react";
import styles from "../Styles/Loginpage.module.css";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    tc: false,
  });

  const { username, email, password, confirmPassword, tc } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const loginWithGoogle = () => {
    window.open("http://localhost:500/auth/google/callback", "_self");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!tc) {
      alert("Please accept the terms and conditions.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and confirm password should be the same.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:500/api/users/register", {
        name: username,
        email,
        password,
        password_confirmation: confirmPassword,
        tc,
      });

      if (res.data.status === "success") {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert(
          res.data.message === "Email already exists"
            ? "This email already exists. Please use a different email."
            : `Registration failed: ${res.data.message}`
        );
      }
    } catch (error) {
      alert("An error occurred during registration");
    }
  };

  return (
    <div className={styles.mainBoxLogin}>
      <div className={styles.leftBox}>
        <div className={styles.leftboxcontent}>
          <h1 className={styles.leftBoxHeading}>
            Turn Your Ideas Into Reality
          </h1>
          <h4>Start Your Front-End Journey With LEGO UI</h4>
        </div>
      </div>
      <form onSubmit={handleSignUp}>
        <div className={styles.rightBox}>
          <div className={styles.centerdiv}>
            <div className={styles.mainCenterdiv}>
              <div className={styles.rightBoxcontent}>
                <h1 className={styles.loginHeading}>SignUp</h1>
                <p>Get started in seconds – sign up now!</p>
              </div>
              <div className={styles.loginPageInputs}>

                <div className={styles.wavegroup}>
                  <input
                    required
                    type="text"
                    name="username"
                    className={styles.input}
                  />
                  <span className={styles.bar} />
                  <label className={styles.label}>
                    <span className={styles.labelchar} style={{ '--index': 0 }} >N</span>
                    <span className={styles.labelchar} style={{ '--index': 1 }} >a</span>
                    <span className={styles.labelchar} style={{ '--index': 2 }} >m</span>
                    <span className={styles.labelchar} style={{ '--index': 3 }} >e</span>
                  </label>
                </div>
                <div className={styles.wavegroup}>
                  <input
                    required
                    type="text"
                    name="email"
                    className={styles.input}
                  />
                  <span className={styles.bar} />
                  <label className={styles.label}>
                    <span className={styles.labelchar} style={{ '--index': 0 }} >E</span>
                    <span className={styles.labelchar} style={{ '--index': 1 }} >m</span>
                    <span className={styles.labelchar} style={{ '--index': 2 }} >a</span>
                    <span className={styles.labelchar} style={{ '--index': 3 }} >i</span>
                    <span className={styles.labelchar} style={{ '--index': 4 }} >l</span>
                  </label>
                </div>
                <div className={styles.wavegroup}>
                  <input
                    required
                    type="password"
                    name="password"
                    className={styles.input}
                  />
                  <span className={styles.bar} />
                  <label className={styles.label}>
                    <span className={styles.labelchar} style={{ '--index': 0 }} >P</span>
                    <span className={styles.labelchar} style={{ '--index': 0 }} >a</span>
                    <span className={styles.labelchar} style={{ '--index': 1 }} >s</span>
                    <span className={styles.labelchar} style={{ '--index': 1 }} >s</span>
                    <span className={styles.labelchar} style={{ '--index': 2 }} >w</span>
                    <span className={styles.labelchar} style={{ '--index': 2 }} >o</span>
                    <span className={styles.labelchar} style={{ '--index': 3 }} >r</span>
                    <span className={styles.labelchar} style={{ '--index': 4 }} >d</span>
                  </label>
                </div>
                <div className={styles.wavegroup}>
                  <input
                    required
                    type="password"
                    name="confirmPassword"
                    className={styles.input}
                  />
                  <span className={styles.bar} />
                  <label className={styles.label}>
                    <span className={styles.labelchar} style={{ '--index': -3 }} >C</span>
                    <span className={styles.labelchar} style={{ '--index': -3 }} >o</span>
                    <span className={styles.labelchar} style={{ '--index': -2 }} >n</span>
                    <span className={styles.labelchar} style={{ '--index': -2 }} >f</span>
                    <span className={styles.labelchar} style={{ '--index': -2 }} >e</span>
                    <span className={styles.labelchar} style={{ '--index': -1 }} >r</span>
                    <span className={styles.labelchar} style={{ '--index': -1 }} >m</span>
                    <span className={styles.labelchar} style={{ '--index': -1 }} ></span>
                    <span className={styles.labelchar} style={{ '--index': 0 }} >P</span>
                    <span className={styles.labelchar} style={{ '--index': 0 }} >a</span>
                    <span className={styles.labelchar} style={{ '--index': 1 }} >s</span>
                    <span className={styles.labelchar} style={{ '--index': 1 }} >s</span>
                    <span className={styles.labelchar} style={{ '--index': 2 }} >w</span>
                    <span className={styles.labelchar} style={{ '--index': 2 }} >o</span>
                    <span className={styles.labelchar} style={{ '--index': 3 }} >r</span>
                    <span className={styles.labelchar} style={{ '--index': 4 }} >d</span>
                  </label>
                </div>
              </div>
              <div className={styles.chackboxdiv}>
                <div className={styles.checkboxmaindiv}>
                  <input
                    type="checkbox"
                    checked={tc}
                    name="tc"
                    onChange={handleChange}
                    className={styles.checkbox}
                  />
                  <p>I agree to the Terms and Conditions</p>
                </div>
              </div>

              <div className={styles.loginBtnBox}>
                  <input className={styles.loginbutton} type="submit" value="Sign Up" readOnly ></input>
                  <h2>OR</h2>
                  <div className={styles.googlelogin}>
                    <button className={styles.loginbutton}>
                    <FcGoogle className={styles.googleIcon}/>
                      Continue with Google
                    </button>
                  </div>
                </div>
              <p className={styles.register}>
                Already have an account?  <Link to={"/login"} className={styles.loginpagelink}>
                  {" "}
                  <a className={styles.loginpagelink}>Login</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
