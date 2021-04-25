import React, { useState } from "react";
import PropTypes from "prop-types";

import { Modal } from "react-bootstrap";

export default function SignupModal({ show, onHide }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ageChecked, setAgeChecked] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFlag(true);
      return;
    }

    const response = await fetch("/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.status !== 200) {
      setFlag(true);
    } else {
      window.location.reload();
    }
  };

  return (
    <div>
      <Modal size="md" show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>Sign Up</Modal.Title>
          <button
            aria-label="signup"
            type="button"
            className="btn-close"
            onClick={onHide}
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input
              aria-label="username"
              type="text"
              name="username"
              value={username}
              className="form-control text-content"
              placeholder="New Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              arial-label="password"
              type="password"
              name="password"
              value={password}
              className="form-control"
              placeholder="New Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              arial-label="passwordconfirm"
              type="password"
              name="confirm-password"
              value={confirmPassword}
              className="form-control"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <div className="form-check">
              <input
                arial-label="agecheck"
                type="checkbox"
                className="form-check-input"
                checked={ageChecked}
                onChange={(e) => {
                  setAgeChecked(e.target.checked);
                }}
                required="required"
              />
              <div className="form-check-label" for="agecheck">
                I am at age 21 or older.
              </div>
            </div>
            {flag && (
              <div className="errorMsg">
                Can not sign up the user, please try again.
              </div>
            )}
            <button
              arial-label="submit"
              disabled={!username || !password || !ageChecked}
              className="w-100 btn btn-lg btn-primary sign-out-btn"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

SignupModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
