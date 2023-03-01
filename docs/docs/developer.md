---
sidebar_position: 4
---

# Developer Documentation

Photodash is open source, and although it's still in very early beta and continuing to take shape, contributions are welcomed!

## Developing Locally

To develop locally, fork and clone the repository, then go into the `rootfs` directory and run `npm install`. In order to run locally, you'll need to connect a database. MySQL or MariaDB are recommended (Postgres should work fine but has not been tested). Populate your database connection string in `.env.example` and rename it `.env`, then run `npx prisma db push` to populate your database with the needed tables. Run `npm run dev` to start the development server.

## Tools and Technologies Used

Photodash is built with [SvelteKit](https://kit.svelte.dev/) and leverages [Tailwind](https://tailwindcss.com/) for most of its CSS (there are still a few places where other, non-Tailwind CSS is being used from alpha iterations of Photodash, but those are being cleaned up).

Many of the components leverage [DaisyUI](https://daisyui.com/), a Tailwind plugin, for default styling. Icons are sourced from the [Iconify](https://iconify.design/) icon framework, and are embedded using the [Iconify web component](https://docs.iconify.design/iconify-icon/).

## Application Structure

Coming soon

## Contributions Needed

I will try to keep the issues list updated with items where contributions are particularly needed. At the moment, there are only two varieties of tiles, so there will be issues open for other tiles I'd like to build out. That won't be a comprehensive list, though; if you have other ideas for useful tiles, PRs are welcome.

## Creating Tiles

Tiles are located in `rootfs/src/routes/(app)/[name]/tiles`. To create a tile, you must create a new directory for that tile, with a `.svelte` file for the tile itself, and one for the configuration form fields. You must also update `rootfs/src/routes/(app)/[name]/View.svelte` to include the tile as a viewable and configurable item. The tile and tile config Svelte components must be imported (see lines 6 and 7 for examples), the tile must be added to the `components` and `componentMap` objects (follow the pattern of existing tiles), and the tile must be included in the dropdown list of tile types in the add/edit modal.

When creating a tile, if you need to reference an entity, you can import the `stateStore` and create a searchable dropdown of entities. Likewise, you can use `serviceStore` if you need to reference the user's available services. Reference `ServiceTileConfig.svelte` to see examples of both in action. You should always leverage the `Select` component provided by `svelecte` to provide users with filter-as-you-type support for finding entities and service calls.

## Contributing to the Docs

This documentation site is open source, and you can suggest edits on any page by clicking "Edit this page" at the bottom of any page. To suggest an entirely new page or section of the docs, feel free to [open an issue](https://github.com/apop880/photodash/issues/new/choose) on Github.