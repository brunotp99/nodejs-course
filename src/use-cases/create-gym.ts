import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface CreateGymUseCaseRequest {
    title: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
}

interface CreateGymUseCaseResponse {
    gym: Gym;
}

export class CreateGymUseCase {
     
    // Writing private/public etc will declare it automatically as doing this.abc = abc
    constructor(private gymsRepository: GymsRepository) {}

    async execute({
        title, description, phone, latitude, longitude
    }: CreateGymUseCaseRequest) : Promise<CreateGymUseCaseResponse> {

        const gym = await this.gymsRepository.create({
            title, 
            description, 
            phone, 
            latitude, 
            longitude
        });
        
        return {
            gym
        };
    }
}