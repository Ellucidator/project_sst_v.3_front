import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        host:'https://project-sst-v-3-front.vercel.app',
        rules: [            
            {
                userAgent: ['Googlebot','Applebot', 'Bingbot'],
                allow: ['/'],
            },
        ],
        sitemap: 'https://project-sst-v-3-front.vercel.app/sitemap.xml',
    }
}