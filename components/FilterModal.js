/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Disclosure, Dialog, Switch, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";

export default function FilterModal(props) {
  const [open, setOpen] = useState(false);
  const [waterBottleFilter, setWaterBottleFilter] = useState(false);
  const [hipBeltFilter, setHipBeltFilter] = useState(false);
  const [waterResistanceFilter, setWaterResistanceFilter] = useState(false);
  const [priceFilterBelow100, setPriceFilterBelow100] = useState(false);
  const [priceFilterBelow200, setPriceFilterBelow200] = useState(false);
  const [priceFilterAbove200, setPriceFilterAbove200] = useState(false);
  const [volumeFilterBelow25, setVolumeFilterBelow25] = useState(false);
  const [volumeFilterAbove25, setVolumeFilterAbove25] = useState(false);
  const [useCaseFilter, setUseCaseFilter] = useState(null)

    const keywords = [
        'commute',
        'laptop',
        'carry-on',
        'comfort',
        'hiking'
    ]
    let completeButtonRef = useRef(null);

  const deselectPricingFilters = () => {
    setPriceFilterBelow100(false);
    setPriceFilterAbove200(false);
    setPriceFilterBelow200(false);
  };

  const deselectVolumeFilters = () => {
    setVolumeFilterAbove25(false);
    setVolumeFilterBelow25(false);
  };

  useEffect(() => {
    setOpen(props.show);
  }, [props.show]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={completeButtonRef}
        open={open}
        onClose={() => {
          props.onClose(false);
        }}
      >
        <div
                    className="flex items-end z-50 justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm w-full mx-3 p-6">
                            <div>
                                {/* Filter section */}
                                <div className="pt-6 divide-y divide-gray-200">
                                    <div className="px-4 sm:px-6">
                                        <div>
                                            <h2 className="text-lg leading-6 font-medium text-gray-900">Filters</h2>
                                        </div>
                                        <ul className="mt-2 divide-y divide-gray-200">
                                            <li className="py-4 flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">
                                                    Price
                                                </p>
                                                <div>
                                                    <div className="flex justify-center items-center">
                                                        <div className="flex flex-col flex-grow">
                                                            <p className="text-sm text-right font-medium text-gray-900">
                                                                &lt; $100
                                                            </p>
                                                        </div>
                                                        <input
                                                            checked={priceFilterBelow100}
                                                            onChange={() => {
                                                                deselectPricingFilters();
                                                                setPriceFilterBelow100(!priceFilterBelow100)
                                                            }}
                                                            id="remember_me"
                                                            name="remember_me"
                                                            type="checkbox"
                                                            className="h-4 w-4 ml-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                        />
                                                    </div>
                                                    <div className="flex justify-center items-center">
                                                        <div className="flex flex-col flex-grow">
                                                            <p className="text-sm text-right font-medium text-gray-900">
                                                                $100 - $200
                                                            </p>
                                                        </div>
                                                        <input
                                                            checked={priceFilterBelow200}
                                                            onChange={() => {
                                                                deselectPricingFilters();
                                                                setPriceFilterBelow200(!priceFilterBelow200)
                                                            }}
                                                            id="remember_me"
                                                            name="remember_me"
                                                            type="checkbox"
                                                            className="h-4 w-4 ml-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                        />
                                                    </div>
                                                    <div className="flex justify-center items-center">
                                                        <div className="flex flex-col flex-grow">
                                                            <p className="text-sm text-right font-medium text-gray-900">
                                                                &gt; $200
                                                            </p>
                                                        </div>
                                                        <input
                                                            checked={priceFilterAbove200}
                                                            onChange={() => {
                                                                deselectPricingFilters();
                                                                setPriceFilterAbove200(!priceFilterAbove200)
                                                            }}
                                                            id="remember_me"
                                                            name="remember_me"
                                                            type="checkbox"
                                                            className="h-4 w-4 ml-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="py-4 flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">
                                                    Volume
                                                </p>
                                                <div>
                                                    <div className="flex justify-center items-center">
                                                        <div className="flex flex-col flex-grow">
                                                            <p className="text-sm text-right font-medium text-gray-900">
                                                                &lt; 25l
                                                            </p>
                                                        </div>
                                                        <input
                                                            checked={volumeFilterBelow25}
                                                            onChange={() => {
                                                                deselectVolumeFilters();
                                                                setVolumeFilterBelow25(!volumeFilterBelow25)
                                                            }}
                                                            id="remember_me"
                                                            name="remember_me"
                                                            type="checkbox"
                                                            className="h-4 w-4 ml-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                        />
                                                    </div>
                                                    <div className="flex justify-center items-center">
                                                        <div className="flex flex-col flex-grow">
                                                            <p className="text-sm text-right font-medium text-gray-900">
                                                                &gt; 25l
                                                            </p>
                                                        </div>
                                                        <input
                                                            checked={volumeFilterAbove25}
                                                            onChange={() => {
                                                                deselectVolumeFilters();
                                                                setVolumeFilterAbove25(!volumeFilterAbove25)
                                                            }}
                                                            id="remember_me"
                                                            name="remember_me"
                                                            type="checkbox"
                                                            className="h-4 w-4 ml-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="py-4 flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">
                                                   Use Case
                                                </p>
                                                <div>
                                                    {keywords.map(k => {
                                                        return (
                                                            <div key={k} className="flex justify-center items-center">
                                                                <div className="flex flex-col flex-grow">
                                                                    <p className="text-sm text-right font-medium text-gray-900">
                                                                        {k}
                                                                    </p>
                                                                </div>
                                                                <input
                                                                    checked={useCaseFilter === k}
                                                                    onChange={() => {
                                                                        if (k === useCaseFilter) {
                                                                            setUseCaseFilter(null)
                                                                        } else {
                                                                            setUseCaseFilter(k);
                                                                        }
                                                                    }}
                                                                    id="remember_me"
                                                                    name="remember_me"
                                                                    type="checkbox"
                                                                    className="h-4 w-4 ml-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                                />
                                                            </div>
                                                        )
                                                    })}

                                                </div>
                                            </li>
                                            <li className="py-4 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        Water Bottle
                                                    </p>
                                                </div>
                                                <input
                                                    checked={waterBottleFilter}
                                                    onChange={() => setWaterBottleFilter(!waterBottleFilter)}
                                                    id="remember_me"
                                                    name="remember_me"
                                                    type="checkbox"
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                            </li>
                                            <li className="py-4 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        Hip Belt
                                                    </p>
                                                </div>
                                                <input
                                                    checked={hipBeltFilter}
                                                    onChange={() => setHipBeltFilter(!hipBeltFilter)}
                                                    id="remember_me"
                                                    name="remember_me"
                                                    type="checkbox"
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                            </li>
                                            <li className="py-4 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        Water Resistant
                                                    </p>
                                                </div>
                                                <input
                                                    checked={waterResistanceFilter}
                                                    onChange={() => setWaterResistanceFilter(!waterResistanceFilter)}
                                                    id="remember_me"
                                                    name="remember_me"
                                                    type="checkbox"
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    ref={completeButtonRef}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                    onClick={() => {
                                        props.onApplyFilter({
                                            waterbottle: waterBottleFilter,
                                            hipBelt: hipBeltFilter,
                                            waterResistant: waterResistanceFilter,
                                            volumeFilterAbove25: volumeFilterAbove25,
                                            volumeFilterBelow25: volumeFilterBelow25,
                                            priceFilterBelow100: priceFilterBelow100,
                                            priceFilterBelow200: priceFilterBelow200,
                                            priceFilterAbove200: priceFilterAbove200,
                                            useCase: useCaseFilter,
                                        })
                                    }}
                                >
                                    Apply
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                    onClick={() => {
                                        props.onClose(false)
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
