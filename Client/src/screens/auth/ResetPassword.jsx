import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "../Styles/Loginpage.module.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { id, token } = useParams();

  useEffect(() => {
    console.log(id, token);
  }, [id, token]);

  const resetPassword = async (e) => {
    e.preventDefault();

    if (!id || !token) {
      setMessage('Invalid reset link');
      return;
    }

    if (!newPassword || !confirmPassword) {
      setMessage('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Password and confirm password should be the same');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:500/api/users/reset-password/${id}/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: newPassword, password_confirmation: confirmPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.msg);
      } else {
        setMessage('Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred while resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainBoxLogin}>
      <div className={styles.leftBox}>
      <div className={styles.leftboxcontent}>
        <h1 className={styles.leftBoxHeading}>Turn Your Ideas Into Reality</h1>
        <h4>Start Your Front-End Journey With LEGO UI</h4>
      </div>
      </div>
      <form onSubmit={resetPassword}>
        <div className={styles.rightBox}>
          <div className={styles.centerdiv}>
            <div className={styles.mainCenterdiv}>
              <div className={styles.rightBoxcontent}>
                <h1 className={styles.loginHeading}>Reset Your Password</h1>
              </div>
              <div className={styles.loginPageInputs}>
              <div className={styles.wavegroup}>
                    <input
                      required
                      onChange={(e) => setNewPassword(e.target.value)}
                      type="password"
                      name=""
                      className={styles.input}
                    />
                    <span className={styles.bar} />
                    <label className={styles.label}>
                      <span className={styles.labelchar} style={{ '--index': -1 }} >N</span>
                      <span className={styles.labelchar} style={{ '--index': -1 }} >e</span>
                      <span className={styles.labelchar} style={{ '--index': -1 }} >w</span>
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
                  <div className={styles.wavegroup}>
                    <input
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                      name=""
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
              <div className={styles.loginBtnBox}>
                <button type="submit" className={styles.loginBtn} disabled={loading}>
                  Reset Password
                </button>
              </div>
              {message && <p style={{textAlign:"center",marginTop:"15px"}}>{message}</p>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
