/*
  Warnings:

  - Added the required column `buildMethod` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buildPath` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "repoUrl" TEXT NOT NULL,
    "repoProvider" TEXT NOT NULL,
    "repoAuth" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "buildMethod" TEXT NOT NULL,
    "buildPath" TEXT NOT NULL,
    "autoDeploy" BOOLEAN NOT NULL DEFAULT false,
    "branch" TEXT NOT NULL DEFAULT 'main',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Service" ("autoDeploy", "branch", "createdAt", "domain", "id", "name", "repoAuth", "repoProvider", "repoUrl", "serviceId", "status", "updatedAt") SELECT "autoDeploy", "branch", "createdAt", "domain", "id", "name", "repoAuth", "repoProvider", "repoUrl", "serviceId", "status", "updatedAt" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
CREATE UNIQUE INDEX "Service_serviceId_key" ON "Service"("serviceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
