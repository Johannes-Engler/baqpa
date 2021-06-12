import SentimentBars from "../common/SentimentBars";
import { useEffect, useState } from "react";
import styles from "../../styles/ProductDetail.module.css";

function CompareCard(props) {
  const [reviews, setReviews] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });

  useEffect(async () => {
    if (props.product.kkId) {
      const result = await fetchProductReviews(props.product.kkId);
      setReviews(result.reviews);
    }
  }, [props.product]);

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  function getKeywordHighlights(keywords) {
    if (reviews.length === 0) {
      return;
    }
    const keywordReviews = {};
    for (const keyword of keywords) {
      const matchingReviews = reviews.filter((review) => review.classes.indexOf(keyword) > 0);
      keywordReviews[keyword] = matchingReviews.sort((r1, r2) => {
        const filterClass1 = r1.classesInfo.filter((classes) => classes.label === keyword);
        const filterClass2 = r2.classesInfo.filter((classes) => classes.label === keyword);
        const maxProb1 = filterClass1.sort((c1, c2) => c1.score - c2.score)[0].score;
        const maxProb2 = filterClass2.sort((c1, c2) => c1.score - c2.score)[0].score;
        return maxProb2 - maxProb1;
      });
    }
    const keywordHighlights = [];
    for (const [key, value] of Object.entries(keywordReviews)) {
      if (value.length > 0) {
        const topReviewClassInfos = value[0].classesInfo.filter((classes) => classes.label === key);
        const topReview = topReviewClassInfos.sort((r1, r2) => r1.score - r2.score)[0].text.trim();

        keywordHighlights.push(
          <div className="flex flex-col justify-center w-full my-5">
            <dt className="text-xs font-medium text-gray-500">{capitalize(key)}</dt>
            <div className="flex items-center justify-center flex-grow mt-1 text-sm text-gray-900 italic">
              "{topReview}"
            </div>
            <br />
            <div className="flex justify-around">
              {value[0].author ? value[0].author : "Expert"} - {value[0].source}
            </div>
          </div>
        );
      }
    }
    return keywordHighlights;
  }

  function getSize() {
    if (width <= 640) {
      return {
        minWidth: width * 0.8,
      };
    }
  }

  return (
    <div>
      <div className="font-medium text-sm text-gray-900">
        {props.product["productName"]} - {props.product["brand"]}
      </div>
      <div className="mt-5">
        <div className="flex flex-wrap justify-between gap-5 sm:p-5">
          {props.product.image && (
            <div className="flex flex-col justify-center">
              <div className="flex items-center flex-grow">
                <img className={styles.thumbnail} src={props.product.image} alt="" />
              </div>
            </div>
          )}

          {props.product.sentiment && (
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium text-gray-500">Sentiment</div>
              <div className="flex items-center flex-grow m-auto mt-1 text-sm text-gray-900">
                <SentimentBars sentiment={props.product.sentiment} />
              </div>
            </div>
          )}

          {props.product.reviewCount && (
            <div className="flex flex-col justify-center">
              <dt className="text-xs font-medium text-gray-500">Reviews</dt>
              <div className="flex items-center justify-center flex-grow mt-1 text-sm font-medium text-gray-900">
                {props.product.reviewCount}
              </div>
            </div>
          )}
          {props.product.metadata && (
            <div className="flex flex-col justify-center">
              <dt className="text-xs font-medium text-gray-500">Price</dt>
              <div className="flex items-center justify-center flex-grow mt-1 text-sm font-medium text-gray-900">
                ${props.product.metadata.price}
              </div>
            </div>
          )}

          {props.product.metadata && (
            <div className="flex flex-col justify-center">
              <dt className="text-xs font-medium text-gray-500">Size</dt>
              <div className="flex items-center justify-center flex-grow mt-1 text-sm font-medium text-gray-900">
                {props.product.metadata.heightInCm}cm
                <br />x {props.product.metadata.widthInCm}cm
                <br />x {props.product.metadata.depthInCm}cm
              </div>
            </div>
          )}
          {props.product.metadata && (
            <div className="flex flex-col justify-center">
              <dt className="text-xs font-medium text-gray-500">Weight</dt>
              <div className="flex items-center justify-center flex-grow mt-1 text-sm font-medium text-gray-900">
                {props.product.metadata.weightInKg}kg
              </div>
            </div>
          )}
          {props.product.metadata && (
            <div className="flex flex-col justify-center">
              <dt className="text-xs font-medium text-gray-500">Volume</dt>
              <div className="flex items-center justify-center flex-grow mt-1 text-sm font-medium text-gray-900">
                {props.product.metadata.volumeInLitres}l
              </div>
            </div>
          )}
          {props.product.metadata && (
            <div className="flex flex-col justify-center">
              <dt className="text-xs font-medium text-gray-500">Water resistant</dt>
              <div className="flex items-center justify-center flex-grow mt-1 text-sm font-medium text-gray-900">
                {props.product.metadata.waterResistant === "N" ? "No" : "Yes"}
              </div>
            </div>
          )}
          {props.product.metadata && (
            <div className="flex flex-col justify-center">
              <dt className="text-xs font-medium text-gray-500">Compartments</dt>
              <div className="flex items-center justify-center flex-grow mt-1 text-sm font-medium text-gray-900">
                {props.product.metadata.compartments}
              </div>
            </div>
          )}

          {props.product.pros && (
            <>
              <div className="col-span-1">
                <dd className="mt-1 text-sm text-gray-900">
                  <p className="text-xs font-medium text-gray-500">Pros</p>
                  <ul className="col-span-2 list-disc ml-5">
                    {props.product.pros.map((value, index) => {
                      return (
                        <li className="leading-7" key={index}>
                          {decodeHtml(value)}
                        </li>
                      );
                    })}
                  </ul>
                </dd>
              </div>
              <div className="col-span-1">
                <dd className="mt-1 text-sm text-gray-900">
                  <p className="text-xs font-medium text-gray-500">Cons</p>
                  <ul className="col-span-2 list-disc ml-5">
                    {props.product.cons.map((value, index) => {
                      return (
                        <li className="leading-7" key={index}>
                          {decodeHtml(value)}
                        </li>
                      );
                    })}
                  </ul>
                </dd>
              </div>
            </>
          )}

          {props.product.keywords && reviews && (
            <div>
              <div className="my-8 flex justify-center font-medium text-sm text-gray-900">Topics people talk about</div>
              {getKeywordHighlights(props.product.keywords)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
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

export default CompareCard;
