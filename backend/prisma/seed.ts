import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const users = [
  { username: "harshj_25" }
];

const contests = [
  { contestId: "1995", name: "Codeforces Round 961 (Div. 2)", rank: 3814, oldRating: 0, newRating: 515, date: new Date(1721752500 * 1000) },
  { contestId: "1996", name: "Codeforces Round 962 (Div. 3)", rank: 3374, oldRating: 515, newRating: 870, date: new Date(1722013500 * 1000), },
  { contestId: "1997", name: "Educational Codeforces Round 168 (Rated for Div. 2)", rank: 7119, oldRating: 870, newRating: 1094, date: new Date(1722357300 * 1000), },
  { contestId: "1993", name: "Codeforces Round 963 (Div. 2)", rank: 11785, oldRating: 1094, newRating: 1162, date: new Date(1722789300 * 1000), },
  { contestId: "2044", name: "Codeforces Round 993 (Div. 4)", rank: 4469, oldRating: 1162, newRating: 1249, date: new Date(1734281400 * 1000), },
];

async function clearDb() {
  try {
    console.log('🧹 Clearing database...')
    
    await prisma.contestResult.deleteMany({})
    console.log('✅ Cleared contest results')
    
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
        where: { username: u.username },
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
      const user = await prisma.user.findFirst({
        where: {
          username: u.username
        },
        select: {
          id: true
        }
      });

      if (!user?.id) {
        console.error(`❌ User ID not found for username: ${u.username}`);
        continue;
      }

      for (const c of contests) {
        await prisma.contestResult.create({
          data: {
            contestId: c.contestId,
            name: c.name,
            rank: c.rank,
            oldRating: c.oldRating,
            newRating: c.newRating,
            date: c.date,
            userId: user.id,
          }
        })
      }
    }

    console.log("✅ Contests seeded.");
  } catch (error) {
    console.error('❌ Error seeding contests:', error);
  }
}

clearDb()
.then(() => seedUsers())
.then(() => seedContest())
.catch(error => console.error("❌ Something went wrong while seeding: ", error))
.finally(() => prisma.$disconnect());