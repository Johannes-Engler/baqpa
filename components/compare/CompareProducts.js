import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import styles from "../../styles/ProductDetail.module.css";
import SentimentBars from "../common/SentimentBars";
import LoadingSpinner from "../common/LoadingSpinner";
import CompareFeatureReview from "./CompareFeaturedReview";
import ColorMatch from "../common/ColorMatch";
import ColorMatchInv from "../common/ColorMatchInv";

async function fetchProducts() {
  const response = await fetch("/api/products", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

async function fetchProductReviews(id) {
  const response = await fetch("/api/reviews/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export default function CompareProducts(props) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [reviewsPerProduct, setReviewsPerProduct] = useState({});
  const [commonTopics, setCommonTopics] = useState({});

  useEffect(async () => {
    const products = await fetchProducts();
    const filteredProductsInter = products.filter(
      (x) => x.kkId === props.compareModeStatus.product1 || x.kkId === props.compareModeStatus.product2
    );
    setFilteredProducts(filteredProductsInter);
  }, []);

  useEffect(async () => {
    if (filteredProducts.length > 0) {
      const rev = {};
      let c = 0;
      for (const product of filteredProducts) {
        const result = await fetchProductReviews(product["kkId"]);

        rev[c] = result;
        c = c + 1;
      }
      setReviewsPerProduct(rev);
      const commonTopics = {};
      for (const p of filteredProducts) {
        for (const topic of [...new Set(rev[filteredProducts.indexOf(p)].reviews.map((x) => x.classes).flat())]) {
          commonTopics[topic] = commonTopics[topic] ? commonTopics[topic] + 1 : 1;
        }
      }
      setCommonTopics(commonTopics);
    }
  }, [filteredProducts]);

  function getImageElem(number) {
    return (
      <div className="flex items-center flex-grow justify-center">
        <img className={styles.thumbnail} src={filteredProducts[number]["image"]} alt="" />
      </div>
    );
  }

  function getProductNameElem(number) {
    return (
      <div className="flex-1 flex-grow text-lg leading-6 font-medium text-gray-900">
        {filteredProducts[number]["brand"]} {filteredProducts[number]["productName"]}
      </div>
    );
  }

  function getTextElem(display, obj) {
    return (
      <div className="flex-1 flex-grow mt-2">
        <div className="font-medium text-gray-500">{display}</div>
        <div className="mt-1 text-gray-900">{obj}</div>
      </div>
    );
  }

  function getKeywordHighlights(keyword, productNumber, bestReview) {
    const reviewType = bestReview ? "bestReview" : "worstReview";
    const mostImportant = reviewsPerProduct[productNumber]["classesInfos"].filter((cl) => cl["label"] === keyword)[0];
    return {
      review: mostImportant[reviewType]["review"],
      cite: mostImportant[reviewType]["cite"],
      sentiment: mostImportant[reviewType]["sentiment"],
    };
  }

  function getKeywordHighlightsOld(keyword, productNumber, reviewNumber = 0) {
    const matchingReviews = reviewsPerProduct[productNumber]["reviews"].filter((review) => {
      if (review.classes) {
        return review.classes.indexOf(keyword) > -1;
      } else {
        return false;
      }
    });
    const keywordReview = matchingReviews.sort((r1, r2) => {
      const filterClass1 = r1.classesInfo.filter((classes) => classes.label === keyword);
      const filterClass2 = r2.classesInfo.filter((classes) => classes.label === keyword);
      const maxProb1 = filterClass1.sort((c1, c2) => c2.score - c1.score)[0].score;
      const maxProb2 = filterClass2.sort((c1, c2) => c2.score - c1.score)[0].score;
      return maxProb2 - maxProb1;
    });
    if (keywordReview.length > 0) {
      const topReviewClassInfos = keywordReview[0]["classesInfo"].filter((classes) => classes.label === keyword);
      const topReview = topReviewClassInfos.sort((r1, r2) => r2.score - r1.score)[reviewNumber].text.trim();
      return { review: keywordReview[0], cite: topReview };
    }
    console.log("ERROR");
    return null;
  }

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  function getTopiComparison(commonTopics) {
    if (filteredProducts.length > 0) {
      const featuredReviews = [];
      for (const [key, value] of Object.entries(commonTopics)) {
        if (value > 1) {
          const reviewPositive1 = getKeywordHighlights(key, 0, true);
          const reviewPositive2 = getKeywordHighlights(key, 1, true);
          const reviewAlternative1 = getKeywordHighlights(key, 0, false);
          const reviewAlternative2 = getKeywordHighlights(key, 1, false);
          featuredReviews.push(
            <div className="pt-4" key={Math.random()}>
              <div className="text-sm font-semibold">{capitalize(key)}</div>
              <div className="grid sm:grid-cols-2 sm:gap-8">
                {reviewPositive1 ? (
                  <CompareFeatureReview
                    productName={filteredProducts[0]["productName"]}
                    review={reviewPositive1}
                    reviewAlternative={reviewAlternative1}
                  />
                ) : null}
                {reviewPositive2 ? (
                  <CompareFeatureReview
                    productName={filteredProducts[1]["productName"]}
                    review={reviewPositive2}
                    reviewAlternative={reviewAlternative2}
                  />
                ) : null}
              </div>
            </div>
          );
        }
      }
      return <div className="divide-y divide-gray-200">{featuredReviews}</div>;
    }

    return <div>Test</div>;
  }

  function getProList(pros, productName) {
    return (
      <div className="mt-1 mb-2 text-sm text-gray-900">
        <div className="text-xs font-medium text-gray-500 mb-2 sm:hidden">{productName}</div>
        <ul className="col-span-1 list-disc ml-5">
          {pros.map((value, index) => {
            return (
              <li className="leading-5" key={index}>
                {decodeHtml(value)}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (filteredProducts.length === 2) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-grow justify-between items-center">
          <h2 className="font-bold leading-7 text-gray-900 text-xl sm:truncate">
            {filteredProducts[0].brand} {filteredProducts[0].productName} vs {filteredProducts[1].brand}{" "}
            {filteredProducts[1].productName}
          </h2>
          <button
            onClick={() => {
              props.setCompareModeStatus({ status: false });
            }}
            className=" bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-right"
          >
            <ArrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            Back
          </button>
        </div>
        <div className="mt-4 bg-white shadow overflow-hidden rounded-lg">
          <div className="">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto">
                <div className="py-2 align-middle inline-block min-w-full">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="w-1/5 py-4 text-xs font-medium  uppercase tracking-wider">
                          Feature
                        </th>
                        <th scope="col" className="w-2/5 py-4 text-xs font-medium  uppercase tracking-wider">
                          {filteredProducts[0].brand} {filteredProducts[0].productName}
                        </th>
                        <th scope="col" className="w-2/5 py-4 text-xs font-medium  uppercase tracking-wider">
                          {filteredProducts[1].brand} {filteredProducts[1].productName}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-xs text-left sm:text-center sm:text-sm">
                      <tr>
                        <td className="p-2 text-gray-500 font-medium">Image</td>
                        <td className="p-2 ">{getImageElem(0)}</td>
                        <td className="p-2 ">{getImageElem(1)}</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-500 font-medium">InternetScore (Overall)</td>
                        {filteredProducts.map((product, key) => {
                          return (
                            <td className="p-2" key={key}>
                              <div
                                className={
                                  "rounded-full px-2 py-0.5 font-medium " + ColorMatchInv(product.sentiment.positive)
                                }
                              >
                                {product.sentiment && (Math.round(product.sentiment.positive * 100) / 10).toFixed(1)}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                      {Object.keys(commonTopics)
                        .filter((k) => commonTopics[k] === 2)
                        .map((x) => ({
                          topic: x,
                          product1: filteredProducts[0].classesInfos.find((y) => y.label === x).sentiment.positive,
                          product2: filteredProducts[1].classesInfos.find((y) => y.label === x).sentiment.positive,
                        }))
                        .map((value, key) => {
                          return (
                            <tr key={key}>
                              <td className="p-2 text-gray-500 font-medium">{capitalize(value.topic)}</td>
                              <td className="p-2">
                                <div
                                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${ColorMatch(
                                    value.product1
                                  )} `}
                                >
                                  {(Math.round(value.product1 * 100) / 10).toFixed(1)}
                                </div>
                              </td>
                              <td className="p-2">
                                <div
                                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${ColorMatch(
                                    value.product2
                                  )} `}
                                >
                                  {(Math.round(value.product2 * 100) / 10).toFixed(1)}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      <tr>
                        <td className="p-2 text-gray-500 font-medium">Reviews</td>
                        {filteredProducts.map((product, key) => {
                          return (
                            <td className="p-2" key={key}>
                              {product.reviewCount}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-500 font-medium">Price</td>
                        {filteredProducts.map((product, key) => {
                          const sortedSources = product.sources
                            .filter((x) => x.price !== undefined)
                            .sort(function (a, b) {
                              return a.price - b.price;
                            });
                          return (
                            <td className="p-2 align-top" key={key}>
                              <div className="flex sm:hidden flex-wrap sm:justify-center">
                                <a
                                  key={sortedSources[0].domain}
                                  href={sortedSources[0].link}
                                  target="_blank"
                                  className="underline whitespace-nowrap"
                                >
                                  ${Math.round(sortedSources[0].price)}
                                </a>
                              </div>
                              <div className="hidden sm:block">
                                {sortedSources.map((source) => {
                                  return (
                                    <p>
                                      <a
                                        key={source.domain}
                                        href={source.link}
                                        target="_blank"
                                        className="m-1.5 underline whitespace-nowrap"
                                      >
                                        {source.domain}: ${Math.round(source.price)}
                                      </a>
                                    </p>
                                  );
                                })}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-500 font-medium">Pros</td>
                        {filteredProducts.map((product, key) => {
                          return (
                            <td className="p-2 align-top" key={key}>
                              {product.pros.map((value, index) => {
                                return (
                                  <p className="leading-5 text-left" key={index}>
                                    - {decodeHtml(value)}
                                  </p>
                                );
                              })}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-500 font-medium">Cons</td>
                        {filteredProducts.map((product, key) => {
                          return (
                            <td className="p-2 align-top" key={key}>
                              {product.cons.map((value, index) => {
                                return (
                                  <p className="leading-5 text-left" key={index}>
                                    - {decodeHtml(value)}
                                  </p>
                                );
                              })}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-500 font-medium">Volume (L)</td>
                        {filteredProducts.map((product, key) => {
                          return (
                            <td className="p-2" key={key}>
                              {product.metadata.volumeInLitres}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-500 font-medium">Size (CM)</td>
                        {filteredProducts.map((product, key) => {
                          return (
                            <td className="p-2" key={key}>
                              {product.metadata.heightInCm} x {product.metadata.widthInCm} x{" "}
                              {product.metadata.depthInCm}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-500 font-medium">Weight (KG)</td>
                        {filteredProducts.map((product, key) => {
                          return (
                            <td className="p-2" key={key}>
                              {product.metadata.weightInKg}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-500 font-medium">Compartments</td>
                        {filteredProducts.map((product, key) => {
                          return (
                            <td className="p-2" key={key}>
                              {product.metadata.compartments}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-500 font-medium">Water Bottle</td>
                        {filteredProducts.map((product, key) => {
                          return (
                            <td className="p-2" key={key}>
                              {product.metadata.waterbottle}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-500 font-medium">Water-resistant</td>
                        {filteredProducts.map((product, key) => {
                          return (
                            <td className="p-2" key={key}>
                              {product.metadata.waterResistant}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-500 font-medium">Organizer</td>
                        {filteredProducts.map((product, key) => {
                          return (
                            <td className="p-2" key={key}>
                              {product.metadata.organizer}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-500 font-medium">Hip Belt</td>
                        {filteredProducts.map((product, key) => {
                          return (
                            <td className="p-2" key={key}>
                              {product.metadata.hipBelt}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-white overflow-hidden shadow rounded-lg p-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Quotes from buyers</h3>
          <div className="flex flex-grow mb-1 ">
            {Object.entries(reviewsPerProduct).length >= 2 ? (
              commonTopics !== {} && getTopiComparison(commonTopics)
            ) : (
              <div className="my-5 mx-20 flex-grow">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="my-20 mx-20 flex-grow">
        <LoadingSpinner />
      </div>
    );
  }
}
