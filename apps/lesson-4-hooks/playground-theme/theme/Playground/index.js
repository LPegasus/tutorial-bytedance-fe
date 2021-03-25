/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import usePrismTheme from '@theme/hooks/usePrismTheme';
import { useLocation } from '@docusaurus/router';

import styles from './styles.module.css';

export default function Playground(props) {
  const { children, transformCode, ...restProps } = props;
  const { isClient } = useDocusaurusContext();
  const prismTheme = usePrismTheme();

  const { pathname } = useLocation();

  return (
    <LiveProvider
      key={isClient}
      code={isClient ? children.replace(/\n$/, '') : ''}
      transformCode={transformCode || ((code) => `${code};`)}
      theme={prismTheme}
      {...restProps}
    >
      <div
        className={clsx(styles.playgroundHeader, styles.playgroundEditorHeader)}
      >
        <Translate
          id="theme.Playground.liveEditor"
          description="The live editor label of the live codeblocks"
        >
          Live Editor
        </Translate>
      </div>
      <LiveEditor className={styles.playgroundEditor} />
      <div
        className={clsx(
          styles.playgroundHeader,
          styles.playgroundPreviewHeader,
        )}
      >
        <Translate
          id="theme.Playground.result"
          description="The result label of the live codeblocks"
        >
          Result
        </Translate>
      </div>
      <div className={styles.playgroundPreview}>
        <LivePreview />
        <LiveError />
      </div>
    </LiveProvider>
  );
}
