import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository = new InMemoryUsersRepository()
let sut = new AuthenticateUseCase(usersRepository);

describe("Authenticate Use Case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    });


    it("should be able to register a user", async () => {
        await usersRepository.create({
            name: "john doe",
            password_hash: await hash("password123", 6),
            email: "johndoe@example.com"
        })


        const { user } = await sut.execute({
            password: "password123",
            email: "johndoe@example.com"
        })
        expect(user.id).toEqual(expect.any(String));
    })

    it("should not be able to register a user", async () => {


        await expect(async () => {
            return await sut.execute({
                password: "password123",
                email: "johndoe@example.com"
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError);

    })


})