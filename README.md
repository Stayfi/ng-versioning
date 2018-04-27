# ngVersioning v1.0.2

Versioning support for Angular.

## Description

Script to handle versioning for angular.

* set a version number
* bump version (fix, minor, major)

Automatique update files :
* package.json
* environments/environment

Simply get your application version number into a component from environment variables.

## Demonstration

```bash
$ git clone https://github.com/Stayfi/ng-versioning.git
$ cd ng-versioning
$ npm install
$ ng serve
```

Open your browser on http://localhost:4200/

Update version number :

```bash
$ npm run version get
App version : 1.0.0
$ npm run version set 2.0.0
```

App version number in your browser will show **`2.0.0-DEV`**.

And no prefix in prod : **`2.0.0`**.

```bash
$ npm run version bump minor
```

App version number in your browser will show **`2.1.0-DEV`**.


## Installation

### Copy the file "`ng-versioning.js`" to the root folder

### Add dependencies :
```bash
$ npm install --save-dev replace-in-file
$ npm install --save-dev semver
```

### Add version to "`environments/environment`" files:
```javascript
export const environment = {
  ...,
  version: '1.0.0'
};
```

### Update components who need to show version number :

* Import : `import { environment } from '../environments/environment';`
* Into Class Component : `appVersion: String = environment.version;`

#### src/app/app.component.ts :
```javascript
import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appVersion: String = environment.version;
  title = 'app';
}
```
#### src/app/app.component.html :
```html
App v.{{appVersion}}
```

## USAGE

```bash
$ node ./ng-versioning.js get
App version : 1.0.0
$ node ./ng-versioning.js set 2.0.0
> 2.0.0
$ node ./ng-versioning.js bump fix
> 2.0.1
$ node ./ng-versioning.js bump minor
> 2.1.1
$ node ./ng-versioning.js bump major
> 3.1.1
```

Or add into **'package.json'** :
#### package.json :
```javascript
        "scripts": {
          ...,
          "version": "node ./ng-versioning.js"
        }
```
And run it with npm :
```bash
$ npm run version get
App version : 1.0.0
$ npm run version set 2.0.0
> 2.0.0
$ npm run version bump fix
> 2.0.1
$ npm run version bump minor
> 2.1.1
$ npm run version bump major
> 3.1.1
```

### Adding another 'environment' file

Add into **'ng-version.js'** :
#### package.json :
```javascript
if (versionNumber) {
    ...
    updateFile("src/environments/environment.hmr.ts", "\"", "HMR");
}
```
updateFile params :
* "file" : Environment file to update version (src/environments/environment.xxx.ts)
* "Quotation" : "'", "\\"" or "" (simple, double, none)
* "Prefix" : Prefix addind to the version number (x.x.x-Prefix)

## Credits
Stayfi B. - <stayfi@gmail.com>

## Versions

#### 1.0.2
Adding "get" to show actual version number.
Adding check for dependencies.

#### 1.0.1
Fix: README.md.

#### 1.0.0
First version, working.

## License
MIT license