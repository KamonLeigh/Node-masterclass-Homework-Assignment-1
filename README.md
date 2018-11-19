#NODE Masterclass
## Assignment 01

### Aim
Create a simple RESTful JSON API with a welcome message


### Instructions
On root of the folder

For staging:
```
     $ node index.js || $ NODE_ENV=staging node index.js

    The server is listening on port 3000 in staging mode
    The server is listenig on port 3001 in staging mode
```

For production:
```
     $ node index.js || $ NODE_ENV=production node index.js

    The server is listening on port 5000 in staging mode
    The server is listenig on port 5001 in staging mode
```


** Send POST request to: http://localhost:3000/hello in this format**
Adjust endpoint accordingly if needed.

```
    {
        "name": "add your name"
    }

```

press ctrl + c to stop the servers



