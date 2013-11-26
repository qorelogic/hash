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
import string
import datetime
import re

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
		self.BTC_api_key = "<api_key_here>" # "CC0FUOOA-6AD32F04-X04TYQFB-OE0YPRWI-2ARC4CUT"
		self.BTC_api_secret = "api_secret_here" # "a617435dccc3ca5f5162d934c2e03b42194f0a94a79eb6fbd170fb60c07bbe8d"
		
		self.logBuffer = ""
		
		# method name and nonce go into the POST parameters
		self.params = {"method":"getInfo",
			  "nonce": self.getNonce()}
		self.params = urllib.urlencode(self.params)

		# Hash the params string to produce the Sign header value
		H = hmac.new(self.BTC_api_secret, digestmod=hashlib.sha512)
		H.update(self.params)
		self.sign = H.hexdigest()
		
		self.btcBaseCurrencies = ['nmc','nvc','ftc','ppc','trc','xpm']
		
		self.currencies = {}
		
	def getNonce(self):
		self.log('getNonce')
		# Come up with your own method for choosing an incrementing nonce
		#nonce = 13
		#mks = datetime.datetime.now().microsecond
		#print mks
		#self.nonce = int(time.time())*1000000 + mks
		#self.nonce = mks * 10000
		f = file('bitcoin.dat','r')
		try:
			nonce = f.read()
			f.close()
			nonce = int(re.sub(re.compile(r'.*?nonce\:(.*?)', re.S),'\\1',nonce))
			nonce += 1
			#print nonce
		except IOError, e:
			''
		f = file('bitcoin.dat','w')
		f.write('nonce:'+str(nonce)+"\n")
		f.close()
		self.nonce = nonce
		return self.nonce
		
	def getInfo(self):
		self.log('getInfo')
		# todo: below lines repeated above, remove code replication
		# method name and nonce go into the POST parameters
		self.params = {"method":"getInfo",
			  "nonce": self.getNonce()}
		self.params = urllib.urlencode(self.params)

		# Hash the params string to produce the Sign header value
		H = hmac.new(self.BTC_api_secret, digestmod=hashlib.sha512)
		H.update(self.params)
		self.sign = H.hexdigest()
		headers = {"Content-type": "application/x-www-form-urlencoded",
				   "Key":self.BTC_api_key,
				   "Sign":self.sign}
		domain = "btc-e.com"
		url = 'https://'+domain+"/tapi"
		conn = httplib.HTTPSConnection(domain)
		conn.request("POST", url, self.params, headers)
		response = conn.getresponse()
		res = json.load(response)
		try:
			self.info = res['return']['funds']
		except KeyError, e:
			err = res['error']
			if err == 'invalid api key':
				print 'Your API key is invalid, please generate a new API key from your userpanel at http://btc-e.com under \'API keys\'.'
				print 'Update the variable: self.BTC_api_key with the new key'
				print 'Update the variable: self.BTC_api_secret with the new secret'
			else:
				print 'The nonce on server is invalid, rest the nonce by genereating new API keys.'
			
			sys.exit()
		return self.info
		
	def getBalance(self, curr):
		self.log('getBlanace')
		self.getNonce()
		self.getInfo()
		print self.info[curr]
		
		self.currencies = {}
		
	def getBlockChains(self, server, req, compile):
		self.log('getBlockChains')
		self.getNonce()
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
		
		print '\t blockchain \t',
		print '%.8f' % nd(e,8),
		print '\t ' + url
		
		return float(e)
		
	def getTicker(self, i):
		self.log('getTicker '+i)
		
		if i == 'usd':
			return None
			
		self.getNonce()
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
			if type(self.btcBaseCurrencies.index(i)) == type(1):
				self.currencies[i]['basecurr'] = 'btc'
			else:
				self.currencies[i]['basecurr'] = 'usd'
		except:
			self.currencies[i]['basecurr'] = 'usd'
		
		pair = str(i)+"_"+self.currencies[i]['basecurr']
		url = 'https://'+domain+"/api/2/"+pair+"/ticker"
		print '\tticker\t\t\t' + url
		print '\t---'
		try:
			conn = httplib.HTTPSConnection(domain)
			conn.request("POST", url, self.params, headers)
			response = conn.getresponse()
			ticker = json.load(response)
			ticker['ticker']['pair'] = pair
			return ticker
		except:
			'stub'
	
	#def sendTrade(self, pair, type, rate, amount):
	def sendTrade(self, currencyPair, type, amount):
		self.log('sendTrade')
		self.getNonce()
		
		# initialize self.currencies[i] if not a dictionary
		#try:
		#	type(self.currencies[i])
		#except:
		#	self.currencies[i] = {}
		#try:
		#	if type(self.btcBaseCurrencies.index(i)) == type(1):
		#		self.currencies[i]['basecurr'] = 'btc'
		#	else:
		#		self.currencies[i]['basecurr'] = 'usd'
		#except:
		#	self.currencies[i]['basecurr'] = 'usd'
			
		e = self.getTicker(currencyPair[0]+currencyPair[1]+currencyPair[2])['ticker']
				
		# method name and nonce go into the POST parameters
		self.getNonce()
		self.params = {"method":"Trade",
			  "nonce": self.getNonce(),
			 #"pair": e['pair'],
			  "pair": currencyPair,
			  "type": type,
			  "rate": e[type],
			  "amount": amount}
		self.params = urllib.urlencode(self.params)
		
		# Hash the params string to produce the Sign header value
		H = hmac.new(self.BTC_api_secret, digestmod=hashlib.sha512)
		H.update(self.params)
		self.sign = H.hexdigest()
		headers = {"Content-type": "application/x-www-form-urlencoded",
				   "Key":self.BTC_api_key,
				   "Sign":self.sign}
		domain = "btc-e.com"
		#url = 'https://'+domain+"/api/2/"+str(i)+"_"+self.currencies[i]['basecurr']+"/ticker"
		url = 'https://'+domain+"/tapi"
		print '\tticker\t\t\t' + url
		print '\t---'
		self.log(str(b.getInfo()))
		
		conn = httplib.HTTPSConnection(domain)
		conn.request("POST", url, self.params, headers)
		response = conn.getresponse()
		ticker = json.load(response)
		
		self.log(str(b.getInfo()))
		
		#return ticker

	def log(self, str):
		self.logBuffer += str+"\n"
		
	# simple log balance to file
	def logToFile(self, currency, balance):
		f = open('bitcoin.log', 'a')
		f.write(time.ctime()+','+str(time.time())+','+currency+','+str(balance)+"\n")
		f.close()
		
		
	def showLog(self):
		print ""
		print "= LOGS =========================================================================="
		print ""
		print self.logBuffer

	def main(self):
		self.log('main')
		# Hash the params string to produce the Sign header value
		H = hmac.new(self.BTC_api_secret, digestmod=hashlib.sha512)
		H.update(self.params)
		self.sign = H.hexdigest()
		
		self.getInfo()
		self.getNonce()

		#headers = {"Content-type": "application/x-www-form-urlencoded",
		#		   "Key":self.BTC_api_key,
		#		   "Sign":self.sign}
		#conn = httplib.HTTPSConnection("btc-e.com")
		#conn.request("POST", "/tapi", self.params, headers)
		#response = conn.getresponse()

		#self.log(str(response.status) + ' ' + str(response.reason))

		#try:
		#res = json.load(response)
		#print res
		#responseBTCe = res['return']['funds']
		responseBTCe = self.getInfo()
		#except:
		#	print 'The btc-e API key pairs are not valid.'
		#	print 'You may edit api key here: https://btc-e.com/profile#api_keys'
		#	sys.exit()

		tusdbal = 0
		tusdbalshould  = 0 

		# define portfolio weights
		# register currency here and give it a portfolio weight
		dat = {
			'ltc': [2,[]],
			'btc': [1,['1AodK7vXUxBL7dyiwZov7QmpytuASi9Ah6']],
			#'btc': [1],
			
			# todo: add the self.currencies below
			'ftc':[0.1,[]],
			'nvc':[0.1,[]],
			'ppc':[0.1,[]],
			'trc':[0.1,[]],
			'nmc':[0.1,[]],
			'xpm':[0.1,[]],
		}
		brokerBlockchains = {
			'btc':[dat['btc'][1][0]],
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
				except TypeError:
					self.currencies[i]['xsell'] = 1
					
				try:
					self.currencies[i]['xbasecurr'] = baseTicker['ticker']['sell']
				except KeyError:
					'stub'
			
			# balance from btc
			bal = responseBTCe[i]
			if bal > 0:
				print '\t btce['+i+'] \t',
				print '%.8f' % nd(bal,8)
				print '\t---'
				# log the broker(btce) balance to file, save the balance for future reference
				# do not trust that the broker can record your actual balance.
				self.logToFile(i, bal)
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
						#if dat[i][1][j] != brokerBlockchains[i][0]:
						try:
							bal = self.getBlockChains("blockchain.info", "/address/"+dat[i][1][j], '(Balance.*?([\d\.]+) BTC)')
							# if brokerBlockcians has no index dat[i][1][j], it throws a ValueError
							brokerBlockchains[i].index(dat[i][1][j])
						except ValueError, e:
							# add to balance if dat[i][1][j] is not registered in brokerBlockchains
							self.currencies[i]['bal'] += bal
			except e:
				print e
			
			try:
				if type(self.btcBaseCurrencies.index(i)) == type(1):
					self.currencies[i]['xrate'] = self.currencies[i]['xsell'] * self.currencies[i]['xbasecurr']
				else:
					self.currencies[i]['xrate'] = self.currencies[i]['xsell']
			except:
				self.currencies[i]['xrate'] = self.currencies[i]['xsell']
			self.log('xrate:'+str(self.currencies[i]['xrate']))
			try:
				self.log('xbasecurr:'+str(self.currencies[i]['xbasecurr']))
			except:
				''
			
			self.currencies[i]['usdbal'] = nv(self.currencies[i]['bal'] * self.currencies[i]['xrate'])
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
				self.currencies[i]['pcent'] = 0
			
			
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
				print i + ": \t",
				print '%.8f' % self.currencies[i]['bal'],
				print " \t",
				print '%.8f' % self.currencies[i]['usdbal'],
				print " \t",
				print '%.3f' % self.currencies[i]['pcent'],
				print "% \t",
				print '%.3f' % pshould,
				print "% \t",
				print '%.8f' % self.currencies[i]['xrate'],
				self.log('usdbal['+i+']:'+str(self.currencies[i]['usdbal']))
				self.log('usdbalshouldb['+i+']:'+str(usdbalshould))
				if self.currencies[i]['usdbal'] > usdbalshould:
					decrease = self.currencies[i]['usdbal'] - usdbalshould
					print  '\t-',
					print '%.2f' % (decrease / self.currencies[i]['xrate']),
					print ' ' + str(i) + "\t[USD",
					print '%.4f' % decrease,
					print ']'
					#print  ""
				if self.currencies[i]['usdbal'] <= usdbalshould:
					increase = usdbalshould - self.currencies[i]['usdbal']
					print  '\t+',
					print string.zfill('%.2f' % (increase / self.currencies[i]['xrate']), 5),
					print ' ' + str(i) + "\t[USD",
					print '%.4f' % increase,
					print ']'
					#print ""
			else:
				''
			#except Error, e:
			#	print e

		#footer
		print 'Total USD: ' + str(tusdbal)

b = bitcoin()
#t = b.getTicker('ltc')
#print t
#b.sendTrade('btc_usd', 'sell', 0.01)
#b.sendTrade('ppc_btc', 'buy', 0.1)
#b.sendTrade('xpm_btc', 'buy', 0.1)
b.main()
#b.showLog()
