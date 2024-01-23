import 'dotenv/config';

import { z } from 'zod';

// coerce converts the value to the specified coerce.number() converts no number

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
    PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error("Invalid enviroment variable", _env.error.format());
    
    throw new Error("Invalid enviroment variables.")
}

export const env = _env.data