import { app } from '@/app';
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";


describe("Refresh token (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it("should be able to refresh a token", async () => {
        await request(app.server)
            .post("/users")
            .send({
                name: "John Doe",
                email: "johndoe2@email.com",
                password: "123456"
            });

        const response = await request(app.server)
            .post("/sessions")
            .send({
                email: "johndoe2@email.com",
                password: "123456"
            });

        const cookies = response.get('Set-Cookie')

        const refreshResponse = await request(app.server)
            .patch("/token/refresh")
            .set('Cookie', cookies!)
            .send();

        expect(refreshResponse.statusCode).toEqual(200);

    })
});