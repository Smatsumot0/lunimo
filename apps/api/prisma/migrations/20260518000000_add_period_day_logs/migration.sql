CREATE TABLE "PeriodDayLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "painVolume" INTEGER NOT NULL DEFAULT 0,
    "medicineCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeriodDayLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PeriodDayLog_userId_date_key" ON "PeriodDayLog"("userId", "date");
CREATE INDEX "PeriodDayLog_userId_date_idx" ON "PeriodDayLog"("userId", "date");

ALTER TABLE "PeriodDayLog" ADD CONSTRAINT "PeriodDayLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
