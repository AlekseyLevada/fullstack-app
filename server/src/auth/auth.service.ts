import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenResponseDto } from './dto/token-response.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService
  ) { }

  async register(registerDto: RegisterDto): Promise<TokenResponseDto> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userModel.create({
      ...registerDto,
      password: hashedPassword
    });

    const token = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { access_token: token };
  }

  async login(loginDto: LoginDto): Promise<TokenResponseDto> {
    const user = await this.userModel.findOne({ email: loginDto.email });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { expiresIn: "1h" }
    );

    return { access_token: token };
  }
}