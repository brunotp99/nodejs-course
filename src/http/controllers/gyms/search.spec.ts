import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-users";

describe("Search Gyms Controller", () => {

    beforeAll(async () => {
        await app.ready();
    })
    
    afterAll(async () => {
        await app.close();
    })

    it("Should be able to search gym by title", async () => {
    
        const { token } = await createAndAuthenticateUser(app);
        
        await request(app.server)
        .post("/gyms")
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "JavaScript Gym",
            description: "Some description",
            phone: "123321123",
            latitude: 40.9111734,
            longitude: -7.4863265
        })
        
        await request(app.server)
        .post("/gyms")
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "TypeScript Gym",
            description: "Some description",
            phone: "123321123",
            latitude: 40.9111734,
            longitude: -7.4863265
        })
        
        const response = await request(app.server)
            .get("/gyms/search")
            .query({
                q: "JavaScript"
            })
            .set("Authorization", `Bearer ${token}`)
            .send()
            
        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: "JavaScript Gym"
            })
        ])

    })
})