import { HttpException, HttpStatus } from '@nestjs/common'
import { from } from "rxjs";
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(png)$/)) {
    callback(new HttpException({
      status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      error: 'Only .PNG files are allowed!',
    }, 415), false)
  };

  callback(null, true);
};