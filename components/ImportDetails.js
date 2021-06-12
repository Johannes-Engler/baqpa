import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

function ImportDetails(props) {
  const [mandate, setMandate] = useState({});
  const [formState, setFormState] = useState("FORM");
  const [newProducts, setNewProducts] = useState(null);
  const [sources, setSources] = useState([
    { value: "bol.com", label: "bol.com" },
    {
      value: "colblue.nl",
      label: "colblue.nl",
    },
    { value: "amazon.com", label: "amazon.com" },
  ]);

  const onChange = async (event) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();
    formData.append("products", event.target.files[0]);
    const config = {
      headers: { "content-type": "multipart/form-data", "x-api-key": process.env.NEXT_PUBLIC_BACKEND_API_KEY },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };
    console.log("form content", formData);
    const response = await axios.post("https://reviewr-backend.herokuapp.com/upload/products", formData, config);
    setNewProducts(response.data.newProducts);
    setFormState("UPLOADED");
    console.log("response", response.data);
  };

  const dismissModal = () => {
    setFormState("FORM");
  };

  return (
    <div className="container px-4 mt-7 mx-auto">
      {formState === "FORM" && (
        <form>
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  Import new Products
                </h2>
                <p className="mt-1 text-sm text-gray-500"></p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Sources
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <Select
                      isMulti
                      name="sources"
                      options={sources}
                      className="basic-multi-select w-full"
                      classNamePrefix="select"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Upload CSV
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md w-auto">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="products"
                            type="file"
                            className="sr-only"
                            accept="text/csv"
                            multiple={false}
                            onChange={onChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">CSV up to 10MB wit the ean number as a column</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      {formState === "UPLOADED" && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Upload successful</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Queued {newProducts} new products for scraping</p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <button
                    type="button"
                    onClick={dismissModal}
                    className="ml-3 bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImportDetails;
