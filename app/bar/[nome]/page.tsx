"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Prodotto = {
  id: number;
  nome: string;
  quantita: number;
  minimo: number;
};

export default function BarInventarioPage() {
  const params = useParams();
  const barNome = params.nome as string;
  const [prodotti, setProdotti] = useState<Prodotto[]>([]);
  const [movimenti, setMovimenti] = useState<any[]>([]);

  // ---- Rettifica stato
  const [rettifica, setRettifica] = useState({ prodottoId: "", quantita: "" });
  const [messaggio, setMessaggio] = useState("");

  useEffect(() => {
    fetch(`/api/magazzino/${barNome}/prodotti`)
      .then(res => res.json())
      .then(setProdotti);

    fetch(`/api/magazzino/${barNome}/movimenti`)
      .then(res => res.json())
      .then(setMovimenti);
  }, [barNome]);

  const handleRettifica = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rettifica.prodottoId || rettifica.quantita === "") return;
    const res = await fetch(`/api/magazzino/rettifica`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prodottoId: Number(rettifica.prodottoId),
        quantita: Number(rettifica.quantita),
      }),
    });
    if (res.ok) {
      setMessaggio("Quantità aggiornata!");
      setRettifica({ prodottoId: "", quantita: "" });
      // Ricarica prodotti!
      fetch(`/api/magazzino/${barNome}/prodotti`)
        .then(res => res.json())
        .then(setProdotti);
    } else {
      setMessaggio("Errore nell'aggiornamento.");
    }
  };

  return (
    <main>
      <h1>Inventario {barNome}</h1>
      <table border={1} cellPadding={10} style={{ marginTop: 24, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Prodotto</th>
            <th>Quantità</th>
            <th>Minimo</th>
          </tr>
        </thead>
        <tbody>
          {prodotti.map((p, i) => (
            <tr key={i} style={p.quantita <= (p.minimo ?? 0) ? { background: "#ffcaca" } : {}}>
              <td>{p.nome}</td>
              <td>{p.quantita}</td>
              <td>{p.minimo ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FORM RETTIFICA */}
      <h2 style={{ marginTop: 40 }}>Rettifica quantità (fine serata)</h2>
      <form onSubmit={handleRettifica}>
        <select
          value={rettifica.prodottoId}
          onChange={e => setRettifica(r => ({ ...r, prodottoId: e.target.value }))}
          required
        >
          <option value="">Scegli prodotto...</option>
          {prodotti.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
        <input
          type="number"
          min={0}
          placeholder="Quantità finale"
          value={rettifica.quantita}
          onChange={e => setRettifica(r => ({ ...r, quantita: e.target.value }))}
          style={{ marginLeft: 8 }}
          required
        />
        <button type="submit" style={{ marginLeft: 8 }}>Salva Rettifica</button>
        {messaggio && <span style={{ marginLeft: 12 }}>{messaggio}</span>}
      </form>

      <h2 style={{ marginTop: 40 }}>Storico Movimenti</h2>
      <table border={1} cellPadding={8} style={{ marginTop: 12, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Prodotto</th>
            <th>Tipo</th>
            <th>Quantità</th>
            <th>Descrizione</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {movimenti.map((m, i) => (
            <tr key={i}>
              <td>{m.prodotto?.nome}</td>
              <td>{m.tipo}</td>
              <td>{m.quantita}</td>
              <td>{m.descrizione || ""}</td>
              <td>{new Date(m.data).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}