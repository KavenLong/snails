---
title: Bit 私有化部署
date: 2022-07-24 16:38:40
permalink: /pages/6f95ae/
categories:
  - 工程化
tags:
  -
---

## 一、Bit 简介

Bit 是一个强大的组件协作平台，它能跨项目、跨存储库地隔离并管理组件。

[Bit 官网](https://bit.dev/docs/quick-start)

[Bit Docker 使用](https://github.com/teambit/bit/tree/master/scripts/docker-teambit-bit)

## 二、BVM 简介

BVM 是 Bit 的版本管理器。使用 BVM 可以更轻松地在单个环境中安装和管理多个版本的 Bit。

## 三、私有化部署

### 1.安装 BVM

```
npm i -g @teambit/bvm
yarn global add @teambit/bvm
```

### 2.安装 Bit

```
bvm install
```

### 3.使用 Dockerfile 制作 Docker 镜像

```
// Dockerfile
FROM node:12.22.0
USER root

RUN npm i @teambit/bvm -g
RUN bvm upgrade
ENV PATH=$PATH:/root/bin

# increase memory to avoid 137 error code
ENV NODE_OPTIONS=--max_old_space_size=4096

RUN bit config set analytics_reporting false
RUN bit config set no_warnings false
RUN bit config set interactive false
RUN bit config set error_reporting true

ARG SCOPE_PATH=/root/remote-scope
WORKDIR ${SCOPE_PATH}
RUN bit init --bare
CMD bit start
```

### 4.构建镜像

```
docker build -f ./Dockerfile-bit-server --build-arg BIT_VERSION={version} -t bitcli/bit-server:{version} .
docker build -f ./Dockerfile --build-arg BIT_VERSION=latest -t bitcli/bit-server:latest .
```

### 5.配置环境变量

```shell
// MacOS
echo 'export PATH=$HOME/bin:$PATH' >> ~/.zshrc && source ~/.zshrc

// Linux
echo 'export PATH=$HOME/bin:$PATH' >> ~/.bashrc && source ~/.bashrc
```

### 6.启动容器

```
docker run -it -v {scope-path-on-host}:/root/remote-scope -p {host-port}:3000 bitcli/bit-server:latest
docker run -it -v /bit-scope:/root/remote-scope -p 8000:3000 bitcli/bit-server:latest
```

### 7.访问 Bit 服务

```
http://xxxx.xxxx.xxxx:8000/
```
