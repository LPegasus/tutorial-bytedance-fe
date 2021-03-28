/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'React Tutorial',
  tagline: '前端课程 React 入门',
  url: 'https://lpegasus.github.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ByteDance', // Usually your GitHub org/user name.
  projectName: 'lpegasus.github.io',
  themeConfig: {
    navbar: {
      // title: 'React 入门',
      logo: {
        alt: 'ByteDance Logo',
        src: 'img/bytedance.png',
      },
      items: [
        {
          to: 'docs/getting-started',
          activeBasePath: 'docs/getting-started',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'docs/hooks/summary',
          label: 'Hooks',
          position: 'left',
          activeBasePath: 'docs/hooks',
        },
        {
          href: 'https://github.com/LPegasus/tutorial-bytedance-fe',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/getting-started',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Hooks',
              to: 'hooks',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    /**
     * prism code-block highlight
     */ prism: {
      theme: require('prism-react-renderer/themes/vsDark'),
      additionalLanguages: ['typescript'],
    },
  },
  themes: ['./playground-theme/index.js'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/LPegasus/tutorial-bytedance-fe',
        },
        hooks: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/LPegasus/tutorial-bytedance-fe',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
