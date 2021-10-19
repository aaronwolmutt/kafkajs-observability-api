# kafkajs-observability-api

Free observability API for Kafka written in NodeJS. Designed to be RESTful, functional, and run on Kubernetes. Also accomplishes a highly lightweight build & deployment (no use of TypeScript).

This project is especially useful for replacing administrative Kafka workflows with REST and JSON. It's also useful for any metrics aggregation/reporting needed to support your Kafka workflows.  
### configuration

A configuration is currently available for SASSL-SCRAM authentication.

To use localhost, set NODE_ENV='dev' and specify a configuration in the .env file

Minimimal environment configuration

| Name     | Required? |  Description |
|----------|-----------|--------------|
| NODE_ENV | y ||
| BROKERS   | y          | Comma separated string of Kafka brokers ie. "<host>:<port>,<host>:<port>"|
| SSL | n | enables SSL, false by default |
| SASSL_MECH | n | sassl-scram auth method, valid options are "plain", "scram-sha-256", "scram-sha-512" |
| USERNAME | n | kafka acl username |
| PASSWORD | n | kafka acl password |

# starting

Ensure NodeJS 14 > is installed on your system 

install:

```bash
$ npm install
```
dev start (for livereloading with nodemon):

```bash
$ npm run startDev
```
