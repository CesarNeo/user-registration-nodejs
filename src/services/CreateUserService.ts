import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppErrors';

interface Request {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const findEmailExists = await usersRepository.findByEmail(email);

        if (findEmailExists) {
            throw new AppError('Email adress already used');
        }

        const hashedpassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedpassword
        });

        await usersRepository.save(user);

        return user;
    }
}