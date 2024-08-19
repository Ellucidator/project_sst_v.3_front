import dotenv from 'dotenv';
dotenv.config();
/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3001',
                pathname: '/files/**'
            },
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
        API_HOST: 'https://devleal.com.br'
    }
};

export default nextConfig;
