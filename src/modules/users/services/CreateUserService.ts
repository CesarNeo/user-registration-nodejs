import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
    name: string;
    email: string;
    address: string;
    fone: string;
}

@injectable()
export default class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute({ name, email, address, fone }: Request): Promise<User> {
        const findEmailExists = await this.usersRepository.findByEmail(email);

        if (findEmailExists) {
            throw new AppError('Email adress already used');
        }

        const user = await this.usersRepository.create({
            name,
            email,
            address,
            fone
        });

        return user;
    }
}