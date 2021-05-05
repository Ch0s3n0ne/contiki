import time
import paho.mqtt.client as mqtt
import ssl
import sys

# Parameters:
CLOUD_MQTT_URL = "a2yat24nuqf2ua-ats.iot.us-east-2.amazonaws.com"
CERTIFICATE_AUTH_FILE = "../iot_certs/root_CA_AWS.txt"
CERT_PEM_FILE = "../iot_certs/"
PRIVATE_KEY_FILE = "../iot_certs/de649b3223-private.pem.key"
MQTT_TOPIC = "test_topic"

#Override MQTT_TOPIC from the cmd line:
if len(sys.argv) > 1:
  MQTT_TOPIC = str(sys.argv[1])

def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.payload))

client=mqtt.Client() 
client.on_message = on_message

print("Connecting to Cloud MQTT Broker")
client.tls_set(ca_certs=CERTIFICATE_AUTH_FILE, certfile=CERT_PEM_FILE, keyfile=PRIVATE_KEY_FILE, tls_version=ssl.PROTOCOL_TLSv1_2)
client.tls_insecure_set(False)
client.connect(CLOUD_MQTT_URL, 8883, 60)

print("Setup a subscriber in topic: \""+MQTT_TOPIC+"\"")
client.subscribe(MQTT_TOPIC)

try: 
	client.loop_forever()

except (KeyboardInterrupt):
        sys.exit()


