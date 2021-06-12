import ColorMatchInv from "./ColorMatchInv";

export default function ReviewSummary({ domains, product }) {
  return (
    <>
      <dt className="text-sm font-medium text-gray-500 truncate">Review Summary</dt>
      <dd className="mt-1 mb-3 text-sm text-gray-900">
        <span className={"rounded-full px-2 py-0.5 mr-1 font-medium " + ColorMatchInv(product.sentiment.positive)}>
          {product.sentiment && (Math.round(product.sentiment.positive * 100) / 10).toFixed(1)} InternetScore
        </span>
        based on <span className="font-bold">{product.reviewCount} reviews </span> from{" "}
        {domains.length === 1 && <>{domains[0]}</>}
        {domains.length === 2 && domains.join(" and ")}
        {product.sources.length === 3 && (
          <>
            {domains[0]}, {domains[1]}, and {domains[2]}
          </>
        )}
        {domains.length > 3 && domains.slice(0, 3).join(", ")}
        {domains.length > 3 && ", and more"}. {product.pros[0]}. {product.cons[0]}.
      </dd>
    </>
  );
}
