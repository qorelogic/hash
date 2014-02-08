#!/usr/bin/python

import web
from keys import *

urls = (
	'/', 'index'
)

class index:
	def GET(self):
		r = b.analyze()
		render = web.template.render('templates-webpy')
		return render.index(r)
		
if __name__ == '__main__':
	app = web.application(urls, globals())
	app.run()
