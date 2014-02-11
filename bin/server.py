#!/usr/bin/python

import web
from keys import *

urls = (
	'/', 'index',
	'/coinwarz', 'coinwarz',
	'/analyzedb', 'analyzedb'
)

class index:
	def GET(self):
		r = b.analyze()
		render = web.template.render('templates-webpy')
		return render.index(r)

class coinwarz:
	def GET(self):
		r = b.coinwarz()
		render = web.template.render('templates-webpy')
		return render.coinwarz(r)

class analyzedb:
	def GET(self):
		r = b.analyzedb()
		render = web.template.render('templates-webpy')
		return render.analyzedb(r)
		
if __name__ == '__main__':
	app = web.application(urls, globals())
	app.run()
