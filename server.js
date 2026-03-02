const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;

// In Memory All Clients Storage for this Assignment
const clients = new Map();

/*Register Client

POST /clients
Body:{
"clientId":"c1",
"limitPerMinute" :100
}

*/
app.post("/clients", (req, res) => {
  console.log("request", req);
  const { clientId, limitPerMinute } = req.body;

  if (!clientId || !limitPerMinute) {
    return res.status(400).json({ error: "Bad Request" });
  }

  clients.set(clientId, {
    limit: limitPerMinute,
    timestamps: [],
  });
  return res.status(200).json({ message: "Client has registered" });
});

/* Check Request Allowance

GET /allow/:clientId

Response:{
"allowed" : true/false
}

*/

app.get("/allow/:clientId", (req, res) => {
  const { clientId } = req.params;
  const client = clients.get(clientId);
  if (!client) {
    return res.status(404).json({ error: "Client Not found" });
  }

  const currentTimeStamp = Date.now();
  // 1 min of duration check
  const timeStart = currentTimeStamp - 60 * 1000;
  const totalTimestamps = client.timestamps.filter((ts) => ts > timeStart);

  //Core logic - if number of request in current window is less than allowed limit , then allow request
  if (totalTimestamps.length < client.limit) {
    client.timestamps.push(Date.now());
    return res.json({ allowed: true });
  } else {
    return res.json({ allowed: false });
  }
});

app.listen(PORT, () => {
  console.log("server has started");
});

/*

Concurrency / thread safety
Used Node.js and Express Js
It is a single threaded event loop so map operations are safe per request cycle but if you are using java, .NET or multi-threaded evn you should use
concurrenthasmap, synchronized blocks Or atomic operations
In distribute system:
I have used in memory but in distributed use redis instead

Scalability approach
Since i have used in-memory , scalability will break since each container will have its own memory. For production solution use Redis instead

Memory growth handling
If client stops sending request, timestamp array will stay so need periodic cliean up. For production with redis us redis with expiry




*/
