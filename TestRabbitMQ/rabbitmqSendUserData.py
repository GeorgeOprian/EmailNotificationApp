import pika
import json

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='UserChangesQueue')


toSend = {
    "operation": 1,
    "id": 4,
    "userName": "user4",
    "emailAddress": "user4@gmail.com"
}
toSend_encode_data = json.dumps(toSend).encode('utf-8')
channel.basic_publish(exchange='', routing_key='UserChangesQueue', body=toSend_encode_data)


print(" [x] Sent User")

connection.close()