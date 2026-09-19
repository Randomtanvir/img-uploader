import { getApplicationByNumber } from "@/utils/fetcher";

export default async function TrackYourApplication({ searchParams }) {
  const params = await searchParams;
  const visaNumber = params?.visanumber;
  const application = await getApplicationByNumber(visaNumber);
  // console.log(applic);
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl">
        <div className=" ">
          {application.status && application.image?.length > 0 && (
            <div className="mt-2 grid gap-5">
              {application.image.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Application ${index + 1}`}
                  className="w-full rounded-lg object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
