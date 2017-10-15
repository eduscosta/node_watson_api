let express	= require('express');
let app		= express(); // define app using express
let WcsV1 	= require('watson-developer-cloud/conversation/v1'); //watson sdk

// Configure the watson conversation
var conversation = new WcsV1({
	username: process.env.CONVERSATION_USERNAME,
	password: process.env.CONVERSATION_PASSWORD,
	version_date: WcsV1.VERSION_DATE_2016_09_20
});

// router for api
let router = express.Router(); // get an instance of the express Router - everything is working (accessed at GET http://localhost:8080/api)

router.get('/message', function(req, res) {
	let inputText = {};
	let workspace = process.env.WORKSPACE_ID;
		if (!workspace) {
			return res.json({
				'output': {
					'text': 'O app não foi configurado corretamente com o serviço de conversação'
			}
		});
	}
	// get input user
	if (req.query.message) {
		inputText = {
			text: req.query.message
		}
	} 

	let payload = {
		workspace_id: workspace,
		context: req.query.context || {},
		input: inputText
	};
	// send the input to conversation service
	conversation.message(payload, function(err, data) {
		if(err){
			return res.status(err.code || 500).json(err);
		}
		response = data.output.text;
		return res.json(response);
	})

});

// all of our routes will be prefixed with /api
app.use('/api', router);
module.exports = app;
