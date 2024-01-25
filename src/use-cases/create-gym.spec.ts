import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository : InMemoryGymsRepository;
let sut : CreateGymUseCase;

describe("Create Gym Use Case", () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymsRepository);
    })

    it("Should be able to create gym", async () => {

        const { gym } = await sut.execute({
            title: "JavaScript Gym",
            description: null,
            phone: null,
            latitude: 40.9111734,
            longitude: -7.4863265
        })
        
        expect(gym.id).toEqual(expect.any(String))
    })
    

})