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
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_certificates" ("complete_date", "created_at", "id", "lecture", "technologies", "title", "updated_at", "url") SELECT "complete_date", "created_at", "id", "lecture", "technologies", "title", "updated_at", "url" FROM "certificates";
DROP TABLE "certificates";
ALTER TABLE "new_certificates" RENAME TO "certificates";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
