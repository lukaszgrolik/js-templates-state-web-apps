import {articleBlock} from '../article-block/article-block.js';

export function mainView(articles) {
    const articlesList = articles.map(art => {
        return `
            <li>
                ${articleBlock(art)}
            </li>
        `;
    }).join('');

    return `
        <div class="articles-block">
            <div class="articles-block-heading">
                <h1>Articles</h1>
            </div>

            <div>
                <ul class="articles-list">
                    ${articlesList}
                </ul>
            </div>

            <div class="articles-footer">
                <div>Descriptions obtained from <a href="https://en.wikipedia.org">wikipedia</a>.</div>
                <div>Photos obtained from <a href="https://pixabay.com">pixabay</a>.</div>
            </div>
        </div>
    `;
}