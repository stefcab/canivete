import isElement from "lodash-es/isElement";

/**
 * Returns all parents of a DOM element,
 * from the closest to the most distant, recursively.
 * 
 * @category DOM
 * @param  {HTMLElement} domEl The DOM element.
 * @return {Array.<HTMLElement>} The DOM element parents.
 *
 * @example
 * let domChild = document.createElement("div"),
 * 	domParent = document.createElement("div"),
 * 	domGrandparent.appendChild(domParent);
 * 
 * domParent.appendChild(domChild);
 * domGrandparent.appendChild(domParent);
 * document.body.appendChild(domGrandparent);
 * 
 * parents(domChild);
 * // => [
 * 	domParent,
 * 	domGrandparent,
 * 	document.body,
 * 	document.querySelector("html"),
 * 	document
 * ]
 */
function parents(domEl, memo = []) {
	if (!isElement(domEl) && memo.length === 0) {
		throw new Error("An HTMLElement is expected as parameter.");
	}

	let parentNode = domEl.parentNode;
	return (!parentNode) ? memo : parents(parentNode, memo.concat([parentNode]));
}

export default parents;
