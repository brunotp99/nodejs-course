import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-users";

describe("Create Gym Controller", () => {

    beforeAll(async () => {
        await app.ready();
    })
    
    afterAll(async () => {
        await app.close();
    })

    it("Should be able to create a gym", async () => {
    
        const { token } = await createAndAuthenticateUser(app);
        
        const response = await request(app.server)
        .post("/gyms")
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