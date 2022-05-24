import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwt = req.cookies["jwt"];

    const payload: any = verify(jwt, process.env.SECRET_KEY);

    if (!payload) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    }

    const repository = getManager().getRepository(User);

    // const user = await repository.findOneBy({id: payload.id});
    // const {password, ...data} = user;

    req["user"] = await repository.findOneBy({ id: payload.id });

    // req["user"] = user

    next();
  } catch (e) {
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
};
