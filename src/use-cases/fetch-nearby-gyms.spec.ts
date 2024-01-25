import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository : InMemoryGymsRepository;
let sut : FetchNearbyGymsUseCase;

describe("Fetch Nearby gyms Use Case", () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(gymsRepository);
    });
    
    it("Should be able to fetch nearby gyms", async () => {
        
        await gymsRepository.create({
            title: "Far gym",
            description: null,
            phone: null,
            latitude: 40.9104342,
            longitude: -8.0632926
        })

        await gymsRepository.create({
            title: "Near Gym",
            description: null,
            phone: null,
            latitude: 40.9111734,
            longitude: -7.4863265
        })
        
        const { gyms } = await sut.execute({
            userLatitude: 40.9111734,
            userLongitude: -7.4863265
        })
        
        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({title: "Near Gym"}),
        ])
    })


})