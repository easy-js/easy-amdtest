easy-amdtest [![Build Status](https://travis-ci.org/easy-js/easy-amdtest.png)](https://travis-ci.org/easy-js/easy-amdtest)
============

Class for quickly and easily testing AMD modules. The goal if this library is to abstract much of the boiler necessary to test both locally ,in a headless browser, and in the cloud, with a 3rd party service.

#### Current Support

**Frameworks:**

* Mocha

**Platforms:**

* SauceLabs


---

## Install

```
$ npm install easy-amdtest`
```

```
bower install easy-amdtest
```


---

## API

**Note:** EasyAMDTest is exposed to the window object and can be access globally.

### EasyAMDTest(configuration)

Class for quickly and easily testing AMD modules.

##### PARAMETERS:

* **\*configuration**: Object -- Requirejs configuration object.

##### RETURNS:

EasyAMDTest instance.

##### EXAMPLE USAGE:

```
var tests = new EasyAMDTest({
  baseUrl: '../src',
  paths: {
    'underscore': '/bower_components/underscore/underscore'
  }
});
```

### EasyAMDTest.run(options)

Run your test suite. See [frameworks](#frameworks) for more information regarding what options may be passed.

##### PARAMETERS:

* **\*options**: Object
  * **\*name**: String - Name of the test [framework](#frameworks) to use.
  * **\*opts**: Object - Options for the given [framework](#frameworks).

##### EXAMPLE USAGE:

```
new EasyAMDTest(requireConfig).run({
  name: 'mocha',
  opts: {
    style: 'bdd'
  }
});
```

---

## Frameworks

#### Mocha
**name**: `mocha`

**opts**:

  * **style**: String -- `bdd` or `tdd` 
  

---

## TESTS

### Local

**Install Dependencies**

```
npm install
```

```
bower install
```

**Run/View**

```
grunt test-local
```

---

## License

The MIT License (MIT) Copyright (c) 2014 First Opinion

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.