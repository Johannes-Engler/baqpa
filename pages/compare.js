import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import Logo from "../components/common/Logo";
import LoadingSpinner from "../components/common/LoadingSpinner";
import CompareProducts from "../components/compare/CompareProducts";
import { ArrowLeftIcon } from "@heroicons/react/outline";

export default function ComparePage() {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const router = useRouter();

  useEffect(async () => {
    if (router.query["product1"] && router.query["product1"]) {
      console.log("Fetching products");

      const products = await fetchProducts();
      const filteredProductsInter = products.filter(
        (product) => product["kkId"] == router.query["product1"] || product["kkId"] == router.query["product2"]
      );
      setFilteredProducts(filteredProductsInter);
    }
  }, [router]);

  const metaTitle = "baqpa by reviewr.ai";
  const metaDescription = "The ultimate resource for finding the best backpacks.";
  const metaImage = "https://www.baqpa.com/baqpa-og.png";

  return (
    <Layout metaTitle={metaTitle} metaDescription={metaDescription} metaImage={metaImage}>
      {filteredProducts.length > 0 ? (
        <>
          <div className="p-4 grid grid-cols-2 gap-4 md:grid-cols-3 items-center">
            <Logo />
            <div className="md:order-last">
              <button
                onClick={() => {
                  window.open("/", "_self");
                }}
                className=" bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-right"
              >
                <ArrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                Back
              </button>
            </div>
            <h2 className="col-span-2 md:col-span-1 text-xl font-bold leading-7 text-center text-gray-900 truncate">
              {filteredProducts[0].brand} {filteredProducts[0].productName} vs {filteredProducts[1].brand}{" "}
              {filteredProducts[1].productName}
            </h2>
          </div>
          <div className="bg-white shadow overflow-hidden rounded-lg mx-4 p-4">{filteredProducts.length}</div>
        </>
      ) : (
        <div className="my-20 mx-20 flex-grow">
          <LoadingSpinner />
        </div>
      )}
      {/* <CompareProducts /> */}
    </Layout>
  );
}
