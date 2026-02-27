import { useState } from "react";
import FormGroup from "../components/FormGroup.jsx";
import userStore from "../data/userStore.js";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function AuthPage({ mode, setPage, setUser }) {
  const isLogin = mode === "login";

  const [fields, setFields] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (key) => (e) => setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!isLogin && !fields.name.trim())                    e.name     = "Name is required";
    if (!isValidEmail(fields.email))                        e.email    = "Enter a valid email address";
    if (fields.password.length < 6)                         e.password = "Password must be at least 6 characters";
    if (!isLogin && fields.password !== fields.confirm)     e.confirm  = "Passwords do not match";
    return e;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    setGlobalError("");

    if (Object.keys(validationErrors).length > 0) return;

    if (isLogin) {
      const user = userStore.authenticate(fields.email, fields.password);
      if (!user) { setGlobalError("Incorrect email or password. Please try again."); return; }
      setUser(user);
      setPage("home");
    } else {
      if (userStore.find(fields.email)) { setGlobalError("An account with this email already exists."); return; }
      const newUser = { name: fields.name, email: fields.email, password: fields.password };
      userStore.add(newUser);
      setSuccessMsg("Account created! Signing you in…");
      setTimeout(() => { setUser(newUser); setPage("home"); }, 1200);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div className="auth-page page">
      <div className="auth-card">
        <h2 className="auth-card__title">{isLogin ? "Welcome Back" : "Join Coffeecient"}</h2>
        <p className="auth-card__sub">
          {isLogin ? "Sign in to your coffee corner" : "Create your account — it's free"}
        </p>

        {globalError && <div className="alert alert--error">{globalError}</div>}
        {successMsg  && <div className="alert alert--success">{successMsg}</div>}

        {!isLogin && (
          <FormGroup id="name" label="Full Name" placeholder="Your name"
            value={fields.name} onChange={handleChange("name")} onKeyDown={handleKeyDown} error={errors.name} />
        )}

        <FormGroup id="email" label="Email" type="email" placeholder="your@email.com"
          value={fields.email} onChange={handleChange("email")} onKeyDown={handleKeyDown} error={errors.email} />

        <FormGroup id="password" label="Password" type="password" placeholder="••••••••"
          value={fields.password} onChange={handleChange("password")} onKeyDown={handleKeyDown} error={errors.password} />

        {!isLogin && (
          <FormGroup id="confirm" label="Confirm Password" type="password" placeholder="••••••••"
            value={fields.confirm} onChange={handleChange("confirm")} onKeyDown={handleKeyDown} error={errors.confirm} />
        )}

        <button className="auth-submit" onClick={handleSubmit}>
          {isLogin ? "Sign In" : "Create Account"}
        </button>

        <div className="auth-switch">
          {isLogin ? (
            <>Don't have an account? <button onClick={() => setPage("register")}>Join Coffeecient</button></>
          ) : (
            <>Already a member? <button onClick={() => setPage("login")}>Sign in</button></>
          )}
        </div>
      </div>
    </div>
  );
}
