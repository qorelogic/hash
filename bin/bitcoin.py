#!/usr/bin/python

# If you find this sample useful, please feel free to donate :)
# LTC: Lc9ajLEfBUsaLcZayJQao9KgRiBBvdy79x
# BTC: 19ANGDaYUTcb7zokc2cXd3espshu9ZfczC

import httplib
import urllib
import json
import hashlib
import hmac
import time
import re
import sys

def nv(n):
	#return type(n)
	#if n != '':
	return float("%.2f" % float(n))
	
def nd(n,dec):
	#return type(n)
	#if n != '':
	#'It will cost ${0} dollars.'.format(95)
	#v = "%."+str(int(dec))+"f" % float(n)
	v = "%.8f" % float(n)
	#v = "{123}."+str(dec)+"f".format(float(n))
	return float(v)
	
class bitcoin:
	
	def __init__(self):
		# Replace these with your own API key data
		self.BTC_api_key = "JY83Z3PQ-IG1HMU08-ETL8Q3OW-NTQQDSZ8-COLT8K9Y"
		self.BTC_api_secret = "865d33452b852df84f9dc0ddcfa6a5303bb453368f00f8b3a747e0f40686274d"
		
		# Come up with your own method for choosing an incrementing nonce
		#nonce = 13
		nonce = int(time.time())

		# method name and nonce go into the POST parameters
		self.params = {"method":"getInfo",
			  "nonce": nonce}
		self.params = urllib.urlencode(self.params)

		# Hash the params string to produce the Sign header value
		H = hmac.new(self.BTC_api_secret, digestmod=hashlib.sha512)
		H.update(self.params)
		self.sign = H.hexdigest()
		
		self.logBuffer = ""
		
	def getBlockChains(self, server, req, compile):
		headers = {"Content-type": "application/x-www-form-urlencoded"}
		params = {}
		if server == "blockchain.info":
			conn = httplib.HTTPSConnection(server)
		else:
			conn = httplib.HTTPConnection(server)
		url = 'https://'+server+str(req)
		conn.request("GET", req, params, headers)
		response = conn.getresponse()
		content = response.read()
		conn.close()

		bal = re.findall(re.compile(compile, re.S), content)
		e = bal[0][1]
		
		print '\t blockchain \t' + str(nd(e,8)) + '\t ' + url
		
		return float(e)
		
	def getTicker(self, i):
		headers = {"Content-type": "application/x-www-form-urlencoded",
				   "Key":self.BTC_api_key,
				   "Sign":self.sign}
		domain = "btc-e.com"
		
		
		# initialize self.currencies[i] if not a dictionary
		try:
			type(self.currencies[i])
		except:
			self.currencies[i] = {}
			
		try:
			if type(['ftc'].index(i)) == type(1):
				self.currencies[i]['basecurr'] = 'btc'
			else:
				self.currencies[i]['basecurr'] = 'usd'
		except:
			self.currencies[i]['basecurr'] = 'usd'
			
		url = 'https://'+domain+"/api/2/"+str(i)+"_"+self.currencies[i]['basecurr']+"/ticker"
		print '\t ticker \t' + url
		print '\t---'
		conn = httplib.HTTPSConnection(domain)
		conn.request("POST", url, self.params, headers)
		response = conn.getresponse()
		ticker = json.load(response)
		return ticker
	
	def log(self, str):
		self.logBuffer += str+"\n"
		
	def showLog(self):
		print ""
		print "= LOGS =========================================================================="
		print ""
		print self.logBuffer

	def main(self):
		
		headers = {"Content-type": "application/x-www-form-urlencoded",
				   "Key":self.BTC_api_key,
				   "Sign":self.sign}
		conn = httplib.HTTPSConnection("btc-e.com")
		conn.request("POST", "/tapi", self.params, headers)
		response = conn.getresponse()

		self.log(str(response.status) + ' ' + str(response.reason))

		try:
			responseBTCe = json.load(response)['return']['funds']
		except:
			print 'The btc-e API key pairs are not valid.'
			print 'You may edit api key here: https://btc-e.com/profile#api_keys'
			sys.exit()

		tusdbal = 0
		tusdbalshould  = 0 

		self.currencies = {}
		# define portfolio weights
		# register currency here and give it a portfolio weight
		dat = {
			'ltc': [2,['Lc9ajLEfBUsaLcZayJQao9KgRiBBvdy79x']],
			'btc': [1,['19ANGDaYUTcb7zokc2cXd3espshu9ZfczC','1HKWHFLuv8UG1s2b8EsNXP935yAB8EH9Wg']],
			#'btc': [1],
			
			# todo: add the self.currencies below
			'ftc':[0.1,[]],
			#ppc
			# trc
			# nmc
			# ftc
			# xpm
		}
		tdat = 0
		for i in dat:
			tdat += dat[i][0]

		# get balance data
		print ""
		print "= Blockchains & Brokers ========================================================="
		print ""
		baseTicker = self.getTicker('btc')
		for i in responseBTCe:
			self.currencies[i] = {}
			self.currencies[i]['xsell'] = 0
			if responseBTCe[i] > 0 or dat.has_key(i):
				print i
				
				ticker = self.getTicker(i)
				
				try:
					self.currencies[i]['xsell'] = ticker['ticker']['sell']
				except KeyError:
					'stub'
				try:
					self.currencies[i]['xbasecurr'] = baseTicker['ticker']['sell']
				except KeyError:
					'stub'
					
			
			# balance from b
			bal = responseBTCe[i]
			if bal > 0:
				print '\t btce['+i+'] \t' + str(nd(bal,8)) + '\t '
				print '\t---'
			self.currencies[i]['bal'] = bal
			
			# litecoin balance
			if i == 'ltc':
				for j in range(0, len(dat[i][1])):
					bal = self.getBlockChains("litecoinscout.com", "/address/"+dat[i][1][j], '(Balance: (.*?) LTC)')
					self.currencies[i]['bal'] += bal

			# bitcoin balance
			try:
				if i == 'btc' and type(dat[i][1]):
					for j in range(0, len(dat[i][1])):
						bal = self.getBlockChains("blockchain.info", "/address/"+dat[i][1][j], '(Balance.*?([\d\.]+) BTC)')
						self.currencies[i]['bal'] += bal
			except e:
				print e
			
			self.currencies[i]['usdbal'] = nv(self.currencies[i]['bal'] * self.currencies[i]['xsell'])
			tusdbal += nv(self.currencies[i]['usdbal'])
			
				
		# header
		print ""
		print ""
		print "= Accounts ======================================================================"
		print ""
		print "Coin \tBAL \t\tUSDBAL \t\tPercent \tSuggested % \tSell"

		#body
		for i in self.currencies:
			self.log('----------')
			self.log('['+i+']')
			try:
				self.currencies[i]['pcent'] = nv(self.currencies[i]['usdbal'] / tusdbal * 100)
			except ZeroDivisionError, e:
				print e
			
			
			self.log('usdbal['+i+']:'+str(self.currencies[i]['usdbal'] ))
			self.log('pcent['+i+']:'+str(self.currencies[i]['pcent']))
			pshould = 0
			usdbalshould  = 0
			try:		
				pshould = nv(float(dat[i][0]) / tdat * 100)
			except KeyError, e:
				''
			try:
				#usdbalshould = nv(self.currencies[i]['usdbal'] / self.currencies[i]['pcent'] * pshould)
				usdbalshould = nv(tusdbal * pshould / 100)
			except ZeroDivisionError:
				usdbalshould = nv(pshould)
			self.log('pshould['+i+']:'+str(pshould))
			self.log('usdbalshoulda['+i+']:'+str(usdbalshould))
			tusdbalshould  += usdbalshould 
			
			#try:
			if self.currencies[i]['bal'] > 0 or dat.has_key(i):
				print i + ": \t" + str(self.currencies[i]['bal']) + " \t" + str(self.currencies[i]['usdbal']) + " \t" + str(self.currencies[i]['pcent'])+"% \t\t" + str(pshould) + "% \t" + str(self.currencies[i]['xsell'])
				self.log('usdbal['+i+']:'+str(self.currencies[i]['usdbal']))
				self.log('usdbalshouldb['+i+']:'+str(usdbalshould))
				if i == 'ftc':
					xrate = self.currencies[i]['xsell'] * self.currencies[i]['xbasecurr']
				else:
					xrate = self.currencies[i]['xsell']
				self.log('xrate:'+str(xrate))
				self.log('xbasecurr:'+str(self.currencies[i]['xbasecurr']))
				if self.currencies[i]['usdbal'] > usdbalshould:
					decrease = self.currencies[i]['usdbal'] - usdbalshould
					print  '\t\t\t\t\t\t\t\t-'+ str(decrease / xrate) + ' ' + str(i) + " ie. \t\t" + str(decrease)+' USD'
					print  ""
				if self.currencies[i]['usdbal'] <= usdbalshould:
					increase = usdbalshould - self.currencies[i]['usdbal']
					print  '\t\t\t\t\t\t\t\t+'+ str(increase / xrate) + ' ' + str(i) + " ie. \t" + str(increase)+' USD'
					print ""
			else:
				''
			#except Error, e:
			#	print e

		#footer
		print 'Total USD: ' + str(tusdbal)

		conn.close()

b = bitcoin()
b.main()
