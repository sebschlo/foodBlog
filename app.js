
/**
 * Module dependencies.
 */

var 
    express = require('express'),
    app = express(),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    Poet = require('poet');

var poet = Poet(app, {
    postsPerPage: 5,
    posts: __dirname + '/_posts',
    metaFormat: 'json'
});

poet
    .createPostRoute()
    .createPageRoute()
    .createTagRoute()
    .createCategoryRoute()
    .init();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}


app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
