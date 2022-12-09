# Vanilla Startpage

Vanilla Startpage is designed to organize frequently used links in one place.

[Live Demo](https://idefant.github.io/vanilla-startpage/)

## Features

- Lightweight (~10kb) and fast
- Categories in the style of masonry
- Suggestions
- Easy configuration file
- Using Shortcuts
- Minimalistic
- Ability to open locally

## Preview

![Preview](images/preview.png?raw=true)
![Searching Preview](images/searching.png?raw=true)

## Shortcuts

You can use shortcuts by adding a colon to the beginning. For example, by typing `:gh` and pressing Enter you can open project's Github repository. The list of links can be changed in the file `config.js`:

```js
const categories = [
  {
    name: 'About_Project',
    links: [
      { name: 'Repo', url: 'https://github.com/idefant/vanilla-startpage', hotkey: 'gh' },
      // ...
    ],
  },
  // ...
];
```

## Config

- **gap** - distance between columns
- **colWidth** - column width (and the `--col-width` variable in `main.css`)
- **hotkeyLeader** - shortcut leader
- **mappings** - list of hotkeys
- **categories** - List of categories


## Usage

1. Download this repository
2. Open `index.html` in your browser
3. Copy url from browser's address bar
4. Go to browser's homepage/new tab settings
5. Select Custom Url option
6. Paste your url

### Using suggestions

When trying to get suggestions from google, the `CORS Missing Allow Origin` problem occurs. The browser prohibits sending a request to the domain `https://suggestqueries.google.com/`. To solve this, you need to disable CORS for this domain.

**⚠ All actions are performed only at your own risk! ⚠**

- Install [Simple Modify Headers](https://github.com/didierfred/SimpleModifyHeaders) for [Firefox](https://addons.mozilla.org/ru/firefox/addon/simple-modify-header/) or [Chrome](https://chrome.google.com/webstore/detail/simple-modify-headers/gjgiipmpldkpbdfjkgofildhapegmmic)
- Open the addon page
- Add a rule with parameters:
  - When URL contains: `https://suggestqueries.google.com/complete/search`
  - Action: `Add`
  - Header Field Name: `Access-Control-Allow-Origin`
  - Header Field Value: `*`
  - Apply on: `Response`
  - Status: `ON`
- Save config

![Simple Modify Headers Config](images/SimpleModifyHeaders.png?raw=true)

### Firefox

Firefox does not allow you to open custom start pages in a new tab. If you need it, after performing the actions from the list above, do these actions.

**⚠ All actions are performed only at your own risk! ⚠**

- Disable extensions that change the new tab page (such as New Tab Override)
- Create an `autoconfig.cfg` file and fill it with the following contents (pass a link to a local file to the `newTabURL` variable):

```js
var {classes:Cc,interfaces:Ci,utils:Cu} = Components;
try {
  Cu.import("resource:///modules/AboutNewTab.jsm");
  Cu.import("resource://gre/modules/Services.jsm");
  Cu.import("resource:///modules/BrowserWindowTracker.jsm");

  // Your url
  var newTabURL = "file:///C:/Users/sammy/startpage/index.html";
  AboutNewTab.newTabURL = newTabURL;

  Services.obs.addObserver((event) => {
    window = BrowserWindowTracker.getTopWindow();
    window.gBrowser.selectedBrowser.focus();
  }, "window-global-created");

  Services.obs.addObserver((event) => {
    window = BrowserWindowTracker.getTopWindow();
    window.gBrowser.selectedBrowser.focus();
  }, "browser-open-newtab-start");
} catch(e){Cu.reportError(e);}
```

- Copy that file into the root of the Firefox program folder (For Windows 10: `C:\Program Files\Mozilla Firefox`)
- Create a new text file named `autoconfig.js` with the following content:

```js
pref("general.config.filename", "autoconfig.cfg");
pref("general.config.obscure_value", 0);
pref("general.config.sandbox_enabled", false);
```

- Copy that file into the `defaults/pref` folder under the Firefox program folder (For Windows 10: `C:\Program Files\Mozilla Firefox\defaults\pref`)
- Reload Firefox