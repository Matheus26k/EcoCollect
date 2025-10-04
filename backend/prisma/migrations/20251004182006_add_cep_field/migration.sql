/*
  Warnings:

  - Added the required column `cep` to the `agendamentos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_agendamentos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "protocolo" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "dataSugerida" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "observacoes" TEXT,
    "dataAtualizacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_agendamentos" ("bairro", "cidade", "createdAt", "dataAtualizacao", "dataSugerida", "email", "endereco", "id", "nomeCompleto", "numero", "observacoes", "protocolo", "status", "telefone", "updatedAt", "cep") SELECT "bairro", "cidade", "createdAt", "dataAtualizacao", "dataSugerida", "email", "endereco", "id", "nomeCompleto", "numero", "observacoes", "protocolo", "status", "telefone", "updatedAt", '00000-000' FROM "agendamentos";
DROP TABLE "agendamentos";
ALTER TABLE "new_agendamentos" RENAME TO "agendamentos";
CREATE UNIQUE INDEX "agendamentos_protocolo_key" ON "agendamentos"("protocolo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
