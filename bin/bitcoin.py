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

class bitcoin:
	
	def __init__(self):
		self.logBuffer = ""
	
	def getBlockChains(self, server, req, compile):
		headers = {"Content-type": "application/x-www-form-urlencoded"}
		params = {}
		if server == "blockchain.info":
			conn = httplib.HTTPSConnection(server)
		else:
			conn = httplib.HTTPConnection(server)
		url = 'https://'+server+str(req)
		print '\t blockchain \t' + url
		conn.request("GET", req, params, headers)
		response = conn.getresponse()
		content = response.read()
		conn.close()

		bal = re.findall(re.compile(compile, re.S), content)
		e = bal[0][1]
		return float(e)
		
	
	def log(self, str):
		self.logBuffer += str+"\n"
		
	def showLog(self):
		print ""
		print "= LOGS =========================================================================="
		print ""
		print self.logBuffer

	def main(self):
		# Replace these with your own API key data
		BTC_api_key = "JY83Z3PQ-IG1HMU08-ETL8Q3OW-NTQQDSZ8-COLT8K9Y"
		BTC_api_secret = "865d33452b852df84f9dc0ddcfa6a5303bb453368f00f8b3a747e0f40686274d"

		# Come up with your own method for choosing an incrementing nonce
		#nonce = 13
		nonce = int(time.time())

		# method name and nonce go into the POST parameters
		params = {"method":"getInfo",
			  "nonce": nonce}
		params = urllib.urlencode(params)

		# Hash the params string to produce the Sign header value
		H = hmac.new(BTC_api_secret, digestmod=hashlib.sha512)
		H.update(params)
		sign = H.hexdigest()
		
		headers = {"Content-type": "application/x-www-form-urlencoded",
				   "Key":BTC_api_key,
				   "Sign":sign}
		conn = httplib.HTTPSConnection("btc-e.com")
		conn.request("POST", "/tapi", params, headers)
		response = conn.getresponse()

		self.log(str(response.status) + ' ' + str(response.reason))

		def nv(n):
			#return type(n)
			#if n != '':
			return float("%.2f" % float(n))

		try:
			responseBTCe = json.load(response)['return']['funds']
		except:
			print 'The btc-e API key pairs are not valid.'
			print 'You may edit api key here: https://btc-e.com/profile#api_keys'
			sys.exit()

		tusdbal = 0
		tusdbalshould  = 0 

		arr = {}
		# define portfolio weights
		# register currency here and give it a portfolio weight
		dat = {
			'ltc': [2,['Lc9ajLEfBUsaLcZayJQao9KgRiBBvdy79x']],
			'btc': [1,['19ANGDaYUTcb7zokc2cXd3espshu9ZfczC','1HKWHFLuv8UG1s2b8EsNXP935yAB8EH9Wg']],
			#'btc': [1],
			
			# todo: add the currencies below
			#'ftc':[0],
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
		for i in responseBTCe:
			arr[i] = {}
			arr[i]['xsell'] = 0
			if responseBTCe[i] > 0 or dat.has_key(i):
				print i
				headers = {"Content-type": "application/x-www-form-urlencoded",
						   "Key":BTC_api_key,
						   "Sign":sign}
				domain = "btc-e.com"
				
				try:
					if type(['ftc'].index(i)) == type(1):
						basec = 'btc'
					else:
						basec = 'usd'
				except:
					basec = 'usd'
					
				url = 'https://'+domain+"/api/2/"+str(i)+"_"+basec+"/ticker"
				print '\t ticker \t' + url
				conn = httplib.HTTPSConnection(domain)
				conn.request("POST", url, params, headers)
				response = conn.getresponse()
				res2 = json.load(response)
				try:
					arr[i]['xsell'] = res2['ticker']['sell']
				except KeyError:
					'stub'
			
			# balance from b
			arr[i]['bal'] = responseBTCe[i]
			
			# litecoin balance
			if i == 'ltc':
				for j in range(0, len(dat[i][1])):
					bal = self.getBlockChains("litecoinscout.com", "/address/"+dat[i][1][j], '(Balance: (.*?) LTC)')
					arr[i]['bal'] += bal

			# bitcoin balance
			try:
				if i == 'btc' and type(dat[i][1]):
					for j in range(0, len(dat[i][1])):
						bal = self.getBlockChains("blockchain.info", "/address/"+dat[i][1][j], '(Balance.*?([\d\.]+) BTC)')
						arr[i]['bal'] += bal
			except e:
				print e
			
			arr[i]['usdbal'] = nv(arr[i]['bal'] * arr[i]['xsell'])
			tusdbal += nv(arr[i]['usdbal'])
			
				
		# header
		print ""
		print "Coin \tBAL \t\tUSDBAL \t\tPercent \tSuggested % \tSell"

		#body
		for i in arr:
			try:
				arr[i]['pcent'] = nv(arr[i]['usdbal'] / tusdbal * 100)
			except ZeroDivisionError, e:
				print e
			
			
			self.log('usdbal:'+str(arr[i]['usdbal'] ))
			self.log('pcent:'+str(arr[i]['pcent']))
			try:		
				pshould = nv(float(dat[i][0]) / tdat * 100)
				usdbalshould = nv(arr[i]['usdbal'] / arr[i]['pcent'] * pshould)
				self.log('pshould:'+pshould)
				self.log('usdbalshould:'+usdbalshould)
				tusdbalshould  += usdbalshould 
			except:
				"stub"
			
			try:
				if arr[i]['bal'] > 0 or dat.has_key(i):
					print i + ": \t" + str(arr[i]['bal']) + " \t" + str(arr[i]['usdbal']) + " \t" + str(arr[i]['pcent'])+"% \t\t" + str(pshould) + "% \t" + str(arr[i]['xsell'])
					self.log('usdbal:'+str(arr[i]['usdbal']))
					self.log('usdbalshould:'+str(usdbalshould))
					if arr[i]['usdbal'] > usdbalshould:
						decrease = arr[i]['usdbal'] - usdbalshould
						print  '\t\t\t\t\t\t\t\t-'+ str(decrease/arr[i]['xsell']) + ' ' + str(i) + " ie. \t\t" + str(decrease)+' USD'
						print  ""
					if arr[i]['usdbal'] < usdbalshould:
						increase = usdbalshould - arr[i]['usdbal']
						print  '\t\t\t\t\t\t\t\t+'+ str(increase/arr[i]['xsell']) + ' ' + str(i) + " ie. \t" + str(increase)+' USD'
						print ""
				else:
					'stub'
			except:
				'stub'

		#footer
		print 'Total USD: ' + str(tusdbal)

		conn.close()
		
		self.showLog()

b = bitcoin()
b.main()
