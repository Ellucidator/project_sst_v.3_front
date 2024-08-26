// Import required modules and constants
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    backgroundImage: `url(https://project-sst-v-3-front.vercel.app/public/home/og-bg.png)`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "#1d1d1d",
                }}
            >
                <div
                    style={
                        {
                            marginLeft: 190,
                            marginRight: 190,
                            display: "flex",
                            fontSize: 140,
                            fontFamily: "Outfit",
                            letterSpacing: "-0.05em",
                            fontStyle: "normal",
                            color: "white",
                            lineHeight: "120px",
                            whiteSpace: "pre-wrap",
                        }
                    }
                >
                </div>
            </div>
        ),
        {
            width: 1920,
            height: 1080,
        },
    );
}