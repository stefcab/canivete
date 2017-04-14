const camelCase = require("lodash/camelCase");
const exec = require("child_process").exec;
const flow = require("lodash/flow");
const groupBy = require("lodash/groupBy");
const read = require("fs").readFile;





// basic functions, like creating or removing folders or loading JSON files.

function asPromise(func, target, options, errMsg = "", processOut = arg => arg, processErr = processOut) {
	return new Promise((resolve, reject) => {
		func(target, options, (err, stdout, stderr) => {
			if (err != null) {
				console.log(errMsg);
				reject(processErr(stderr));
			}
			else {
				resolve(processOut(stdout));
			}
		});
	});
}

const readJsonAsPromise = (target, options) => asPromise(read, target, options, "Falha ao carregar o JSON.", JSON.parse);

const execAsPromise = (target, options) => asPromise(exec, target, options, "Falha ao executar comando no terminal.");

const createDir = path => () => execAsPromise(`mkdir -p ${path}`);

const removeDir = path => () => execAsPromise(`rm -r ${path}`);

const inAlphabeticalOrder = (strA, strB) => (strA > strB) ? +1 : (strA < strB) ? -1 : 0;

const removeNewslines = str => str.replace(/(?:\r\n|\r|\n)/g, " ");





// functions for generating, parsing and exporting jsdoc as a single markdown file.

const jsdocAsJson = (path, data, template = "./node_modules/jsdoc-json") => () => {
	return execAsPromise(`jsdoc ${path} -d ${data} -t ${template}`);
};

const readJsonFile = data => () => readJsonAsPromise(data);

const parseJsonFile = json => json.docs ? json.docs.filter(doc => doc.name != undefined) : [];

const exportDocsUsingTemplate = (path, template) => docs => {
	let data = JSON.stringify(processDocs(docs));
	console.log(data);
	return execAsPromise(`ejs-cli ${template} > ${path}/index.md -O '${data}'`);
};

const formatDocs = docs => docs.map(formatDoc);

const formatDoc = doc => {
	doc.description = formatDescription(doc.description);
	doc.href = formatHref(doc.name);
	doc.signature = formatSignature(doc.name, doc.params);
	return doc;
};

const formatDescription = description => removeNewslines(description);

const formatHref = name => camelCase(name);

const formatSignature = (name, params) => {
	params = formatSignatureParams(params);
	return `${name}(${params})`;
};

const formatSignatureParams = params => {
	return params.map(formatSignatureParam).join(", ");
};

const formatSignatureParam = param => {
	let preParam = param.optional ? "[" : "";
	let postParam = param.optional ? "]" : "";
	let defaultValue = param.defaultvalue != null ? ` = ${param.defaultvalue}` : "";
	return `${preParam}${param.name}${defaultValue}${postParam}`;
};

const groupDocsByCategoryName = docs => groupBy(docs, byCategoryName);

const byCategoryName = doc => doc.tags.filter(tag => tag.title === "category")[0].value;

const prepareDocs = groupedDocs => {
	let categoryNames = Object.keys(groupedDocs);

	return categoryNames
		.sort(inAlphabeticalOrder)
		.map(prepareDoc(groupedDocs));
};

const prepareDoc = groupedDocs => categoryName => {
	let categoryDoc = groupedDocs[categoryName];
	return {
		name: categoryName,
		href: formatHref(categoryName),
		items: categoryDoc
	};
};

const wrapDocs = preparedDocs => {
	return {
		docs: preparedDocs
	};
};

const processDocs = flow([
	formatDocs,
	groupDocsByCategoryName,
	prepareDocs,
	wrapDocs
]);

Promise.resolve()
	.then(createDir("./docs/temp")) // *
	.then(jsdocAsJson("./dist", "./docs/temp/data.json"))
	.then(readJsonFile("./docs/temp/data.json")) // *
	.then(parseJsonFile)
	.then(exportDocsUsingTemplate("./docs", "./docs/templates/index.ejs"))
	.then(removeDir("./docs/temp")) // *
	.catch();

// if i could stream jsdocAsJson into exportDocsUsingTemplate,
// steps marked with an '*' would be unnecessary.