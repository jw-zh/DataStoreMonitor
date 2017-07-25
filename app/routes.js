var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client( {
  hosts: [
    'http://els_q6nj19n:xckmfuj0rff13u2y@dev005576.esri.com:9220/'
  ]
});

module.exports = function (app) {
    // app.get('/', function (req, res) {
    //     res.render('home.ejs');
    //     console.log(resp);
    // });
    // app.get('/test', function (req, res) {
    //     res.render('test.ejs', {
    //         result: req.result
    //     });
    // });
    var result = {
        idx_status: {},
        health_status: [],
        nodes_status: {},
        recovery: {},
        shards_status: {}
    };

    app.get('/', function (req, res) {
        res.render('home.ejs', {
            //result: resp
            idx_status: result.idx_status,
            health_status: result.health_status,
            nodes_status: result.nodes_status,
            recovery: result.recovery,
            shards_status: result.shards_status
        });        
        // indices status
        client.cat.indices({
            format: 'json',
            h: ['health', 'status', 'index', 'pri', 'rep', 'docs.count', 'pri.store.size'],
            v: true
        }, function(err, resp, status) {
            //var data = {};
            //console.log(resp);
            //data = resp.split("\n").join("<br />");
            //result.idx_status = resp.split("\n").join("<br />");
            result.idx_status = resp;
        });
        // health status
        client.cat.health({
            format: 'json',
            h: ['status', 'timestamp', 'cluster', 'node.total', 'node.data', 'shards', 'pri', 'relo', 'init', 'unassign', 'pending_tasks', 'active_shards_percent'],
            v: true
        }, function(err, resp, status) {
            //result.health_status = resp.split("\n").join("<br />");
            if(resp[0].status == "green" && result.health_status.length == 0) {
                result.health_status.push(resp[0]);
            }
            else if(resp[0].status == "yellow" || resp[0].status == "red") {
                result.health_status.push(resp[0]);
            }
            else {
                result.health_status[0] = resp[0];
            }
        });
        // nodes status
        client.cat.nodes({
            format: 'json',
            h: ['name', 'heap.percent', 'ram.percent', 'cpu', 'master', 'node.role'],
            v: true
        }, function(err, resp, status) {
            //result.nodes_status = resp.split("\n").join("<br />");
            result.nodes_status = resp;
        });
        // recovery
        client.cat.recovery({
            format: 'json',
            h: ['index', 'shard', 'time', 'type', 'stage', 'source_host', 'target_host', 'files_percent', 'bytes_percent', 'translog_percent'],
            s: ['index', 'type'],
            v: true
        }, function(err, resp, status) {
            // result.recovery = resp.split("\n").join("<br />");
            result.recovery = resp;
        });
        // shards status
        client.cat.shards({
            format: 'json',
            h: ['index', 'shard', 'state', 'docs', 'store', 'ip', 'node'],
            s: ['node'],
            v: true
        }, function(err, resp, status) {
            //result.shards_status = resp.split("\n").join("<br />");
            result.shards_status = resp;
        });
      
  });

};