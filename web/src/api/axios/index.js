import axios from 'axios';
import {NEXT_PUBLIC_GRAPHQL_API} from '../../lib/constants';

export const axiosClient = axios.create({
  baseURL: NEXT_PUBLIC_GRAPHQL_API,
});
