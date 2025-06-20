import prisma from "./db";

export async function caricaProdotto(data: {
  prodottoId: number;
  quantita: number;
  zona: "MAGAZZINO" | "CAMBUSA";
  note?: string;
}) {
  return prisma.lotto.create({
    data: {
      prodottoId: data.prodottoId,
      quantita: data.quantita,
      tipo: "CARICO",
      zona: data.zona,
      note: data.note,
    },
  });
}

export async function scaricaProdotto(data: {
  prodottoId: number;
  quantita: number;
  zona: "MAGAZZINO" | "CAMBUSA";
  note?: string;
}) {
  return prisma.lotto.create({
    data: {
      prodottoId: data.prodottoId,
      quantita: -Math.abs(data.quantita),
      tipo: "SCARICO",
      zona: data.zona,
      note: data.note,
    },
  });
}

export async function getStorico(zona: string) {
  return prisma.lotto.findMany({
    where: { zona: zona as any },
    include: { prodotto: true },
    orderBy: { createdAt: "desc" },
  });
}
