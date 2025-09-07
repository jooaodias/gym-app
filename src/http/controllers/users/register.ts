import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
            name,
            email,
            password,
        });
    } catch (err) {

        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({
                message: err.message,
            });
        }

        throw err; // Re-throw unexpected errors
    }

    return reply.status(201).send();

}