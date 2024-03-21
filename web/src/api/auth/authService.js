import { axiosClient } from '../axios/index';

export default class AuthService {
  static async login(request) {
    try {
      const res = await axiosClient.post('/', request);
      console.log(res ,"res");
      return res.data;
      
    } catch (err) {
      console.log(err , "err");
      return null;
    }
  }
}
