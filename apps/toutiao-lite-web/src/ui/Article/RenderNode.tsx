import React from 'react';

import type { ArticleNode, ContentNode } from '@src/services/types';

export function RenderNode(props: RenderNodePropsType) {
  const { node } = props;
  if (node.type === 'article') {
    return (
      <article>
        {(node.children || []).length > 0
          ? React.Children.toArray(
              node.children!.map((node) => {
                return <RenderNode node={node} />;
              })
            )
          : null}
      </article>
    );
  } else if (node.type === 'img') {
    return <img {...node.attributes} />;
  } else if (node.type === 'p') {
    return <p>{node.children}</p>;
  } else if (node.type === 'video') {
    return (
      <Video>
        {node.attributes.source.map((s, i) => {
          return <source key={i} src={s.src} type={s.type} />;
        })}
      </Video>
    );
  }
  return null;
}

export type RenderNodePropsType = {
  node: ContentNode | ArticleNode;
};

function Video({ children }: { children: any }) {
  const handleClick = (e) => {
    e.currentTarget.controls = true;
  };
  return <video onClick={handleClick}>{children}</video>;
}
