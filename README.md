# Codeflix

This a project by fullcycle to build a backend using typescript and following the patterns of DDD and clean arch.

# Docker setup

- This project was configured using docker.
- I used the dockerfile to build a image of node-slim, that is a stable and optimized image of node.
- To get easier to run this application i also use the docker-compose.yaml to define the services, volumes and networks that i want.

# Run application

- To run this application you need to install docker;
- Run the command to up your container:
  ```
    docker-compose up
  ```
- If you want, open other terminal and run the following command to get in the container:

```
  docker-compose exec app bash
```

# Typescript setup

- For the init config i installed the typescript running the follow command:
  ```
   npm install typescript @types/node --save-dev
  ```
- And i installed the ts node to transforms TypeScript into JavaScript, to enabling to directly execute TypeScript on Node.js without precompiling.
  ```
   npm install ts-node --save-dev
  ```
- Than i added the scripts ts-node and tsc inside the package.json
- To create the configuration typescript file(tsconfig.json) i runned this command:

```
  npx tsc --init
```

- In the tsconfig.json i changed the target to es2017, enabled the incremental to true, set baseUrl to "./src" and added the key include to value ["src/"],
  just in case of run in the watch mode the javascript watches only the files that are in the src.

# Jest setup

- To install jest run:

```
 npm install jest @types/jest --save-dev
```

- To create the jest configuration file run:

```
 npx jest --init
```

- In the jest.config.ts i changed the rootDir to src, testRegex to find all tests with spec.ts and transform to compilation the typescript.
- Than i ran the command o install swc:

```
 npm install @swc/core @swc/jest --save-dev
```

# Coverage setup

- Enable coverageDirectory prop in jest.config.ts and set a folder "__coverage" and add this folder in .gitignore.
- If you want to generate a report, enable the prop coverageReporters with html and json. 
- If you want a block in the CI/CD enable the prop coverageThreshold with the minium value of percentage.
- Run ``` npm run test -- --coverage ``` and than you can see the coverage in the terminal.
- Add the script "test:cov" in the package.json with the value ``` npm run test -- --coverage ``` to create a shortcut omand of coverage.

# Check for typescript errors

- Run the command ``` npm run tsc -- --noEmit ``` to check if exists typescript errors in the application. 
- Add the the script "test:cov" in the package.json with the value ``` npm run tsc -- --noEmit ``` to create a shortcut comand of errors in typescript.

# Using workspaces

- To install one package from root, use ```npm install PACKAGE -w NAME_WORKSPACE```
- To run one package from root, use ```npm run COMMAND -w NAME_WORKSPACE```
- If you wanna run one command from more than one project, run ```npm run test --workspaces```

# Using nestjs

- Inside project nest run the command ```nest g resource``` to create resource folder that you want work.  