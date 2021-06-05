import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserDTO from '../dtos/CreateUserDTO';

export default interface IUsersRepository {
    findById(id: string): Promise<User | undefined>
    findAllUsers(): Promise<User[]>;
    findByEmail(email: string): Promise<User | undefined>
    create(data: CreateUserDTO): Promise<User>;
    save(user: User): Promise<User>
    delete(userId: string): Promise<void>;
}