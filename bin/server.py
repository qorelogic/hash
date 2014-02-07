#!/usr/bin/python

import web
from keys import *

urls = (
	'/', 'index'
)

class index:
	def GET(self):
		#b.analyze()
		render = web.template.render('templates-webpy')
		qwe = 'test'
		return render.index(qwe)
		
if __name__ == '__main__':
	app = web.application(urls, globals())
	app.run()
