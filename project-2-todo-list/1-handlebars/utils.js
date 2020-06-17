// based on https://stackoverflow.com/a/494348
export function createElementFromHTML(elemString, htmlString) {
	const wrapper = document.createElement(elemString);
	wrapper.innerHTML = htmlString.trim();

	// Change this to div.childNodes to support multiple top-level nodes
	return wrapper.firstChild;
}