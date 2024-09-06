import dotenv from 'dotenv';
dotenv.config();
/** @type {import('next').NextConfig} */

const nextConfig = {
    compiler: {
        // removeConsole:true,
    },
    images: {
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'devleal.com.br',
                port: '',
                pathname: '/files/**'
            },
            {
                protocol: 'https',
                hostname: 'www.devleal.com.br',
                port: '',
                pathname: '/files/**'
            },
            {
                protocol: 'https',
                hostname: 'melhorenvio.com.br',
                port: '',
                pathname: '/images/**'
            },
            {
                protocol: 'https',
                hostname: 'www.melhorenvio.com.br',
                port: '',
                pathname: '/images/**'
            }
        ]
    },
    logging:{
        fetches:{
            fullUrl: true
        }
    },
    env:{
        API_HOST: process.env.API_HOST,
        PUBLIC_KEY_MP: process.env.PUBLIC_KEY_MP
    },
};

export default nextConfig;
