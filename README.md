[![](https://img.shields.io/badge/mino_1.0.0-passing-green)](https://github.com/gongahkia/mino/releases/tag/1.0.0)

# `Mino`

...

## Stack

* *Script*: [Python]()
* *Dependancies*: []()
* *Graphics API*: []()
* *Package*: [Docker]()
* *Test*: []()

## Usage


The below instructions are for running `Mino` on your client machine.

1. Execute the below.

```console
$ git clone https://github.com/gongahkia/Mino && cd Mino
```

2. Build and run Docker Image for [Production](./Dockerfile).

```console
docker build -t mino-prod -f Dockerfile .
docker run --rm -it -p 8000:8000 mino-prod
```

3. Build and run Docker Image for [Development](./Dockerfile.dev).

```console
docker build -t mino-dev -f Dockerfile.dev .
docker run --rm -it -v $(pwd):/app -p 8000:8000 mino-dev
```

## Architecture

```mermaid

```

## Reference

The name `Mino` is shorthand for "Minus One", referring to `Mino`'s handling of ...
