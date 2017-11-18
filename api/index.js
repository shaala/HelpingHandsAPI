var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    Hapi = require('hapi');

var url = 'mongodb://localhost:27017/rsrc';

var mongodb = require('mongodb');

var server = new Hapi.Server();
server.connection({
    port:8080
});

// cors headers to enable POST reqs and such
server.register({
	register: require('hapi-cors'),
	options: {
		origins: ['http://localhost:8080']
	}
}, function(err){ 
	server.start(function(){
		console.log(server.info.uri);
	});
});

// reqs: get events, add events, edit events, delete events 
server.route( [
    // Get event list
    {
        method: 'GET',
        path: '/api/events',
        config: {json: {space: 2}},
        handler: function(request, reply) {
            rep('events');
            var findObject = {};
            for (var key in request.query) {
                findObject[key] = request.query[key]
            }
            collection.find(findObject).toArray(function(error, events) {
                assert.equal(null,error);
                reply(events);
            })
        }
    },
    // Get categories 
    {
        method: 'GET',
        path: '/api/cats',
        config: {json: {space: 2}},
        handler: function(request, reply) {
            // set to appropriate collection
            rep('categories');
            var findObject = {};
            for (var key in request.query) {
                findObject[key] = request.query[key]
            }
            collection.find(findObject).toArray(function(error, events) {
                assert.equal(null,error);
                reply(events);
            })
        }
    },
    // Add 
    {
        method: 'POST',
        path: '/api/events',
        handler: function(request, reply) {
            rep('events');
            collection.insertOne(request.payload, function(error, result) {
                assert.equal(null,error);
                reply(request.payload);
            })
        }
    },
    // Get w search param
    {
        method: 'GET',
        path: '/api/events/{name}',
        config: {json: {space: 2}},
        handler: function(request, reply) {
            rep('events');
            collection.findOne({"title":request.params.name}, function(error, event) {
               assert.equal(null,error);
               reply(event);
            })
        }
    },
    // Update one
    // {
    //     method: 'PUT',
    //     path: '/api/events/{name}',
    //     handler: function(request, reply) {
    //         if (request.query.replace == "true") {
    //             request.payload.title = request.params.name;
    //             console.log(request.payload);
    //             collection.replaceOne({"title": request.params.name},
    //                                   request.payload,
    //                function(error, results) {
    //                     collection.findOne({"title":request.params.name}, 
    //                         function(error, results) {
    //                             reply(results);
    //                 })
    //         })
    //         } else {
    //                 collection.updateOne({title:request.params.name},
    //                                 {$set: request.payload},
    //                                 function(error, results) {
    //                 collection.findOne({"title":request.params.name}, function(error, results) {
    //                     reply(results);
    //             }) 
    //           })
    //         }
    //     }
    // },
    // Delete one
     {
         method: 'DELETE',
         path: '/api/events/{id}',
         handler: function(request, reply) {
            rep('events');
             let item = request.params.id
             collection.deleteOne({_id: mongodb.ObjectID(item)},
                 function(error, results) {
                     reply ().code(204);
             })
         }
     },
    // Home page
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            rep('events');
            reply("API for RSRC")
        }
    }
]);

function rep (col) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null,err);
        console.log("connected to server all bueno");
        collection = db.collection(col);
        server.start(function(err) {
            console.log('Hapi is listening to http://localhost:8080')
        })
    });
}