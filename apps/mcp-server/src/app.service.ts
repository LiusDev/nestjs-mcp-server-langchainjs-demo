import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getTime() {
    const { data } = await axios.get(
      'https://timeapi.io/api/time/current/zone?timeZone=Asia%2FHo_Chi_Minh',
    );
    return data;
  }
}
