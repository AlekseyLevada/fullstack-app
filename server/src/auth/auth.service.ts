import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { TokenResponseDto } from './dto/token-response.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async register(registerDto: RegisterDto): Promise<TokenResponseDto> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10)
    const user = await this.userService.create({ ...registerDto, password: hashedPassword })
    const token = this.jwtService.sign({ email: user.email, sub: user.id },{expiresIn: "1h"})
    return { access_token: token }
  }
}
