// ==UserScript==
// @name         ZRPS Connector (Browser)
// @namespace    https://discord.gg/fcf3SH6sHJ
// @version      1.0
// @description  Connect to a Zombs Royale private server
// @author       JamzOhJamz
// @run-at       document-start
// @match        https://zombsroyale.io/
// @icon         https://www.google.com/s2/favicons?domain=zombsroyale.io
// @grant        none
// ==/UserScript==

// ---------------------------------
// CONNECTION SETTINGS
const SERVER_ENDPOINT = 'localhost:3001';
const USE_HTTPS = false;
// ---------------------------------

(() => {
    'use strict';

    const Event = class {
        constructor(script, target) {
            this.script = script;
            this.target = target;

            this._cancel = false;
            this._replace = null;
            this._stop = false;
        }

        preventDefault() {
            this._cancel = true;
        }

        stopPropagation() {
            this._stop = true;
        }

        replacePayload(payload) {
            this._replace = payload;
        }
    };

    const callbacks = [];
    window.addBeforeScriptExecuteListener = (f) => {
        if (typeof f !== 'function') {
            throw new Error('Event handler must be a function.');
        }
        callbacks.push(f);
    };
    window.removeBeforeScriptExecuteListener = (f) => {
        let i = callbacks.length;
        while (i--) {
            if (callbacks[i] === f) {
                callbacks.splice(i, 1);
            }
        }
    };

    const dispatch = (script, target) => {
        if (script.tagName !== 'SCRIPT') {
            return;
        }

        const e = new Event(script, target);

        if (typeof window.onbeforescriptexecute === 'function') {
            try {
                window.onbeforescriptexecute(e);
            } catch (err) {
                console.error(err);
            }
        }

        for (const func of callbacks) {
            if (e._stop) {
                break;
            }
            try {
                func(e);
            } catch (err) {
                console.error(err);
            }
        }

        if (e._cancel) {
            script.textContent = '';
            script.remove();
        } else if (typeof e._replace === 'string') {
            script.textContent = e._replace;
        }
    };
    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            for (const n of m.addedNodes) {
                dispatch(n, m.target);
            }
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
})();

let initScriptPatched = false;

window.onbeforescriptexecute = async (e) => {
    // You should check if textContent exists as this property is
    // buggy sometimes
    if (!e.script.textContent) {
        return;
    }

    // Prevent execution of a script
    if (e.script.textContent.includes('Sentry.init') && !initScriptPatched) {
        initScriptPatched = true;
        const originalScript = e.script.textContent;
        e.preventDefault();
        const fetchedUserData = await getZrpsUserData(getCookie('userKeyZrps'));
        let hasData = true;
        if (fetchedUserData == null) hasData = false;
        if (fetchedUserData.status != 'success') hasData = false;
        const scriptElement = document.createElement('script');
        scriptElement.textContent = hasData ? originalScript.replace('userData: false', `userData: ${JSON.stringify(fetchedUserData.user)}`) : originalScript;
        document.body.appendChild(scriptElement);
        // Redefine game.onWindowMessage to modify login origin checking
        game.onWindowMessage = function (t) {
            if (t.origin !== 'http://' + SERVER_ENDPOINT && t.origin !== 'https://' + SERVER_ENDPOINT) {
                return;
            }
            try {
                const i = JSON.parse(t.data) || {};
                if (i.event == 'onLoginSuccess') {
                    setCookie('userKeyZrps', i.data.user.key, 365);
                    game.options.userData = i.data.user;
                    game.shouldShowAds = !i.data.user.iaps || i.data.user.iaps.length === 0;
                    game.instance.SendMessage('Zombsnite', 'SetUserData', JSON.stringify(i.data.user));
                }
            } catch (n) {

            }
        };
        window.addEventListener('message', game.onWindowMessage.bind(game));
    }
};

document.addEventListener('DOMContentLoaded', function () {
    // Workaround to stay logged in
    function gameBypass(original_function) {
        return function (options) {
            console.log(options);
            return original_function.apply(this, options);
        };
    }

    Game.prototype.constructor = gameBypass(Game.prototype.constructor);

    // Hook API requests
    function openBypass(original_function) {
        return function (method, url, async) {
            if (url.includes('zombsroyale.io/api/')) {
                url = url.replace('zombsroyale.io', SERVER_ENDPOINT);
                if (!USE_HTTPS) {
                    url = url.replace('https', 'http');
                }
            }
            return original_function.apply(this, arguments);
        };
    }

    XMLHttpRequest.prototype.open = openBypass(XMLHttpRequest.prototype.open);

    // Hook window.open for login
    window.open = (function (open) {
        return function (url, name, features) {
            url = url.replace('zombsroyale.io', SERVER_ENDPOINT);
            if (!USE_HTTPS) {
                url = url.replace('https', 'http');
            }
            return open.call(window, url, name, features);
        };
    }(window.open));
}, false);

async function getZrpsUserData(key) {
    try {
        const response = await fetch(`${USE_HTTPS ? 'https://' : 'http://'}${SERVER_ENDPOINT}/api/user/${key}`);
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

// Utilities
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

// ==UserScript==
