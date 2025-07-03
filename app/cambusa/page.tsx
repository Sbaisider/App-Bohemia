"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    const role = window.localStorage.getItem("role");
    if (role !== "admin") {
      router.push("/login");
    }
  }, []);

  function handleLogout() {
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("username");
    router.push("/login");
  }

  return (
    <main>
      <h1>Area Cambusa</h1>
      <p>Benvenuto, qui gestisci la cambusa.</p>
      <button onClick={handleLogout} style={{
        marginTop: 20,
        padding: 10,
        background: "#a00",
        color: "white",
        border: "none",
        borderRadius: 8,
        cursor: "pointer"
      }}>
        Logout
      </button>
    </main>
  )
}
