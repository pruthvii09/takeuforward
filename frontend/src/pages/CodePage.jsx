import React, { useState } from "react";
import Editor from "../components/Editor";
import usePostApiData from "../hooks/usePostApiData";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import Dialog from "../components/Dialog";

const CodePage = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState(null);
  const [codeError, setCodeError] = useState("");
  const [getLoading, setLoading] = useState(false);
  const [uploadData, setUploaddata] = useState({
    source_code: "print('Hello')",
    language_id: 71,
    stdin: "",
  });
  const onChange = (value) => {
    setUploaddata({ ...uploadData, source_code: value });
  };
  const { sendData, loading, error } = usePostApiData();
  const handleRun = async () => {
    console.log(uploadData);
    setLoading(true);
    const res = await sendData(
      `https://judge0.p.rapidapi.com/submissions`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      },
      {
        ...uploadData,
      }
    );
    if (res) {
      const resultResponse = await fetch(
        `https://judge0.p.rapidapi.com/submissions/${res?.token}?base64_encoded`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      if (!resultResponse.ok) {
        setLoading(false);
        setCodeError("Could Not Compile Code");
        console.log("Failed To Fetch");
      }

      const resultData = await resultResponse.json();
      setData(resultData);
    }
    if (error) {
      console.log(error);
      setCodeError(error);
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col sm:flex-row h-screen text-white py-5 sm:py-10">
      <div className="flex-1">
        <Editor
          source_code={uploadData.source_code}
          onChange={onChange}
          language_id={uploadData.language_id}
        />
      </div>
      <div className="flex flex-1 flex-col-reverse sm:flex-col gap-8 h-full sm:px-4">
        <div className="">
          <h2 className="text-xl font-bold">STDIN</h2>
          <textarea
            value={uploadData.stdin}
            onChange={(e) =>
              setUploaddata({ ...uploadData, stdin: e.target.value })
            }
            placeholder="STDIN Here..."
            rows={5}
            className="h-full w-full resize-none rounded-lg bg-[#282a36] outline-none px-2 py-1"
          />
        </div>
        <div className="">
          <h2 className="text-xl font-bold">Output</h2>
          <div className="bg-[#282a36] h-40 w-full rounded-lg px-2 py-1">
            {getLoading ? (
              "Compiling...."
            ) : (
              <div className="h-full">
                {data?.stderr && <p className="text-red-600">{data?.stderr}</p>}
                {data?.stdout && (
                  <div className="flex h-full justify-between flex-col overflow-y-auto">
                    <p>{data?.stdout}</p>
                    <div className="flex w-full justify-between text-sm">
                      <p>⌛Time Taken : {data?.time}</p>
                      <p>📝Memory : {data?.memory}</p>
                    </div>
                  </div>
                )}
                {codeError && <p className="text-red-600">{codeError}</p>}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 rounded-lg bg-emerald-700"
            onClick={handleRun}
            disabled={getLoading}
          >
            Run
          </button>
          <SubmitButton onClick={() => setDialogOpen(true)} />
          <select
            value={uploadData.language_id}
            onChange={(e) =>
              setUploaddata({
                ...uploadData,
                language_id: parseInt(e.target.value),
              })
            }
            className="border outline-none text-sm rounded-lg block w-full p-2.5 bg-[#282a36] border-gray-600 placeholder-gray-400 text-white "
          >
            <option value="62">Java</option>
            <option value="53">C++</option>
            <option value="93">JavaScript</option>
            <option value="71">Python</option>
          </select>
        </div>
        <button
          onClick={() => navigate("/submissions")}
          className="px-4 py-2 rounded-lg bg-blue-700"
        >
          All Submissions
        </button>
      </div>
      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        uploadData={uploadData}
      />
    </div>
  );
};

export default CodePage;
