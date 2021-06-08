import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default class UsersController {
    public async show(request: Request, response: Response): Promise<Response> {
        const userId = request.params.id;
        const showProfile = container.resolve(ShowProfileService);
        const user = await showProfile.execute({ userId });

        return response.json(user);
    }

    public async index(request: Request, response: Response): Promise<Response> {
        const usersRepository = new UsersRepository();

        const users = await usersRepository.findAllUsers();

        return response.json(users);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
            name,
            email,
            address,
            fone
        } = request.body;

        const createUserService = container.resolve(CreateUserService);

        const user = await createUserService.execute({
            name,
            email,
            address,
            fone
        });

        return response.json(user);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const userId = request.params.id;

        const { name, email, address, fone } = request.body;

        const updateUserService = container.resolve(UpdateUserService);

        const user = await updateUserService.execute({
            userId,
            name,
            email,
            address,
            fone
        });

        return response.json(user);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const userId = request.params.id;

        const deleteUserService = container.resolve(DeleteUserService);

        await deleteUserService.execute(userId);

        return response.status(200).json();
    }
}