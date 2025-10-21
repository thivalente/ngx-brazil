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

### If there is the folder ngx-brazil\dist\ngx-brazil:
Go to ngx-brazil\dist\ngx-brazil and run e clean the cache:
```
npm unlink ngx-brazil
ng cache clean
npm cache clean --force
cd ..\..
```

### Generate the dist and create local link (symlink)
Go to ngx-brazil folder and run:
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
ng serve

```

### After the tests, clean up:
Go again to ngx-brazil\dist\ngx-brazil and run e clean the cache:
```
npm unlink ngx-brazil
ng cache clean
npm cache clean --force
```

## Upload to npm
1. Update the version in [README.md](./ngx-brazil/README.md) [package.json](./ngx-brazil/package.json) and [src/package.json](./ngx-brazil/package-install.json).
Go to ngx-brazil folder and run:
```
npm run build:lib
cd dist/ngx-brazil
npm login
npm publish
```

## Upload to Stackblitz
1. Go to [https://stackblitz.com/edit/ngx-brazil](https://stackblitz.com/edit/ngx-brazil)
2. Login with GitHub
3. Open the file `package.json` and update the version to the new one
4. Run the command in the terminal:
```
npm install ngx-brazil@<new_version>
ng serve
```

### Next Steps
1. Separate demo project repository from the main project
2. Update Stackblitz link to point to the new demo project