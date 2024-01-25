import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-aready-exists.error";

let usersRepository : InMemoryUsersRepository;
let sut : RegisterUseCase;

describe("Register Use Case", () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new RegisterUseCase(usersRepository);
    })

    it("Should hash user password upon registration", async () => {

        const { user } = await sut.execute({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456"
        })
        
        const isPasswordCorrectelyHashed = await compare(
            "123456",
            user.password_hash
        )
        
        expect(isPasswordCorrectelyHashed).toBeTruthy()
    })
    
    it("Should not be able to register with same email twice", async () => {
        const email = "johndoe@example.com";
        
        await sut.execute({
            name: "John Doe",
            email,
            password: "123456"
        })
        
        expect(async () => {
            await sut.execute({
                name: "John Doe",
                email,
                password: "123456"
            })
        }).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
    
    it("Should be able to register", async () => {
        const { user } = await sut.execute({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456"
        })
        
        expect(user.id).toEqual(expect.any(String))
    })
})