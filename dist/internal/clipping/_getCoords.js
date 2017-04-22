import isElement from "../../../node_modules/lodash-es/isElement";

const _getCoords = (maskDef, allowElementOnly) => {
	let maskCoords;

	if (isElement(maskDef)) {
		maskCoords = maskDef.getBoundingClientRect();
	}
	else if (maskDef != null && !allowElementOnly) {
		maskCoords = maskDef;
	}
	else if (!allowElementOnly) {
		maskCoords = {
			top: 0,
			bottom: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
			left: 0,
			right: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
		};
	}

	if (!Number.isFinite(maskCoords.top) || !Number.isFinite(maskCoords.bottom) || !Number.isFinite(maskCoords.left) || !Number.isFinite(maskCoords.right)) {
		if (allowElementOnly) {
			throw new Error(`An HTMLElement is expected as parameter.`);
		}
		else {
			throw new Error(`If passed, the optional parameter can be either an HTMLElement or an Object containing numeric values for "top", "bottom", "left" and "right" properties.`);
		}
	}

	return maskCoords;
};

export default _getCoords;