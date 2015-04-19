var restify = require('restify');
var braintree = require('braintree');
var mongojs = require('mongojs');
// var db = mongojs('mongodb://localhost/CharaSpark', ['Users']);

// var connection_string = '127.0.0.1:27017/charaspark'; //local
// var db = mongojs('username:password@example.com/mydb', ['mycollection']);
var connection_string = 'testuser:coconut1@ds061651.mongolab.com:61651/charaspark';
var db = mongojs(connection_string, ['charaspark']);
var users = db.collection("users");
var wishes = db.collection("wishes");

var server = restify.createServer();

var portNumber = process.env.PORT || 8080;


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(portNumber);

console.log('restify listening on ' + portNumber);



var PATH = '/api/'
server.get({path : PATH + 'token' , version : '0.0.1'} , getToken);
server.post({path : PATH +'processPayment' , version : '0.0.1'} , processPayment);
server.post({path : PATH +'SignUp', version: '0.0.1'} , SignUp);
server.post({path : PATH +'LogIn', version: '0.0.1'} , LogIn);
server.post({path : PATH +'AddWish', version: '0.0.1'} , AddWish);
server.get({path : PATH +'UserWishes', version: '0.0.1'} , GetUserWishes);
server.post({path : PATH +'GetUserDonations', version: '0.0.1'} , GetUserDonations);
server.post({path : PATH +'GetUserFulfillments', version: '0.0.1'} , GetUserFulfillments);
server.post({path : PATH +'GetPaidWishes', version: '0.0.1'} , GetPaidWishes);

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
    user.password = req.params.password;
    user.user_name = req.params.user_name;
    user.email = req.params.email;
    user.postedOn = new Date();
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    users.save(user , function(err , success){
        console.log('Response success ', success);
        console.log('Response error ', err);
        if(success){
            res.send(201 , user);
            return next();
        }else{
            return next(err);
        }
    });
}

function LogIn(req , res , next){
    var user = {};
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    console.log('User name is: ', req.params.user_name);
    var userfromdb;
    users.findOne({user_name:req.params.user_name}, function(err, data){
    	if(err){
    		console.log('err is: ', err);
    		return next(err);
    	}
    	else {
    		userfromdb = data;
    		console.log('data is ', data);
    		// res.send(201 , data);
    		if(req.params.password == data.password)
    		{
    			console.log("log in successfull");
    			data.success = true;
    			return res.send(201 , data);
    		}
    		else
    		{
    			var errorObj = {
			    	error: 'incorrect password'
			    };
    			console.log("log in failed");
    			data.success = false;
    			data.password = "";
    			data.email = "";
    			return res.send(201 , data);
    		}
    	}
    });


}


    
function AddWish(req , res , next){
    req.params.postedOn = new Date();
    res.setHeader('Access-Control-Allow-Origin','*');
    wishes.save(req.params , function(err , success){
        console.log('Response success ', success);
        console.log('Response error ', err);
        if(success){
            res.send(201 , wishes);
            return next();
        }else{
            return next(err);
        }
    });
}


function GetUserWishes(req , res , next){
    var user = {};
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    console.log('User id is: ', req.params._id);

    //1. get id from request parameter
    //2. find wishes by passing id of request parameter to the user collection 
    //3. handle the success and failure from the find method
    //4. call res.send to return the json data of the wishes for that user id

    //var userwishesfromdb;

        wishes.find({userid:req.params._id}, function(err, data){
    	if(err){
    		console.log('err is: ', err);
    		return next(err);
    	}
    	else {
    		//userwishesfromdb = data;
    		console.log('data is ', data);
    		res.send(201 , data);

    	}
    });
}

function GetUserDonations(req , res , next){
    var user = {};
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    console.log('User id is: ', req.params._id);


        wishes.find({userid:req.params._id}, function(err, data){
    	if(err){
    		console.log('err is: ', err);
    		return next(err);
    	}
    	else {
    		console.log('data is ', data);
    		if(data.amount > 0)
    		{
    		res.send(201 , data);
    	}

    	}
    });
} 


function GetUserFulfillments(req , res , next){
    var user = {};
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    console.log('User id is: ', req.params._id);


        wishes.find({userid:req.params._id}, function(err, data){
    	if(err){
    		console.log('err is: ', err);
    		return next(err);
    	}
    	else { 
    		console.log('data is ', data);
    		if(data.wishstatus == "Fulfilled")
    		{
    		res.send(201 , data);
    	}

    	}
    });
} 


function GetPaidWishes(req , res , next){
    var user = {};
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    console.log('User id is: ', req.params._id);


        wishes.find({userid:req.params._id}, function(err, data){
    	if(err){
    		console.log('err is: ', err);
    		return next(err);
    	}
    	else { 
    		console.log('data is ', data);
    		if(data.donationstatus == "Completed")
    		{
    		res.send(201 , data);
    	}

    	}
    });
} 







