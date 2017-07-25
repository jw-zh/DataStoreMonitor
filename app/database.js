var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client( {
  hosts: [
    'http://els_q6nj19n:xckmfuj0rff13u2y@dev005576.esri.com:9220/'
  ]
});
module.export = client;