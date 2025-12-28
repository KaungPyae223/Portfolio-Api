/*
  Warnings:

  - You are about to drop the column `description` on the `about` table. All the data in the column will be lost.
  - You are about to drop the column `educationable_id` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the column `experienable_id` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `experienable_type` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `home` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `links` table. All the data in the column will be lost.
  - Added the required column `first_paragraph` to the `about` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_paragraph` to the `about` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceable_type` to the `experiences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN "language" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_about" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_paragraph" TEXT NOT NULL,
    "second_paragraph" TEXT NOT NULL,
    "language" TEXT
);
INSERT INTO "new_about" ("id") SELECT "id" FROM "about";
DROP TABLE "about";
ALTER TABLE "new_about" RENAME TO "about";
CREATE TABLE "new_educations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "educationable_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "language" TEXT
);
INSERT INTO "new_educations" ("created_at", "description", "educationable_type", "id", "title", "updated_at") SELECT "created_at", "description", "educationable_type", "id", "title", "updated_at" FROM "educations";
DROP TABLE "educations";
ALTER TABLE "new_educations" RENAME TO "educations";
CREATE TABLE "new_experiences" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "experienceable_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "language" TEXT
);
INSERT INTO "new_experiences" ("created_at", "description", "id", "title", "updated_at") SELECT "created_at", "description", "id", "title", "updated_at" FROM "experiences";
DROP TABLE "experiences";
ALTER TABLE "new_experiences" RENAME TO "experiences";
CREATE TABLE "new_home" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prefix" TEXT,
    "name" TEXT,
    "title" TEXT,
    "content" TEXT,
    "date_of_birth" TEXT,
    "location" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "facebook" TEXT,
    "language" TEXT
);
INSERT INTO "new_home" ("date_of_birth", "email", "facebook", "github", "id", "linkedin", "location", "name", "phone", "title") SELECT "date_of_birth", "email", "facebook", "github", "id", "linkedin", "location", "name", "phone", "title" FROM "home";
DROP TABLE "home";
ALTER TABLE "new_home" RENAME TO "home";
CREATE TABLE "new_links" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,
    CONSTRAINT "links_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_links" ("id", "name", "project_id", "url") SELECT "id", "name", "project_id", "url" FROM "links";
DROP TABLE "links";
ALTER TABLE "new_links" RENAME TO "links";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
