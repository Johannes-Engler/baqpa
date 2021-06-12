/* This example requires Tailwind CSS v2.0+ */
import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function Banner(props) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto p-2 sm:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="hidden sm:flex mr-2 p-2  rounded-lg bg-indigo-800">
                <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <p className="font-medium text-white">
                <span className="inline">{props.text}</span>
              </p>
            </div>
            <div className="order-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setShow(false)}
                className="flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}
