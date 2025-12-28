/*
  Warnings:

  - Added the required column `updated_at` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "logable_id" INTEGER NOT NULL,
    "logable_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Certificate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "lecture" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "complete_date" TEXT NOT NULL,
    "technologies" TEXT NOT NULL,
    "set_home" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Certificate" ("complete_date", "id", "lecture", "set_home", "technologies", "title", "url") SELECT "complete_date", "id", "lecture", "set_home", "technologies", "title", "url" FROM "Certificate";
DROP TABLE "Certificate";
ALTER TABLE "new_Certificate" RENAME TO "Certificate";
CREATE TABLE "new_Education" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "educationable_id" INTEGER NOT NULL,
    "educationable_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Education" ("description", "educationable_id", "educationable_type", "id", "title") SELECT "description", "educationable_id", "educationable_type", "id", "title" FROM "Education";
DROP TABLE "Education";
ALTER TABLE "new_Education" RENAME TO "Education";
CREATE TABLE "new_Experience" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "experienable_id" INTEGER NOT NULL,
    "experienable_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Experience" ("description", "experienable_id", "experienable_type", "id", "title") SELECT "description", "experienable_id", "experienable_type", "id", "title" FROM "Experience";
DROP TABLE "Experience";
ALTER TABLE "new_Experience" RENAME TO "Experience";
CREATE TABLE "new_Project" (
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
    "set_home" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("challenge", "description", "duration", "id", "name", "role", "set_home", "solutions", "team_size", "technologies", "type") SELECT "challenge", "description", "duration", "id", "name", "role", "set_home", "solutions", "team_size", "technologies", "type" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
