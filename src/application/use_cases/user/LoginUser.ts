import { IUserRepository } from '../../../domain/repositories/UserRepository';
import { generateToken } from '../../../infrastructure/http/utils/jwt';

export class LoginUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user || !(await user.comparePassword(password))) {
            throw new Error('Invalid credentials');
        }
        return generateToken(user._id!);
    }
}
