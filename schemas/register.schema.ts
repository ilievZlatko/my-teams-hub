import * as z from "zod";

export const RegisterSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string().min(6),
    rePassword: z.string().min(6),
    check: z.literal<boolean>(true, { errorMap: () => ({ message: "You have to agree!"}), }),
})