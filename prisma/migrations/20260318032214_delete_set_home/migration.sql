/*
  Warnings:

  - You are about to drop the column `set_home` on the `certificates` table. All the data in the column will be lost.
  - You are about to drop the column `set_home` on the `projects` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_certificates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "lecture" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "complete_date" TEXT NOT NULL,
    "technologies" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_certificates" ("complete_date", "created_at", "id", "lecture", "technologies", "title", "updated_at", "url") SELECT "complete_date", "created_at", "id", "lecture", "technologies", "title", "updated_at", "url" FROM "certificates";
DROP TABLE "certificates";
ALTER TABLE "new_certificates" RENAME TO "certificates";
CREATE TABLE "new_projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technologies" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "team_size" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "solutions" TEXT NOT NULL,
    "language" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_projects" ("challenge", "created_at", "description", "duration", "id", "language", "name", "role", "solutions", "team_size", "technologies", "type", "updated_at") SELECT "challenge", "created_at", "description", "duration", "id", "language", "name", "role", "solutions", "team_size", "technologies", "type", "updated_at" FROM "projects";
DROP TABLE "projects";
ALTER TABLE "new_projects" RENAME TO "projects";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
