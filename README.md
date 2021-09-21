# CRISP overview

CRISP is an open-source Chrome extension which helps to select web elements on the page, automatically populate its selectors, assign configured actions and generate ready test code based on the customized patterns. It can speed up the process of test development by replacing manual time-consuming operations with automated features.
<br>
CRISP comes with predefined steps for [WebdriverIO Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate#cucumber-boilerplate) project. Just follow the [Quick start](https://github.com/webdriverio/cucumber-boilerplate#quick-start) guide to setup the project, install and use CRISP to generate test steps, add them to [new scenario](https://github.com/webdriverio/cucumber-boilerplate#how-to-write-a-test) in Boilerplate project and [run](https://github.com/webdriverio/cucumber-boilerplate#how-to-run-the-test).
![](./docs/overview.gif)
## Installation

```
$ npm install
```

## Usage

Run `$ npm start` and load the `dist`-directory into chrome.

## Entryfiles (bundles)

There are two kinds of entryfiles that create bundles.

1. All ts-files in the root of the `./app/scripts` directory
2. All css-,scss- and less-files in the root of the `./app/styles` directory

## How to get started

To start using CRISP:
1. Launch Chrome browser.
2. Open Developer tools:
- Click “Customize and control Google Chrome” (3-dots icon)  at the status bar -> Select “More Tools” -> select “Developer Tools”;
- Or press Ctrl+Shift+I;
- Or press F12 key.
3. Open “Elements” tab.
4. Open "CRISP" sub-tab on the same level with the "Styles" sub-tab.

As a result, the main page of CRISP extension “Add element” is displayed and ready for usage with default settings.

For more details please refer to the [CRISP manual](./docs/crisp-help.md).

## Upcoming features

1. UI/UX redesign
2. Highlight elements
3. Verify locators of elements
4. User actions history
5. Presets for actions/verifications
6. User-friendly merge conflict resolution during Import/Pull/Push