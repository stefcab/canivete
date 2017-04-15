import _sliceOnOccurrence from "./internal/string/_sliceOnOccurrence";

/**
 * Given two strings, returns a new one formed
 * by the characters **before the last
 * occurrence** of the second string in the first.
 *
 * Returns an empty string if nothing is found.
 *
 * Returns `undefined` if the parameters passed to
 * the function are not two strings.
 *
 * @category String
 * @param  {string} str Base string
 * @param  {string} delimiter String to be found
 * @return {string}
 * @public
 *
 * @example
 * beforeLast("parallelepiped", "le");
 *
 * // => "paralle"
 */
const beforeLast = (str, delimiter) => _sliceOnOccurrence("before", "last", str, delimiter);

export default beforeLast;
