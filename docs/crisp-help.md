# CRISP User Manual

- [CRISP overview](#crisp-overview)
- [How to get started](#how-to-get-started)
- [How to use CRISP](#how-to-use-crisp)
   - [Settings](#settings)
     - [Common](#common)
     - [Project](#project)
       - [Configuration](#configuration)
       - [Saved Pages](#saved-pages)
     - [Framework](#framework)
        - [Configuration](#configuration)
       - [Page Objects](#page-objects)
       - [Actions/Verifications](#actionsverifications)
   - [Add element](#add-element)
   - [Add elements in bulk](#add-elements-in-bulk)
   - [Main page](#main-page)
      - [Elements](#elements)
      - [Generated output](#generated-output)


## CRISP overview
CRISP is an open-source Chrome extension which helps to select web elements on the page, automatically populate its selectors, assign configured actions and generate ready test code based on the customized patterns. It can speed up the process of test development by replacing manual time-consuming operations with automated features.
<br>
### CRISP configured to use [WebdriverIO Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate#cucumber-boilerplate) project by default.
1. follow the [quick start](https://github.com/webdriverio/cucumber-boilerplate#quick-start) guide to setup the project
1. install and use CRISP to generate test steps
1. add them to [new scenario](https://github.com/webdriverio/cucumber-boilerplate#how-to-write-a-test) in Boilerplate project
1. [run](https://github.com/webdriverio/cucumber-boilerplate#how-to-run-the-test) the test

![](./overview.gif)
## How to get started
To start using CRISP:
1. Launch Chrome browser.
2. Open Developer tools:
	- Click “Customize and control Google Chrome” (3-dots icon) at the status bar -> Select “More Tools” -> select “Developer Tools”;
	- Or press Ctrl+Shift+I;
	- Or press F12 key.
3. Open “Elements” tab.
4. Open "CRISP" sub-tab on the same level with the "Styles" sub-tab.
![](./crisp_opened.png)
5. Click [+] icon to open “Add element” screen.
6. Launch the “Inspect” tool and select the necessary element at the page. 
<br>_(As a result, CRISP will populate found locators of the element into the related fields “ID”, “CSS”, “xPath”_).
7. Select the necessary test “Actions\Verifications” for this element.
<br>_(e.g. “`click`” or “`expect element is displayed`”)_
8. Click [Save] button.
9. Open “Test Actions\Verifications” tab in the bottom.
10. Click “Generate for page” button and see results.
11. Copy & Paste the generated test steps into new scenario in WebdriverIO Cucumber Boilerplate project and run it

## How to use CRISP
### Settings
'Settings' screen is displayed as the start screen after clicking the related icon in the top menu. Here you should configure patterns and manage pages in order to use it when generating test output.

There are 3 tabs available:
-   **Common**;
-   **Project** - with sub-tabs "Configuration" and "Saved Pages";
-   **Framework** - with sub-tabs “Configuration”, “Page Objects” and “Actions/Verifications”.

#### Common
Here you can import and/or export all that CRISP is storing.
The storage includes data related to:
- all projects - saved pages, elements with their locators and assigned patterns;
- all frameworks - page object and actions\verifications patterns.

Click the button [Import storage] to import all project and framework data.

Click the button [Export storage] to export saved project and framework data into copied text or JSON file.
It is a great idea to Export your storage and share it with teammates.

#### Project
This is the tab to select and manage the necessary project with its pages.
##### Configuration
The sub-tab “Configuration” allows you to make the following actions:
1.  To view the list of existing projects or an empty list with the field to add a project.
2.  To add a new project and assign framework:
    1.  Enter project name and click ‘+’;
    2.  Select framework from the list (populated from another tab "Framework", see details in 'Framework' section.
    3.  Provide project description in the optional text area with hint “Enter description”.
    4.  Click [SAVE] -> the project is displayed in the list.
    5.  Click [CANCEL] if you want to cancel entered changes.
    6.  Note: If a project has already been added with the same name and framework, an error message is displayed “Unable to save. A record with name: test !_1, type: action and selected framework has already existed”. It’s necessary to make a project name unique or select another framework in order to avoid duplicates.
3.  To view project details (assigned framework):
    1.  Select project from the list -> list of frameworks is displayed in read-only mode.
 4.  To edit project name and/or select another framework:
     1.  Select project from the list and click [EDIT] icon -> project name and the list of frameworks are displayed.
     2.  Change project name and/or select another framework if needed.
     3.  Click [SAVE] to apply changes.
     4.  Click [CANCEL] if you want to cancel entered changes.
5.  To delete saved projects:
    1.  Click [DELETE] icon for the project in the list -> confirmation popup is displayed with the text "Are you sure you want to delete the whole project with its pages and saved elements? ".
    2.  Click [DELETE] button on the popup -> the project with its saved pages will be removed from the list and storage. It will be also removed from selecting the project in ELEMENTS screen.
    3.  Note: List of frameworks will not be changed, only relation between deleted project and framework will be destroyed.
6. To copy a project:
    1.  Click [COPY] icon for the project with name “OriginalProject” in the list -> the project with its saved pages will be copied and added with project name “OriginalProject_1” to the list and storage.
    2.  If you click [COPY] icon again for the project with name “OriginalProject” -> one more copied project with the same saved pages will be added to the list with name “OriginalProject_2”.
    3.  If you click [COPY] icon for the copied project with name “OriginalProject_1” -> copy of the copied project with the same saved pages will be added to the list with name “OriginalProject_1_1”.
 7.  To set a project:
     1.  Go to the list of projects and select the radio button next to the necessary project -> confirmation popup is displayed with the text "Are you sure you want to switch to the project: ${project name}?”.
     2.  Click [OK] -> project will be set. Label “Project” in the line with the top menu follows the value of the selected project in the read-only mode.
  
Click the button [Import Project] to import only project data.

Click the button [Export Project] to export selected project data into copied text or JSON file.

##### Saved Pages
Here you can manage the list of pages of your application which is under the test.

List of saved pages is displayed for the selected project.

The following actions are available for the list of saved pages:
1.  To add a new page:
    1.  Enter page name.
    2. Click [+]’ -> the page name is saved and displayed in the list.
    3. Note: Page name should be unique within a project. If a page has already been added with the same name within 1 project, an error message is displayed “Unable to save. A record with name: {pageName} and selected project has already existed”. It’s necessary to make a page name unique or select another project in order to avoid duplicates.
2.  To edit a page:
    1. Select saved page from the list and click [EDIT] icon -> page name is editable.
    2. Change page name.
    3. Click [SAVE] to apply changes.
    4. Click [CANCEL] if you want to cancel entered changes.
3. To delete a page:
    1. Click [DELETE] icon for the page name in the list -> confirmation popup is displayed with the text "Are you sure you want to delete this page? ".
    2. Click [DELETE] button on the popup -> the page will be removed from the list and storage.
 4. To copy a page:
    1. Click [COPY] icon for the page with name “OriginalPage” -> the page will be copied and added with project name “OriginalPage_1” to the list and storage.
    2. If you click [COPY] icon again for the page with name “OriginalPage” -> one more copied page will be added to the list with name “OriginalPage_2”.
    3. If you click [COPY] icon for the copied page with name “OriginalPage_1” -> copy of the copied page will be added to the list with name “OriginalPage_1_1”.
    4. Note: Two different projects can have pages with the duplicated names, but one project cannot have two pages with the same name.

Click the button [Import Saved Pages] to import only project data.

Click the button [Export Saved Pages] to export selected project data into copied text or JSON file.

Click the button [Remove all] -> confirmation popup is displayed with the text "Are you sure to delete each Page with saved Elements? ". Click [OK] button on the popup -> all saved pages with their elements will be removed from the list and storage. Click [Cancel] button on the popup to leave the list of saved pages with no changes.

#### Framework
This is the tab to add and manage a framework with its Page Objects and Actions/Verifications patterns.
##### Configuration
The sub-tab “Configuration” provides the following actions:
1.  To view the list of existing frameworks or an empty list with the field to add a framework.
2.  To add a new framework:
    1.  Enter a framework name.
    2.  Click [+] -> the framework with the entered name is saved and added to the list.
    3.  Provide framework description in the optional text area with hint “Enter description”.
    4.  Added framework will be defined as default for adding patterns in PO and Actions/verifications. After adding a framework if you go to the next sub-tabs “Page Objects” or “Actions/Verifications” -> this framework will be displayed as selected.
    5.  Note: If a framework has already been added with the same name, an error message is displayed “Unable to save. A record with name: “name” already exists”. It’s necessary to make a framework name unique in order to avoid duplicates.
3. To edit a framework name:
    1.  Select a framework from the list and click [EDIT] icon -> framework name is editable.
    2.  Change the framework name.
    3.  Click [SAVE] to apply changes.
    4.  Click [CANCEL] if you want to cancel entered changes.
4.  To copy a framework:
    1.  Click [COPY] icon for the framework with name “OriginalFramework” in the list -> the framework with its PO patterns and Actions/Verifications will be copied and added with framework name “OriginalFramework_1” to the list and storage.
    2.  If you click [COPY] icon again for the framework with name “OriginalFramework” -> one more copied framework with the same PO patterns and Actions/Verifications will be added to the list with name “OriginalFramework_2”.
    3.  If you click [COPY] icon for the copied framework with name “OriginalFramework_1” -> copy of the copied framework with the same PO patterns and Actions/Verifications will be added to the list with name “OriginalFramework_1_1”.
5.  To delete saved frameworks:
    1.  Click [DELETE] icon for the framework in the list -> show confirmation popup "Are you sure you want to delete the whole framework with its Page objects and Actions/verifications patterns? ".
    2.  Click [DELETE] button on the popup -> the framework with its PO and actions patterns will be removed from the list and storage. It will be also removed from selecting the framework in Project -> Configuration screen.
    3.  Note: If the deleted framework was assigned for a project, the project will be displayed in red as invalid with a message to select another framework.

Click the button [Import Framework] to import only framework data.

Click the button [Export Framework] to export selected framework data into copied text or JSON file.
##### Page Objects
The sub-tab “Page Objects” allows you to add and manage patterns for a framework as the base for Page Objects generation. 

Before making any changes to a pattern it’s necessary to select framework in the dropdown with added framework (populated from “Configuration” sub-tab). The selected framework will define scope of patterns, which is displayed in the list below.

How to add a new pattern for Page Objects:
1. Select a framework in the dropdown.
2. Enter a unique pattern name in the text input.
3. Click [+] button.
4. Enter pattern itself in the text area with a hint “Enter pattern”. 
     - Note: You can use variables in your patterns, such as elementPage, elementName, elementDescription, elementId, elementCss, elementXPath, parentElementName, parentElementDescription, parentElementPage, parentElementId, parentElementCss, parentElementXPath. You can use custom variables as well.
    - To add a variable to your pattern, just put the variable name inside of curly brackets and mark what you got with the dollar at the beginning like here: ${variable}. E.g. use ${elementId} in your pattern if you want CRISP to put the real element Id on this place. Values for custom variables should be provided during actions assignment from Add\Edit element page.
5. If needed, select a framework in the dropdown above the text area.
6. Click [Save] button to apply changes or [Cancel] to cancel changes.

Other actions are available for a pattern within a selected framework:
- Edit pattern:
     - Select a pattern from the list and click [EDIT] icon -> fields with pattern name, related framework and pattern itself are displayed and editable.
     - Change any value in a field.
     - Click [SAVE] to apply changes. 
     - Click [CANCEL] if you want to cancel entered changes.
- Copy pattern:
     - Select a pattern from the list and click [COPY] icon for the pattern in the list -> the pattern will be copied, including related framework and pattern itself. 
     - The copied pattern will be added with a pattern name “OriginalPatternName_1” to the list and storage. 
- Delete pattern:
     - Select a pattern from the list and click [DELETE] icon for the pattern name in the list -> confirmation popup is displayed with the text "Are you sure you want to delete this pattern? ". 
     - Click [DELETE] button on the popup -> the pattern will be removed from the list and storage.

Click the button [Restore basic PO patterns] -> the confirmation popup “Are you sure to load defaults for page object patterns?” will be displayed. After clicking “OK” button, previously added Page Objects patterns will be reset to default patterns.

Click the button [Import PO patterns] if you want to import patterns from json file. Please take into account that it will rewrite existing patterns.

Click the button [Export PO patterns] to export added patterns to json file.
##### Actions/Verifications
The sub-tab “Actions/Verifications” is similar to the sub-tab “Page Objects”, as it also allows to add and manage patterns. The difference is that these patterns will be used for Test Actions or Methods generation.

How to add a new pattern for Actions/Verifications:
1.  Select a framework in the dropdown.
2.  Enter a unique pattern name in the text input.
3.  Click the [+] button.
4.  Enter pattern itself in the text area with a hint “Enter pattern”.
     1.  Note: You can use the following standard variables in your Actions patterns: elementName, elementDescription, elementPage, elementId, elementCss, elementXPath, parentElementName, parentElementDescription, parentElementPage, parentElementId, parentElementCss, parentElementXPath and any other custom variable names.
5. If needed, select a framework in the dropdown above the text area.
6. Click [Save] button to apply changes or [Cancel] to cancel changes.
  
Other actions are available for a pattern within a selected framework:
-   Edit pattern:
    -   Select a pattern from the list and click [EDIT] icon -> fields with pattern name, related framework and pattern itself are displayed and editable.
    -   Change any value in a field.
    -   Click [SAVE] to apply changes.
    -   Click [CANCEL] if you want to cancel entered changes.
-   Copy pattern:
    -   Select a pattern from the list and click the [COPY] icon for the pattern in the list -> the pattern will be copied, including related framework and pattern itself.
    -   The copied pattern will be added with a pattern name “OriginalPatternName_1” to the list and storage.
-   Delete pattern:
    -   Select a pattern from the list and click the [DELETE] icon for the pattern name in the list -> confirmation popup is displayed with the text "Are you sure you want to delete this pattern? ".
    -   Click [DELETE] button on the popup -> the pattern will be removed from the list and storage.
  
Click [Restore basic Actions patterns] button -> it will reset Actions patterns to default patterns.

Click [Import Actions patterns] button if you want to import patterns from json file.

Click [Export Actions Patterns] to export patterns to json file.

### Add element
“Add element” screen is displayed after clicking the related icon [+] in the top menu. At this screen you can find element locators and save entered element info for further test output generation.

Label “Project” has the value of the project which is selected at the “Settings” tab.

Within the defined project you can add elements in the following steps:
1.  Select a page from the list of saved pages (which is populated from “Settings” ->”Project”->”Saved pages” sub-tab).    
2.  Enter a unique name for an element in “Element name” input.
    1.  Note: Cannot be empty, otherwise an error message “Please enter an element name” will be displayed under the input and the element is not added.
3.  Enter additional information about an element in ‘Element description“ input if needed.
4.  Select suitable PO pattern in “Page object pattern” dropdown menu, which has values of added PO patterns within the assigned framework for the selected project.
 5.  Select necessary Actions/Verification pattern in “Actions/Verifications” dropdown menu, which is populated with values of added Actions patterns within the assigned framework for the selected project.
 6. Launch the “Inspect” tool and select the necessary element at the page. As a result, CRISP will populate found locators of the element into the related fields “ID”, “CSS”, “xPath”. The values of locators are editable and can be manually corrected if needed.
 7. Select parent element for the element if it has hierarchical structure. By default it’s set as “None”.
 8. Click [Save] button if you need to add only one element and quickly generate the test output. After clicking the button you will be redirected to the “Main page” screen with the saved element (more details in 'Elements' section).
9.  Click [Save & Add New] button if you need to continue adding several elements before generating the test output. The element will be saved to “Elements” section without redirecting to “Main page” screen, and you will stay at the “Add element” page to add a new element.
10.  Click [Cancel] button if you don’t need to save entered info about an element.

### Add elements in bulk
The screen “Add elements in bulk” is displayed after clicking the icon![](https://lh4.googleusercontent.com/cskwwG04R3I8uxBSFTMaD5nq4KEX0YOB4PyqdGPqoZoOyVS3h3AA84pl08tTBpP0sftoTj1twdtnrkgC4gwQVMP6s4wYBsNOwd_-u_Tq9ou-DdCA2F7OIzd6u_IMHe3DRRy6PlkF)from the top menu. This screen allows you to add many elements at once based on a common attribute.

Value of the selected project follows the “Project” label in the level of the top menu and can be changed in the 'Configuration' sub-tab.

To add elements in bulk, you should perform the following actions:
1.  Select the necessary page for elements from the dropdown “Page”, which is filtered by a project.
2.  Select Page object pattern from the list of patterns within the defined framework.
3.  Define an attribute as a criteria to select particular elements.
4.  Click [Extract & Save] button.
    
As a result, you will be redirected to the Main page, where found elements will be added to the table within the tab of the selected page. Next actions are described in the section 'Main page'.

### Main page
The main page is displayed after clicking the list icon at the top menu or after redirecting from the “Add element” page when a new element is added. The page consists of 2 main sections: “Elements” and “Generated Output”.

#### Elements
Section “Elements” is split into tabs per each page which was added in the Settings -> Configuration within the selected project. Value of the selected project follows the “Project” label in the level of the top menu and can be changed in the 'Configuration' sub-tab.

The table is populated with saved elements and its assigned actions, with possibility to edit or delete an element.

By default the table includes columns “Element”, “Actions/Verifications”, “Manage elements”. To show more columns “PO Pattern” and “PO Params”, you should click the “Manage elements” column name.

The following actions are available for an element within the table:
1.  To change an element: click [EDIT] icon in the right column for a row and provide changes at the redirected “Edit element” page. Click [SAVE] or [CANCEL] to save or cancel entered changes.
2.  To remove an element from the table and storage: click [DELETE] icon in the right column for a row.
3.  To generate a test only for one element: click “Output” icon in the right column for a row and see results in the next section 'Generated Output'.

After selecting a tab of another page a new table will be displayed with elements of the selected page.

Click [Generate for page] button and CRISP will generate the test code for all elements within one selected page and provide this result in 'Generated Output' section.

Click [Generate for all pages] button -> it will generate the test code for all saved pages and display the result in 'Generated Output' section.

#### Generated Output
The section has 2 tabs “Page Objects” and “Test Actions\Verifications” with a text area, which is populated with generated test results for each page. If test output is generated for all pages, page name will be displayed as a comment with // before page name.

Text area is editable and test results can be modified before its copying.

Click [Copy] button to copy the displayed test result into clipboard and then paste it into a testing tool or IDE.

Click [Clear] button to clear generated test result from the text area.