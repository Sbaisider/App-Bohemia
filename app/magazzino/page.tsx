"use client";
import { useState, useEffect } from "react";

type Prodotto = {
  id: number;
  nome: string;
  quantita: number;
  minimo: number;
};

export default function MagazzinoPage() {
  const [prodotti, setProdotti] = useState<Prodotto[]>([]);
  const [carico, setCarico] = useState({ prodottoId: "", quantita: 1, descrizione: "" });
  const [scarico, setScarico] = useState({ prodottoId: "", quantita: 1, barNome: "" });

  const barOptions = [
    { nome: "main", label: "Main Bar" },
    { nome: "musa", label: "Musa Bar" },
    { nome: "tokyo", label: "Tokyo Bar" },
    { nome: "cambusa", label: "Cambusa" },
  ];

  useEffect(() => {
    fetch("/api/magazzino/prodotti")
      .then(res => res.json())
      .then(setProdotti);
  }, []);

  const handleCarico = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/magazzino/movimenti", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prodottoId: Number(carico.prodottoId),
        quantita: Number(carico.quantita),
        tipo: "carico_fornitore",
        descrizione: carico.descrizione,
      }),
    });
    setCarico({ prodottoId: "", quantita: 1, descrizione: "" });
    // Ricarica lista prodotti aggiornata!
    fetch("/api/magazzino/prodotti")
      .then(res => res.json())
      .then(setProdotti);
  };

  const handleScarico = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/magazzino/scarico-bar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prodottoId: Number(scarico.prodottoId),
        quantita: Number(scarico.quantita),
        barNome: scarico.barNome,
      }),
    });
    setScarico({ prodottoId: "", quantita: 1, barNome: "" });
    // Ricarica lista prodotti aggiornata!
    fetch("/api/magazzino/prodotti")
      .then(res => res.json())
      .then(setProdotti);
  };

  return (
    <main>
      <h1>Magazzino Centrale</h1>
      <table border={1} cellPadding={10} style={{ marginTop: 24, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Prodotto</th>
            <th>Quantità Magazzino</th>
            <th>Minimo Magazzino</th>
          </tr>
        </thead>
        <tbody>
          {prodotti.map((p, i) => {
            const minimo = p.minimo ?? 0;
            return (
              <tr key={i} style={p.quantita <= minimo ? { background: "#ffcaca" } : {}}>
                <td>{p.nome}</td>
                <td>{p.quantita}</td>
                <td>{minimo}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2 style={{ marginTop: 40 }}>Carico dal Fornitore</h2>
      <form onSubmit={handleCarico}>
        <select
          value={carico.prodottoId}
          onChange={e => setCarico(c => ({ ...c, prodottoId: e.target.value }))}
        >
          <option value="">Seleziona prodotto...</option>
          {prodotti.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          value={carico.quantita}
          onChange={e => setCarico(c => ({ ...c, quantita: Number(e.target.value) }))}
          style={{ marginLeft: 8 }}
          placeholder="Quantità"
        />
        <input
          type="text"
          value={carico.descrizione}
          onChange={e => setCarico(c => ({ ...c, descrizione: e.target.value }))}
          style={{ marginLeft: 8 }}
          placeholder="Descrizione (opzionale)"
        />
        <button type="submit" style={{ marginLeft: 8 }}>Carica</button>
      </form>

      <h2 style={{ marginTop: 40 }}>Scarica verso un Bar</h2>
      <form onSubmit={handleScarico}>
        <select
          value={scarico.prodottoId}
          onChange={e => setScarico(s => ({ ...s, prodottoId: e.target.value }))}
        >
          <option value="">Seleziona prodotto...</option>
          {prodotti.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          value={scarico.quantita}
          onChange={e => setScarico(s => ({ ...s, quantita: Number(e.target.value) }))}
          style={{ marginLeft: 8 }}
          placeholder="Quantità"
        />
        <select
          value={scarico.barNome}
          onChange={e => setScarico(s => ({ ...s, barNome: e.target.value }))}
          style={{ marginLeft: 8 }}
        >
          <option value="">Seleziona bar...</option>
          {barOptions.map(b => (
            <option key={b.nome} value={b.nome}>{b.label}</option>
          ))}
        </select>
        <button type="submit" style={{ marginLeft: 8 }}>Scarica verso bar</button>
      </form>
    </main>
  );
}
