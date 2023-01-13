import pika
import json

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='EmailQueue', durable = True)


toSend = {
    "sender": 1,
    "recipients": [1, 2],
    "emailSubject": "Test email",
    "emailBody": "Email de test."
}
toSend_encode_data = json.dumps(toSend).encode('utf-8')
channel.basic_publish(exchange='', routing_key='EmailQueue', body=toSend_encode_data)
print(" [x] Sent Email")

connection.close()