/*
  Warnings:

  - You are about to drop the column `autoDeploy` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `branch` on the `Service` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Branch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "autoDeploy" BOOLEAN NOT NULL DEFAULT false,
    "commitDeployed" TEXT NOT NULL DEFAULT '',
    "serviceId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Branch_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Service" ("buildMethod", "buildPath", "createdAt", "domain", "id", "name", "repoAuth", "repoProvider", "repoUrl", "serviceId", "status", "updatedAt") SELECT "buildMethod", "buildPath", "createdAt", "domain", "id", "name", "repoAuth", "repoProvider", "repoUrl", "serviceId", "status", "updatedAt" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
CREATE UNIQUE INDEX "Service_serviceId_key" ON "Service"("serviceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
