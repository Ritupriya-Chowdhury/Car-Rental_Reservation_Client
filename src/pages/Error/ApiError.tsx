import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";


type ApiErrorProps = {
  errorMessage: string;
};


const ApiError: React.FC<ApiErrorProps> = ({ errorMessage }) => {
    const theme = useAppSelector((state: RootState) => state.theme.theme);
  return (
    <div className={`pt-36 pb-8  ${theme==='dark'?'bg-red-200':'bg-red-100'}`}>
        <div className="flex flex-col items-center justify-center py-12  text-red-700">
      <h1 className="text-3xl font-bold">Error</h1>
      <p className="mt-4 text-lg">{errorMessage}</p>
      <div className="mt-6">
        <Link to="/" className="text-black font-bold border-2  border-yellow-400 rounded-lg
         bg-yellow-400 p-2 hover:bg-white ">
          Return to Home
        </Link>
      </div>
    </div>
    </div>
  );
};

export default ApiError;
