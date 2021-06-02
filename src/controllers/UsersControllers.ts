import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../repositories/UsersRepository';

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const usersRepository = getCustomRepository(UsersRepository);

        const users = await usersRepository.find();

        return response.json(users);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ name, email, password });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return response.json(userWithoutPassword);
    }
}