const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// async function query(sql, params, callback) {
//   return db.query(sql, params, callback);
// }

// module.exports = { query };

// =======
async function seed() {
  console.log("Seeding the database.");
  try {
    const users = [
      {
        first: "Jack",
        last: "Brown",
        email: "jackbrown@gmail.com",
        password: "Betty",
      },
      {
        first: "John",
        last: "Smith",
        email: "johnsmith@gmail.com",
        password: "Betty1",
      },
      {
        first: "David",
        last: "Johnson",
        email: "davidjohnson@gmail.com",
        password: "Betty2",
      },
    ];
    const response = await prisma.user.createMany({
      data:users
    })
    console.log(` Customer added: ${users}`);
    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  }
}

// >>>>>>> refs/remotes/origin/main
// // Seed the database if we are running this file directly.
// if (require.main === module) {
//   seed();
// }
seed();

// module.exports = seed;
