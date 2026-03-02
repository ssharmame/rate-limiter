const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;

// In Memory All Clients Storage for this Assignment
const clients = new Map();

//Register Client
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
