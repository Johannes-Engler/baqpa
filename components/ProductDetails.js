import { useEffect, useState, useRef } from "react";
import Review from "./Review";
import Metadata from "./Metadata";
import Youtube from "./Youtube";
import Insights from "./Insights";
import { DocumentAddIcon } from "@heroicons/react/outline";
import LoadingSpinner from "./common/LoadingSpinner";
import ReviewSummary from "./common/ReviewSummary";
import ColorMatch from "./common/ColorMatch";
import { InformationCircleIcon } from "@heroicons/react/outline";

function getRatingSummary(product) {
  if (product.averageRating) {
    return (
      <div style={{ marginTop: 10 }}>
        <dt className="text-sm font-medium text-gray-500">Average rating</dt>
        <dd className="text-sm text-gray-900 font-semibold">{Math.round(product.averageRating * 1000) / 1000}</dd>
      </div>
    );
  }
}

function ProductDetails(props) {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [keywordFilter, setKeywordFilter] = useState(null);
  const [youtubeReviews, setYoutubeReviews] = useState([]);

  useEffect(async () => {
    if (props.product.kkId) {
      const result = await fetchProductReviews(props.product.kkId);
      fetchYoutube(props.product.kkId).then((result) => setYoutubeReviews(result));
      const cleanedReviews = result.reviews.filter((r) => r.classes);
      if (cleanedReviews && cleanedReviews.length > 0) {
        setReviews(
          cleanedReviews.sort(function (a, b) {
            if (a.helpfulness && b.helpfulness) {
              return b.helpfulness.helpful - a.helpfulness.helpful;
            }
            return a.helpfulness ? -1 : b.helpfulness ? 1 : 0;
          })
        );
      } else {
        setReviews([]);
      }
      setProduct(result);
      setKeywords([...new Set(cleanedReviews.map((x) => x.classes).flat())]);
      setKeywordFilter(null);
    }
  }, [props.product]);

  const filterByKeyword = (keyword) => {
    setKeywordFilter(keyword === keywordFilter ? null : keyword);
  };

  const scrollRef = useRef(null);
  const executeScroll = () => {
    window.scrollTo(0, 0);
    scrollRef.current.scrollIntoView();
  };

  if (props.product && props.product.productName) {
    const sortedSources = props.product.sources
      .filter((x) => x.price !== undefined)
      .sort(function (a, b) {
        return a.price - b.price;
      });

    const domains = props.product.sources.map((x) => x.domain.replace("www.", ""));

    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-grow justify-between items-center">
          <h2 className="font-bold leading-7 text-gray-900 text-xl sm:truncate">
            {props.product.brand} {props.product.productName} - Review Analysis
          </h2>
          <button
            onClick={() => {
              props.enableCompareMode(props.product.kkId);
            }}
            className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <DocumentAddIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            Compare
          </button>
        </div>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="p-4 bg-white shadow rounded-lg overflow-hidden flex items-center justify-center">
            <img className="rounded-lg max-h-52" src={props.product.image} alt="" />
          </div>
          <div className="p-4 bg-white shadow rounded-lg overflow-hidden sm:col-span-2">
            <ReviewSummary domains={domains} product={props.product} />
            <div className="text-sm mb-3 flex flex-row items-center text-gray-500">
              <div className="flex mr-2">
                <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <span className="italic flex">
                InternetScore is reviewr.ai's smart scoring system that accounts for multiple factors in a review,
                including sentiment, helpfulness, and more. It is applied overall to products and also to reviews and
                keywords.
              </span>
            </div>
            <dt className="mt-1 text-sm font-medium text-gray-500 truncate">Price</dt>
            <dd className="text-sm text-gray-900 flex flex-wrap -ml-1.5">
              {sortedSources.map((source) => {
                return (
                  <a
                    key={source.domain}
                    href={source.link}
                    target="_blank"
                    className="m-1.5 underline whitespace-nowrap"
                  >
                    {source.domain}: ${Math.round(source.price)}
                  </a>
                );
              })}
            </dd>
          </div>
        </dl>
        {props.product && <Insights product={props.product} />}
        {props.product.metadata && <Metadata metadata={props.product.metadata} />}
        {youtubeReviews && props.product._id === youtubeReviews._id && youtubeReviews.youtubeReviews.length > 0 && (
          <Youtube youtubeReviews={youtubeReviews.youtubeReviews.slice(0, 3)} />
        )}
        <div ref={scrollRef}></div>
        <div className="bg-white shadow overflow-hidden rounded-lg mt-4">
          <div key={-1} className="border-t border-gray-200 p-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Reviews{" "}
              {props.product.kkId === product.kkId && (
                <>({reviews.filter((x) => (keywordFilter === null ? x : x.classes.includes(keywordFilter))).length})</>
              )}
            </h3>
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="pt-4">
                <dd className="text-sm text-gray-900 block">
                  {props.product.kkId === product.kkId ? (
                    props.product.classesInfos &&
                    props.product.classesInfos.length > 0 && (
                      <>
                        <h3 className="text-sm font-medium text-gray-500">Keyword Filter</h3>
                        <div className="-m-2 pt-4 flex flex-wrap">
                          {props.product.classesInfos.map((value, index) => {
                            return (
                              <div
                                key={index}
                                onClick={() => filterByKeyword(value.label)}
                                className={`m-2 cursor-pointer inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${ColorMatch(
                                  value.sentiment.positive
                                )} 
                                    ${value.label === keywordFilter ? " font-extrabold" : " font-medium"}`}
                              >
                                {(Math.round(value.sentiment.positive * 100) / 10).toFixed(1)} {value.label}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )
                  ) : (
                    <div className="py-16">
                      <LoadingSpinner />
                    </div>
                  )}
                </dd>
              </div>
            </dl>
          </div>
          {props.product.kkId === product.kkId &&
            reviews &&
            reviews.length > 0 &&
            reviews
              .filter((x) => (keywordFilter === null ? x : x.classes.includes(keywordFilter)))
              .map((value, index) => {
                return (
                  <div key={index} className="border-t border-gray-200 p-4">
                    <dl>
                      <div>
                        <dd className="text-sm text-gray-900 block">
                          <Review
                            key={index}
                            review={value}
                            keywordFilter={keywordFilter}
                            filterByKeyword={(x) => filterByKeyword(x)}
                            executeScroll={executeScroll}
                          />
                        </dd>
                      </div>
                    </dl>
                  </div>
                );
              })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto py-32">
        <div className="flex">
          <div className="flex-1 flex justify-center">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }
}

async function fetchProductReviews(id) {
  const response = await fetch("/api/reviews/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

async function fetchYoutube(id) {
  const response = await fetch("/api/youtube/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export default ProductDetails;
