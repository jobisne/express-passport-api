const crypto = require('crypto');
const secret = '595cc4ed430155117a2ea345d';



module.exports =  {
	encrypt: function (req, res) {
	const cipher = crypto.createCipher('aes192', secret);
	  let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
		encrypted += cipher.final('hex');
	 	res.json(encrypted); 
	},
	decrypt: function (req, res) {
		const decipher = crypto.createDecipher('aes192', secret);
		const encrypted = 'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
		let decrypted = decipher.update(encrypted, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		res.json(decrypted);
	}
}



