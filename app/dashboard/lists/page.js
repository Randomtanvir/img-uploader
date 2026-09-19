import React from "react";
import { getAllApplications } from "./../../../utils/fetcher";
import CertificateCard from "./_components/CertificateCard";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ListsPage = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page) || 1;
  const limit = 10;

  const { applications, pagination } = await getAllApplications(page, limit);
  return (
    <>
      <div className="w-full text-center mt-10 mb-5">
        <Link
          href="/dashboard"
          className="text-xl w-full mt-8 text-green-500 bg-gray-300 px-6 py-2 rounded-sm hover:underline hover:bg-gray-400 hover:text-white transition-all font-bold"
        >
          Home
        </Link>
      </div>
      <div>
        {applications?.length > 0 &&
          applications?.map((application, i) => (
            <CertificateCard
              key={application._id}
              index={i}
              application={application}
            />
          ))}
      </div>
      {pagination?.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          {/* Prev Button */}
          {pagination.hasPrevPage ? (
            <Link
              href={`?page=${pagination.currentPage - 1}`}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl shadow hover:opacity-90 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </Link>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-400 rounded-xl cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
              Prev
            </span>
          )}

          {/* Page Info */}
          <span className="px-4 py-2 font-semibold text-lg text-green-700 bg-green-100 rounded-lg shadow-sm">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          {/* Next Button */}
          {pagination.hasNextPage ? (
            <Link
              href={`?page=${pagination.currentPage + 1}`}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl shadow hover:opacity-90 transition"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-400 rounded-xl cursor-not-allowed">
              Next
              <ChevronRight className="w-4 h-4" />
            </span>
          )}
        </div>
      )}
    </>
  );
};
export default ListsPage;
