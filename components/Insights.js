import InformationCircleIcon from "@heroicons/react/outline/InformationCircleIcon";
import ColorMatch from "./common/ColorMatch";
import ColorMatchInv from "./common/ColorMatchInv";
import SentimentBars from "./common/SentimentBars";

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default function Insights(props) {
  const addFlagToItem = async () => {
    try {
      await axios.put(`/api/products/flag/${props.product.kkId}`, { flagged: true });
      props.onShowNotification(true);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="bg-white mt-4 shadow overflow-hidden rounded-lg">
      <div className="p-4 mx-auto">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="col-span-1 sm:col-span-2 flex flex-row justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mr-2">Review Insights</h3>
            <div className="">
              <button
                onClick={addFlagToItem}
                className="items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
              >
                Flag as unhelpful
              </button>
            </div>
            {/* <div className="flex flex-row mt-1 sm:mt-0">
              <span
                className={
                  "rounded-full px-2 py-0.5 font-medium text-sm whitespace-nowrap mr-2 " +
                  ColorMatchInv(props.product.sentiment.positive)
                }
              >
                {props.product.sentiment && (Math.round(props.product.sentiment.positive * 100) / 10).toFixed(1)}{" "}
                InternetScore
              </span>
              <span className="whitespace-nowrap">({props.product.reviewCount} Reviews)</span>
            </div> */}
          </div>
          {props.product.pros && (
            <>
              <div className="col-span-1">
                <dd className="text-sm text-gray-900">
                  <p className="text-sm font-medium text-gray-500">
                    Pros <span className="font-normal">(AI-Written)</span>
                  </p>
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
                <dd className="text-sm text-gray-900">
                  <p className="text-sm font-medium text-gray-500">
                    Cons <span className="font-normal">(AI-Written)</span>
                  </p>
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
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Keywords</dt>
            <dd className="mt-1 -m-2 flex flex-wrap">
              {props.product.classesInfos.map((value, index) => {
                return (
                  <div
                    className={`m-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ColorMatch(
                      value.sentiment.positive
                    )} `}
                    key={index}
                  >
                    {(Math.round(value.sentiment.positive * 100) / 10).toFixed(1)} {value.label}
                  </div>
                );
              })}
            </dd>
          </div>
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Sources <span className="font-normal">({props.product.reviewCount} Reviews)</span>
            </dt>
            <dd className="mt-1 -m-2 flex flex-wrap">
              {props.product.sources.slice(0, 5).map((value, index) => {
                return (
                  <div
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 m-2"
                  >
                    {value.domain.replace("www.", "")}
                  </div>
                );
              })}
              {props.product.sources.length > 5 && (
                <div
                  key={props.product.sources.length}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 m-2"
                >
                  & {props.product.sources.length - 5} more
                </div>
              )}
            </dd>
          </div>
          {!props.product?.pros && (
            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-blue-700">Too few reviews to generate a meaningful summary.</p>
                </div>
              </div>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
