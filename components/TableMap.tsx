import { useState } from "react";

const TAVOLI_IDS = [
  "Tavolo1", "Tavolo2", "Tavolo3", "Tavolo4", "Tavolo5",
  "Tavolo6", "Tavolo7", "Tavolo8", "Tavolo9", "Tavolo10"
];

type StatoTavoli = Record<string, "libero" | "prenotato">;

export default function TableMap({
  onTableClick,
}: {
  onTableClick?: (id: string, stato: "libero" | "prenotato") => void;
}) {
  // Stato di ogni tavolo: "libero" o "prenotato"
  const [statoTavoli, setStatoTavoli] = useState<StatoTavoli>(
    Object.fromEntries(TAVOLI_IDS.map(id => [id, "libero"]))
  );
  const [selected, setSelected] = useState<string | null>(null);

  function handleClick(e: React.MouseEvent<SVGElement, MouseEvent>) {
    const target = e.target as SVGElement;
    if (target.id && target.id.startsWith("Tavolo")) {
      setSelected(target.id);
      // Alterna stato prenotato/libero su click
      setStatoTavoli(prev => {
        const nuovoStato = prev[target.id] === "libero" ? "prenotato" : "libero";
        const updated = { ...prev, [target.id]: nuovoStato } as StatoTavoli;
        if (onTableClick) onTableClick(target.id, nuovoStato);
        return updated;
      });
    }
  }

  // Funzione per restituire colore in base allo stato
  function coloreTavolo(id: string) {
    if (statoTavoli[id] === "prenotato") return "#c70039"; // rosso
    if (selected === id) return "limegreen"; // selezionato
    return "black"; // default
  }

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "auto" }}>
      <svg
        width="1106"
        height="944"
        viewBox="0 0 1106 944"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClick}
        style={{ width: "100%", height: "auto", cursor: "pointer" }}
      >
        {/* Sfondo e dettagli */}
        <rect width="1106" height="944" fill="#F5F5F5" />
        <rect width="1106" height="944" fill="white" />
        <g>
          <rect x="83" y="16" width="939" height="880" rx="30" fill="#f2eee6" />
        </g>
        {/* I tuoi tavoli SVG (con id corrispondenti) */}
        <rect id="Tavolo1" x="734.373" y="217.852" width="72.1629" height="164.629" rx="10"
          transform="rotate(-90.2965 734.373 217.852)"
          fill={coloreTavolo("Tavolo1")}
          style={{ transition: "fill 0.2s" }}
        />
        <rect id="Tavolo2" x="459.373" y="217.014" width="72.1629" height="164.629" rx="10"
          transform="rotate(-90.2965 459.373 217.014)"
          fill={coloreTavolo("Tavolo2")}
          style={{ transition: "fill 0.2s" }}
        />
        <rect id="Tavolo3" x="184.373" y="217.014" width="72.1629" height="164.629" rx="10"
          transform="rotate(-90.2965 184.373 217.014)"
          fill={coloreTavolo("Tavolo3")}
          style={{ transition: "fill 0.2s" }}
        />
        <rect id="Tavolo4" x="336" y="443" width="46" height="57" rx="10"
          fill={coloreTavolo("Tavolo4")}
          style={{ transition: "fill 0.2s" }}
        />
        <rect id="Tavolo5" x="223.373" y="508.014" width="72.1629" height="164.629" rx="10"
          transform="rotate(-90.2965 223.373 508.014)"
          fill={coloreTavolo("Tavolo5")}
          style={{ transition: "fill 0.2s" }}
        />
        <rect id="Tavolo6" x="481.373" y="501.014" width="72.1629" height="164.629" rx="10"
          transform="rotate(-90.2965 481.373 501.014)"
          fill={coloreTavolo("Tavolo6")}
          style={{ transition: "fill 0.2s" }}
        />
        <rect id="Tavolo7" x="745.373" y="502.014" width="72.1629" height="164.629" rx="10"
          transform="rotate(-90.2965 745.373 502.014)"
          fill={coloreTavolo("Tavolo7")}
          style={{ transition: "fill 0.2s" }}
        />
        <rect id="Tavolo8" x="156.478" y="845.197" width="72.1629" height="164.629" rx="10"
          transform="rotate(-180 156.478 845.197)"
          fill={coloreTavolo("Tavolo8")}
          style={{ transition: "fill 0.2s" }}
        />
        <rect id="Tavolo9" x="346.373" y="835.014" width="72.1629" height="164.629" rx="10"
          transform="rotate(-90.2965 346.373 835.014)"
          fill={coloreTavolo("Tavolo9")}
          style={{ transition: "fill 0.2s" }}
        />
        <rect id="Tavolo10" x="624.373" y="835.014" width="72.1629" height="164.629" rx="10"
          transform="rotate(-90.2965 624.373 835.014)"
          fill={coloreTavolo("Tavolo10")}
          style={{ transition: "fill 0.2s" }}
        />
      </svg>
      <div style={{marginTop: 24, textAlign: "center", fontSize: 18}}>
        {selected ? (
          <b>
            {selected} – {statoTavoli[selected] === "prenotato" ? "Prenotato" : "Libero"}
          </b>
        ) : "Clicca un tavolo"}
      </div>
    </div>
  );
}
