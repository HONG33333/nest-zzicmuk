import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private authRepository: UserRepository) {}

  signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.authRepository.createUser(authCredentialsDto);
  }
}
