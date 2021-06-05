import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '../entities/User';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';

export default class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const findUser = await this.ormRepository.findOne({
            where: { id }
        });

        return findUser;
    }

    public async findAllUsers(): Promise<User[]> {
        const users = await this.ormRepository.find();

        return users;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = await this.ormRepository.findOne({
            where: { email }
        });

        return findUser;
    }

    public async create(userData: CreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(userData);

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async delete(userId: string): Promise<void> {
        const user = await this.ormRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            return undefined;
        }

        await this.ormRepository.delete(user.id);

    }
}