"use client";
import { useEffect, useState } from "react";

type Movimento = {
  magazzinoNome: string;
  prodottoNome: string;
  tipo: string;
  quantita: number;
  descrizione: string | null;
  data: string;
};

export default function StoricoGlobalePage() {
  const [movimenti, setMovimenti] = useState<Movimento[]>([]);

  useEffect(() => {
    fetch("/api/magazzino/tutti-movimenti")
      .then(res => res.json())
      .then(setMovimenti);
  }, []);

  return (
    <main>
      <h1>Storico Globale Movimenti</h1>
      <table border={1} cellPadding={8} style={{ marginTop: 12, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Magazzino/Bar</th>
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
              <td>{m.magazzinoNome}</td>
              <td>{m.prodottoNome}</td>
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
