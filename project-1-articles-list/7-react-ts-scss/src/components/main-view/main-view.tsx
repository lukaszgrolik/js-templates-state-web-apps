import * as React from 'react';

import { Article } from '../../interfaces';
import { ArticleBlock } from '../article-block/article-block';

import './main-view.scss';

interface Props {
    articles: Article[];
}

export class MainView extends React.Component<Props> {
    render() {
        const { articles } = this.props;

        return (
            <div className="articles-block">
                <div className="articles-block-heading">
                    <h1>Articles</h1>
                </div>

                <div>
                    <ul className="articles-list">
                        {
                            articles.map(art => {
                                return (
                                    <li key={art.title}>
                                        <ArticleBlock article={art} />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>

                <div className="articles-footer">
                    <div>Descriptions obtained from <a href="https://en.wikipedia.org">wikipedia</a>.</div>
                    <div>Photos obtained from <a href="https://pixabay.com">pixabay</a>.</div>
                </div>
            </div>
        );
    }
}