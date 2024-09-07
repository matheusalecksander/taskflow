-- CreateEnum
CREATE TYPE "UsersRoles" AS ENUM ('USER', 'ADMIN', 'MASTER');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UsersRoles" NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
