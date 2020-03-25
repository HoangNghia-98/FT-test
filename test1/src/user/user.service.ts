import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'


@Injectable()
export class UserService {
  private users: any[] = [
    {
      _id: 'f4a94755-5ec4-4e85-afe8-cf779d9ff739',
      name: 'nghia',
      username: 'nghia.hoang',
      password: '$2b$10$tfBV7PccPS0xLiQX/nxsqO7vHf6WKn4en5vHcU1rwCXxkUcKPiSm2'
    },
    {
      _id: '0f79bfe0-ce0c-4ed4-bef2-c4e5f7be1b96',
      name: 'duc',
      username: 'duc.hoang',
      password: '$2b$10$64UFUrOFy//B4HO9DXlj8Oj3FZ1M14Bwt/w7w3Qk4qHvWqsYGNhRu'
    }
  ] 

  private saltRounds: number = 10;

  getHash(myPlaintextPassword: string) {
    return bcrypt.hash(myPlaintextPassword, this.saltRounds)
  }

  // function check username exist
  isExistUsername(username: string) {
    const isExist = this.users.find(user => user.username === username)
    if (isExist) return true
    else return false
  } 

  // add new user
  async addUserToDB(userInfRegister) {
    let passHash = await this.getHash(userInfRegister.password)

    let newUser = {
      _id: uuidv4(),
      name: userInfRegister.name,
      username: userInfRegister.username,
      password: passHash
    }
    this.users.push(newUser)
    console.log(`user: `, newUser)
  }

  getAllUsers() {
    return this.users
  }

  getUserByUserName(userName: string) {
    const userFound = this.users.find(user => user.username === userName)
    if (!userFound) return false
    else return {
      name: userFound.name,
      username: userFound.username,
      password: userFound.password,
      _id: userFound._id
    }
  }

  async login(userName: string, passWord: string) {
    // 1.check user name
    const userFound = this.users.find(u => u.username === userName)

    if (!userFound) return false

    // 2. check password
    const match = await bcrypt.compare(passWord, userFound.password)

    return match

  }
}
