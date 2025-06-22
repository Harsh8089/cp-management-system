import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const users = [
  { id: "harshj_25", name: "Harsh Jain", rating: 1249, rank: "pupil", maxRating: 1249, maxRank: "pupil", createdAt: new Date(1710670552 * 1000) }
];

const contests = [
  { contestId: 1995, name: "Codeforces Round 961 (Div. 2)", rank: 3814, oldRating: 0, newRating: 515, date: new Date(1721752500 * 1000) },
  { contestId: 1996, name: "Codeforces Round 962 (Div. 3)", rank: 3374, oldRating: 515, newRating: 870, date: new Date(1722013500 * 1000), },
  { contestId: 1997, name: "Educational Codeforces Round 168 (Rated for Div. 2)", rank: 7119, oldRating: 870, newRating: 1094, date: new Date(1722357300 * 1000), },
  { contestId: 1993, name: "Codeforces Round 963 (Div. 2)", rank: 11785, oldRating: 1094, newRating: 1162, date: new Date(1722789300 * 1000), },
  { contestId: 2044, name: "Codeforces Round 993 (Div. 4)", rank: 4469, oldRating: 1162, newRating: 1249, date: new Date(1734281400 * 1000), },
];

const problems = [
  { id: 272117316, name: "Bouquet (Easy Version)", tags: ["constructive algorithms", "greedy", "math", "sortings", "trees"], submittedAt: new Date(1721747662 * 1000), contestId: 1995 },
  { id: 273368124, name: "Decode", tags: ["combinatorics", "data structures", "implementation", "math"] , submittedAt: new Date(1722269965 * 1000), contestId: 1996 }
];

async function clearDb() {
  try {
    console.log('🧹 Clearing database...')
    
    await prisma.contestResult.deleteMany({})
    console.log('✅ Cleared contest results')

    await prisma.problem.deleteMany({});
    console.log('✅ Cleared problem results')
    
    await prisma.user.deleteMany({})
    console.log('✅ Cleared users')
    
    console.log('🎉 Database cleared successfully!')
  } catch (error) {
    console.error('❌ Error clearing database:', error)
  } 
}

async function seedUsers() {
  try {
    for (const u of users) {
      await prisma.user.upsert({
        where: { id: u.id },
        update: {},
        create: u
      });
    }
    console.log("✅ Users seeded.");
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  }
}

async function seedContest() {
  try {
    for (const u of users) {
      for (const c of contests) {
        await prisma.contestResult.create({
          data: {
            id: c.contestId,
            name: c.name,
            rank: c.rank,
            oldRating: c.oldRating,
            newRating: c.newRating,
            date: c.date,
            userId: u.id,
          }
        })
      }
    }

    console.log("✅ Contests seeded.");
  } catch (error) {
    console.error('❌ Error seeding contests:', error);
  }
}

async function seedProblem() {
  try {
    for( const u of users) {
      const user = await prisma.user.findFirst({
        where: { id: 'harshj_25' },
        select: { id: true }
      });

      if (!user?.id) {
        console.error(`❌ User ID not found for username: ${u.id}`);
        continue;
      }

      for (const p of problems) {
        await prisma.problem.create({
          data: {
            id: p.id,
            name: p.name,
            tags: p.tags,
            submittedAt: p.submittedAt,
            userId: user?.id,
            contestId: p.contestId
          }
        });
      }
    }
    console.log("✅ Problem seeded.");
  } catch (error) {
    console.error('❌ Error seeding problems:', error);
  }
}

clearDb()
.then(() => seedUsers())
.then(() => seedContest())
.then(() => seedProblem())
.catch(error => console.error("❌ Something went wrong while seeding: ", error))
.finally(() => prisma.$disconnect());