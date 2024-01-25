import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-users";

describe("Profile Controller", () => {

    beforeAll(async () => {
        await app.ready();
    })
    
    afterAll(async () => {
        await app.close();
    })

    it("Should be able to get user profile", async () => {
    
        const { token } = await createAndAuthenticateUser(app);
        
        const profileResponse = await request(app.server)
        .get("/me")
        .set("Authorization", `Bearer ${token}`)
        .send()
        
        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            email: "johndoe@example.com"
        }))
    })
})