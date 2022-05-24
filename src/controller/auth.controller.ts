import { Request, Response } from "express";
import { RegisterValidation } from "../validation/registration.validation";
import { getManager } from "typeorm";
import bcrypt from "bcryptjs";
import { User } from "../entity/user.entity";
import { sign } from "jsonwebtoken";

export const Register = async (req: Request, res: Response) => {
  const body = req.body;
  const { error } = RegisterValidation.validate(body);
  if (error) return res.status(400).send(error.details);

  if (body.password !== body.password_confirm) {
    return res.status(400).send({ message: "Password's dnt match" });
  }

  const repository = getManager().getRepository(User);

  const { password, ...user } = await repository.save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: await bcrypt.hash(body.password, 10),
  });

  res.send(user);
};

export const Login = async (req: Request, res: Response) => {
  // const {email,password} = req.body
  const repository = getManager().getRepository(User);
  const user = await repository.findOneBy({ email: await req.body.email });
  if (!user) {
    return res.status(404).send({
      message: "user not found",
    });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(404).send({
      message: "invalid credentials",
    });
  }
  // const payload= {
  //     id : user.id
  // }
  // const token = sign(payload, "secret");

  const token = sign({ id: user.id }, process.env.SECRET_KEY);

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 1000, //1 day
  });

  //not required to send user info
  // const {password , ...data} = user;
  //res.send(data);

  res.send({
    message: "login successfully",
  });
};

export const AuthenticatedUser = async (req: Request, res: Response) => {
  const { password, ...data } = req["user"];
  res.send(data);
};

export const Logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({
    message: "logout successfully",
  });
};

export const UpdateInfo = async (req: Request, res: Response) => {
  const user = req["user"];
  const repository = await getManager().getRepository(User);
  await repository.update(user.id, req.body);
  const { password, ...data } = await repository.findOneBy({ id: user.id });
  res.send(data);
};

export const UpdatePassword = async (req: Request, res: Response) => {
  const user = req["user"];
  if (req.body.password !== req.body.password_confirm) {
    return res.status(400).send({ message: "Password's dnt match" });
  }
  const repository = getManager().getRepository(User);
  await repository.update(user.id, {
    password: await bcrypt.hash(req.body.password, 10),
  });
  const { password, ...data } = user;
  res.send(data);
};
