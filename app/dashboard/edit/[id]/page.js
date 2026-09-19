import { getSingleApplication } from "@/utils/fetcher";
import ApplicationForm from "../../_components/ApplicationForm";

const EditPage = async ({ params }) => {
  const { id } = params;
  const success = await getSingleApplication(id);
  return (
    <>
      <h2 className="text-xl text-black font-bold text-center my-4">
        Edit Certificate
      </h2>
      <ApplicationForm application={success?.application} editMode={true} />;
    </>
  );
};

export default EditPage;
