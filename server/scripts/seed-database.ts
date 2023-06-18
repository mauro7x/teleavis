import { PrismaClient } from '@prisma/client';

// Data
import * as subjects from '../data/subjects.json';
import * as tracks from '../data/study_tracks.json';

const prisma = new PrismaClient();

async function seedTrack({ id, name, subjects }) {
  const subjectsData = subjects.map((subject, index) => ({
    subjectId: subject,
    order: index,
  }));

  await prisma.track.create({
    data: {
      id,
      name,
      subjects: {
        createMany: {
          data: subjectsData,
        },
      },
    },
  });
}

async function main() {
  await prisma.subjectsOnTrack.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.track.deleteMany();

  // Seed
  await prisma.subject.createMany({ data: subjects });
  tracks.forEach(seedTrack);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
