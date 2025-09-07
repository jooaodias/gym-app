import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new RegisterUseCase(usersRepository);
    });

    it("should be able to register a user", async () => {

        const { user } = await sut.execute({
            name: "john doe",
            password: "password123",
            email: "johndoe@example.com"
        })
        expect(user.id).toEqual(expect.any(String));
    })


    it("should hash user password upon registration", async () => {

        const registerUseCase = new RegisterUseCase(usersRepository);

        const { user } = await registerUseCase.execute({
            name: "john doe",
            password: "password123",
            email: ""
        })

        const isPasswordCorrectlyHashed = await compare(
            "password123",
            user.password_hash
        );

        expect(isPasswordCorrectlyHashed).toBe(true);

    })

    it("should not be able to register a user with same email twice", async () => {

        await sut.execute({
            name: "john doe",
            password: "password123",
            email: "johndoe@example.com"
        })
        await expect(() => {
            return sut.execute({
                name: "john doe",
                password: "password123",
                email: "johndoe@example.com"
            })
        }
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    })
})