There is some issues to work with, check it out

## Collaborate

Fork this project then install global libs:
```
npm i -g rimraf ng-packagr @angular/compiler-cli @angular/compiler tslib ngc
```

Finally working in the project folder:

```
npm i
npm run build:lib
npm run dist
npm run start
```

## Internal Tests (using local link)

### Uninstall ngx-brazil from npm
```
npm uninstall ngx-brazil
```

### If there is this folder ngx-brazil\dist\ngx-brazil:
Go to ngx-brazil\dist\ngx-brazil and run e clean the cache:
```
npm unlink ngx-brazil
ng cache clean
npm cache clean --force
cd ..\..
```

### Generate the dist and create local link (symlink)
```
npm run build:lib
cd dist/ngx-brazil
npm link
```

### Go to the demo project (outside ngx-brazil folder)
```
npm unlink ngx-brazil
ng cache clean
npm cache clean --force
npm install
npm link ngx-brazil
npm serve

```