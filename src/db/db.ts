import pg from 'pg';
import { Params } from '../types/params';
const pool = new pg.Pool({ connectionString: process.env.CONNECTION_STRING})

export const query = (text:string,params?:Params[]) => pool.query(text, params);