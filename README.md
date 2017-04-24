# Lyst Front End Engineering Test

Over 400 stores are available on Lyst, this is a simple app that allows you to search for your favourite store. However it is only partially complete and requires you to finish it off.

### Getting started

To get started make sure you have [node](https://nodejs.org/en/) installed and then from the project root run:

```
$ npm install
```

Once that is complete run:

```
$ npm start
```

If you go to [http://localhost:8000/](http://localhost:8000/) in your browser you should see the a page with a text input in the middle. If you see this you are good to go. Any changes made to source files will trigger a re-build.

### Tasks:

* Address the TODO comments in [autocomplete.js](src/js/modules/autocomplete.js)
* Address the TODO comments in [autocomplete.less](src/css/modules/autocomplete.less)

### Notes

* You may use any JS library that can be installed via npm, if you do then make sure you install it with the `--save` flag so that is added to the package.json file.
* Please use ES2015 (ES6) syntax wherever possible and in lieu of a formal style guide, take care to maintain the existing coding style.
* Please feel free to explain any design decisions in comments in the code, but do not feel obliged to comment every line of code.

## Submitting
Create a zip file by running the following command from the root of the project and then email it your contact at Lyst.

```
$ zip -r lyst-technical-test.zip . -x@.gitignore
```
