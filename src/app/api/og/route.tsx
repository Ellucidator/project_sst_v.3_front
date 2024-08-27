import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    

    return new ImageResponse(
        (
            <div
                style={{
                    height: "1920px",
                    width: "1080px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    backgroundImage: `url(https://project-sst-v-3-front.vercel.app/public/home/og-bg.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundColor: "#1d1d1d",
                }}
            >
            </div>
        ),
        {
            width: 1920,
            height: 1080,
        },
    );
}