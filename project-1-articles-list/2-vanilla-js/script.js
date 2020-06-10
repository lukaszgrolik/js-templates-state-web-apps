function generateArticleHtml(articleData) {
    const mainBlock = document.createElement('div');
    mainBlock.className = 'article-block';

    const thumbnailBlock = document.createElement('div');
    mainBlock.appendChild(thumbnailBlock);
    thumbnailBlock.className = 'article-thumbnail-block';

    const thumbnailImg = document.createElement('img');
    thumbnailBlock.appendChild(thumbnailImg);
    thumbnailImg.src = articleData.thumbnail;
    thumbnailImg.alt = articleData.thumbnailInfo;

    const articleContentBlock = document.createElement('div');
    mainBlock.appendChild(articleContentBlock);
    articleContentBlock.className = 'article-content-block';
    
    const articleHeader = document.createElement('div');
    articleContentBlock.appendChild(articleHeader);
    articleHeader.className = 'article-header';
    
    const articleHeadingBlock = document.createElement('div');
    articleHeader.appendChild(articleHeadingBlock);
    articleHeadingBlock.className = 'article-heading-block';
    
    const articleHeading = document.createElement('h2');
    articleHeadingBlock.appendChild(articleHeading)
    articleHeading.className = 'article-heading';
    articleHeading.innerText = articleData.title;
    
    const articleDateBlock = document.createElement('div');
    articleHeader.appendChild(articleDateBlock)
    articleDateBlock.className = 'article-date-block';
    articleDateBlock.innerText = articleData.date;
    
    const articleBody = document.createElement('div');
    articleContentBlock.appendChild(articleBody);
    articleBody.className = 'article-body';
    
    const articleParagraph = document.createElement('p');
    articleBody.appendChild(articleParagraph);
    articleParagraph.innerText = articleData.content;
    
    const articleFooter = document.createElement('div');
    articleContentBlock.appendChild(articleFooter);
    
    const articleTagsList = document.createElement('ul');
    articleFooter.appendChild(articleTagsList);
    articleTagsList.className = 'article-tags-list';

    articleData.tags.forEach(tagName => {
        const articleTagListItem = document.createElement('li');
        const articleTagBlock = generateArticleTagHtml(tagName);
        articleTagListItem.appendChild(articleTagBlock);
        
        articleTagsList.appendChild(articleTagListItem);
    });

    return mainBlock;
}

function generateArticleTagHtml(tagName) {
    const mainBlock = document.createElement('div');
    mainBlock.className = 'article-tag-block';
    mainBlock.innerText = tagName;

    return mainBlock;
}