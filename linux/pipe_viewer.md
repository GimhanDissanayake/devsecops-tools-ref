### pv, or Pipe Viewer, is a command-line tool that allows you to monitor data transfer progress within your terminal.

```
This provides valuable insights such as:

- Transfer speed
- Elapsed time
- Completion percentage
- Estimated time remaining

Example 1: Here's a command demonstrating how to use pv during an import:
pv backup.sql | mysql -h rds-amazonaws-com -u bibinwilson -p my_db

Example 2: gzip -c access.log > access.log.gz

$ pv access.log | gzip > access.log.gz
<strong>611MB 0:00:11 [58.3MB/s] [=>      ] 15% ETA 0:00:59</strong>

* Pipe viewer acts as **cat** here
```

### [Ref](https://catonmat.net/unix-utilities-pipe-viewer)

