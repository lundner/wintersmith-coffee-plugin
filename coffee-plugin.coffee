fs = require 'fs'
coffee = require 'coffee-script'

module.exports = (wintersmith, callback) ->

	class CoffeePlugin extends wintersmith.ContentPlugin

		constructor: (@_filename, @_text) ->

		getFilename: () ->
			@_filename.relative.replace /coffee$/, 'js'

		getView: ->
			return (args..., callback) ->
				try
					data = coffee.compile @_text
					callback null, new Buffer data
				catch err
					callback err

		CoffeePlugin.fromFile = (filename, callback) ->
			fs.readFile filename.full, (err, buffer) ->
				if err
					callback err
				else
					callback null, new CoffeePlugin filename, buffer.toString()

	wintersmith.registerContentPlugin 'coffee', '**/*.coffee', CoffeePlugin
	callback()