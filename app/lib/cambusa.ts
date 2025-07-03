import prisma from "./db";

export async function getStoricoCambusa() {
  return prisma.lotto.findMany({
    where: { zona: "CAMBUSA" },
    include: { prodotto: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function richiediRiordino(data: { prodottoId: number; quantita: number; note?: string }) {
  // Implementa logica di richiesta riordino
  return prisma.lotto.create({
    data: {
      prodottoId: data.prodottoId,
      quantita: data.quantita,
      tipo: "RIORDINO",
      zona: "CAMBUSA",
      note: data.note,
    },
  });
}
