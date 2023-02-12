ELK
===
Elastic Stack - Reliably and securely take data from any source in any format then search, 
                analyze and visualize in realtime

- Consist of,
            kibana
            Elasticsearch
            beats
            logstash

- Use cases,
            Loging
            Metrics
            Securoty Analytics
            Business Analytics

Elasticsearch
=============

- heart of ELK stack
- Store , search and analyze

- Cluser
    - One or more nodes (distributed) 
        - for a common goal
        - has a unique id for each
* when we create node cluster automatically created
* Data is stored as documents > json | has unique id
* Document are grouped in to related groups/Index
    - Ex: Produce Index, Wine & Beer Index
    - shard hold/store related docs not the index | Documents are logically grouped into an index
    - when creating a index , one shard created by default
    - when document numeber increases we can add more shards to the same index on new nodes
    - can search on distributed data in parrarel > reduce latency
    - can have replica shards on different nodes for redundancy | can improve speed
* Elasticsearch provide a restAPI that allows you to send HTTP Requests to your elasticsearch


kibana
======

- Search, view, interact
Data visualization and stack management tool

Types of data visualization & Elastic
    - 1. Exploratory < when you do not have a clue about what info lies within your data
      2. Explanatory < when you have something specific you want ti communicate to an audiance
      3. Operational < view status and identify anomalies on another system


Lab
===
- We downloaded and ran elasticsearch instance(also known as a node)
    - cluster is automatically formed
        - best practice is to name you cluster to something meaningful
            Reason - as your app get bigger you might work with multiple cluters with multiple nodes reponsible for dif tasks

change cluster name and node name
---------------------------------
sudo vim config/elasticsearch.yml
---
cluster.name: elastic_crash_course
node.name: crud_node
---
restart elasticsearch and kibana


kibana dashboard > Menu > Management Events > Dev Tools

CRUD Opes (create, read, update and delete a document)

- Create an index
PUT test_monit

GET test_monit

- Index a doc
PUT test_monit/_doc/1
{
  "os": "Mac OS Catalina",
  "running processors": "chrome"
}


- update
POST test_monit/_update/1
{
  "doc": {
    "os": "Mac OS Catalina",
    "running processors": "FireFox"
  }
}

POST test_monit/_update/1
{
  "doc": {
    "os": "Windows"
  }
}

- delete
DELETE test_monit/_doc/1

{'doc': {'os': 'Windows 11'}}
{'doc': {'running processors': 'chrome'}}

Kibana Alerts
=============
1. Installing watcher
2. Create watch
