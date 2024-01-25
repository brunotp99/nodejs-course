import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-users";
import { prisma } from "@/lib/prisma";

describe("Check-In Metrics Controller", () => {

    beforeAll(async () => {
        await app.ready();
    })
    
    afterAll(async () => {
        await app.close();
    })

    it("Should be able to get the total number of check-ins", async () => {
    
        const { token } = await createAndAuthenticateUser(app);
        
        const user = await prisma.user.findFirstOrThrow();
        
        const gym = await prisma.gym.create({
            data: {
                title: "JavaScript Gym",
                latitude: 40.9111734,
                longitude: -7.4863265
            }
        })
        
        await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: user.id
                },
                {
                    gym_id: gym.id,
                    user_id: user.id
                }
            ]
        })
        
        const response = await request(app.server)
        .get(`/check-ins/metrics`)
        .set("Authorization", `Bearer ${token}`)
        .send()
        
        expect(response.statusCode).toEqual(200)
        expect(response.body.checkInsCount).toEqual(2)
    })
})