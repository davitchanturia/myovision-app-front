## Setup

1. Change to project directory

2. Setup .env

    - create **.env** file to set environment variables using:
        ```shell
        cp .env.example .env
        ```
    - set two necessary environment variables:
        ```
        NUXT_PUBLIC_BACKEND_BASE=backend_url
        NUXT_PUBLIC_WEBSOCKET_BASE=websocket_url
        ```

3. Install depencenies
    ```shell
    npm ci
    ```

4. Build Application
    ```shell
    npm run build
    ```

## Starting Application
```shell
npm start
```
