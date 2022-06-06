import { Router } from "express";
import express from 'express';
import {
  Register,
  Login,
  Logout,
  AuthenticatedUser,
  UpdateInfo,
  UpdatePassword,
} from "./controller/auth.controller";
import { AuthMiddleware } from "./middleware/authmiddleware";
import {
  CreateUser,
  GetUser,
  Users,
  UpdateUser,
  DeleteUser,
} from "./controller/user.controller";
import { Permissions } from "./controller/permission.contoller";
import {
  CreateRole,
  DeleteRole,
  GetRole,
  Roles,
  UpdateRole,
} from "./controller/role.controller";
import {
  CreateProduct,
  DeleteProduct,
  GetProduct,
  Products,
  UpdateProduct,
} from "./controller/product.controller";
import {Upload} from "./controller/image.controller";

export const routes = (router: Router) => {
  //register-login-update
  router.post("/api/register", Register);
  router.post("/api/login", Login);
  router.get("/api/user", AuthMiddleware, AuthenticatedUser);
  router.post("/api/logout", AuthMiddleware, Logout);
  router.put("/api/users/info", AuthMiddleware, UpdateInfo);
  router.put("/api/users/password", AuthMiddleware, UpdatePassword);

  //users
  router.get("/api/users", AuthMiddleware, Users);
  router.post("/api/users", AuthMiddleware, CreateUser);
  router.get("/api/users/:id", AuthMiddleware, GetUser);
  router.put("/api/users/:id", AuthMiddleware, UpdateUser);
  router.delete("/api/users/:id", AuthMiddleware, DeleteUser);

  //permissions
  router.get("/api/permissions", AuthMiddleware, Permissions);

  //roles
  router.get("/api/roles", AuthMiddleware, Roles);
  router.post("/api/roles", AuthMiddleware, CreateRole);
  router.get("/api/roles/:id", AuthMiddleware, GetRole);
  router.put("/api/roles/:id", AuthMiddleware, UpdateRole);
  router.delete("/api/roles/:id", AuthMiddleware, DeleteRole);

  //products
  router.get("/api/products", AuthMiddleware, Products);
  router.post("/api/products", AuthMiddleware, CreateProduct);
  router.get("/api/products/:id", AuthMiddleware, GetProduct);
  router.put("/api/products/:id", AuthMiddleware, UpdateProduct);
  router.delete("/api/products/:id", AuthMiddleware, DeleteProduct);

  //images
  router.post("/api/upload", AuthMiddleware, Upload);
  router.use("/api/uploads", express.static('./uploads'));
};
