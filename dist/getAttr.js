/**
 * Gets a DOM element attribute using native
 * [`Element.getAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute),
 * except that the presence of an attribute without
 * a value will return `true` instead of an empty string,
 * and the absence will return `false`.
 *
 * @category DOM
 * 
 * @param  {HTMLElement} domEl [description] The DOM element.
 * @param  {string} attrName [description] The attribute name.
 * @return {(string|Boolean)} [description] The attribute value.
 *
 * @example
 *
 * let videoEl = document.createElement("video");
 * videoEl.src = "video.mp4";
 * videoEl.controls = true;
 *
 * getAttr(videoEl, "src");
 * // => "video.mp4"
 * 
 * getAttr(videoEl, "controls");
 * // => true
 * 
 * getAttr(videoEl, "muted");
 * // => false
 */
function getAttr(domEl, attrName) {
	let result = domEl.getAttribute(attrName);
	result = (result === "") ? true : (result == null) ? false : result;
	return result;
}

export default getAttr;
