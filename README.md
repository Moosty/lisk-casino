# Lisk Casino - HackOnLisk Project
Lisk Casino is a functioning blockchain application build with the Lisk SDK. 
The RNG module generates deterministic pseudo random numbers using a seed block hashes in combination with a custom seed
to add flexible usage. Blackjack and lottery games are added as an example use for the rng module.

![Custom badge](https://img.shields.io/badge/Lisk%20SDK-v5.1.1-4070f4?link=https://github.com/LiskHQ/lisk-sdk/&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTc5cHgiIGhlaWdodD0iMjEzcHgiIHZpZXdCb3g9IjAgMCAxNzkgMjEzIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1MS4zICg1NzU0NCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+R3JvdXA8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yLjAwMDAwMCwgMC4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTY5Ljc5MjI3OTksMjExLjkyOTM3MyBMOTcuMzM3NzkxNywxODAuNzg2MTg4IEM5Ny44MDIwNDE5LDE4MC4zMTkwNCA5Ny40OTI1NDE3LDE3OS41NDA0NiA5Ni43MTg3OTE0LDE3OS41NDA0NiBMNjYuMzg3Nzc4NCwxNzkuNTQwNDYgQzY2LjIzMzAyODQsMTc5LjU0MDQ2IDY1LjkyMzUyODIsMTc5LjM4NDc0NSA2NS43Njg3NzgyLDE3OS4yMjkwMjkgTDQwLjA4MDI2NzIsMTUwLjI2NTg2NyBDMzkuOTI1NTE3MSwxNDkuOTU0NDM1IDM5Ljc3MDc2NywxNDkuNjQzMDAzIDM5LjkyNTUxNzEsMTQ5LjMzMTU3MSBMODIuOTQ2MDM1NSw3NS4wNTUwNzU0IEM4My4xMDA3ODU2LDc0Ljc0MzY0MzYgODMuMTAwNzg1Niw3NC40MzIyMTE3IDgyLjk0NjAzNTUsNzQuMjc2NDk1OCBMNjUuMTQ5Nzc3OSw0My40NDQ3NDI4IEM2NC44NDAyNzc4LDQyLjk3NzU5NSA2NC4wNjY1Mjc0LDQyLjk3NzU5NSA2My43NTcwMjczLDQzLjQ0NDc0MjggTDAuMTU0NzUwMDY2LDE1My4zODAxODUgQzEuNzM0NzIzNDhlLTE2LDE1My42OTE2MTcgMS43MzQ3MjM0OGUtMTYsMTU0LjAwMzA0OSAwLjE1NDc1MDA2NiwxNTQuMzE0NDgxIEw1MS4yMjIyNzE5LDIxMi4wODUwODkgQzUxLjM3NzAyMiwyMTIuMjQwODA0IDUxLjUzMTc3MjEsMjEyLjM5NjUyIDUxLjg0MTI3MjIsMjEyLjM5NjUyIEw2OS4xNzMyNzk2LDIxMi4zOTY1MiBDNjkuMzI4MDI5NywyMTIuMjQwODA0IDY5LjYzNzUyOTgsMjEyLjA4NTA4OSA2OS43OTIyNzk5LDIxMS45MjkzNzMgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNODguNjcxNzg4LDAuNDY3MTQ3NzcyIEw3MC43MjA3ODAzLDMxLjI5ODkwMDcgQzcwLjU2NjAzMDIsMzEuNjEwMzMyNiA3MC41NjYwMzAyLDMxLjkyMTc2NDQgNzAuNzIwNzgwMywzMi4wNzc0ODA0IEw4OS4yOTA3ODgyLDY0LjE1NDk2MDcgTDEzOC41MDEzMDksMTQ5LjE3NTg1NSBDMTM4LjY1NjA1OSwxNDkuNDg3Mjg3IDEzOC42NTYwNTksMTQ5Ljc5ODcxOSAxMzguMzQ2NTU5LDE1MC4xMTAxNTEgTDExMi4zNDg1NDgsMTc5LjM4NDc0NSBMODQuNjQ4Mjg2MiwyMTAuODM5MzYxIEM4NC4xODQwMzYsMjExLjMwNjUwOSA4NC40OTM1MzYyLDIxMi4wODUwODkgODUuMjY3Mjg2NSwyMTIuMDg1MDg5IEwxMjYuNzQwMzA0LDIxMi4wODUwODkgQzEyNi44OTUwNTQsMjEyLjA4NTA4OSAxMjcuMjA0NTU0LDIxMS45MjkzNzMgMTI3LjM1OTMwNSwyMTEuNzczNjU3IEwxNzguNDI2ODI2LDE1NC4wMDMwNDkgQzE3OC41ODE1NzYsMTUzLjY5MTYxNyAxNzguNzM2MzI3LDE1My4zODAxODUgMTc4LjU4MTU3NiwxNTMuMDY4NzUzIEw4OS45MDk3ODg1LDAuNDY3MTQ3NzcyIEM4OS43NTUwMzg0LC0wLjE1NTcxNTkyNCA4OC45ODEyODgxLC0wLjE1NTcxNTkyNCA4OC42NzE3ODgsMC40NjcxNDc3NzIgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)
# Demo
A demo can be tried out at: [casino-demo.moosty.com](https://casino-demo.moosty.com)
Create an account and get free tokens to play around with.

# Installation
## Clone
Clone this repository at the desired location:

`git clone https://github.com/Moosty/lisk-casino.git`

## Backend
First make sure you have node version `v12.22.x` installed on your machine.
```cmd
cd lisk-casino/backend
npm install
```

## Frontend
```cmd
cd lisk-casino/frontend
npm install
```

# Run
To run the blockchain application after successful installing the backend and frontend, you need to open two terminals:
## Backend
```cmd
cd lisk-casino/backend
./bin/run start --enable-http-api-plugin
```

## Frontend
```cmd
cd lisk-casino/frontend
npm run start
```
This will open the browser at `http://localhost:3000/` where you can use the app.

Copyright 2021 Moosty

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
