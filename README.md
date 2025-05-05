# enshrouded-host



## Getting-Started

1. download [steamcmd](https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip)
2. unzip to `C:\EnshroudedServer`
3. start `C:\EnshroudedServer\steamcmd.exe` to update
4. run: 
```
login anonymous
force_install_dir ./enshrouded_dedicated_server
app_update 2278520 validate
quit
```
5. clone this repo as subdirectory to `C:\EnshroudedServer\enshrouded-host`
6. create `.env`
```
SERVER_PATH="C:\EnshroudedServer\enshrouded_dedicated_server\"
DISCORD_WEBHOOK_URL=xxx
```
7. run `npm install`
8. Open `win+r` > `shell:startup` 
9. Copy `start.cmd` to startup folder