import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define the expected structure of your token payload
interface DecodedToken extends JwtPayload {
  id: string;
}
export const getDataFromToken = (request: NextRequest): string => {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as DecodedToken;

    if (!decoded || !decoded.id) {
      throw new Error("Invalid token payload");
    }

    return decoded.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to extract user data from token");
  }
};
