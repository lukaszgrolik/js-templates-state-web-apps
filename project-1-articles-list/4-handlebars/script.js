appendArticlesHtml(window.ARTICLES);

function appendArticlesHtml(articlesData) {
	const articleTemplateHtml = document.getElementById('article-template').innerHTML;
	const articleTemplate = Handlebars.compile(articleTemplateHtml);

	const tagTemplateHtml = document.getElementById('tag-template').innerHTML;
	Handlebars.registerPartial('tagBlock', tagTemplateHtml);

	const articlesList = document.querySelector('.articles-list');

	articlesData.forEach(art => {
		const articlesListItem = document.createElement('li');
		const articleBlockHtml = articleTemplate(art);
		const articleBlock = createElementFromHTML('div', articleBlockHtml);
		articlesListItem.appendChild(articleBlock);

		articlesList.appendChild(articlesListItem);
	});
}

// based on https://stackoverflow.com/a/494348
function createElementFromHTML(elemString, htmlString) {
	var div = document.createElement(elemString);
	div.innerHTML = htmlString.trim();

	// Change this to div.childNodes to support multiple top-level nodes
	return div.firstChild;
}