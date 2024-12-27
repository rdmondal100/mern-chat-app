

import { z } from "zod"

export const signUpFormSchema = z.object({
    firstname: z.string().min(2,"The first name should at least 2 charecter").max(50,"The last name can't be more than 50 chareter"),
    lastname: z.string().min(2,"The first name should at least 2 charecter").max(50,"The last name can't be more than 50 chareter"),
    email:z.string().email().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: z.string().min(8,"Password should more than 8 charecter").max(20,"Password should not more than 20 charecter"),
})

// todo 
// password regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/