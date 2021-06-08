import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        showProfile = new ShowProfileService(fakeUsersRepository);
    });

    it('should be able to show the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Cesar Emmanuel',
            email: 'cesar@gmail.com',
            address: 'Rua Luis Juarez 26 fundos',
            fone: '(11) 99999-9999'
        });

        const profile = await showProfile.execute({
            userId: user.id
        });

        expect(profile.name).toBe('Cesar Emmanuel');
        expect(profile.email).toBe('cesar@gmail.com');
    });

    it('should not be able show the profile from non-existing user', async () => {
        await expect(
            showProfile.execute({
                userId: 'non-existing-user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
