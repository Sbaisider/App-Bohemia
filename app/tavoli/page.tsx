"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TableMap from "@/components/TableMap";

export default function TavoliPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const role = window.localStorage.getItem("role");
    const user = window.localStorage.getItem("username");
    if (role !== "tavoli") {
      router.replace("/login");
    } else {
      setUsername(user);
    }
  }, [router]);

  function handleLogout() {
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("username");
    router.push("/login");
  }

  function handleTableClick(id: string, stato: "libero" | "prenotato") {
    // Qui puoi aggiungere modali, azioni, ecc.
    // alert(`Hai selezionato ${id} (${stato})`);
  }

  // Loading se manca username
  if (!username) return <div style={{
    minHeight: "100vh",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 24, fontWeight: 600
  }}>Caricamento...</div>;

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
          maxWidth: 1100,
          border: "1.5px solid #eee",
          margin: "0 auto"
        }}
      >
        {/* Logo se vuoi */}
        <div style={{
          textAlign: "center",
          marginBottom: 32
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
          fontSize: 22,
          color: "#222",
          textAlign: "center",
          marginBottom: 24,
          letterSpacing: 2,
          opacity: 0.95
        }}>
          Area Tavoli
        </h2>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          fontSize: 17,
          color: "#444"
        }}>
          <span>
            Utente: <b>{username}</b>
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "9px 18px",
              background: "#a00",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15,
              marginLeft: 14,
              textTransform: "uppercase"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#d01c38";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#a00";
            }}
          >
            Logout
          </button>
        </div>
        <div style={{
          color: "#444",
          fontSize: 17,
          marginBottom: 30,
          textAlign: "center"
        }}>
          Visualizza e gestisci la mappa tavoli in tempo reale.
        </div>
        <div style={{
          background: "#f8f8f8",
          borderRadius: 18,
          padding: 22,
          border: "1.2px solid #eee",
          margin: "0 auto",
          boxShadow: "0 2px 16px #9991"
        }}>
          <TableMap onTableClick={handleTableClick} />
        </div>
      </section>
    </main>
  );
}
