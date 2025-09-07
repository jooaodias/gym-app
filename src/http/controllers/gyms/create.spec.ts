import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";


describe("Create (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it("should be able to create a gym", async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        const createGymResponse = await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Gym 1",
                description: "Description for Gym 1",
                phone: "123456789",
                latitude: -27.2092052,
                longitude: -49.6401091,
            });

        expect(createGymResponse.statusCode).toEqual(201);
    })
});
