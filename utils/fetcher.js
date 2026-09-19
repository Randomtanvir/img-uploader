export async function getAllApplications(page = 1, limit = 5) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/application?page=${page}&limit=${limit}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to fetch applications");

  return res.json();
}
export const getSingleApplication = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/application/${id}`,
      {
        cache: "no-store",
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: true, message: "data fetch error" };
  }
};

export const getApplicationByNumber = async (number) => {
  // console.log(number, "=============================== From GET fUNCTION");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/application/number?visanumber=${encodeURIComponent(
        number,
      )}`,
      {
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: data.message || "Application not found",
      };
    }

    return data;
  } catch (error) {
    console.error("Application fetch error:", error);

    return {
      error: true,
      message: "data fetch error",
    };
  }
};
