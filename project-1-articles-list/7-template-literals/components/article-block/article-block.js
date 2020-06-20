import {tagBlock} from '../tag-block/tag-block.js';

export function articleBlock(art) {
    const tagsList = art.tags.map(t => {
        return `
            <li>
                ${tagBlock(t)}
            </li>
        `;
    }).join('');

    return `
        <div class="article-block">
            <div class="article-thumbnail-block">
                <img src="${art.thumbnail}" alt="${art.thumbnailInfo}">
            </div>

            <div class="article-content-block">
                <div class="article-header">
                    <div class="article-heading-block"><h2 class="article-heading">${art.title}</h2></div>
                    <div class="article-date-block">${art.date}</div>
                </div>

                <div class="article-body">
                    <p>${art.content}</p>
                </div>

                <div class="article-footer">
                    <ul class="article-tags-list">
                        ${tagsList}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

