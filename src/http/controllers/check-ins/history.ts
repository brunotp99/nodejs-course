import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeFetchUserCheckInsUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history";

export async function history (
    request : FastifyRequest, 
    reply : FastifyReply
) {
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1) //any query value is a string to we convert
    });
    
    const { page } = checkInHistoryQuerySchema.parse(request.query)
    
    const userCheckInUseCase = makeFetchUserCheckInsUseCase();

    const { checkIns } = await userCheckInUseCase.execute({
        userId: request.user.sub,
        page
    })
    
    return reply.status(200).send({checkIns})
    
}