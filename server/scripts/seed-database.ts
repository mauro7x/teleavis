// import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csvtojson';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function readCSV(filename) {
  const filePath = path.resolve(__dirname, `../data/${filename}.csv`);
  return csv().fromFile(filePath);
}

async function seed({ schema, filename }) {
  const data = await readCSV(filename);
  await prisma[schema].createMany({ data });
}

async function main() {
  // // Clear database
  // await prisma.elector.deleteMany();
  // await prisma.option.deleteMany();
  // // Seed
  // await seed({ schema: 'elector', filename: 'electors' });
  // await seed({ schema: 'option', filename: 'options' });
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
