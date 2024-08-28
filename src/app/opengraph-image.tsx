import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Segio Setup'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url(https://project-sst-v-3-front.vercel.app/public/home/og-bg.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    backgroundColor: "#1d1d1d",
                }}
            >
            </div>
        ),
        {
            ...size,
        }
    )
}