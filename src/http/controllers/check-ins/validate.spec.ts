import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-users";
import { prisma } from "@/lib/prisma";

describe("Validate Check-In Controller", () => {

    beforeAll(async () => {
        await app.ready();
    })
    
    afterAll(async () => {
        await app.close();
    })

    it("Should be able to validate a check-in", async () => {
    
        const { token } = await createAndAuthenticateUser(app);
        
        const gym = await prisma.gym.create({
            data: {
                title: "JavaScript Gym",
                latitude: 40.9111734,
                longitude: -7.4863265
            }
        })
        
        const user = await prisma.user.findFirstOrThrow();

        let checkIn = await prisma.checkIn.create({
            data: {
                gym_id: gym.id,
                user_id: user.id
            }
        })
        
        const response = await request(app.server)
        .patch(`/check-ins/${checkIn.id}/validate`)
        .set("Authorization", `Bearer ${token}`)
        .send()
        
        expect(response.statusCode).toEqual(204)
        
        checkIn = await prisma.checkIn.findUniqueOrThrow({
            where: {
                id: checkIn.id
            }
        })
        
        expect(checkIn.validated_at).toEqual(expect.any(Date))
    })
})