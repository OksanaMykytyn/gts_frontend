import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button/Button";
import {
  EmailInput,
  PasswordInput,
} from "../../components/input-fields/InputFields";
import Background from "../../components/background/Background";
import Header from "../../components/header/Header";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    let err = {};

    if (!form.email.trim()) err.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Email is not valid";

    if (!form.password) err.password = "Password is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:3000/users/login", {
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

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "Login failed");
        return;
      }

      navigate("/profile");
    } catch (err) {
      setServerError("Server error. Could not connect.");
    }
  };

  return (
    <>
      <Background />
      <Header />
      <h1 className="heading-type-1">Sign in</h1>

      <form onSubmit={handleSubmit} noValidate>
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

        {serverError && <p className="error-text">{serverError}</p>}

        <Button text="Sign in" />

        <p className="text-below-form">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </form>
    </>
  );
};

export default LoginPage;
