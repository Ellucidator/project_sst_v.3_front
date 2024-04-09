/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
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
    }
};

export default nextConfig;
