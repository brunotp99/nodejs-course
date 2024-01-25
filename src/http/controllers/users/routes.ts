import { FastifyInstance } from "fastify";

import { register } from "@/http/controllers/users/register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
    app.post("/users", register);
    app.post("/sessions", authenticate);
    app.patch("/token/refresh", refresh);
    
    /** Authenticated Routes */
    app.get("/me", {onRequest: [verifyJWT]}, profile)
}