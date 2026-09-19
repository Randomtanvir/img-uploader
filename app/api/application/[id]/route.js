import connectMongo from "@/db/db";
import Application from "@/model/data.model";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { getCurrentTimeString } from "@/utils/randomString";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    await connectMongo();
    const application = await Application.findById(id);
    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "✅ Application fetched successfully", application },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in GET /applications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await connectMongo();
    const application = await Application.findByIdAndDelete(id);
    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "✅ Application deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in DELETE /applications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  await connectMongo();
  const { id } = params;

  try {
    const contentType = request.headers.get("content-type");

    if (contentType.includes("application/json")) {
      // Handle status toggle
      const body = await request.json();
      const application = await Application.findByIdAndUpdate(
        id,
        { status: body.status },
        { new: true }
      );

      if (!application) {
        return NextResponse.json(
          { error: "Application not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "✅ Status updated successfully", application },
        { status: 200 }
      );
    }

    if (contentType.includes("multipart/form-data")) {
      // Handle full form-data update
      const body = await request.formData();
      const existingApplication = await Application.findById(id);

      if (!existingApplication) {
        return NextResponse.json(
          { error: "Application not found" },
          { status: 404 }
        );
      }

      // QR code upload if provided
      let QRcodeUrl = existingApplication.QRcode;
      const qrCodeFile = body.get("QRcode");
      if (qrCodeFile && typeof qrCodeFile === "object" && qrCodeFile.size > 0) {
        QRcodeUrl = await uploadToCloudinary(qrCodeFile, "QRcode");
      }

      // Images upload if provided
      let imageArray = existingApplication.image;
      const imageFiles = body
        .getAll("image")
        .filter((file) => typeof file === "object" && file.size > 0);
      if (imageFiles.length > 0) {
        imageArray = await Promise.all(
          imageFiles.map(async (file) => {
            const url = await uploadToCloudinary(
              file,
              `Application: ${getCurrentTimeString()}`
            );
            return url;
          })
        );
      }

      const applicationData = {
        country: body.get("country") || existingApplication.country,
        signed: body.get("signed") || existingApplication.signed,
        capacity: body.get("capacity") || existingApplication.capacity,
        stamp: body.get("stamp") || existingApplication.stamp,
        date: body.get("date") || existingApplication.date,
        signDate: body.get("signDate") || existingApplication.signDate,
        time: body.get("time") || existingApplication.time,
        footerDate: body.get("footerDate") || existingApplication.footerDate,
        at: body.get("at") || existingApplication.at,
        by: body.get("by") || existingApplication.by,
        number: body.get("number") || existingApplication.number,
        digitallySigned:
          body.get("digitallySigned") || existingApplication.digitallySigned,
        QRcode: QRcodeUrl,
        image: imageArray,
      };

      const application = await Application.findByIdAndUpdate(
        id,
        applicationData,
        {
          new: true,
        }
      );

      return NextResponse.json(
        { message: "✅ Application updated successfully", application },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Unsupported Content-Type" },
      { status: 400 }
    );
  } catch (error) {
    console.error("❌ PATCH Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
