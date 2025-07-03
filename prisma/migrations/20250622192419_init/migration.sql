/*
  Warnings:

  - You are about to drop the `ScorteBar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `bar` on the `Movimento` table. All the data in the column will be lost.
  - Added the required column `magazzinoId` to the `Prodotto` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ScorteBar";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Magazzino" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prodottoId" INTEGER NOT NULL,
    "quantita" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "descrizione" TEXT,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Movimento_prodottoId_fkey" FOREIGN KEY ("prodottoId") REFERENCES "Prodotto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Movimento" ("data", "id", "prodottoId", "quantita", "tipo") SELECT "data", "id", "prodottoId", "quantita", "tipo" FROM "Movimento";
DROP TABLE "Movimento";
ALTER TABLE "new_Movimento" RENAME TO "Movimento";
CREATE TABLE "new_Prodotto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "quantita" INTEGER NOT NULL,
    "minimo" INTEGER NOT NULL,
    "magazzinoId" INTEGER NOT NULL,
    CONSTRAINT "Prodotto_magazzinoId_fkey" FOREIGN KEY ("magazzinoId") REFERENCES "Magazzino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prodotto" ("id", "minimo", "nome", "quantita") SELECT "id", "minimo", "nome", "quantita" FROM "Prodotto";
DROP TABLE "Prodotto";
ALTER TABLE "new_Prodotto" RENAME TO "Prodotto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
