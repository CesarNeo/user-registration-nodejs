import { v4 as uuidv4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';

import User from '../../infra/typeorm/entities/User';

export default class UsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id);

        return findUser;
    }

    public async findAllUsers(): Promise<User[]> {
        return this.users;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);

        return findUser;
    }

    public async create(userData: CreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuidv4() }, userData);

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

        this.users[findIndex] = user;

        return user;
    }

    public async delete(userId: string): Promise<void> {
        const usersFilter = this.users.filter(userDelete => userDelete.id !== userId);

        this.users = usersFilter;
    }
}