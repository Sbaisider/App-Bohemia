"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const USERS = [
  { username: "VLNZC", password: "vlnzcpass", role: "admin" },
  { username: "Pato", password: "patopass", role: "admin" },
  { username: "Tavoli", password: "tavolipass", role: "tavoli" },
];

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const found = USERS.find(
      u => u.username === username && u.password === password
    );
    if (!found) {
      setError("Username o password errati!");
      return;
    }
    // Salva login su localStorage
    window.localStorage.setItem("role", found.role);
    window.localStorage.setItem("username", found.username);

    if (found.role === "admin") router.push("/admin");
    else if (found.role === "tavoli") router.push("/tavoli");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#f7f7f7 0%,#ededed 80%)",
        color: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Questrial, Montserrat, Arial, sans-serif"
      }}
    >
      <section
        style={{
          background: "rgba(255,255,255,0.92)",
          padding: 40,
          borderRadius: 24,
          boxShadow: "0 0 44px #3331",
          minWidth: 350,
          maxWidth: "90vw",
          border: "1.5px solid #eee"
        }}
      >
        <div style={{
          textAlign: "center",
          marginBottom: 34
        }}>
          <img
            src="/bohemia-logo.png"
            alt="Bohemia"
            style={{
              height: 68,
              marginBottom: 10,
              marginTop: -10,
              filter: "none",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          />
        </div>
        <h2 style={{
          fontWeight: 500,
          textTransform: "uppercase",
          fontSize: 18,
          color: "#222",
          textAlign: "center",
          marginBottom: 32,
          letterSpacing: 2,
          opacity: 0.92
        }}>
          Accesso Area Riservata
        </h2>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <div style={{ marginBottom: 18 }}>
            <label style={{
              fontWeight: 500,
              letterSpacing: 1,
              textTransform: "uppercase",
              fontSize: 14,
              color: "#333"
            }}>Username</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
              style={{
                width: "100%",
                padding: "12px 16px",
                marginTop: 4,
                borderRadius: 10,
                border: "1.2px solid #ccc",
                background: "#f8f8f8",
                color: "#111",
                fontSize: 18,
                fontFamily: "Questrial,Montserrat,Arial,sans-serif",
                outline: "none"
              }}
              autoComplete="username"
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{
              fontWeight: 500,
              letterSpacing: 1,
              textTransform: "uppercase",
              fontSize: 14,
              color: "#333"
            }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                marginTop: 4,
                borderRadius: 10,
                border: "1.2px solid #ccc",
                background: "#f8f8f8",
                color: "#111",
                fontSize: 18,
                fontFamily: "Questrial,Montserrat,Arial,sans-serif",
                outline: "none"
              }}
              autoComplete="current-password"
            />
          </div>
          {error && (
            <div style={{ color: "#c70039", marginBottom: 16, fontWeight: 700, fontSize: 15 }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px 0",
              background: "#111",
              color: "#fff",
              fontWeight: 700,
              fontSize: 19,
              border: "none",
              borderRadius: 12,
              marginTop: 10,
              cursor: "pointer",
              fontFamily: "Questrial,Montserrat,Arial,sans-serif",
              textTransform: "uppercase",
              transition: "background 0.13s, color 0.13s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#3e3e3e";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#111";
              e.currentTarget.style.color = "#fff";
            }}
          >
            Accedi
          </button>
        </form>
      </section>
    </main>
  );
}
