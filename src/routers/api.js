const Task = require('../models/tasks')
const express = require('express')
const router = express.Router()


// Create Task
router.post('/api/tasks', async (req, res) => {
	console.log(req.body)
	const task = new Task(req.body)
	try {
		await task.save()
		res.status(201).send(task)
	} catch (e) {
		res.status(400).send(e)
	}
})


// Get All Task
router.get('/api/tasks', async (req, res) => {
	try {
		const tasks = await Task.find({})
		if (!tasks) {
			return res.status(404).send()
		}
		res.send(tasks)
	} catch (e) {
		res.status(500).send(e)
	}
})

// Get Task By ID
router.get('/api/tasks/:id', async (req, res) => {
	const _id = req.params.id
	try {
		const task = await Task.findById({ _id })
		if (!task) {
			return res.status(404).send()
		}
		res.send(task)
	} catch (e) {
		res.status(500).send(e)
	}
})



module.exports = router