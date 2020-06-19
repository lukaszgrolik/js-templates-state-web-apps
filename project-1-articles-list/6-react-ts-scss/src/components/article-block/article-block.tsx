import * as React from 'react';

import { Article } from '../../interfaces';
import { TagBlock } from '../tag-block/tag-block';

import './article-block.scss';

interface Props {
    article: Article;
}

export class ArticleBlock extends React.Component<Props> {
    render() {
        const { article } = this.props;

        return (
            <div className="article-block">
                <div className="article-thumbnail-block">
                    <img src={article.thumbnail} alt={article.thumbnailInfo} />
                </div>

                <div className="article-content-block">
                    <div className="article-header">
                        <div className="article-heading-block"><h2 className="article-heading">{article.title}</h2></div>
                        <div className="article-date-block">{article.date}</div>
                    </div>

                    <div className="article-body">
                        <p>{article.content}</p>
                    </div>

                    <div className="article-footer">
                        <ul className="article-tags-list">
                            {
                                article.tags.map(tag => {
                                    return (
                                        <li key={tag}>
                                            <TagBlock tag={tag} />
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}