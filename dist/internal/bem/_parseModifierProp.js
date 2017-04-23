import addClass from "../../addClass";
import removeClass from "../../removeClass";
import _removeClassesBeginningWithButNot from "../dom/_removeClassesBeginningWithButNot";
import formatBemClass from "../../formatBemClass";

function _parseModifierProp(modifierObj, domNode, radical, delimiters) {
	return function(modifier) {
		let blockDelimiter = delimiters[0],
			block = radical.split(blockDelimiter)[0],
			element = radical.split(blockDelimiter)[1];

		let value = modifierObj[modifier],
			removedBemClass = formatBemClass(block, element, modifier, true, delimiters),
			addedBemClass = formatBemClass(block, element, modifier, value, delimiters);

		if (value === false) {
			removeClass(domNode, removedBemClass);
		}
		else if (value !== true) {
			_removeClassesBeginningWithButNot(domNode, removedBemClass);
		}

		if (value !== false) {
			addClass(domNode, addedBemClass);
		}
	};
}

export default _parseModifierProp;