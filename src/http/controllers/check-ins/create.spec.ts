import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-users";
import { prisma } from "@/lib/prisma";

describe("Create Check-In Controller", () => {

    beforeAll(async () => {
        await app.ready();
    })
    
    afterAll(async () => {
        await app.close();
    })

    it("Should be able to create a check-in", async () => {
    
        const { token } = await createAndAuthenticateUser(app);
        
        const gym = await prisma.gym.create({
            data: {
                title: "JavaScript Gym",
                latitude: 40.9111734,
                longitude: -7.4863265
            }
        })
        
        const response = await request(app.server)
        .post(`/gyms/${gym.id}/check-ins`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "JavaScript Gym",
            description: "Some description",
            phone: "123321123",
            latitude: 40.9111734,
            longitude: -7.4863265
        })
        
        expect(response.statusCode).toEqual(201)

    })
})