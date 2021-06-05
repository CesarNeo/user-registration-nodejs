import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';


@injectable()
export default class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute(userId: string): Promise<void> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found');
        }

        await this.usersRepository.delete(user.id);
    }
}