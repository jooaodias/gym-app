import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";


describe("Search Gyms (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it("should be able to search a gym", async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Gym 1",
                description: "Description for Gym 1",
                phone: "123456789",
                latitude: -27.2092052,
                longitude: -49.6401091,
            });

        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Gym 2",
                description: "Description for Gym 1",
                phone: "1211231",
                latitude: -27.2092052,
                longitude: -49.6401091,
            });

        const response = await request(app.server)
            .get("/gyms/search")
            .query({
                query: "Gym 1"
            })
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: "Gym 1",
            })
        ])

    })
});
