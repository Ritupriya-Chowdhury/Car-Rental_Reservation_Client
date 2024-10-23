import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";

const ManageCarPage = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);

  return (
    <div className={` p-4 mt-12`}>
      <h1
        className={`text-2xl font-bold mb-4 text-left ml-12 ${
          theme === "dark" ? "text-yellow-400" : "text-black"
        }`}
      >
        Manage Cars
      </h1>

      <div className="flex  md:m-12 m-2 my-12 text-xl font-bold ">
        <div className="md:mr-24 mr-4 border border-yellow-400 bg-yellow-400 py-2 rounded-lg w-56 h-12">
          <Link to="/admin/create-car">Create Car</Link>
        </div>
        <div className="lg:mr-24 md:mr-16 border border-yellow-400 bg-yellow-400 py-2 rounded-lg w-56 h-12">
          <Link to="/admin/existing-car">Existing Car</Link>
        </div>
      </div>
    </div>
  );
};

export default ManageCarPage;
