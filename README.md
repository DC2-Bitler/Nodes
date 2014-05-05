Node
==========

MasterNode
- Controls all the nodes
- maintains a tiny http server that can 
    - reply a JSON encoding of it's known nodes and
    - accept a command, dispatch the command, and reply the result

PiNode
- Does actions
- Receives voice commands
