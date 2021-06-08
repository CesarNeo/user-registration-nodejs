import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import DeleteUserService from './DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let deleteUserService: DeleteUserService;

describe('DeleteUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        deleteUserService = new DeleteUserService(
            fakeUsersRepository
        );
    });

    it('should be able to delete the user', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Cesar Emmanuel',
            email: 'cesar@gmail.com',
            address: 'Rua Luis Juarez 26 fundos',
            fone: '(11) 99999-9999'
        });

        const deleteSpy = jest.spyOn(fakeUsersRepository, 'delete');

        const userDeleted = await deleteUserService.execute(user.id);

        expect(deleteSpy);
        expect(userDeleted).toBeUndefined();
    });
});