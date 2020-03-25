import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'


@Injectable()
export class AuthService {
  private secret = 'nghia.hoang';

  createToken(hashBody: {}) {
    return jwt.sign({ ...hashBody }, this.secret)
  }
  getSecret() {
    return this.secret 
  }
}
