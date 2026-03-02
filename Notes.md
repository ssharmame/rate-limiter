Concurrency / thread safety
Used Node.js and Express Js
It is a single threaded event loop so map operations are safe per request cycle but if you are using java, .NET or multi-threaded evn you should use
concurrenthasmap, synchronized blocks
Or atomic operations

In distribute system:
I have used in memory but in distributed use redis instead

Scalability approach
Since i have used in-memory , scalability will break since each container will have its own memory. For production solution use Redis instead

Memory growth handling
If client stops sending request, timestamp array will stay so need periodic cliean up. For production with redis us redis with expiry
