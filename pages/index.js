import { Fragment, useEffect, useRef, useState } from "react";
import ProductList from "../components/ProductList";
import ProductDetails from "../components/ProductDetails";
import CompareProducts from "../components/compare/CompareProducts";
import Fuse from "fuse.js";
import Notification from "../components/Notification";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowDownIcon, ArrowLeftIcon, CogIcon, HomeIcon, XIcon } from "@heroicons/react/outline";
import { FilterIcon, SearchIcon } from "@heroicons/react/solid";
import Layout from "../components/common/Layout";
import Logo from "../components/common/Logo";
import Banner from "../components/Banner";
import ListAd from "../components/ListAd";
import FilterModal from "../components/FilterModal";
import AddElementModal from "../components/AddElementModal";
import { Menu } from "@headlessui/react";
import SortAscendingIcon from "@heroicons/react/outline/SortAscendingIcon";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function openNewPage(url) {
  window.open(url, "_blank");
}

export default function Home() {
  const user = {
    name: "Demo User",
  };
  const navigation = [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    { name: "Import", href: "/import", icon: HomeIcon, current: true },
  ];
  const secondaryNavigation = [{ name: "Settings", href: "#", icon: CogIcon }];

  const scrollRef = useRef(null);
  const executeScroll = () => {
    window.scrollTo(0, 0);
    scrollRef.current.scrollIntoView();
  };

  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [showAddedSuccessNotification, setShowAddedSuccessNotification] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddElementModal, setShowAddElementModal] = useState(false);
  const [compareModeStatus, setCompareModeStatus] = useState({ status: false });
  const [initialLoadingState, setInitialLoadingState] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  let completeButtonRef = useRef(null);
  let completeButtonProductSelectionRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productSelectionOpen, setProductSelectionOpen] = useState(false);

  function openAddElementModal() {
    setShowAddElementModal(true);
  }

  useEffect(async () => {
    const products = await fetchProducts();
    const sortedProducts = products.sort(function (a, b) {
      return b.sentiment.positive - a.sentiment.positive;
    });
    setOriginalProducts(sortedProducts);
    setProducts(sortedProducts);
    setProduct(sortedProducts[0]);
    setProductSelectionOpen(true);
    setInitialLoadingState(false);
  }, []);

  const changeProduct = (product) => {
    setProduct(product);
    setProductSelectionOpen(false);
  };

  //   const changeScreen = (value) => {
  //     return setCurrentScreen(value);
  //   };

  const sortByPriceHighToLow = () => {
    const sortedProducts = products.sort(function (a, b) {
      return (
        Math.min(...b.sources.filter((x) => x.price !== undefined).map((x) => Math.round(x.price))) -
        Math.min(...a.sources.filter((x) => x.price !== undefined).map((x) => Math.round(x.price)))
      );
    });
    setProducts(sortedProducts);
    setProduct(sortedProducts[0]);
  };

  const sortByPriceLowToHigh = () => {
    const sortedProducts = products.sort(function (a, b) {
      return (
        Math.min(...a.sources.filter((x) => x.price !== undefined).map((x) => Math.round(x.price))) -
        Math.min(...b.sources.filter((x) => x.price !== undefined).map((x) => Math.round(x.price)))
      );
    });
    setProducts(sortedProducts);
    setProduct(sortedProducts[0]);
  };

  const sortByVolumeHighToLow = () => {
    const sortedProducts = products.sort(function (a, b) {
      return b.metadata.volumeInLitres - a.metadata.volumeInLitres;
    });
    setProducts(sortedProducts);
    setProduct(sortedProducts[0]);
  };

  const sortByVolumeLowToHigh = () => {
    const sortedProducts = products.sort(function (a, b) {
      return a.metadata.volumeInLitres - b.metadata.volumeInLitres;
    });
    setProducts(sortedProducts);
    setProduct(sortedProducts[0]);
  };

  const sortBySentiment = () => {
    const sortedProducts = products.sort(function (a, b) {
      return b.sentiment.positive - a.sentiment.positive;
    });
    setProducts(sortedProducts);
    setProduct(sortedProducts[0]);
  };

  const searchProducts = (event) => {
    const searchValue = event.target.value;
    setSearchKeyword(searchValue);
    if (!searchValue || searchValue === "") {
      setProducts(originalProducts);
      return;
    }
    const fuse = new Fuse(originalProducts, { keys: ["productName", "brand", "pros"] });
    const result = fuse.search(searchValue);
    setProducts(result.map((r) => r.item));
  };

  const closeFilterModal = (event) => {
    console.log("changing state of filter modal" + showFilterModal);
    setShowFilterModal(false);
  };

  const closeAddElementModal = (event) => {
    console.log("changing state of filter modal" + showFilterModal);
    setShowAddElementModal(false);
  };

  const applyFilters = (filters) => {
    console.log("applying filters", filters);
    setSearchKeyword("");
    console.log("original" + originalProducts.length);
    let filteredProducts = originalProducts;
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        console.log("filtering for " + value + " and " + key);
        if (key === "waterbottle") {
          filteredProducts = filteredProducts.filter(
            (p) => p.metadata.waterbottle && p.metadata.waterbottle !== "N" && p.metadata.waterbottle !== 0
          );
        } else if (key === "hipBelt") {
          filteredProducts = filteredProducts.filter((p) => p.metadata.hipBelt === "Y");
        } else if (key === "waterResistant") {
          filteredProducts = filteredProducts.filter((p) => p.metadata.waterResistant === "Y");
        } else if (key === "volumeFilterAbove25") {
          filteredProducts = filteredProducts.filter((p) => p.metadata.volumeInLitres >= 20);
        } else if (key === "volumeFilterBelow25") {
          filteredProducts = filteredProducts.filter((p) => p.metadata.volumeInLitres < 20);
        } else if (key === "priceFilterBelow100") {
          filteredProducts = filteredProducts.filter((p) => p.metadata.price <= 100);
        } else if (key === "priceFilterBelow200") {
          filteredProducts = filteredProducts.filter((p) => p.metadata.price > 100 && p.metadata.price <= 200);
        } else if (key === "priceFilterAbove200") {
          filteredProducts = filteredProducts.filter((p) => p.metadata.price > 200);
        } else if (key === "useCase") {
          console.log("sorting for value " + value);
          filteredProducts = filteredProducts.filter((p) => {
            const keywordsWithRating = p.classesInfos.map((c) => {
              return { label: c.label, rating: c.rating };
            });
            const sorted = keywordsWithRating
              .sort((c1, c2) => c1.rating - c2.rating)
              .filter((r) => r.rating > 0.05)
              .map((c) => c.label);
            console.log("sorted", sorted);
            return sorted.includes(value);
          });
        }
      }
    }
    setProducts(filteredProducts);
    setShowFilterModal(false);
    setProductSelectionOpen(true);
  };

  function SortAndFilterHeader() {
    return (
      <div className="mt-2">
        {/* Search */}
        <div className="flex">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative focus-within:text-gray-600 flex-1 mr-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search"
              type="search"
              value={searchKeyword}
              onChange={searchProducts}
              name="search"
            />
          </div>
          <button
            onClick={(value) => {
              setProductSelectionOpen(false);
              setShowFilterModal(true);
            }}
            className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 items-center"
          >
            <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>
          <Menu as="div" className="relative ml-2 inline-flex">
            <Menu.Button className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center items-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <SortAscendingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              {/* <ChevronDownIcon className="-mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
            </Menu.Button>
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() => sortByPriceLowToHigh()}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Price (Low to High)
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() => sortByPriceHighToLow()}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Price (High to Low)
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() => sortBySentiment()}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      InternetScore (High to Low)
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() => sortByVolumeLowToHigh()}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Volume (Low to High)
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() => sortByVolumeHighToLow()}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Volume (High to Low)
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    );
  }

  function SideBar() {
    return (
      <>
        <div className="p-4">
          <div className="flex mb-4 items-center">
            <Logo />
          </div>
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-md font-medium text-gray-900">Products ({products.length})</h2>
            {!initialLoadingState && products !== originalProducts && (
              <span
                className="cursor-pointer ml-2 font-normal px-2.5 py-0.5 rounded-full text-xs bg-gray-800 text-white flex flex-row items-center w-max"
                onClick={() => setProducts(originalProducts)}
              >
                Reset Search <XIcon className="ml-1 h-3 w-3 text-white" aria-hidden="true" />
              </span>
            )}
          </div>
          {SortAndFilterHeader()}
          {compareModeStatus.status && compareModeStatus.product2 === undefined && (
            <div className="mt-4 flex items-center xl:hidden">
              <ArrowDownIcon className="animate-ping mr-2 h-8 w-8 text-gray-900" aria-hidden="true" />
              <p className="font-medium">Please select a product to compare with</p>
            </div>
          )}
        </div>
        <nav className="flex-1 min-h-0 overflow-y-auto pb-4" aria-label="Products">
          <ul className="relative z-0 divide-y divide-gray-200">
            <ProductList
              onHandle={changeProduct}
              products={products}
              product={product}
              loading={initialLoadingState}
              compareModeStatus={compareModeStatus}
              setCompareModeStatus={(p2) => setCompareModeStatus(p2)}
              setProductSelectionOpen={(x) => setProductSelectionOpen(x)}
              executeScroll={executeScroll}
            />
            {initialLoadingState ? null : <ListAd onClick={() => openAddElementModal()} />}
          </ul>
        </nav>
      </>
    );
  }

  const metaTitle = "baqpa by reviewr.ai";
  const metaDescription = "The ultimate resource for finding the best backpacks.";
  const metaImage = "https://www.baqpa.com/baqpa-og.png";

  function enableCompareMode(p1) {
    if (compareModeStatus["status"] === false) {
      setCompareModeStatus({ status: true, product1: p1 });
      setProductSelectionOpen(true);
    } else {
      setCompareModeStatus({ status: false });
    }
    console.log(compareModeStatus);
  }

  const currentScreen = compareModeStatus.product2 !== undefined ? "COMPARE" : "DASHBOARD";

  return (
    <>
      <Layout metaTitle={metaTitle} metaDescription={metaDescription} metaImage={metaImage}>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed inset-0 flex z-40 lg:hidden"
            initialFocus={completeButtonRef}
            open={sidebarOpen}
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col w-full bg-white focus:outline-none">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      ref={completeButtonRef}
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      <div>
                        <img className="inline-block h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{user.name}</p>
                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={productSelectionOpen} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed inset-0 flex z-40 xl:hidden"
            initialFocus={completeButtonProductSelectionRef}
            open={productSelectionOpen}
            onClose={setProductSelectionOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-lg w-full bg-white focus:outline-none">
                <div className="flex-1 h-0 pb-4 overflow-y-auto bg-gray-200">
                  <nav className="flex-1 min-h-0 overflow-y-auto" aria-label="Products">
                    {SideBar()}
                    <div className="absolute top-0 right-0 mr-1 mt-1">
                      <button
                        type="button"
                        ref={completeButtonProductSelectionRef}
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
                        onClick={() => {
                          setProductSelectionOpen(false);
                          setCompareModeStatus({ status: false });
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-6 w-6 text-black" aria-hidden="true" />
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>
        <div className="xl:hidden flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-2">
          <nav className="flex mr-4" aria-label="Breadcrumb" onClick={() => setProductSelectionOpen(true)}>
            <a href="#" className="flex items-center text-sm font-medium text-gray-900">
              <svg
                className="-ml-2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Products</span>
            </a>
          </nav>
          <div className="flex items-center">
            <Logo />
          </div>
        </div>
        <div className="flex-1 relative z-0 flex overflow-hidden flex-col xl:flex-row">
          <main
            className={
              "flex-1 relative z-0 focus:outline-none xl:order-last " +
              (compareModeStatus.status === true && compareModeStatus.product2 === undefined
                ? "overflow-y-hidden"
                : "overflow-y-auto")
            }
          >
            <div
              className="flex flex-col justify-center"
              style={
                compareModeStatus.status === true && compareModeStatus.product2 === undefined
                  ? {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      WebkitBackdropFilter: "blur(10px)",
                      backdropFilter: "blur(10px)",
                      zIndex: 100,
                    }
                  : { display: "none" }
              }
            >
              <div className="flex flex-col items-center justify-center text-lg text-gray-900 font-medium">
                <div className="items-center flex flex-row">
                  <ArrowLeftIcon className="animate-ping mr-4 h-8 w-8 text-gray-900" aria-hidden="true" />
                  Please select a product to compare with
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => {
                        setCompareModeStatus({ status: false });
                      }}
                      className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <XIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <article>
              <div ref={scrollRef} className="-mt-52 pt-52"></div>
              {currentScreen === "DASHBOARD" && (
                <ProductDetails
                  //   setScreen={setCurrentScreen}
                  product={product}
                  enableCompareMode={(p1) => enableCompareMode(p1)}
                  onShowNotification={(value) => setShowNotification(value)}
                />
              )}
              {currentScreen === "COMPARE" && (
                <CompareProducts
                  setCompareModeStatus={(x) => setCompareModeStatus(x)}
                  compareModeStatus={compareModeStatus}
                />
              )}
            </article>
          </main>
          {/* {currentScreen === "DASHBOARD" && ( */}
          <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 border-r border-gray-200 w-full max-w-md">
            {SideBar()}
          </aside>
          {/* )} */}
        </div>
        <Notification
          show={showNotification}
          header={"Successfully saved!"}
          text={"The flagged summary will be reviewed and regenerated."}
        />
        <Notification
          show={showAddedSuccessNotification}
          header={"Successfully added!"}
          text={"We're working on it and will get back to you."}
          reset={() => setShowAddedSuccessNotification(false)}
          autoClose={5000}
        />
        <FilterModal show={showFilterModal} onClose={closeFilterModal} onApplyFilter={applyFilters} />
        <AddElementModal
          show={showAddElementModal}
          onClose={closeAddElementModal}
          onApplyFilter={closeAddElementModal}
          onShowNotification={(value) => setShowAddedSuccessNotification(value)}
        />
      </Layout>
    </>
  );
}

async function fetchProducts() {
  const response = await fetch("/api/products", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
