import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { LateCheckInValidationError } from "./errors/late-check-in-validation.error";

let checkInRepository : InMemoryCheckInsRepository;
let sut : ValidateCheckInUseCase;

describe("Validate Check In Use Case", () => {

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository();
        sut = new ValidateCheckInUseCase(checkInRepository);
        vi.useFakeTimers();
    });
    
    afterEach(() => {
        vi.useRealTimers();
    });

    it("Should be able to validate the check-in", async () => {
        
        const createdCheckIn = await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })
        
        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id
        })
        
        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
    })
    
    it("Should not be able to validate an inexisting check-in", async () => {
          
          expect(async () => {
            await sut.execute({
                checkInId: "inexisting-check-in-id"
            })
          }).rejects.toBeInstanceOf(ResourceNotFoundError)
      
    })
    
    it("Should not be able to validate the check-in after 20 minutes of creation", async () => {
          
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40));
    
        const createdCheckIn = await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })
        
        const twentyOneMinutesInMs = 1000 * 60 * 21;
        
        vi.advanceTimersByTime(twentyOneMinutesInMs);
        
        expect(async () => {
            await sut.execute({
                checkInId: createdCheckIn.id
            })
        }).rejects.toBeInstanceOf(LateCheckInValidationError)
    
    })
    
 

})