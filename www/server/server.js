var restify = require('restify');
var braintree = require('braintree');
var mongojs = require('mongojs');
// var db = mongojs('mongodb://localhost/CharaSpark', ['Users']);

var connection_string = '127.0.0.1:27017/charaspark';
var db = mongojs(connection_string, ['charaspark']);
var users = db.collection("users");



var server = restify.createServer();

var portNumber = 8080;


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(portNumber);

console.log('restify listening on ' + portNumber);



var PATH = '/api/'
server.get({path : PATH + 'token' , version : '0.0.1'} , getToken);
server.post({path : PATH +'processPayment' , version : '0.0.1'} , processPayment);
server.post({path : PATH +'SignUp', version: '0.0.1'} , SignUp);
// server.post({path : PATH +'Jobs', version: '0.0.1'} ,postNewJob);
// server.del({path : PATH +'/:jobId' , version: '0.0.1'} ,deleteJob);

    var gateway = braintree.connect({
	  environment: braintree.Environment.Sandbox,
	  merchantId: "hnvj4t6ggkv8thmr",
	  publicKey: "5by28mt2pg8sdxmd",
	  privateKey: "f4fd03b4259013c3d29907f275b5da88"
	});

function getToken(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    

	    console.log('end of connect');
    // generates the client token
	gateway.clientToken.generate({}, function (err, response) {
		if(err) {
			console.log('the err is: ', err);
			return next(err);
		} else {
	  		var clientToken = response.clientToken
			console.log('clientToken is: ', clientToken);
			res.send(200 , response.clientToken);
	        return next();
		}
	});
}

function processPayment(req, res, next){
	res.setHeader('Access-Control-Allow-Origin','*');
	console.log('req.body.amount is ' + req.params.amount);
	console.log('req.body.nounce is ' + req.params.nounce);

	 // console.log(req.body);
  // console.log(req.query);
  // console.log(req.params);

	gateway.transaction.sale({
	  amount: req.params.amount,
	  paymentMethodNonce: req.params.nounce,
	  // submit_for_settlement: true,
	}, function (err, result) {
		if(err) {
			console.log('the err is: ', err);
			return next(err);
		} else {
			console.log('result is: ', result);
			res.send(200 , result);
	        return next();
		}
	});
}


function SignUp(req , res , next){
    var user = {};
    user.user_name = req.params.user_name;
    user.email = req.params.email;
    user.password = req.params.password;
    user.postedOn = new Date();
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    users.save(user , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(201 , user);
            return next();
        }else{
            return next(err);
        }
    });
}

