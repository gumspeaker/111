/* eslint-disable import/prefer-default-export */
import { detail } from '../utils/request';

export const getTopFlow = () => detail('/Api/flow/Top');
