import _getCoords from "./internal/clipping/_getCoords";
import _getVerticalAxisInfo from "./internal/clipping/_getVerticalAxisInfo";
import _getHorizontalAxisInfo from "./internal/clipping/_getHorizontalAxisInfo";

/**
 * Given a DOM element, returns an object with position
 * and clipping information relative to a mask, defined
 * by the second parameter.
 *
 * The mask can be either a DOM element or an object
 * containing numeric values for "top", "bottom", "left"
 * and "right" properties, like a
 * [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect).
 *
 * If the second parameter is not passed, the mask will
 * be the viewport itself.
 *
 * The returned object has the following properties:
 *
 * | Property | Type | Child relation with the mask |
 * |---|---|---|
 * | `isOffTop` | Boolean | Above and off the mask. |
 * | `isOffBottom` | Boolean | Below and off the mask. |
 * | `isOffLeft` | Boolean | On the left and off the mask. |
 * | `isOffRight` | Boolean | On the right and off the mask. |
 * | `isOff` | Boolean | Off the mask. |
 * | `isClippedTop` | Boolean | Above and intersecting with the mask. |
 * | `isClippedBottom` | Boolean | Below and intersecting with the mask. |
 * | `isClippedLeft` | Boolean | On the left and intersecting with the mask. |
 * | `isClippedRight` | Boolean | On the right and intersecting with the mask. |
 * | `isClipped` | Boolean | Child intersects with the mask. |
 * | `isFullyVisible` | Boolean | Fully visible inside the mask. |
 * | `isPartiallyVisible` | Boolean | Alias for `isClipped`. |
 * | `isInvisible` | Boolean | Alias for `isOff`. |
 * | `isAsVisibleAsPossible` | Boolean | As visible as possible (child bigger than the mask). |
 * | `isNotAsVisibleAsPossible` | Boolean | Not as visible as possible (child bigger than the mask). |
 *
 * @category DOM
 * @param  {HTMLElement} domEl The DOM element.
 * @param  {HTMLElement|Object} [maskDef] The mask definition.
 * @return {Object} Position and clipping information relative to the mask.
 */
function clippingInfo(domEl, maskDef) {
	let domCoords  = _getCoords(domEl, true);
	let maskCoords = _getCoords(maskDef, false),
		vertAxis   = _getVerticalAxisInfo(domCoords, maskCoords),
		horzAxis   = _getHorizontalAxisInfo(domCoords, maskCoords);

	let isOffTop                 = vertAxis.isOffBefore,
		isOffBottom              = vertAxis.isOffAfter,
		isOffLeft                = horzAxis.isOffBefore,
		isOffRight               = horzAxis.isOffAfter,
		isOff                    = isOffTop || isOffBottom || isOffLeft || isOffRight,
		isClippedTop             = !isOff && (vertAxis.isClippedBefore),
		isClippedBottom          = !isOff && (vertAxis.isClippedAfter),
		isClippedLeft            = !isOff && (horzAxis.isClippedBefore),
		isClippedRight           = !isOff && (horzAxis.isClippedAfter),
		isClipped                = isClippedTop || isClippedBottom || isClippedLeft || isClippedRight,
		isFullyVisible           = vertAxis.isContained && horzAxis.isContained,
		isInvisible              = isOff,
		isAsVisibleAsPossible    = isFullyVisible || (vertAxis.isWrapper && horzAxis.isWrapper) || (vertAxis.isContained && horzAxis.isWrapper) || (vertAxis.isWrapper && horzAxis.isContained),
		isNotAsVisibleAsPossible = isInvisible || !isAsVisibleAsPossible,
		isPartiallyVisible       = isClipped;

	return {
		isOffTop,
		isOffBottom,
		isOffLeft,
		isOffRight,
		isOff,
		isClippedTop,
		isClippedBottom,
		isClippedLeft,
		isClippedRight,
		isClipped,
		isFullyVisible,
		isPartiallyVisible,
		isInvisible,
		isAsVisibleAsPossible,
		isNotAsVisibleAsPossible
	};
}

export default clippingInfo;
