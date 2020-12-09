# Storage API (Golang)

This service is an API that serves assets that made with golang.

## Installation ( Manual )

This service's installation is so easy. You can install it by follow the steps below:

**Note:**  First of all, check your machine has golang. If it hasn't it, you can find it [here](https://golang.org/)

- Clone this repository with git

```sh
    git clone https://github.com/ali-furkqn/Website website
    cd website/services/storage
```

- Download Dependencies

```sh
    make install
```

- Copy `.env.example` and paste it as `.env`, fill the fields
- Download [**Service account key**](https://console.cloud.google.com/apis/credentials/serviceaccountkey) as JSON and copy here (change file's name to `firebase.json` )

- Start the application
    - To start as development mode with hot reloading: Use `make watch`
    - To start as production mode:
        - Build the application `make`
        - Start the generated binary file. For example: `"./main"`

### Installation ( With Container )

If you don't want to deal it as above, your pc need just a docker. *You can find docker [here](https://www.docker.com/get-started)*

```sh
    git clone https://github.com/ali-furkqn/Website website
    cd website/services/storage
    # Build with docker
    docker build -t storage .
    # Run Storage Container
    docker run -d -p 8080:8080 -t storage
```



## Commands (Makefile)

|   Command                 | Description                               |
|---------------------------|-------------------------------------------|
|`make start`               | Start in development mode                 |
|`make watch`               | Start with hot reload in development mode |
|`make build`               | Build the project                         |
|`make install`             | Format all files                          |

## License

This service is [MIT licensed](./blob/master/LICENSE).
