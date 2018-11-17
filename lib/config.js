/*
 *
 * Create congfig object for the server 
 * 
 * 
 */


 // Set object to host congfiguations
 const environments = {};

 environments.staging = {
    httpPort: 3000,
    httpsPort: 3001,
    envName :'staging'
 };

 environments.production = {
    httpPort: 5000,
    httpsPort: 5001,
    envName : 'production'
 };



 // Determine which enviroment was passed as a commend-line argument
 const currentEnvironment = typeof(process.env.NODE_ENV) === "string" ? process.env.NODE_ENV.toLowerCase()  : '';

 // Determine which enviroment to export
 const enviromentToExport = typeof(currentEnvironment) === 'object' ? environments[currentEnvironment] : environments.staging;

 // Export config object /settings
 module.exports = enviromentToExport;
