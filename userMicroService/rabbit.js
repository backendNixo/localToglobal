import amqplib from "amqplib";

let connection, channel;
const RABBITMQ_URL = process.env.RABBITMQ_URL;

const ConnectRabbitMQ = async () => {
  try {
    connection = await amqplib.connect(RABBITMQ_URL);

    channel = await connection.createChannel();

    console.log("RabbitMQ Connected Successfully!");

    connection.on("close", () => {

      console.error("RabbitMQ connection closed Reconnecting...");

      setTimeout(ConnectRabbitMQ, 5000);
    });

    connection.on("error", (err) => {
      console.error("RabbitMQ connection error:", err.message);
    });

  } catch (error) {
    console.error("RabbitMQ Connection Error:", error.message);
  }
};

const SubscribeToQueue = async (QueueName, callback) => {
  try {
    if (!channel) await ConnectRabbitMQ();

    await channel.assertQueue(QueueName, { durable: true });

    await channel.consume(QueueName, (msg) => {


      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        callback(data);
        channel.ack(msg);
      }
    });

    console.log(`Subscribed to Queue: ${QueueName}`);

  } catch (error) {
    console.error(`Error subscribed to ${QueueName}:`, error.message);
  }
};

const PublishToQueue = async (QueueName, data) => {
  try {
    if (!channel) await ConnectRabbitMQ();

    await channel.assertQueue(QueueName, { durable: true });
    channel.sendToQueue(
      QueueName,
      Buffer.from(JSON.stringify(data)),
      { persistent: true }
    );

    console.log(`Published to Queue ${QueueName}`, data);
  } catch (error) {
    console.error(`Error publishing to ${QueueName}:`, error.message);
  }
};

export { ConnectRabbitMQ, SubscribeToQueue, PublishToQueue };
