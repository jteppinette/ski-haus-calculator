# Ski Haus Calculator

[![pre-commit](https://github.com/jteppinette/ski-haus-calculator/actions/workflows/pre-commit.yml/badge.svg?branch=main)](https://github.com/jteppinette/ski-haus-calculator/actions/workflows/pre-commit.yml)

## Development

### Required Software

- [direnv](https://direnv.net)
- [git](https://git-scm.com/)
- [nvm](https://formulae.brew.sh/formula/nvm#default)
- [pre-commit](https://pre-commit.com/#install)

### Getting Started

**Setup**

```sh
$ direnv allow
$ pre-commit install
$ npm install
```

**Watch & Serve**

```sh
$ npm run dev
```

```sh
$ open http://localhost:1234/
```

### Build

```sh
$ npm run build
```

### Analyze Bundle Size

```sh
$ npm run build -- --detailed-report
```
