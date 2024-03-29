import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";
import { UsersRepository } from "@/repositories/users-repository";

let usersRepository : UsersRepository;
let sut : AuthenticateUseCase;

describe("Authenticate Use Case", () => {
        
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    })

    it("Should be able to authenticate", async () => {
        await  usersRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password_hash: await hash("123456", 6)
        })
        
        const { user } = await sut.execute({
            email: "johndoe@example.com",
            password: "123456"
        })
        
        expect(user.id).toEqual(expect.any(String))
    })
    
    it("Should not be able to authenticate with wrong email", async () => {
        expect(async () => {
            await sut.execute({
                email: "johndoe@example.com",
                password: "123456"
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
    
    it("Should not be able to authenticate with wrong password", async () => { 
        await  usersRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password_hash: await hash("123456", 6)
        })
        
        expect(async () => {
            await sut.execute({
                email: "johndoe@example.com",
                password: "123"
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
    

})