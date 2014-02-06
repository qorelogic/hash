#!/usr/bin/python

import web

urls = (
	'/', 'index'
)

class index:
	def GET(self):
		ob = 'test'
		#b.analyze()
		return ob
		''
		
if __name__ == '__main__':
	app = web.application(urls, globals())
	app.run()
