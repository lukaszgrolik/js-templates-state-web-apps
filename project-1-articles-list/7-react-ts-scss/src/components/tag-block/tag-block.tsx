import * as React from 'react';

import './tag-block.scss';

interface Props {
    tag: string;
}

export class TagBlock extends React.Component<Props> {
    render() {
        const { tag } = this.props;

        return (
            <div className="article-tag-block">{tag}</div>
        );
    }
}