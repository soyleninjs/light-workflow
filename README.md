# Light Workflow

## Requisitos

- <a href="https://bun.sh/">Bun js</a>
- <a href="#extensiones-vscode">Extensiones de VSCode</a>

## Funcionamiento

- Esbuild se encarga de hacer los bundles, tanto para css como js
- Chokidar es el watcher que se encarga de monitorear los archivos, cada que pase un cambio, hace un rebuild de ESbuildJS

## Como usar

- Installar todas las dependencias con: 
 
    ```
    bun install
    ```
- Ejecutar el comando para inicializar el proceso de desarrollo:

    ```
    bun run dev
    ```
- Terminado el proceso de desarrollo podemos hacer build final de nuestro assets:
    ```
    bun run build
    ```

## Stylint (CSS)

Se integro el uso de <a href="https://stylelint.io/">Stylelint</a>, esto nos ayudara para dar formato al codigo de css, ya se cuenta con un conjunto de reglas preestablecidas gracias del plugin de <a href="https://www.npmjs.com/package/@shopify/stylelint-plugin">@shopify/stylelint-plugin</a>, junto a eso tenemos unas reglas custom que nos ayudaran a tener mas orden dentro de los archivsos CSS.

El formateo de codigo se hace cuando se guarda el archivo gracias a la extension de <a href="https://prettier.io/">Prettier</a> (configuracion ya preestablecida en .vscode/settings.json).

## Standard (Javascript)

Cuenta con un linter para JS llamado <a href="https://standardjs.com/readme-esla">StandardJS</a>, este nos ayudara a tener un conjunto de reglas modernas para el formatedo de codigo javascript.

Son un conjunto de <a href="https://standardjs.com/rules-esla#javascript-standard-style">reglas</a> que ayudaran a tener un codigo mas limpio, legible y consistente en cada proyecto, podremos seguir usando nuestro propio estilo de codigo y <a href="https://standardjs.com/readme-esla">StandardJS</a> se encarga del resto.

<a href="https://standardjs.com/readme-esla">StandardJS</a> cuenta con Eslint como dependencia, asi que las reglas generales provienen de Eslint, pero <a href="https://standardjs.com/readme-esla">StandardJS</a> agrega y modifica muchas de estas para un formato de codigo moderno.

Con la extension de <a href="https://eslint.org/">Eslint</a>, nos ayudara a previsualizar de manera visual los error que podemos obtener durante el desarrollo, y tambien, nos ayudara con el formateo de codigo de manera automatica al momento de guardar el archivo (configuracion ya preestablecida en .vscode/settings.json).

## Extensiones VSCode

Se Recomienda que se tengan instaladas todas estas extensiones para el uso completo y correcto del workflow, puedas instalarlas de manera manual con los siguientes enlaces o puedes ejecutar el comando en VSCode "**Extensions: Show Recommended Extensions**" para ver todas las extensiones rapidamente.

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)


