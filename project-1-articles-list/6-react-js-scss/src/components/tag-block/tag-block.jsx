import * as React from 'react';

import './tag-block.scss';

export class TagBlock extends React.Component {
    render() {
        const { tag } = this.props;

        return (
            <div className="article-tag-block">{tag}</div>
        );
    }
}