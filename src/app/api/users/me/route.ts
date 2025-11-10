import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";



connect();

export async function GET(request: NextRequest) {
    try {
      const userId = getDataFromToken(request);
      const user = await User.findById(userId).select("-password");
      return NextResponse.json(
        {
          message: "User fetched successfully",
          data: user,
        },
        { status: 200 }
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(
        { error: "Unexpected error occurred" },
        { status: 500 }
      );
    }

}           