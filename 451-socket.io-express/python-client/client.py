#
# Not working with socket.io@2.0.3
# Use socket.io@1.7.2 instead
#

import logging
logging.getLogger('socketIO-client').setLevel(logging.DEBUG)
logging.basicConfig()


from socketIO_client import SocketIO, LoggingNamespace

def on_connect():
    print('connect')

def on_disconnect():
    print('disconnect')

def on_reconnect():
    print('reconnect')

def on_aaa_response(*args):
    print('on_aaa_response', args)

socketIO = SocketIO('localhost', 3000, LoggingNamespace)
socketIO.on('connect', on_connect)
socketIO.on('disconnect', on_disconnect)
socketIO.on('reconnect', on_reconnect)

# Listen
socketIO.on('aaa_response', on_aaa_response)
socketIO.emit('client-event')
socketIO.emit('client-event', 'some-text-data')
socketIO.wait(seconds=1)

# Stop listening
socketIO.off('aaa_response')
socketIO.emit('aaa')
socketIO.wait(seconds=1)

# Listen only once
socketIO.once('aaa_response', on_aaa_response)
socketIO.emit('aaa')  # Activate aaa_response
socketIO.emit('aaa')  # Ignore
socketIO.wait(seconds=1)


print('started');
