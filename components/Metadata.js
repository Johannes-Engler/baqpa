/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from "@heroicons/react/solid";

export default function Metadata({ metadata }) {
  return (
    <div className="mt-4 bg-white shadow overflow-hidden rounded-lg">
      <div className="p-4 border-gray-200">
        <dl className="grid gap-4 grid-cols-2 sm:grid-cols-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900 col-span-2 sm:col-span-4">Product Specs</h3>
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Volume (L)</dt>
            <dd className="mt-1 text-sm text-gray-900">{metadata.volumeInLitres}</dd>
          </div>
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Size (CM)</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {metadata.heightInCm} x {metadata.widthInCm} x {metadata.depthInCm}
            </dd>
          </div>
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Weight (KG)</dt>
            <dd className="mt-1 text-sm text-gray-900">{metadata.weightInKg}</dd>
          </div>
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Compartments</dt>
            <dd className="mt-1 text-sm text-gray-900">{metadata.compartments}</dd>
          </div>
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Water Bottle</dt>
            <dd className="mt-1 text-sm text-gray-900">{metadata.waterbottle}</dd>
          </div>
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Water-resistant</dt>
            <dd className="mt-1 text-sm text-gray-900">{metadata.waterResistant}</dd>
          </div>
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Organizer</dt>
            <dd className="mt-1 text-sm text-gray-900">{metadata.organizer}</dd>
          </div>
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Hip Belt</dt>
            <dd className="mt-1 text-sm text-gray-900">{metadata.hipBelt}</dd>
          </div>
        </dl>
      </div>
      {/* <div className="m-4 flex justify-center items-center ">
          <button className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            View all
          </button>
        </div> */}
    </div>
  );
}
