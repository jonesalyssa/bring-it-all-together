const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;
app.use(require("morgan")("dev"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JWT = process.env.JWT;

const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.slice(7);
  if (!token) return next();
  try {
    const { id } = jwt.verify(token, JWT);
    const user = await getUser(id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const getUser = async (id) => {
  const response = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });
  return response;
};

app.post("/api/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        first: req.body.first,
        last: req.body.last,
        email,
        password: hashedPassword,
      },
    });

    // Create a token with the instructor id
    const token = jwt.sign({ id: user.id }, JWT);

    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
});

app.post("/api/login", async (req, res, next) => {
  // try {
  //   const user = await prisma.user.findFirstOrThrow({ where: {email: req.body.email, password: req.body.password}

  //   });

  //   const isValid = await bcrypt.compare( password, user.password)
  //   if(!isValid){
  //     return res.status(401).send("Invalid login credentials.")
  //   }

  //   const token = jwt.sign({ id: user.id }, JWT, {
  //     expiresIn: "24 hours",
  //   });
  //   res.status(201).send({ token });
  // } catch (error) {
  //   console.error(error);
  //   next(error);
  // }
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirstOrThrow({ where: { email } });

    if (!user) {
      return res.status(401).send("Invalid User credentials.");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send("Invalid login credentials.");
    }

    // Create a token with the instructor id
    const token = jwt.sign({ id: user.id }, JWT);

    res.send({ token });
  } catch (error) {
    next(error);
  }
});

// Get the currently logged in user
app.get("/api/me", isLoggedIn, async (req, res, next) => {
  try {
    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: req.user.id
    //   }
    // });

    // if(!user){
    //   return res.status(404).send("User not Found")
    // };

    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

app.get("/api/users", isLoggedIn, async (req, res, next) => {
  try {
    const user = await prisma.user.findMany({});
    res.send(user);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
