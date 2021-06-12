// import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSpinner from "./common/LoadingSpinner";
import ColorMatch from "./common/ColorMatch";
import ColorMatchInv from "./common/ColorMatchInv";

export default function ProductList(props) {
  const [selectedProduct, setSelectedProduct] = useState(props.product);

  const changeProduct = (product) => {
    props.setCompareModeStatus({ status: false });
    props.onHandle(product);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    if (props.product !== selectedProduct) {
      setSelectedProduct(props.product);
    }
  }, [props.product]);

  return (
    <div>
      {props.loading && (
        <div className="divide-y flex justify-center py-32">
          <LoadingSpinner />
        </div>
      )}
      {props.products.length === 0 && !props.loading && (
        <div className="divide-y flex justify-center py-32">
          <p>No results found</p>
        </div>
      )}
      <div className="bg-white shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {props.products &&
            props.products.map((value, index) => {
              const lowestPrice = Math.min(
                ...value.sources.filter((x) => x.price !== undefined).map((x) => Math.round(x.price))
              );
              return (
                <li
                  key={value.kkId}
                  onClick={() => {
                    console.log(props.compareModeStatus);
                    props.executeScroll();
                    if (
                      props.compareModeStatus &&
                      props.compareModeStatus["status"] === true &&
                      props.compareModeStatus.product2 === undefined &&
                      props.compareModeStatus.product1 === value.kkId
                    ) {
                    } else if (
                      props.compareModeStatus &&
                      props.compareModeStatus["status"] === true &&
                      props.compareModeStatus.product2 === undefined
                    ) {
                      console.log("Compare products: " + value.kkId + " and " + props.compareModeStatus["product1"]);
                      props.setProductSelectionOpen(false);
                      props.setCompareModeStatus({ ...props.compareModeStatus, product2: value.kkId });
                      // window.open(
                      //   `/compare?product1=${props.compareModeStatus["product1"]}&product2=${value.kkId}`,
                      //   "_self"
                      // );
                    } else {
                      changeProduct(value);
                    }
                  }}
                >
                  <div
                    className={`p-4 block hover:bg-gray-50 cursor-pointer ${
                      [
                        selectedProduct.kkId,
                        props.compareModeStatus.product1,
                        props.compareModeStatus.product2,
                      ].includes(value.kkId)
                        ? "border-l-8 border-indigo-400"
                        : ""
                    }
                    `}
                  >
                    <div className="flex items-center">
                      <div className="w-20 mr-2 flex-shrink-0 ">
                        <img className="h-20 m-auto rounded" src={value.image} alt="" />
                      </div>
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex text-sm">
                            <p className="font-medium text-black truncate">{value.productName}</p>
                            <p className="ml-1 flex-shrink-0 font-normal text-gray-600">{value.brand}</p>
                          </div>
                          <div className="mt-2 flex flex-col">
                            <div className="flex items-center text-sm text-gray-800">
                              {value.reviewCount > 0 && (
                                <>
                                  <p>
                                    <span
                                      className={
                                        "rounded-full px-2 py-0.5 mr-1 font-medium " +
                                        ColorMatchInv(value.sentiment.positive)
                                      }
                                    >
                                      {value.sentiment && (Math.round(value.sentiment.positive * 100) / 10).toFixed(1)}
                                    </span>
                                    ({value.reviewCount} Reviews) <span className="font-medium">${lowestPrice}+</span>
                                  </p>
                                </>
                              )}
                            </div>
                            <div className="flex flex-wrap -m-1 mt-2">
                              {value.classesInfos.slice(0, 3).map((value, index) => {
                                return (
                                  <div
                                    className={`m-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ColorMatch(
                                      value.sentiment.positive
                                    )} `}
                                    key={index}
                                  >
                                    {(Math.round(value.sentiment.positive * 100) / 10).toFixed(1)} {value.label}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded text-sm mt-2 truncate flex flex-row">
                      <div className="flex mr-1 w-3 justify-center">
                        <span>+</span>
                      </div>
                      {value.pros && value.pros[0]}
                    </div>
                    <div className="rounded text-sm mt-1 truncate flex flex-row">
                      <div className="flex mr-1 w-3 justify-center">
                        <span>-</span>
                      </div>
                      {value.cons && value.cons[0]}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
