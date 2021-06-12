/* This example requires Tailwind CSS v2.0+ */
import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function ListAd(props) {
  //   const [show, setShow] = useState(true);

  //   if (show) {
  return (
    <div className="bg-gray-400">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="hidden sm:flex p-2 rounded-lg bg-gray-800">
              <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="hidden md:inline">{props.text}</span>
            </p>
          </div>
          <div className="order-3 flex-shrink-0 w-full sm:order-2  sm:w-auto">
            <a
              onClick={() => props.onClick()}
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 cursor-pointer"
            >
              Analyze your favorite backpack
            </a>
          </div>
          {/* <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="-mr-1 flex p-2 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
  //   } else {
  //     return <div />;
  //   }
}
