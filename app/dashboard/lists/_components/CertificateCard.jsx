"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const CertificateCard = ({ application, index }) => {
  const router = useRouter();

  const handleDelete = async (value) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const res = await fetch(`/api/application/${value}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to delete");
        }

        toast.success("Deleted successfully!");
        router.refresh();
      } catch (error) {
        console.error("Delete error:", error);
        toast.error(" Error deleting item.");
      }
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/application/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: !currentStatus }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      toast.success(
        `Status ${!currentStatus ? "approved" : "set to pending"}!`,
      );
      router.refresh();
    } catch (error) {
      console.error("Status update error:", error);
      toast.error(" Error updating status.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="p-4 w-full max-w-xl border rounded-lg shadow flex justify-between items-center bg-white hover:shadow-lg transition">
        <span className="text-xl text-green-400 mr-4 font-bold">
          {index + 1}
        </span>
        <div>
          <Link
            href={`/en/track-your-application?visanumber=${application?.number}`}
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            Open
          </Link>

          <p className="text-sm text-gray-500">
            Application No: {application?.number}
          </p>

          {/* Status Badge */}
          <span
            className={`inline-block mt-1 text-xs font-semibold px-2 py-1 rounded ${
              application?.status
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {application?.status ? "Approved" : "Pending"}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              handleStatusToggle(application._id, application.status)
            }
            className={`text-sm px-3 py-1.5 rounded-md transition ${
              application?.status
                ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {application?.status ? "Mark Pending" : "Approve"}
          </button>

          <button
            onClick={() => router.push(`/dashboard/edit/${application._id}`)}
            className="bg-yellow-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-yellow-600 transition"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(application._id)}
            className="bg-red-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
