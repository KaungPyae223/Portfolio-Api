/*
  Warnings:

  - You are about to drop the `links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `duration` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `team_size` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `projects` table. All the data in the column will be lost.
  - Added the required column `back_end` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `demo_url` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doc_url` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `front_end` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key_feature` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "links";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technologies" TEXT NOT NULL,
    "demo_url" TEXT NOT NULL,
    "front_end" TEXT NOT NULL,
    "back_end" TEXT NOT NULL,
    "doc_url" TEXT NOT NULL,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "solutions" TEXT NOT NULL,
    "key_feature" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_projects" ("challenge", "created_at", "description", "id", "name", "role", "solutions", "technologies", "updated_at") SELECT "challenge", "created_at", "description", "id", "name", "role", "solutions", "technologies", "updated_at" FROM "projects";
DROP TABLE "projects";
ALTER TABLE "new_projects" RENAME TO "projects";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
