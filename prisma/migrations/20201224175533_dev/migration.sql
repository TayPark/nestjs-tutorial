/*
  Warnings:

  - Made the column `content` on table `Post` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `Post` required. The migration will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT,
    "published" BOOLEAN DEFAULT false,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,

    FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("id", "title", "content", "category", "published", "authorId", "createdAt", "updatedAt") SELECT "id", "title", "content", "category", "published", "authorId", "createdAt", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
