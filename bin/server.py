#!/usr/bin/python

import web
from keys import *

urls = (
	'/', 'index',
	'/coinwarz', 'coinwarz',
	'/analyzedb', 'analyzedb',
	'/arbitrage', 'arbitrage',
	'/arbitrage.json', 'arbitrageJson',
)

class index:
	def GET(self):
		r = b.analyze(True, True)
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

class arbitrage:
	def GET(self):
		r = b.arbitrage()
		web.template.Template.globals['int'] = int
		render = web.template.render('templates-webpy')
		return render.arbitrage(r)
class arbitrageJson:
	def GET(self):
		r = b.arbitrage('json')
		return r
		
if __name__ == '__main__':
	app = web.application(urls, globals())
	app.run()
