**MiniQ** is a queuing system which allows multiple producers to write messages in queue. Multiple consumers can read from the queue concurrently. On each request consumer will get different set of messages. Producer gets message Id in response when he writes the message.

ExpressJs and MongoDb is used as a solution for this problem statement.

MongoDb is the database staoged used. it handles **High write load**. Gives high availability on single server and also easy to configure to work on clusters. Modifying db schema is very easy.

Expressjs is very fast single threaded and event driven system. which helps in handling lots of request at once.

Sharding is the approach can be used for scaling database. By sharding we can store databse on multiple systems. Replication can be achieved by replica set.

Further,

1. we can impelement logical clocks for maintaining ordering of messages. This will be helpful when cluster is implemented.
2. Atlease-once-delivery can be implemented for guarantying that message will be served atleast once.

### List of API endpoints ###
###Poll :###

*This will create/add message to queue. Number of polled messages can be changed from config.json. current count is 2.*


* **Url**: host_url/poll

* **Method** : POST

* **Input** : NA

* **Response :**

```
#!json

[
  {
    "_id": "57d58388bb245b1fcb7b2f7c",
    "message": "Message 1",
    "__v": 0,
    "created_at": "2016-09-11T16:17:12.421Z",
    "polled_at": "2016-09-11T16:17:12.421Z",
    "is_polled": false,
    "is_processed": false
  },
  {
    "_id": "57d5838bbb245b1fcb7b2f7d",
    "message": "Message 2",
    "__v": 0,
    "created_at": "2016-09-11T16:17:15.607Z",
    "polled_at": "2016-09-11T16:17:15.607Z",
    "is_polled": false,
    "is_processed": false
  }
]
```



###List :###

*List all the messages queued to the system.*

* **Url**: host_url/list

* **Method** : GET

* **Input** : NA

* **Response** :

```
#!json

[
  {
    "_id": "57d5708f1147961863e475ae",
    "message": "Message 1",
    "__v": 0,
    "created_at": "2016-09-11T14:56:15.240Z",
    "polled_at": "2016-09-11T14:56:15.240Z",
    "is_polled": true,
    "is_processed": false
  },
  {
    "_id": "57d570911147961863e475af",
    "message": "Message 2",
    "__v": 0,
    "created_at": "2016-09-11T14:56:17.968Z",
    "polled_at": "2016-09-11T14:56:17.968Z",
    "is_polled": true,
    "is_processed": false
  },
  {
    "_id": "57d577e6f8ead71b262381ac",
    "message": "Message 3",
    "__v": 0,
    "created_at": "2016-09-11T15:27:34.259Z",
    "polled_at": "2016-09-11T15:27:34.259Z",
    "is_polled": true,
    "is_processed": false
  }
]
```




###Create :###

*Create/Add message to queue.*

* **Url**: host_url/create

* **Method** : POST

* **Params** : 'message' (String)

* **Input** : 'message' is the key and it accepts 'String' as value.

* **Response** : 
```
#!json

{
  "__v": 0,
  "message": "Message 1",
  "_id": "57d58393bb245b1fcb7b2f80",
  "created_at": "2016-09-11T16:17:23.176Z",
  "polled_at": "2016-09-11T16:17:23.176Z",
  "is_polled": false,
  "is_processed": false
}
```




###Find :###

*Find message from queue.*

* **Url**: host_url/find:id

* **Method** : GET

* **Params** : 'id' (Number)

* **Input** : 'id' is the key and it accepts 'Number', id the response message id which is received while inserting message.

* **Response : **

```
#!json

{
  "_id": "57d5838fbb245b1fcb7b2f7f",
  "message": "Message 4",
  "__v": 0,
  "created_at": "2016-09-11T16:17:19.536Z",
  "polled_at": "2016-09-11T16:17:19.536Z",
  "is_polled": false,
  "is_processed": false
}
```



 
###Update :###

*Update message in the queue.*

* **Url**: host_url/update:id

* **Method** : PUT

* **Params** : 'id' (Number), 'message' (String)

* **Input** : 1. 'id' is the key and it accepts 'Number', id the response message id which is received while inserting message. 2. 'message' is the second input which replace the message string.

* **Response :**

```
#!json

{
  "_id": "57d5838fbb245b1fcb7b2f7f",
  "message": "Updated message",
  "__v": 0,
  "created_at": "2016-09-11T16:17:19.536Z",
  "polled_at": "2016-09-11T16:17:19.536Z",
  "is_polled": false,
  "is_processed": false
}
```


###Delete :###

*Delete message from queue by id.*

* **Url**: host_url/delete:id

* **Method** : POST

* **Params** : 'id' (Number)

* **Input** : 1. 'id' is the key and it accepts 'Number', id the response message id which is received while inserting message.

* **Response :**

```
#!json

{
  "_id": "57d5838fbb245b1fcb7b2f7f",
  "message": "Updated message",
  "__v": 0,
  "created_at": "2016-09-11T16:17:19.536Z",
  "polled_at": "2016-09-11T16:17:19.536Z",
  "is_polled": false,
  "is_processed": false
}
```

**processedMessages.json** is the file where json object of the processed message is stored. this file can be read for viewing the processed messages. this can is located at logs/processedMessages.json.

There is **config.json** in the root directory where we can update the json file processed messages, count of item to be polled, timeout, db host and db name.