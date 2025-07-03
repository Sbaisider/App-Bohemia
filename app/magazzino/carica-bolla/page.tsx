"use client";
import { useRef, useState } from "react";

type ProdottoCarico = {
  nome: string;
  quantita: number;
  prezzo: number;
};

export default function CaricaBollaPage() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [prodotti, setProdotti] = useState<ProdottoCarico[]>([]);
  const [step, setStep] = useState<"start" | "preview" | "conferma">("start");
  const fileInput = useRef<HTMLInputElement>(null);

  // Simulazione OCR: finto parsing bolla
  function fakeParseBolla() {
    // qui in futuro chiamerai la vera API OCR!
    // DEMO: prodotti di esempio
    setProdotti([
      { nome: "Vodka", quantita: 5, prezzo: 5 },
      { nome: "Gin", quantita: 3, prezzo: 4 },
      { nome: "Rum", quantita: 2, prezzo: 6 }
    ]);
    setStep("conferma");
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImgUrl(url);
    setStep("preview");
    // qui chiami l’OCR! (per ora simuliamo)
    setTimeout(fakeParseBolla, 1200); // simula attesa
  }

  function aggiornaProdotto(idx: number, key: "quantita" | "prezzo", val: number) {
    setProdotti(prodotti =>
      prodotti.map((p, i) =>
        i === idx ? { ...p, [key]: val } : p
      )
    );
  }

  function handleConferma(e: React.FormEvent) {
    e.preventDefault();
    // Qui aggiorneresti il magazzino e storico con una fetch POST!
    alert("Carico confermato!\n" +
      prodotti.map(p => `${p.nome}: ${p.quantita} x ${p.prezzo}€ = ${(p.quantita * p.prezzo).toFixed(2)}€`).join("\n") +
      `\nTotale: ${prodotti.reduce((acc, p) => acc + p.quantita * p.prezzo, 0).toFixed(2)}€`
    );
    // Reset per demo
    setImgUrl(null);
    setProdotti([]);
    setStep("start");
    if (fileInput.current) fileInput.current.value = "";
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#fafafa",
      color: "#111",
      fontFamily: "Questrial, Montserrat, Arial, sans-serif",
      padding: "42px 8px 16px 8px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1 style={{
        fontSize: 30,
        letterSpacing: 1.5,
        marginBottom: 30,
        fontWeight: 600,
        textTransform: "uppercase",
        textAlign: "center"
      }}>
        Carica Bolla Fornitore
      </h1>

      {step === "start" && (
        <div style={{
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 0 18px #2221",
          border: "1.5px solid #ccc"
        }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            ref={fileInput}
            style={{
              display: "block",
              marginBottom: 22,
            }}
          />
          <p style={{ color: "#555", fontSize: 15, marginBottom: 0 }}>
            Carica una foto della bolla fornitore per estrarre i prodotti!
          </p>
        </div>
      )}

      {step !== "start" && imgUrl && (
        <div style={{ margin: "24px 0" }}>
          <img
            src={imgUrl}
            alt="Bolla Fornitore"
            style={{
              maxHeight: 250,
              maxWidth: "98vw",
              borderRadius: 14,
              border: "1.5px solid #eee",
              boxShadow: "0 0 12px #2222"
            }}
          />
        </div>
      )}

      {step === "preview" && (
        <div style={{
          background: "#fff",
          borderRadius: 12,
          padding: "32px 16px",
          fontSize: 17,
          color: "#888",
          marginBottom: 18,
          textAlign: "center",
          width: "100%",
          maxWidth: 340,
          boxShadow: "0 0 12px #2221"
        }}>
          Lettura dati dalla bolla in corso...
        </div>
      )}

      {step === "conferma" && prodotti.length > 0 && (
        <form onSubmit={handleConferma} style={{
          background: "#fff",
          borderRadius: 18,
          padding: 30,
          boxShadow: "0 0 16px #2222",
          border: "1.5px solid #eee",
          maxWidth: 600,
          width: "100%"
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Prodotto</th>
                <th style={{ textAlign: "center" }}>Quantità</th>
                <th style={{ textAlign: "center" }}>Prezzo unit.</th>
                <th style={{ textAlign: "right" }}>Totale</th>
              </tr>
            </thead>
            <tbody>
              {prodotti.map((p, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                  <td>{p.nome}</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      value={p.quantita}
                      onChange={e => aggiornaProdotto(i, "quantita", Number(e.target.value))}
                      style={{
                        width: 56,
                        padding: "4px 6px",
                        borderRadius: 7,
                        border: "1px solid #bbb",
                        fontSize: 17,
                        textAlign: "center",
                        margin: "0 4px"
                      }}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={p.prezzo}
                      onChange={e => aggiornaProdotto(i, "prezzo", Number(e.target.value))}
                      style={{
                        width: 70,
                        padding: "4px 6px",
                        borderRadius: 7,
                        border: "1px solid #bbb",
                        fontSize: 17,
                        textAlign: "center",
                        margin: "0 4px"
                      }}
                      required
                    />
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 600 }}>
                    {(p.quantita * p.prezzo).toFixed(2)} €
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} style={{ textAlign: "right", fontWeight: "bold", fontSize: 17 }}>
                  Totale:
                </td>
                <td style={{ fontWeight: "bold", textAlign: "right", fontSize: 17 }}>
                  {prodotti.reduce((acc, p) => acc + p.quantita * p.prezzo, 0).toFixed(2)} €
                </td>
              </tr>
            </tfoot>
          </table>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px 0",
              background: "#111",
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              border: "none",
              borderRadius: 13,
              marginTop: 10,
              cursor: "pointer",
              fontFamily: "Questrial,Montserrat,Arial,sans-serif",
              textTransform: "uppercase",
              letterSpacing: 1
            }}
          >
            Conferma Carico
          </button>
        </form>
      )}
    </main>
  );
}
