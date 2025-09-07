import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {

    return async (request: FastifyRequest, reply: FastifyReply) => {

        if (request.user.role !== roleToVerify) {
            return reply.status(403).send({
                message: 'Unauthorized',
            });
        }
    }

}