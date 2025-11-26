import React from "react";

import "./InputFields.css";

const TextInput = ({ label, id, value, onChange, error }) => {
  return (
    <label className="input-field">
      <input
        id={id}
        name={id}
        type="text"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
      <span>{label}</span>
      {error && <p className="error-text">{error}</p>}
    </label>
  );
};

const EmailInput = ({ label, id, value, onChange, error }) => {
  return (
    <label className="input-field">
      <input
        id={id}
        name={id}
        type="email"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
      <span>{label}</span>
      {error && <p className="error-text">{error}</p>}
    </label>
  );
};

const PasswordInput = ({ label, id, value, onChange, error }) => {
  return (
    <label className="input-field">
      <input
        id={id}
        name={id}
        type="password"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
      <span>{label}</span>
      {error && <p className="error-text">{error}</p>}
    </label>
  );
};

export { TextInput, EmailInput, PasswordInput };
