export default function ColorMatch(score) {
  if (score > 0.7) {
    return "bg-green-100 text-green-800";
  } else if (score > 0.4) {
    return "bg-blue-100 text-blue-800";
  } else {
    return "bg-red-100 text-red-800";
  }
}
