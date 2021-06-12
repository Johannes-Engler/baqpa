/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

export default function AddElementModal(props) {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");
  let completeButtonRef = useRef(null);

  useEffect(() => {
    setOpen(props.show);
  }, [props.show]);

  async function addBackPack() {
    if (productBrand.length > 0 && productName.length > 0) {
      try {
        await axios.put(`/api/products/request`, { brand: productBrand, name: productName, reason, email });
        setProductBrand("");
        setProductName("");
        setReason("");
        setEmail("");
        props.onClose(false);
        props.onShowNotification(true);
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        initialFocus={completeButtonRef}
        className="fixed z-50 inset-0 overflow-y-auto"
        open={open}
        onClose={() => {
          props.onClose(false);
        }}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
              <div>
                {/* Filter section */}
                <div className="pt-6 divide-y divide-gray-200">
                  <div className="px-4 sm:px-6">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">Analyze a Backpack</h2>
                    </div>
                    <ul className="mt-1 py-4">
                      <li className="py-2">
                        <div>
                          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                            Model
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              onChange={(e) => setProductName(e.target.value)}
                              type="text"
                              name="productName"
                              id="price"
                              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="Arcane Large Day"
                            />
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div>
                          <label htmlFor="productBrand" className="block text-sm font-medium text-gray-700">
                            Brand
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              onChange={(e) => setProductBrand(e.target.value)}
                              type="text"
                              name="productBrand"
                              id="price"
                              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="Osprey"
                            />
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div>
                          <div className="flex justify-between">
                            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                              Reason
                            </label>
                            <span className="text-sm text-gray-500" id="email-optional">
                              Optional
                            </span>
                          </div>

                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              onChange={(e) => setReason(e.target.value)}
                              type="text"
                              name="reason"
                              id="price"
                              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="I like the style"
                            />
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div>
                          <div className="flex justify-between">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email
                            </label>
                            <span className="text-sm text-gray-500" id="email-optional">
                              Optional
                            </span>
                          </div>
                          <div className="mt-1">
                            <input
                              onChange={(e) => setEmail(e.target.value)}
                              type="text"
                              name="email"
                              id="email"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="you@example.com"
                              aria-describedby="email-description"
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-500" id="email-description">
                            We'll notify you once we're ready.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-20 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => {
                    addBackPack();
                  }}
                  ref={completeButtonRef}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    props.onClose(false);
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
  );
}
