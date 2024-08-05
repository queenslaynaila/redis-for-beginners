import { createClient } from "redis";

const client = createClient({
    password:process.env.REDIS_PWD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

client.on('error', (err) => console.log(err)  )

if (!client.isOpen) {
    client.connect();
}


export { client }