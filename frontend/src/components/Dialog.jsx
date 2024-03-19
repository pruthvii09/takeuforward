import React, { useState } from "react";
import { CircleX } from "lucide-react";
import usePostApiData from "../hooks/usePostApiData";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Dialog = ({ dialogOpen, setDialogOpen, uploadData }) => {
  const [username, setUsername] = useState("");
  const { sendData, loading, error } = usePostApiData();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    console.log(uploadData);
    if (!username) {
      return toast.error("Please Enter Username");
    }
    const res = await sendData(
      `${process.env.REACT_APP_NODE_API}/submissions`,
      null,
      {
        ...uploadData,
        username,
      }
    );
    if (res) {
      toast.success("Submitted Successfully!!");
      navigate("/submissions");
    }
    if (error) {
      toast.error(error);
      console.log(error);
    }
  };
  return (
    <div>
      {/* Black overlay */}
      {dialogOpen && (
        <div
          onClick={() => setDialogOpen(false)}
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
        ></div>
      )}

      {/* Modal */}
      {dialogOpen && (
        <div className="fixed top-0 left-0 px-5 w-full h-full flex justify-center items-center">
          <div className="px-10 py-5 sm:w-1/3 w-96 bg-[#242c3e] rounded-md">
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between items-center">
                  <label className="mb-2 text-base font-medium  text-white">
                    Enter Username
                  </label>
                  <CircleX
                    size={20}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => setDialogOpen(false)}
                  />
                </div>
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  className="border outline-none text-sm rounded-lg  w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="Enter Username.."
                />
              </div>
              <div className="flex items-center justify-center w-full">
                <button
                  onClick={handleSubmit}
                  className="px-4  flex items-center justify-center text-center w-full py-2 rounded-lg bg-blue-700"
                >
                  {loading ? <Loader /> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialog;
