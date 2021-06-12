export default function ColorMatchInv(score) {
  if (score > 0.7) {
    return "bg-green-600 text-white";
  } else if (score > 0.4) {
    return "bg-blue-600 text-white";
  } else {
    return "bg-red-600 text-white";
  }
}
