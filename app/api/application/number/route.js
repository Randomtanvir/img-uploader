import connectMongo from "@/db/db";
import Application from "@/model/data.model";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request?.url);
    const number = searchParams.get("visanumber");

    if (!number) {
      return NextResponse.json(
        { message: "Visa number is required" },
        { status: 400 },
      );
    }

    const application = await Application.findOne({
      number: number,
    }).lean();

    if (!application) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error("GET application error:", error);

    return NextResponse.json(
      { message: "Failed to fetch application" },
      { status: 500 },
    );
  }
}
