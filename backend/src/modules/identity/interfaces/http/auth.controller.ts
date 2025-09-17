// import { Router } from "express";
// import { UserRepositoryPrisma } from "../../infrastructure/prisma/UserRepositoryPrisma";
// import { Prisma } from "@prisma/client";
// import { RegisterUser } from "../../application/RegisterUser";


// const repo = new UserRepositoryPrisma(Prisma);
// const hasher = new Argon2Hasher();
// const registerUC = new RegisterUser(repo, hasher);
// const router = Router();


// router.post('/register', async (req, res, next) => {
// try {
// const user = await registerUC.execute(req.body);
// res.status(201).json({ id: user.id, email: user.email });
// } catch (err) { next(err); }
// });


// export default router;