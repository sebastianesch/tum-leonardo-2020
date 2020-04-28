# Development on SAP Cloud Platform with SAP Cloud Application Programming Model and SAPUI5

## SAP Cloud Platform Overview

### Overview

Side-by-side extensions, Integration & Innovation

#### Environments, Capabilities & Services

- Neo vs. Cloud Foundry
- Subscriptions vs. Services
- Subaccounts / System Landscape: Three-tier landscape - Development, Test & Production

### Getting started

How do I setup my trial account, where can I get information and software and what are the tools I can use?

#### How can I get a trial account?

- Start: https://account.hana.ondemand.com/#/home/welcome
- Account Namen: Global Account (f16da237) vs. Subaccount (trial / 2fae9c39-e84a-4c60-84e2-16daa8a19712)
- User Name - (CF: E-Mail / Neo: S- or P-User)
- SAP ID Service / S- or P-User: https://accounts.sap.com/ui/protected/profilemanagement

#### Where can I find information, help and tutorials?

- SAP Developer Center: https://developers.sap.com - Tutorials & Information about SDKs
- SAP Help Portal: https://help.sap.com/viewer/index - Help for SAP Products
- SAP Community: https://community.sap.com - Blogs & Answers
- SAP Cloud Platform Discovery Center: https://www.discovery-center.cloud.sap/ - Onboarding Missions & Service Catalog
- SAP API Business Hub: https://api.sap.com/ - APIs & Documentation

#### Where can I download tools & software?

- SAP Development Tools: https://tools.hana.ondemand.com/#cloud -  SAP JVM, SAP CF CLI Plugins, Cloud Connector, ...
- SAP NPM Registry: https://npm.sap.com - Via npm
- SAP Support Launchpad: https://launchpad.support.sap.com/ - Requires S-User (SAP Service User)

#### How do I setup my development environment?

- SAP Web IDE (HANA 2.0, SAP Cloud Platform, UI5, Fiori)
- SAP Business Application Studio (SAP Cloud Platform, CAPM, UI5)
- Eclipse (ABAP, BW, UI5, HANA 1.0)
- VS Code (SAP Cloud Platform, UI5, CAPM)

#### Exercise 1 - Trial Account - SAP Business Application Studio & SAP Web IDE

**Cloud Foundry**

1. Create a Trail Account
1. Navigate to your Cloud Foundry Subaccount
1. Navigate to Subscriptions
1. Activate SAP Business Application Studio
1. Navigate to your Subaccount
1. Navigate to Security / Trust Configurations
1. Go to the "Default Identity Provider" and check the Role Collection Assignement for your user
1. Add all predefined Role Collections to your user
1. Navigate to SAP Business Application Studio and open the Application - in case of Authorization issues, open it in an incognito window
1. Setup a Dev Space

**Neo**

1. Navigate to your Neo Subaccount - https://cockpit.hanatrial.ondemand.com/cockpit#/home/trial
1. Navigate to Services
1. Subscribe to SAP Web IDE Full-Stack
1. Navigate to Security / Authorizations
1. Check the Role assigments for your user, especially those from the `sapwebide` subaccount
1. Go to Services / SAP Web IDE Full-Stack and start Web IDE by clicking on Go to service
1. Go to Preferences / Cloud Foundry and connect to your Cloud Foundry trial account

### Architecture Blueprints

- SAP Cloud Platform Use Cases: https://www.sap.com/products/cloud-platform/use-cases.html
- SAP Cloud Platform Solution Diagrams & Icons: https://wiki.scn.sap.com/wiki/pages/viewpage.action?pageId=477829554

You can use the Solution Diagrams & Icons Powerpoint templates for your own architecture diagrams.

## Programming on SAP Cloud Platform

### Neo Environment

Supports Java Applications via Java Server Instances, HANA 1.0 XS Classic Applications and HTML5 Applications.

Here you find the SAP Web IDE Full-Stack and the old Cloud Portal service.

### Cloud Foundry

Supports Cloud Foundry Applications, SAP supported build packs for Java, Node.js, Python
Supports HANA 2.0 data bases
Supports HTML5 Applications via App Repository

Supports Apps spanning multiple technologies via Multi-Target Applications (MTA).

- A `Global Account` is your contract with SAP.
- Each Global Account can have multiple `Subaccounts`.
- Every Subaccount has one Cloud Foundry `Organization`.
- A Subaccount or Organization can have multiple `Spaces`.

A Cloud Foundry space hosts your applications and their service instances.

You can manage the different capabilities and services SAP offers via `Entitlements` and `Quota Plans`.

### Exercise 2 - Check the available services in your Trial Account

1. Navigate to your Global Account (Cloud Foundry)
1. Naviagte to Entitlements / Entity Assigments
1. Select your Subaccount and check the services and resources your Global Account is entitled to
1. Navigate to your Subaccount and check the Entitlements and Quotas
1. Navigate to your Space and check out the Service Marketplace

### Create a Business Application

We use the Cloud Application Programming Model (CAP) for our Application.

See https://cap.cloud.sap/docs/

We will create CAP Application for a Bookstore from the SAP Tutorials for SAP Cloud Application Programming Model. It consists of:
- The `db` module, which contains the Data Model and reference data for import
- The `srv` module, which contains the Service Definitions
- The `app` module, which contains the App Router to handle authentication

User Interfaces will be covered later, at the moment, the focus is on Database and OData APIs.

1. Create the data model in the `db` module
1. Create the service model in the `srv` module
1. Create custom logic in the serivce module

CAP supports OData v4 out of the box. In order to use Fiori Elements, we add an OData v2 Proxy and some logging to the application.

1. Add the `server.js` file to ther `srv` module
1. In the file, we also add the logging middleware to Express

https://expressjs.com/

### Exercise 3 - Start your Business Application

1. Navigate to your CF subaccount
1. Go to Supscriptions and start SAP Business Application Studio
1. Create a Dev Space for SAP Business Applications
1. Open your Dev Space
1. Connect to your Cloud Foundry target
1. Select the CAP Template or start from the sap/cap yeoman template
1. Select the `hana` and `mta` modules
1. Prepare the database module:
    1. Add a new file `schema.cds` in your `db/src` folder and add the content from `/db/src/schema.cds`.
    1. Add new files for the CSV data in your `db/src/data`folder and add the files from `/db/src/data/`.
1. Prepare the service module:
    1. Add the file `admin-service.cds` to your `srv` folder and add the content from `/srv/admin-service.cds`.
    1. Add the file `cat-service.cds` to your `srv` folder and add the content from `/srv/cat-service.cds`.
    1. Add the file `cat-service.js`to your `srv` folder and add the content from `/srv/cat-service.js`.
1. Run the application with SQLite as backend
    1. Edit `package.json` and change `cds.requires.db.kind` from `hana` to `sql`.
    1. Run `npm add sqlite3 -D` to install sqlite in your Dev Workspace
    1. Run `cds deploy --to sqlite:my.db` to start your services
    1. Click on "Expose and Open" to access the CAP services
1. Prepare the application for deployment to Cloud Foundry:
    1. Edit `package.json`and switch back `cds.requires.db.kind` to `hana` and remove the dev dependencies for sqlite.
    1. Run `cds add mta --force` to create an updated `mta.yaml` file for your application.
    1. Excute `mbt build -t ./` to build your Multi-Target Application

## SAP Fiori and SAPUI5

#### Where can I find information, help and tutorials?

In addition to the links in the Cloud Platform section:

- SAP User Experience Community: https://experience.sap.com/ - All UX related content
- SAP Fiori Design Guidelines: https://experience.sap.com/fiori-design-web/ - Fiori Design Guidelines
- SAP Conversational UX Guidelines: https://experience.sap.com/conversational-ux/ - CoPilot & Conversational UX
- SAP Fiori Design Stencils: https://experience.sap.com/fiori-design-web/downloads/ - Sketch & Axure
- SAP Fiori Client: https://experience.sap.com/fiori-design-web/fiori-client/ - iOS & Android
- SAPUI5 Documentation: https://sapui5.hana.ondemand.com/ - Documentation, References, Examples

#### Where can I download tools & software?

- SAP Development Tools: https://tools.hana.ondemand.com/#sapui5 - SAP Web IDE Personal Edition, SAPUI5 Runtime, Eclipse
- UI5 Tooling: https://sap.github.io/ui5-tooling/ - via public NPM

#### How do I setup my development environment

We use SAP Web IDE in the Neo Environment.

Our backend is located at https://ib-monster-srv.cfapps.eu10.hana.ondemand.com/odata/v2/.

Navigate to your Neo Subaccount and create a destination to the backend:

Name: monsterhunterapi
Type: HTTP
URL: https://ib-monster-srv.cfapps.eu10.hana.ondemand.com/
Proxy Type: Internet
Authentication: NoAuthentication

Additional Properties:
WebIDEEnabled: True
WebIDEUsage: odata_gen

Open SAP Web IDE and clone the other repository https://github.com/sebastianesch/tum-leonardo-2020-ui

There are two SAPUI5 Apps: monsterhunter-monsterapp and monsterhunter-questapp.

The monsterapp is a Fiori Elements App - it's a generic App where all information about fields, their relationship, order, etc. is derived from metadata provided by the backend.

The questapp is a regular SAPUI5 Master-Detail App.

The portal module contains the Fiori Launchpad, that provides the entry point to the user, when there are multiple apps.

The approuter provides authentication and single endpoint for the user.

The ui-deployer is responsible for storing the apps from the MTA application in the HTML5 Repository on deployment.

