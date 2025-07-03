import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const prodotti = await prisma.prodotto.findMany();
  return NextResponse.json(prodotti);
}

export async function POST(request: Request) {
  const { nome, quantita, minimo, magazzinoId } = await request.json();

  if (!nome || quantita == null || minimo == null || magazzinoId == null) {
    return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
  }

  const magazzinoIdInt = Number(magazzinoId);
  if (!Number.isInteger(magazzinoIdInt)) {
    return NextResponse.json({ error: "magazzinoId deve essere un intero" }, { status: 400 });
  }

  try {
    const prodotto = await prisma.prodotto.create({
      data: {
        nome,
        quantita,
        minimo,
        magazzino: { connect: { id: magazzinoIdInt } }
      }
    });
    return NextResponse.json(prodotto);
  } catch (err) {
    return NextResponse.json({ error: "Errore creazione prodotto", dettagli: `${err}` }, { status: 500 });
  }
}
