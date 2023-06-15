-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nReviews" INTEGER NOT NULL DEFAULT 0,
    "cumRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "nAmountOfWorkRatings" INTEGER NOT NULL DEFAULT 0,
    "cumAmountOfWorkRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "nTeacherRatings" INTEGER NOT NULL DEFAULT 0,
    "cumTeacherRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "nDifficultyRatings" INTEGER NOT NULL DEFAULT 0,
    "cumDifficultyRating" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectsOnTrack" (
    "trackId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "SubjectsOnTrack_pkey" PRIMARY KEY ("trackId","subjectId")
);

-- CreateTable
CREATE TABLE "Review" (
    "userId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,
    "amountOfWorkRating" DOUBLE PRECISION NOT NULL,
    "teacherRating" DOUBLE PRECISION NOT NULL,
    "difficultyRating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("userId","subjectId")
);

-- AddForeignKey
ALTER TABLE "SubjectsOnTrack" ADD CONSTRAINT "SubjectsOnTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectsOnTrack" ADD CONSTRAINT "SubjectsOnTrack_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
