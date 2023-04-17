# Connecting to ZRprivateServer

Connecting to a private server from the game requires following specific steps that may vary depending on your platform. This guide will provide you with simple and easy-to-follow instructions to get you connected.

## Web (Chrome)

### Using the zrps-connector.user.js Tampermonkey script

The `zrps-connector.user.js` Tampermonkey script is a tool that can help you to connect to the ZRprivateServer more easily. Here are the steps to use this script:

1. Install the [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) browser extension in the Chrome web store.
2. Download the `zrps-connector.user.js` script file.
3. Open the Tampermonkey dashboard and select "Create a new script".
4. Copy and paste the contents of the `zrps-connector.user.js` script file into the new script.
5. Adjust the connection settings according to the specific server you want to connect to. This way, you can point the script to the correct server and ensure a successful connection.
    ```js
    // ---------------------------------
    // CONNECTION SETTINGS
    const SERVER_ENDPOINT = 'localhost:3001';
    const USE_HTTPS = false;
    // ---------------------------------
    ```
6. Save the script.
7. Visit [zombsroyale.io](https://zombsroyale.io) to connect to the private server.

## PC (Client)

Coming soon...
