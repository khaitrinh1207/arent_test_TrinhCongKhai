import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseService, ResponseDto } from '../shared/base';
import {
  ERROR_MESSAGE,
  PASSWORD_SALT,
  SUCCESS_MESSAGE,
} from '../shared/constants';
import { LoggerService } from '../logger/logger.service';
import { PrismaService } from '../shared/base';
import { LoginRequestDto, UserRegisterDto, TokenResponseDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { AuthPayload } from './interfaces';
import { CustomException } from '../exceptions/custom.exception';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    logger: LoggerService,
    prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    super(logger, prisma);
  }

  async signUp(user: UserRegisterDto): Promise<ResponseDto<any>> {
    try {
      const hashPassword: string = await bcrypt.hash(
        user.password,
        PASSWORD_SALT,
      );

      await this.prisma.user.create({
        data: {
          ...user,
          password: hashPassword,
        },
      });

      return {
        statusCode: HttpStatus.CREATED,
        data: SUCCESS_MESSAGE.SUCCESS.message,
      };
    } catch (error) {
      this.handleException(
        error,
        HttpStatus.BAD_REQUEST,
        ERROR_MESSAGE.REGISTER_USER_ERROR,
      );
    }
  }

  async signIn(data: LoginRequestDto): Promise<ResponseDto<TokenResponseDto>> {
    try {
      const userValidator = await this.validateUser(
        data.username,
        data.password,
      );

      const payload: AuthPayload = {
        id: userValidator.id,
        username: userValidator.username,
        email: userValidator.email,
      };

      const accessToken: string = this.jwtService.sign(payload);
      const expiredAt: number = _.get(
        this.jwtService.decode(accessToken),
        'exp',
      );

      return {
        statusCode: HttpStatus.OK,
        data: {
          accessToken,
          expiredAt,
        },
      };
    } catch (error) {
      this.handleException(
        error,
        HttpStatus.UNAUTHORIZED,
        ERROR_MESSAGE.UNAUTHORIZED,
      );
    }
  }

  // async refreshToken(){}

  // async signOut(){}

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      throw new CustomException(
        HttpStatus.UNAUTHORIZED,
        ERROR_MESSAGE.USER_NOT_EXISTS,
      );
    }
    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      throw new CustomException(
        HttpStatus.UNAUTHORIZED,
        ERROR_MESSAGE.PASSWORD_INVALID,
      );
    }
    return user;
  }
}
