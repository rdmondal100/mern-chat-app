

import { z } from "zod"

export const loginFormSchema = z.object({
    email:z.string().email().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: z.string().min(8,"Password should more than 8 charecter").max(20,"Password should not more than 20 charecter"),
})

