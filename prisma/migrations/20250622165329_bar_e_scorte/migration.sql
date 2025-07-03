/*
  Warnings:

  - You are about to drop the `ConsumoCambusa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TavoloStorico` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `minimo` to the `Prodotto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movimento" ADD COLUMN "bar" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ConsumoCambusa";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TavoloStorico";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ScorteBar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bar" TEXT NOT NULL,
    "prodottoId" INTEGER NOT NULL,
    "quantita" INTEGER NOT NULL,
    "minimo" INTEGER NOT NULL,
    CONSTRAINT "ScorteBar_prodottoId_fkey" FOREIGN KEY ("prodottoId") REFERENCES "Prodotto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prodotto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "quantita" INTEGER NOT NULL,
    "minimo" INTEGER NOT NULL
);
INSERT INTO "new_Prodotto" ("id", "nome", "quantita") SELECT "id", "nome", "quantita" FROM "Prodotto";
DROP TABLE "Prodotto";
ALTER TABLE "new_Prodotto" RENAME TO "Prodotto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
