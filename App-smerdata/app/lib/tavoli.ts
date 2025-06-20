import prisma from "./db";

export async function creaPrenotazione(data: { clienteId: number; tavolo: number; dataPrenotazione: Date }) {
  return prisma.prenotazione.create({ data });
}

export async function checkinCliente(data: { prenotazioneId: number; oraArrivo: Date }) {
  return prisma.checkin.create({ data });
}

export async function registraConsumazione(data: { tavoloId: number; prodottoId: number; quantita: number; note?: string }) {
  return prisma.consumazione.create({ data });
}
