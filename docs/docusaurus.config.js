// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Photodash',
  tagline: 'An easy to configure, photo focused Home Assistant alternative dashboard',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://photodash.apop.tech',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/apop880/photodash/tree/main/docs',
          async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            sidebarItems.map(i => {
              if ("label" in i && i.label === "Release Notes") {
                // @ts-ignore
                i.items.reverse();
              }
              return(i)
            })
            return(sidebarItems);
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  
  scripts: [{src: 'https://analytics.apop.tech/js/plausible.js', defer: true, 'data-domain': 'photodash.apop.tech'}],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true
      },
      // Replace with your project's social card
      image: 'img/share-img.jpg',
      navbar: {
        logo: {
          alt: 'Photodash Logo',
          src: 'img/logo.png',
          srcDark: 'img/logo_dark.png'
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/apop880/photodash',
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
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Installation',
                to: '/docs/installation'
              },
              {
                label: 'User Guide',
                to: '/docs/category/user-guide'
              },
              {
                label: 'Developer Docs',
                to: '/docs/developer'
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Home Assistant Community Forum',
                href: 'https://community.home-assistant.io/t/photodash-a-photo-focused-home-assistant-dashboard',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/apop880/photodash',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Photodash. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
