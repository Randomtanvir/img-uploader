"use client";

import { generateApplicationNumber } from "@/app/lib";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ApplicationForm({
  editMode = false,
  application = null,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      number: generateApplicationNumber(),
      images: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (editMode && application) {
      reset({
        number: application.number || "",
        images: [],
      });
    }
  }, [editMode, application, reset]);

  const StringFields = [{ name: "number", label: "Number" }];

  const onSubmit = async (data) => {
    const formData = new FormData();

    StringFields.forEach((field) => {
      formData.append(field.name, data[field.name]);
    });

    if (data.QRcode?.[0]) {
      formData.append("QRcode", data.QRcode[0]);
    }

    const imageFiles = data.images;
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("image", imageFiles[i]);
    }

    try {
      setLoading(true);
      const res = await fetch(
        editMode ? `/api/application/${application._id}` : "/api/application",
        {
          method: editMode ? "PATCH" : "POST",
          body: formData,
        },
      );

      const result = await res.json();

      if (res.ok) {
        toast.success(
          editMode
            ? "Application updated successfully!"
            : "Application submitted successfully!",
        );
        router.push("/dashboard/lists");
      } else {
        toast.error(result.error || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {editMode ? "Edit Application" : "New Application"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        encType="multipart/form-data"
      >
        {StringFields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <input
              {...register(field.name)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}

        <div>
          <label className="block mb-2 font-medium">Images</label>
          <input
            type="file"
            multiple
            {...register("images")}
            className="border p-2 rounded"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded text-lg"
        >
          {editMode ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}
