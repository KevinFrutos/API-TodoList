import { IUserRepository } from '../../../domain/repositories/UserRepository';
import { generateToken } from '../../../infrastructure/http/utils/jwt';

export class RegisterUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(email: string, password: string) {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) throw new Error('Email already in use');

        const user = await this.userRepository.create({ email, password });
        return generateToken(user._id!);
    }
}
