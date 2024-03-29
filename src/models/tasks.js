const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
	title: {
		type: String,
		required: true,
		trim: true
	},
	content: {
		type: String,
		required: true,
		trim: true
	}
})

module.exports = Task