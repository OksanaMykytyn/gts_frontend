import React, { useState } from "react";

import { API_URL } from "../../config";

import Button from "../../components/button/Button";
import {
  TextInput,
  EmailInput,
  PasswordInput,
} from "../../components/input-fields/InputFields";
import Background from "../../components/background/Background";
import Header from "../../components/header/Header";

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let err = {};

    if (!form.username.trim()) err.username = "Username is required";
    if (!form.email.trim()) err.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Email is not valid";

    if (form.password.length < 6)
      err.password = "Password must be at least 6 characters";

    if (form.confirmPassword !== form.password)
      err.confirmPassword = "Passwords do not match";

    if (!form.agree) err.agree = "You must agree with privacy policy";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "Registration failed");
        return;
      }

      await fetch(`${API_URL}/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      window.location.href = "/profile";
    } catch (err) {
      setServerError("Server error");
    }
  };

  return (
    <>
      <Background />
      <Header />
      <h1 className="heading-type-1">Sign up</h1>

      <form onSubmit={handleSubmit} noValidate>
        <TextInput
          id="username"
          label="Username"
          value={form.username}
          onChange={handleChange}
          error={errors.username}
        />

        <EmailInput
          id="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <PasswordInput
          id="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <label className="checkbox">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
          />
          <span>I agree with privacy policy</span>
        </label>
        {errors.agree && <p className="error-text">{errors.agree}</p>}

        {serverError && <p className="error-text">{serverError}</p>}

        <Button text="Sign up" />

        <p className="text-below-form">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </form>
    </>
  );
};

export default RegisterPage;
