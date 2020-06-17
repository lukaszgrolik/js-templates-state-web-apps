appendArticlesHtml(window.ARTICLES);

function appendArticlesHtml(articlesData) {
	const articlesList = document.querySelector('.articles-list');
	const articleTemplate = document.getElementById('article-template');
	const tagTemplate = document.getElementById('tag-template');

	articlesData.forEach(art => {
		const articlesListItem = document.createElement('li');
		const articleBlock = generateArticleHtml(articleTemplate, tagTemplate, art);
		articlesListItem.appendChild(articleBlock);

		articlesList.appendChild(articlesListItem);
	});
}

function generateArticleHtml(articleTemplate, tagTemplate, articleData) {
	const articleTemplateContent = articleTemplate.content.cloneNode(true);
	const articleBlock = articleTemplateContent.querySelector('.article-block');

	const thumbnailImg = articleBlock.querySelector('.article-thumbnail-block img');
	thumbnailImg.src = articleData.thumbnail;
	thumbnailImg.alt = articleData.thumbnailInfo;
	const articleHeading = articleBlock.querySelector('.article-heading');
	articleHeading.innerText = articleData.title;
	const articleDateBlock = articleBlock.querySelector('.article-date-block');
	articleDateBlock.innerText = articleData.date;
	const articleParagraph = articleBlock.querySelector('.article-body p');
	articleParagraph.innerText = articleData.content;

	const tagsList = articleBlock.querySelector('.article-tags-list');

	articleData.tags.forEach(tagName => {
		const tagsListItem = document.createElement('li');
		const tagTemplateContent = tagTemplate.content.cloneNode(true);
		const tagBlock = tagTemplateContent.querySelector('.article-tag-block');
		tagsListItem.appendChild(tagBlock);

		tagsList.appendChild(tagsListItem);

		tagBlock.innerText = tagName;
	});

	return articleBlock;
}

function generateArticleTagHtml(tagName) {
	const mainBlock = document.createElement('div');
	mainBlock.className = 'article-tag-block';
	mainBlock.innerText = tagName;

	return mainBlock;
}