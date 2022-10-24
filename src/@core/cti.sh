#!/bin/sh
# Script to create ts-index in all folders to facilitate the file imports.
# Tag i for ignore spec files.
# Tag b for not allow backups.

npm run cti create './src/@seedwork/application' -- -i '*spec.ts' -b &&
npm run cti create './src/@seedwork/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/@seedwork/infra' -- -i '*spec.ts' -b &&

npm run cti create './src/category/application' -- -i '*spec.ts' -b &&
npm run cti create './src/category/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/category/infra' -- -i '*spec.ts' -b