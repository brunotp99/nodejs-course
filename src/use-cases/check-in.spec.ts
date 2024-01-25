import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInError } from "./errors/max-number-off-check.ins.error";
import { MaxDistanceError } from "./errors/max-distance.error";

let checkInRepository : InMemoryCheckInsRepository;
let gymsRepository : InMemoryGymsRepository;
let sut : CheckInUseCase;

describe("Check-In Use Case", () => {

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInRepository, gymsRepository);
        vi.useFakeTimers();
        
        gymsRepository.create({
            id: "gym-1",
            title: "JavaScript Gym",
            phone: '',
            description: '',
            latitude: 0,
            longitude:0,
        })
        
    });
    
    afterEach(() => {
        vi.useRealTimers();
    });

    it("Should be able to check in", async () => {
        
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
        
        const { checkIn } = await sut.execute({
            gymId: "gym-1",
            userId: "user-1",
            userLatitude: 0,
            userLongitude: 0
        })
        
        expect(checkIn.id).toEqual(expect.any(String))
    })
    
    it("Should not be able to check in twice in the same day", async () => {
        
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
        
        await sut.execute({
            gymId: "gym-1",
            userId: "user-1",
            userLatitude: 0,
            userLongitude: 0
        })
        
        expect(async () => {
            await sut.execute({
                gymId: "gym-1",
                userId: "user-1",
                userLatitude: 0,
                userLongitude: 0
            })
        }).rejects.toBeInstanceOf(MaxNumberOfCheckInError)
    })
    
    it("Should be able to check in twice but in different days", async () => {
        
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
        
        await sut.execute({
            gymId: "gym-1",
            userId: "user-1",
            userLatitude: 0,
            userLongitude: 0
        })
        
        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

        const { checkIn } = await sut.execute({
            gymId: "gym-1",
            userId: "user-1",
            userLatitude: 0,
            userLongitude: 0
        })
        
        expect(checkIn.id).toEqual(expect.any(String))

    })
    
    it("Should not be able to check in on distant gym", async () => {
        
        gymsRepository.items.push({
            id: "gym-2",
            title: "JavaScript Gym",
            phone: '',
            description: '',
            latitude: new Decimal(40.9697849),
            longitude: new Decimal(-7.4458144),
        })
 
        expect(async () => {
            await sut.execute({
                gymId: "gym-2",
                userId: "user-1",
                userLatitude: 40.9111734,
                userLongitude: -7.4863265
            })
        }).rejects.toBeInstanceOf(MaxDistanceError);

    })

})