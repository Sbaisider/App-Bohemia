import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/*
    Richiesta:
    {
      prodottoId: number,      // prodotto del magazzino centrale
      quantita: number,
      barNome: string,         // "main", "musa", "tokyo", "cambusa"
    }
*/

export async function POST(request: Request) {
  const { prodottoId, quantita, barNome } = await request.json();

  // Prendi il prodotto nel magazzino centrale
  const prodMagazzino = await prisma.prodotto.findUnique({ where: { id: prodottoId } });
  if (!prodMagazzino) return NextResponse.json({ error: "Prodotto non trovato in magazzino" }, { status: 404 });

  // Trova il bar
  const bar = await prisma.magazzino.findUnique({ where: { nome: barNome } });
  if (!bar) return NextResponse.json({ error: "Bar non trovato" }, { status: 404 });

  // Cerca stesso prodotto nel bar (per nome)
  let prodBar = await prisma.prodotto.findFirst({
    where: { nome: prodMagazzino.nome, magazzinoId: bar.id },
  });

  // Se non esiste ancora quel prodotto nel bar, lo crea (quantità iniziale = 0)
  if (!prodBar) {
    prodBar = await prisma.prodotto.create({
      data: {
        nome: prodMagazzino.nome,
        quantita: 0,
        minimo: prodMagazzino.minimo, // puoi differenziare se vuoi
        magazzinoId: bar.id,
      },
    });
  }

  // Aggiorna quantità
  if (prodMagazzino.quantita < quantita) {
    return NextResponse.json({ error: "Quantità insufficiente in magazzino!" }, { status: 400 });
  }

  // Diminuisci dal magazzino centrale
  await prisma.prodotto.update({
    where: { id: prodottoId },
    data: { quantita: prodMagazzino.quantita - quantita },
  });

  // Aumenta nel bar
  await prisma.prodotto.update({
    where: { id: prodBar.id },
    data: { quantita: prodBar.quantita + quantita },
  });

  // Registra movimenti storici
  await prisma.movimento.createMany({
    data: [
      {
        prodottoId: prodMagazzino.id,
        quantita,
        tipo: "scarico_verso_bar",
        descrizione: `Verso ${barNome}`,
      },
      {
        prodottoId: prodBar.id,
        quantita,
        tipo: "carico_da_magazzino",
        descrizione: `Da magazzino centrale`,
      },
    ],
  });

  return NextResponse.json({ ok: true });
}
