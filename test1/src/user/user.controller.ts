import { Controller, Get, Req, Param, Res } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get('all') 
  getAlluser() {
    return this.userService.getAllUsers()
  }
  

  // localhost:4000/user/:username
  @Get(':username')
  getUserByUsername(@Res() res, @Param('username') param) {
    const userFound = this.userService.getUserByUserName(param)
    if (!userFound) return res.status(403).json({
      success: false,
      message: 'username is not exist in DB'
    }) 
    return res.status(200).json(userFound)
  }
  
}
