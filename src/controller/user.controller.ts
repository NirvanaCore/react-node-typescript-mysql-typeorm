import { Response, Request } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";
import bcrypt from "bcryptjs";

export const Users = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

  const users = await repository.find({
    relations: ["role"],
  });

  const userData = users.map((user) => {
    const { password, ...data } = user;
    return data;
  });

  res.status(200).send(userData);
};

export const CreateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;
  const hashedPassword = await bcrypt.hash("1234", 10);
  const repository = getManager().getRepository(User);
  const { password, ...user } = await repository.save({
    ...body,
    password: hashedPassword,
    role: {
      id: role_id,
    },
  });
  res.status(201).send(user);
};

export const GetUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

  const { password, ...user } = await repository.findOne({
    where: { id: Number(req.params.id) },
    relations: ["role"],
  });

  res.status(200).send(user);
};

export const UpdateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;
  const repository = getManager().getRepository(User);

  await repository.update(req.params.id, {
    ...body,
    role: {
      id: role_id,
    },
  });

  // @ts-ignore
  const { password, ...user } = await repository.findOne(req.params.id, {
    relations: ["role"],
  });

  res.status(202).send(user);
};

export const DeleteUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);
  await repository.delete(req.params.id);
  res.status(204).send({
    message: "User deleted",
  });
};
