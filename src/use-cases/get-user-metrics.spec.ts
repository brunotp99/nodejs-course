import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInRepository : InMemoryCheckInsRepository;
let sut : GetUserMetricsUseCase;

describe("Get User Metric Use Case", () => {

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository();
        sut = new GetUserMetricsUseCase(checkInRepository);
    });
    
    it("Should be able to get check-ins counts from matrics", async () => {
        
        await checkInRepository.create({
            gym_id: `gym-1`,
            user_id: "user-01",
        })
        
        await checkInRepository.create({
            gym_id: `gym-2`,
            user_id: "user-01",
        })
    
        const { checkInsCount } = await sut.execute({
            userId: "user-01"
        })
        
        expect(checkInsCount).toEqual(2);

    })


})