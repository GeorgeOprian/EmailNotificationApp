import pika

def on_message_received(ch, method, properties, body):
    print(f"receoved new message: {body}")

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='HelloQueue')

channel.basic_consume(queue='HelloQueue', auto_ack=True, on_message_callback=on_message_received)

print('Starting consumming')

channel.start_consuming()
