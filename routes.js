'use strict'
const axios = require('axios')
const jwt = require('jsonwebtoken')
const now = new Date()
module.exports = function (app) {
	app.route('/authentication').post(async (req, res) => {
		try {
			const email = req.body.email
			const password = req.body.password
			const { data } = await axios.post('https://api.baemin.vn/v3/auth/managers/login', {
				email: email,
				password: password,
			})
			if (data.token) {
				const token = jwt.sign({
					jti: 'SKkMl3gLnVpsHefGsasXNKhPJ2I3QVvFs-1',
					iss: 'SKkMl3gLnVpsHefGsasXNKhPJ2I3QVvFs',
					exp: 1650618193,
          userId: '123',
          rest_api: true,
				},'ZjlYUlZxdVFnV2N1MXRLdWtFeUc1YWlQM3NDY0U4eg==')
				res.json({
					token,
				})
      }
      else {
        res.json({
          message: 'error'
        })
      }
    } catch (error) {
      
			if (error.response) {
				res.json(error.response.data)
			} else if (error.request) {
				console.log(error.request)
			} else {
				// anything else
      }
      console.log(error)
      res.end()
		}
	})

	app.route('/scco').get((req, res) => {
		const query = req.query
		res.json([
			{
				action: 'connect',

				from: {
					type: 'internal',
					number: query.from,
					alias: 'user_1',
				},
				to: {
					type: 'internal', //internal: app-to-app call type
					number: query.to, //make a call to user_2
					alias: 'user_2',
				},

				customData: 'test-custom-data',
				continueOnFail: false,
				timeout: 45,
			},
		])
	})
}
