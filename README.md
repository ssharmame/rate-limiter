# Rate Limiter API

## Build

docker build -t rate-limiter .

## Run

docker run -p 3000:3000 rate-limiter

## Test

Register:
sunilsharma@Sunils-MacBook-Air Assignment-RateLimiter % curl -X POST http://localhost:3000/clients -H "Content-Type: application/json" -d '{"clientId":"c1","limitPerMinute":5}'
{"message":"Client has registered"}%

Allow:
curl -X http://localhost:3000/allow/c1
{"allowed":true}%
