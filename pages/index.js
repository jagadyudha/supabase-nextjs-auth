import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    setSession(supabase.auth.session());
    setUser(supabase.auth.user());
  }, []);

  console.log(user);

  const handleLogin = async (form) => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn(form);
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (session)
    return (
      <main>
        <div>haiii {user.email}</div>
        <button onClick={async () => await supabase.auth.signOut()}>
          Logout Slur
        </button>
      </main>
    );

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + Next.js</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(form);
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "login"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
