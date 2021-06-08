import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface Request {
    userId: string;
    name: string;
    email: string;
    address: string;
    fone: string;
}

@injectable()
export default class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({
        userId,
        name,
        email,
        address,
        fone
    }: Request): Promise<User> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found');
        }

        const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
            throw new AppError('Email already in use');
        }

        user.name = name;
        user.email = email;
        user.address = address;
        user.fone = fone;

        return this.usersRepository.save(user);
    }
}