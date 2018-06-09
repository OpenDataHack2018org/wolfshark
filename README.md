# WolfShark (frontend)

> #OpenDataHack2017 @CopernicusECMPWF challenge #10
> Automated visualization and animation generator based on climate data.

**Problem**
Currently it's quite hard to generate an animated representation of climate data, suitable for deploying in different media. There are many steps involved, and quality of the output can really fluctuate based on chosen workflow.

**Proposed solution**
A small modern web-app that would take requests for generating visualizations based on configured presets, allowing for quick way to get results ready for publishing. While it might take some time and processing power to do all the work, the workflow would be very easy and wizard-like, allowing for no-frills setup and queuing of a job. App would be reactive, in order to signal the progress of the scheduled job. Once result is ready, it can be downloaded or embedded in different places. One of the possible exotic mediums is the weather globe display located at ECMWF (requiring the equirectangular projection).

**Data**
Different data sets from CDS will be available for choice. Buy querying the CDS Toolbox we will get the data for you and then process it locally, in order to create frames suitable for animating them via image processing libs.

**Team WolfShark**
- Dusan Vuckovic - full-stack developer
- Roger Milroy - full-stack developer
- Toby Such - full-stack developer
- Awen Saunders - full-stack developer

## Build Setup

This component is the frontend part of the app. Take a look at backend [repo](https://github.com/dvuckovic/wolfshark-backend) as well for the server part.

``` bash
# install dependencies
npm install

# dev mode with hot reload at localhost:8080 (with backend server at localhost:8081)
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
