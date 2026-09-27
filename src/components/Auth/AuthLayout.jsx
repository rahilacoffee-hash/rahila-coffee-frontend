import React from "react";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import "./AuthLayout.css";

const AuthLayout = ({ children, title, description, icon, backTo, backLabel = "Back to sign in" }) => (
  <main className="auth-page">
    <div className="auth-page__glow auth-page__glow--one" />
    <div className="auth-page__glow auth-page__glow--two" />
    <section className="auth-shell" aria-label={title}>
      <aside className="auth-aside">
        <Link to="/" className="auth-brand" aria-label="Rahila Coffee home">
          <span className="auth-brand__mark">R</span>
          <span>Rahila <em>Coffee</em></span>
        </Link>
        <div className="auth-aside__copy">
          <p className="auth-aside__eyebrow">Brewed for your ritual</p>
          <h1>Every great day starts with a good cup.</h1>
          <p>Sign in to discover rich, freshly roasted coffee delivered right to your door.</p>
        </div>
        <div className="auth-aside__note"><span>✦</span> Freshly roasted. Carefully delivered.</div>
      </aside>

      <div className="auth-card-wrap">
        <div className="auth-card">
          <Link to="/" className="auth-mobile-brand" aria-label="Rahila Coffee home">
            <span className="auth-brand__mark">R</span> Rahila <em>Coffee</em>
          </Link>
          {backTo && <Link className="auth-back" to={backTo}><ArrowBack fontSize="small" /> {backLabel}</Link>}
          <div className="auth-heading">
            {icon && <div className="auth-icon">{icon}</div>}
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </div>
          {children}
        </div>
      </div>
    </section>
  </main>
);

export default AuthLayout;
