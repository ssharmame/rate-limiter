## Test

Register:
sunilsharma@Sunils-MacBook-Air Assignment-RateLimiter % curl -X POST http://localhost:3000/clients -H "Content-Type: application/json" -d '{"clientId":"c1","limitPerMinute":5}'
{"message":"Client has registered"}%

Allow:
curl -X http://localhost:3000/allow/c1
