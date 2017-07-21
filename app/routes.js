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
    app.get('/', function (req, res) {
        client.cat.indices({}, function(err, resp, status) {
            var data = {};
            data = resp;
            res.render('test.ejs', {
                data2: resp
            });
        });
    });
};