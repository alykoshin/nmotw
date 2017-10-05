#
# Not working with socket.io@2.0.3
# Use socket.io@1.7.2 instead
#

from socketIO_client import SocketIO, LoggingNamespace

with SocketIO('http://localhost/socket.io', 3000, LoggingNamespace) as socketIO:
    socketIO.emit('client-event')
    socketIO.wait(seconds=1)
