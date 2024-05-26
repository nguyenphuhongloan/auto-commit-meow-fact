import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
    GH_API_TOKEN: process.env.GH_API_TOKEN,
    GH_USERNAME: process.env.GH_USERNAME
}