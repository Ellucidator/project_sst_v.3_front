// Import required modules and constants
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// Route segment config
export const runtime = "edge";

// Define a function to handle GET requests
export async function GET(req: NextRequest) {
    // Extract title from query parameters
    const { searchParams } = req.nextUrl;
    const postTitle = searchParams.get("title");

    

    // Create an ImageResponse with dynamic content
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
                    {postTitle}
                </div>
            </div>
        ),
        // ImageResponse options
        {
            width: 1920,
            height: 1080,
        },
    );
}