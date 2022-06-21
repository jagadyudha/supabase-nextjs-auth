import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    agama: "",
  });

  const handleRegister = async (form) => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signUp(
        {
          email: form.email,
          password: form.password,
        },
        {
          data: {
            first_name: form.first_name,
            last_name: form.last_name,
            agama: form.agama,
          },
        }
      );
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

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
          <input
            className="inputField"
            type="text"
            placeholder="Your firstname"
            value={form.first_name}
            onChange={(e) =>
              setForm({
                ...form,
                first_name: e.target.value,
              })
            }
          />
          <input
            className="inputField"
            type="text"
            placeholder="Your lastname"
            value={form.last_name}
            onChange={(e) =>
              setForm({
                ...form,
                last_name: e.target.value,
              })
            }
          />
          <input
            className="inputField"
            type="text"
            placeholder="agama"
            value={form.agama}
            onChange={(e) =>
              setForm({
                ...form,
                agama: e.target.value,
              })
            }
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleRegister(form);
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Register"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
