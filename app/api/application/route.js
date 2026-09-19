import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/utils/cloudinary";
import connectMongo from "@/db/db";
import Application from "@/model/data.model";
import { getCurrentTimeString } from "@/utils/randomString";

export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.formData();

    // Optional QR code upload

    // Multiple images upload — only if files exist
    const imageFiles = body
      .getAll("image")
      .filter((file) => typeof file === "object" && file.size > 0);

    const imageArray = await Promise.all(
      imageFiles.map(async (file) => {
        const url = await uploadToCloudinary(file, `img-uploader`);
        return url;
      }),
    );

    // Build application data
    const applicationData = {
      number: body.get("number") || "",
      image: imageArray, // if no images, empty array
    };

    // Save to DB
    const application = new Application(applicationData);
    await application.save();

    return NextResponse.json(
      { message: "✅ Application saved successfully", application },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ Error in POST /applications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  try {
    await connectMongo();
    // 🔹 query params থেকে page আর limit ধরা
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // 🔹 ডেটা ফেচ করা skip & limit দিয়ে
    const applications = await Application.find()
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(limit);

    // 🔹 মোট কতগুলো ডকুমেন্ট আছে সেটা বের করা
    const totalDocs = await Application.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);

    return NextResponse.json(
      {
        message: "✅ Applications fetched successfully",
        applications,
        pagination: {
          totalDocs,
          totalPages,
          currentPage: page,
          pageSize: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Error in GET /applications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
