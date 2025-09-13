
import {z} from 'zod';

export const SchemaUserValidate = z.object({
    name: z.string().min(2, { message: "nome deve ter no minimo 2 caracteres"}),
    surname: z.string().min(2, { message: "sobrenome deve ter no mínimo 2 caracteres"}),
    cpf: z.string().min(11, { message: "cpf deve ter no minimo 11 caracteres"}),
    phone: z.string().min(10, { message: "telefone deve ter no minimo 10 caracteres"}),
    email: z.email({ message: "email inválido"}),
    password: z.string().min(6, { message: "senha deve ter no minímo 6 caracteres"})

})