---
sidebar_position: 2
---

# Installation

There are three ways to install Photodash: as a Home Assistant add-on, a standalone Docker container, or as a standalone Node.js process.

## Home Assistant Add-on

:::info

The Home Assistant add-on depends on the MariaDB add-on to store settings. If you do not have MariaDB installed, you must install and activate that add-on first. If you have My Home Assistant set up, you can use the link below.  
[![Open your Home Assistant instance and show the dashboard of the MariaDB add-on.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_mariadb)

:::

1. Go to the Add-on Store and add the following repository: `https://github.com/apop880/hassio-addons`. You can also use the link below to add the repository if you have My Home Assistant set up.  
[![Open your Home Assistant instance and show the add add-on repository dialog with https://github.com/apop880/hassio-addons pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fapop880%2Fhassio-addons)

2. Install the Photodash add-on from the add-on store. You can use the link below to navigate directly to the add-on if you have My Home Assistant set up.  
[![Open your Home Assistant instance and show the dashboard the Photodash add-on.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=photodash&repository_url=https%3A%2F%2Fgithub.com%2Fapop880%2Fhassio-addons)

3. Configure a custom port (optional). By default, the add-on runs on port `8800` of your Home Assistant instance. If you have another add-on running at that port or wish to use a different port for another reason, you can define that on the add-on's configuration tab.  
:::info A Note on Ingress Support
Ingress support is not something this add-on supports, and likely never will. Since Photodash has been designed to be used as a full-screen web application, and Ingress requires that the Home Assistant sidebar be present, the add-on is only usable when configured with a standalone port.
:::

4. Add your Photodash URL as a CORS allowed origin in Home Assistant. For example, if your Home Assistant server is running at `192.168.1.2`, and Photodash is configured on the default port `8800`:  
```yaml title="configuration.yaml"
http:
  cors_allowed_origins:
    - "http://192.168.1.2:8800"
```

5. Start the add-on. Initial startup may take slightly longer as the database tables are created.

## Standalone Docker container
:::info Contribution Needed
If you would like to contribute with a standalone Docker build and instructions, this is something I haven't gotten to yet that would be a great help!
:::

Coming soon!

## Standalode Node.js
:::info Contribution Needed
A more automated process for this installation method is on the roadmap but behind other priorities. If you'd like to contribute here, it would be appreciated.
:::

1. Make sure you have Node.js 16.14 or higher installed, and a database available to store the Photodash configuration. MySQL or MariaDB are recommended (Postgres should work fine but has not been tested).

2. Clone the repository with `git clone https://github.com/apop880/photodash.git`.

3. Type `cd photodash/rootfs` to go into the application directory.

4. Populate your database connection string in `.env.example` and rename it `.env`, then run `npx prisma db push` to populate your database with the needed tables.

5. Run `npm run build` to build the application.

6. Run `node build/index.js` to start the Photodash server.  
:::info
By default, the application will be exposed on port 3000. If you would like to change, this, you can prefix the command with `PORT=<#>`. For example, to change to port 5000, run `PORT=5000 node build/index.js`.
:::

7. Add your Photodash URL as a CORS allowed origin in Home Assistant. For example, if your Photodash node server is running at `192.168.1.2:3000`:  
```yaml title="configuration.yaml"
http:
  cors_allowed_origins:
    - "http://192.168.1.2:3000"
```

8. If you would like to use the [local photos slideshow integration](/docs/user/configurations#use-local-photos), create a folder inside `build/client` called `share` and add a subfolder called `photodash`. In that subfolder, you can create additional folders per configuration with your local photos.