import AppError from '@shared/errors/AppErrors';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let updateUserService: UpdateUserService;

describe('UpdateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        updateUserService = new UpdateUserService(
            fakeUsersRepository
        );
    });

    it('should be able to update the user', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Cesar Emmanuel',
            email: 'cesar@gmail.com',
            password: '1234'
        });

        const updatedUser = await updateUserService.execute({
            userId: user.id,
            name: 'Rodrigo',
            email: 'rodrigo@gmail.com'
        });

        expect(updatedUser.name).toBe('Rodrigo');
        expect(updatedUser.email).toBe('rodrigo@gmail.com');
    });

    it('should not be able to update the user from non-existing user', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Cesar Emmanuel',
            email: 'cesar@gmail.com',
            password: '1234'
        });

        await expect(
            updateUserService.execute({
                userId: 'non-existing-user-id',
                name: 'Cesar Emmanuel',
                email: 'cesar1@gmail.com'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'Cesar Emmanuel',
            email: 'cesar@gmail.com',
            password: '1234'
        });

        const user = await fakeUsersRepository.create({
            name: 'Rodrigo',
            email: 'rodrigo@gmail.com',
            password: '1234'
        });

        await expect(
            updateUserService.execute({
                userId: user.id,
                name: 'Rodrigo',
                email: 'cesar@gmail.com'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});