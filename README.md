# Ski Haus Calculator

[![Netlify Status](https://api.netlify.com/api/v1/badges/6effc2a6-a64a-4fc8-a41c-b11e96239476/deploy-status)](https://app.netlify.com/sites/ski-haus-calculator/deploys)

## Development

### Required Software

- [direnv](https://direnv.net)
- [git](https://git-scm.com/)
- [node](https://nodejs.org/en/download/)
- [pre-commit](https://pre-commit.com/#install)

### Getting Started

**Setup**

```sh
$ git clone git@github.com:jteppinette/ski-haus-calculator.git && cd ski-haus-calculator
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