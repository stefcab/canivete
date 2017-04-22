import _formatBemRadical from "./internal/bem/_formatBemRadical";
import _formatBemModifier from "./internal/bem/_formatBemModifier";

/**
 * Formats a CSS class according to the
 * [BEM methodology](https://en.bem.info/methodology/). The
 * function receives a block, an element, a modifier, a value
 * for the modifier and an array of BEM delimiters, e.g. “__”,
 * “--” and “-”.
 *
 * Note that if the modifier value is neither `true` or a
 * string, it will not be added to the class.
 * 
 * @category BEM
 * @param  {string} block The BEM block.
 * @param  {string} [element] The BEM element.
 * @param  {string} [modifier] The BEM modifier.
 * @param  {(string|boolean)} [value] The BEM modifier value.
 * @param  {Array.<string>} delimiters The BEM delimiters, e.g. “__”, “--” and “-”.
 * @return {string} The BEM CSS class.
 *
 * @example
 * let delimiters = ["__", "--", "-"];
 * 
 * formatBemClass("menu", delimiters);
 * // => "menu"
 * 
 * formatBemClass("menu", "item", delimiters);
 * // => "menu__item"
 * 
 * formatBemClass("menu", "item", "active", delimiters);
 * // => "menu__item"
 * 
 * formatBemClass("menu", "item", "active", false, delimiters);
 * // => "menu__item"
 * 
 * formatBemClass("menu", "item", "active", true, delimiters);
 * // => "menu__item--active"
 * 
 * formatBemClass("menu", "item", "level", 42, delimiters);
 * // => "menu__item--level-42"
 * 
 * formatBemClass("menu", "item", "level", "42", delimiters);
 * // => "menu__item--level-42"
 *
 * @example
 * let delimiters = ["__", "--", "-"];
 * 
 * formatBemClass("button", null, "active", delimiters);
 * // => "button"
 * 
 * formatBemClass("button", null, "active", false, delimiters);
 * // => "button"
 * 
 * formatBemClass("button", null, "active", true, delimiters);
 * // => "button--active"
 * 
 * formatBemClass("button", null, "level", 42, delimiters);
 * // => "button--level-42"
 * 
 * formatBemClass("button", null, "level", "42", delimiters);
 * // => "button--level-42"
 */
function formatBemClass(...args) {
	let block = args[0];
	let delimiters = args[args.length - 1];
	let element, modifier, value;

	if (args.length > 2) {
		element = args[1];
	}

	if (args.length > 3) {
		modifier = args[2];
	}

	if (args.length > 4) {
		value = args[3];
	}

	let radical = _formatBemRadical(block, element, delimiters);
	let classModifier = _formatBemModifier(modifier, value, delimiters);
	return `${radical}${classModifier}`;
}

export default formatBemClass;
