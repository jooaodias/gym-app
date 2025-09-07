import { app } from '@/app';
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";


describe("Register (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it("should be able to register", async () => {
        const registerResponse = await request(app.server)
            .post("/users")
            .send({
                name: "John Doe",
                email: "johndoe2@email.com",
                password: "123456"
            });

        expect(registerResponse.statusCode).toEqual(201);
    })
});