"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

export default function AdminPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    setUsername(window.localStorage.getItem("username") || "");
  }, []);

  const menu = [
    { label: "Magazzino Centrale", href: "/magazzino" },
    { label: "Main Bar", href: "/bar/main" },
    { label: "Musa Bar", href: "/bar/musa" },
    { label: "Tokyo Bar", href: "/bar/tokyo" },
    { label: "Cambusa Bar", href: "/bar/cambusa" },
    { label: "Storico Globale", href: "/storico" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#f7f7f7 0%,#ededed 80%)",
        color: "#111",
        fontFamily: "Questrial, Montserrat, Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "48px 16px 0 16px",
      }}
    >
      {/* Logo Bohemia nero */}
      <div style={{ marginBottom: 14, marginTop: 18, textAlign: "center" }}>
        <img
          src="/bohemia2.png"
          alt="Bohemia"
          style={{ height: 60, marginBottom: 2 }}
        />
      </div>
      <div style={{
        fontFamily: "Questrial, Montserrat, Arial, sans-serif",
        fontSize: 17,
        color: "#222",
        letterSpacing: 2,
        marginBottom: 36,
        textTransform: "uppercase",
        opacity: 0.8,
        textAlign: "center",
      }}>
        Area gestione <span style={{ fontWeight: 700 }}>{username.toUpperCase()}</span>
      </div>
      {isMobile ? (
        <div style={{ width: "100%", maxWidth: 320, marginBottom: 36 }}>
          <select
            onChange={e => { if (e.target.value) router.push(e.target.value); }}
            defaultValue=""
            style={{
              width: "100%",
              padding: "16px 12px",
              borderRadius: 12,
              background: "#fff",
              color: "#111",
              fontWeight: 500,
              fontSize: 18,
              border: "1.5px solid #222",
              outline: "none",
              marginBottom: 22,
              textTransform: "uppercase",
              fontFamily: "Questrial,Montserrat,Arial,sans-serif",
              appearance: "none",
            }}
          >
            <option value="" disabled>Menu...</option>
            {menu.map(item => (
              <option key={item.href} value={item.href}>{item.label.toUpperCase()}</option>
            ))}
          </select>
        </div>
      ) : (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 22,
          marginBottom: 40,
          justifyContent: "center"
        }}>
          {menu.map(item => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              style={{
                background: "#fff",
                color: "#111",
                fontWeight: 500,
                fontSize: 20,
                border: "1.5px solid #222",
                borderRadius: 16,
                padding: "16px 36px",
                marginBottom: 6,
                textTransform: "uppercase",
                fontFamily: "Questrial,Montserrat,Arial,sans-serif",
                transition: "background 0.18s, color 0.17s",
                boxShadow: "0 2px 12px #2221",
                cursor: "pointer"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#222";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#111";
              }}
            >
              {item.label.toUpperCase()}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => {
          window.localStorage.clear();
          router.push("/login");
        }}
        style={{
          marginTop: 18,
          background: "#fff",
          color: "#111",
          fontWeight: 600,
          fontSize: 19,
          border: "1.5px solid #222",
          borderRadius: 12,
          padding: "13px 32px",
          cursor: "pointer",
          boxShadow: "0 0 10px #2222",
          outline: "none",
          textTransform: "uppercase",
          fontFamily: "Questrial,Montserrat,Arial,sans-serif"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "#222";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.color = "#111";
        }}
      >
        Logout
      </button>
    </main>
  );
}
