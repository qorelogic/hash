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
import math

from config import *

import commands
from numpy import *
import pylab
import matplotlib.pyplot as pyplot

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

from urlparse import urlparse

def cacheLynx(url, livedata):
	liveC = "lynx -dump -width=200 "+url+" | grep '%'"
	if livedata:
		c = liveC
	else:
		# cache to output-lynx.txt
		cachefile = url+'.txt'
		#cachefile = 'output-lynx.txt'
		status, output = commands.getstatusoutput('ls '+cachefile)
		res = re.sub(re.compile(r'.*(No such file).*', re.S), "\\1", output)
		if res.strip() == 'No such file':
			status, output = commands.getstatusoutput(liveC + ' > '+cachefile)
			status, output = commands.getstatusoutput('cat '+cachefile)
		
		c = 'cat '+config().basedir+'/'+cachefile
	status, output = commands.getstatusoutput(c)
	#print output
	return output

class api:
	def __init__(self):
		self.headers = {}
		self.headers["Content-type"] = "application/x-www-form-urlencoded"
		self.params = ""
	
	def callAPI(self, url, cachefile=''):
		if cachefile != '':
			try:
				fp = open(cachefile, 'r')
				jo = fp.read()
				fp.close()
				jo = json.loads(jo)
				return jo
				sys.exit()
			except:
				''
			
		u = urlparse(url)
		server = u.hostname
		req = u.path + '?' + u.query
		#self.getNonce()
		if u.scheme == 'http':
			conn = httplib.HTTPConnection(server)
		if u.scheme == 'https':
			conn = httplib.HTTPSConnection(server)
		url = 'https://'+server+str(req)
		#print url
		#print req
		#print params
		#print headers
		#print server
		conn.request("GET", req, self.params, self.headers)
		response = conn.getresponse()
		content = response.read()
		conn.close()
		j =  content
		try:
			jo = json.loads(j)
			
			if cachefile != '':
				# write to cachefile
				fp = open(cachefile, 'w')
				fp.write(j)
				fp.close()
			
			return jo
		except ValueError, e:
			''
	
	def setHeaders(self, headers):
		self.headers = headers
	

class price(object):
	def __init__(self):
		#self.getPriceJSON(curr)
		#print self.marketData()
		''
		#self.api = api()
	
	# currencypair = 'DOGE/BTC'
	def getCryptsyMarketId(self, currencypair):
		# cryptsy marketids
		jo = api().callAPI('http://pubapi.cryptsy.com/api.php?method=marketdatav2','/home/qore/hash/tmp/cryptsyapi.php.json')['return']['markets']
		cryptsyMarketIds = {}
		for i in jo:
			cryptsyMarketIds[i] = jo[i]['marketid']
			#print i
			#print jo[i]['marketid']
		#print cryptsyMarketIds
		return cryptsyMarketIds[currencypair]
		
	#currencypair = 'MEOW/BTC'
	def getCryptsyPrice(self, currencypair):
		quoteCurrency = re.sub(re.compile(r'(.*?)\/.*', re.S), '\\1', currencypair)
		jo = self.api.callAPI('http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid='+self.getCryptsyMarketId(currencypair))
		try:
			return float(jo['return']['markets'][quoteCurrency]['lasttradeprice'])
		except:
			return 0
			
	def getBTCePrice(self, currencypair):
		import btceapi
		connection = btceapi.BTCEConnection()
		#print btceapi.all_pairs
		t = btceapi.getTicker('btc_usd')
		return t.avg
		
	def getPriceJSON(self, currency):
		self.api = api()
		
		if currency == 'DOGE':
			return self.getCryptsyPrice('DOGE/BTC')
	
		if currency == 'MOON':
			# source; https://gist.github.com/erundook/8377222
			jo = self.api.callAPI('https://coinex.pw/api/v2/trade_pairs')
			
			for i in jo['trade_pairs']:
				if i['url_slug'] == 'moon_btc':
					return float(i['last_price'] * pow(10,-8))

		if currency == 'KITTEH':
			return self.getCryptsyPrice('MEOW/BTC')
		if currency == 'MEOW':
			return self.getCryptsyPrice('MEOW/BTC')
			
		if currency == 'BTC':
			return self.getBTCePrice('BTC/USD')
			
		return self.getCryptsyPrice(currency+'/BTC')
		
	
	def marketData(self):
		j = self.callAPI('http://pubapi.cryptsy.com/api.php?method=marketdatav2')
		self.markets = j['return']['markets']
		for i in self.markets:
			print i
			#print self.markets[i]
			print self.markets[i]['marketid']

class coinexPw(object):
	"""
	def __init__(self):
		# mining info: https://coinex.pw/api/v2/currencies	
		''
	"""
	def getMarketData(self):
		d = api().callAPI('https://coinex.pw/api/v2/trade_pairs')
		self.markets = d
		return self.markets
		
	def getPrice(self, id):
		self.getMarketData()
		pair = id.lower()+'_btc'
		#for i in self.markets['trade_pairs']:
		#	if i['id'] == id:
		#		print i
		#		print i['url_slug']
		#print self.markets['trade_pairs']
		for i in self.markets['trade_pairs']:
			if i['url_slug'] == pair:
				#print i
				return float(i['last_price'] * pow(10,-8))
		
	
	def getBalances(self):
		self.api_key = '317bca8e06c57bb892d72a5f7c860d52cfcc8053c6594a782c72bcaad388e32c'
		self.api_secret = '191bac48d7545435f5367d9dfd30d70c64fca38059615fe21bb6a1e03c523135'		
		
		# Hash the params string to produce the Sign header value
		H = hmac.new(self.api_secret, digestmod=hashlib.sha512)
		#H.update(self.params)
		self.sign = H.hexdigest()
		headers = {"Content-type": "application/x-www-form-urlencoded",
				   "API-Key":self.api_key,
				   "API-Sign":self.sign}
		#print headers		
		a = api()
		a.setHeaders(headers)
		j = a.callAPI('https://coinex.pw/api/v2/balances')
		#print j
		balances = {}
		total_btc = 0
		xbtcusd = 870
		print 'coinex.pw balances:'
		try:
			for i in j['balances']:
				#print i
				amount = float(i['amount']) / pow(10,8)
				#print i['currency_name'] + '\t' + str(i['currency_id']) + '\t' + str(amount)
				#print price().getPriceJSON('MOON')
				rate =  self.getPrice(i['currency_name'])
				#print rate
				try:
					bal = amount * rate
					usdbal = bal * xbtcusd
					print i['currency_name'] + '\t' + str(i['currency_id']) + '\t' + str(amount) + '\t' + str(bal) + '\t' + str(usdbal)
					balances[i['currency_name']] = {}
					balances[i['currency_name']]['currency_id'] = i['currency_id']
					balances[i['currency_name']]['amount'] = amount
					balances[i['currency_name']]['balance'] = bal
					total_btc += bal				
				except:
					''
		except TypeError, e:
			''
		#print j['balances']
		print balances
		total_usd = total_btc * xbtcusd
		print {'balances':balances,'total_btc':total_btc, 'total_usd':total_usd}
			

class broker(object):
	def __init__(self, api_key, api_secret):
		# Replace these with your own API key data
		self.api_key = api_key
		self.api_secret = api_secret
		
		self.logBuffer = ""
		
		# method name and nonce go into the POST parameters
		self.params = {"method":"getInfo",
			  "nonce": self.getNonce()}
		self.params = urllib.urlencode(self.params)

		# Hash the params string to produce the Sign header value
		H = hmac.new(self.api_secret, digestmod=hashlib.sha512)
		H.update(self.params)
		self.sign = H.hexdigest()
		
		self.btcBaseCurrencies = ['nmc','nvc','ftc','ppc','trc','xpm','doge','moon']
		
		self.currencies = {}
		
		# check variables
		try:
			#print self.domain
			self.domain
		except:
			print 'self.domain is not set'
			sys.exit()
			
		try:
			#print self.url
			self.url
		except:
			print 'self.url is not set'
			sys.exit()
		
		self.cryptsy = None
		
		# make dirs if not exist
		cmd = "mkdir -p "+config().basedir+"/log/output-lynx"
		status, output = commands.getstatusoutput(cmd)
		
		# test for correct basedir configuration
		try:
			fp = open(config().basedir+'/db/hash.sqlite','r')
		except IOError,e :
			#print e
			print 'The configuration basedir seems to be wrong, please edit the config::basedir in bin/config.py and try again.'
			sys.exit()
		
	def setCryptsy(self, c):
		self.cryptsy = c
	
	def getNonce(self):
		self.log('getNonce')
		# Come up with your own method for choosing an incrementing nonce
		#nonce = 13
		#mks = datetime.datetime.now().microsecond
		#print mks
		#self.nonce = int(time.time())*1000000 + mks
		#self.nonce = mks * 10000
		try:
			f = file('bitcoin.dat','r')
		except:
			''
		try:
			nonce = f.read()
			f.close()
			nonce = int(re.sub(re.compile(r'.*?nonce\:(.*?)', re.S),'\\1',nonce))
			nonce += 1
			#print nonce
		except UnboundLocalError, e:
			nonce = 1
		except IOError, e:
			''
		except:
			''
		f = file('bitcoin.dat','w')		
		f.write('nonce:'+str(nonce)+"\n")
		f.close()
		self.nonce = nonce
		return self.nonce
	
	def check(self):
		print self.api_key
	
	def log(self, stri):
		self.logBuffer += stri+"\n"
	
	def out(self, string):
		print str(time.time())+': '+string
		
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
	
	def getInfo(self):
		self.log(self.method_getInfo)
		# todo: below lines repeated above, remove code replication
		# method name and nonce go into the POST parameters
		self.params = {"method": self.method_getInfo,
			  "nonce": self.getNonce()}
		self.params = urllib.urlencode(self.params)
		print self.params

		# Hash the params string to produce the Sign header value
		H = hmac.new(self.api_secret, digestmod=hashlib.sha512)
		H.update(self.params)
		self.sign = H.hexdigest()
		headers = {"Content-type": "application/x-www-form-urlencoded",
				   "key":self.api_key,
				   "sign":self.sign}
		print headers
			
		conn = httplib.HTTPSConnection(self.domain)
		conn.request("POST", self.url, self.params, headers)
		response = conn.getresponse()
		print response
		#try:
		res = json.load(response)
		#except:
		#	print 'server flooded'
		#	sys.exit()
		print res
		try:
			self.info = res['return']['funds']
			return self.info
		except KeyError, e:
			err = res['error']
			if err == 'invalid api key':
				print 'Your API key is invalid, please generate a new API key from your userpanel at http://btc-e.com under \'API keys\'.'
				print 'Update the variable: self.api_key with the new key'
				print 'Update the variable: self.api_secret with the new secret'
			else:
				print 'The nonce on server is invalid, reset the nonce by genereating new API keys.'			
			sys.exit()
	
	def analyze(self, livedata=True, savelog = False):
		
		def n(a):
			try:
				n = re.sub(r',', '', a) # strip commas
				n = re.sub(r'[+]', '', n) # strip polarity signs
				#print str(a)+'\t'+str(n)
				n = float(n)
				return n
			except:
				return ''
			
		def doPlot(b):
			# plot
			col1 = b[:,1]
			#pylab.hist(b)
			#pylab.hist(col1)
			#pylab.set_yaxis('log')
			#pylab.plot(col1)
			fig = pyplot.figure()
			ax = fig.add_subplot(1,1,1)
			line = ax.plot(col1, color='blue', lw=1, label='Market Cap')
			line = ax.plot(b[:,4], color='green', lw=1, label='Volume (24hr)')
			line = ax.plot(b[:,5], color='blue', lw=1, label='% Change (24hr)')
			ax.set_yscale('log')
			pyplot.legend()
			pylab.show()
		
		# todo: get more data
		# https://bitcointalk.org/index.php?topic=146675.0
		# http://www.cryptocoincharts.info/v2/coins/info
		# http://www.wheretomine.com/
		# http://www.coinwarz.com/cryptocurrency
		# http://dustcoin.com/		

		output = cacheLynx('http://coinmarketcap.com/all.html', livedata)
		#print output
		
		#			    #                  name                       marketcap                      price                      total supply   ticker             volume               % Change              
		r = re.findall(r'.*?([\d]+).*?\[(.*?)\.png\].*?\$(.*?)\[.*?\$(.*?).*?([\d\.\,e-]+).*?([\d\.\,]+).*?(\w+).*?\$.*?([\d\.\,]+).*?([\-\d\.\,\+]+).*', output)
		
		b = array([])
		header = ['#','Coin', 'Market Cap', '', 'Price', 'Supply', 'Unit', 'Volume', 'Change(24hr)','MarketCap / Total MarketCap (%)','Volume / MarketCap (%)','Volume / TotalVolume (%) ','InversePrice', 'Supply/Total MarketCap(%) Volume','Supply/MarketCap(%)','Supply/TotalVolume(%)','minBlockTime', 'ratio', 'adjustedratio', 'difficulty', 'networkhashrate', 'avgHash', 'currentBlocks', 'avgProfit', 'algo', 'reward']

		r = asarray(r)
		
		# add a column of zeros
		r = column_stack((r, zeros(shape(r)[0])))
		r = column_stack((r, zeros(shape(r)[0])))
		r = column_stack((r, zeros(shape(r)[0])))
		r = column_stack((r, zeros(shape(r)[0])))
		r = column_stack((r, zeros(shape(r)[0])))
		
		r = column_stack((r, zeros(shape(r)[0])))
		r = column_stack((r, zeros(shape(r)[0])))
		
		r = column_stack((r, zeros(shape(r)[0])))
		r = column_stack((r, zeros(shape(r)[0])))
		r = column_stack((r, zeros(shape(r)[0])))
		r = column_stack((r, zeros(shape(r)[0])))
		r = column_stack((r, zeros(shape(r)[0])))
		r = column_stack((r, zeros(shape(r)[0])))
		r = column_stack((r, zeros(shape(r)[0])))
		r = column_stack((r, zeros(shape(r)[0])))
		r = column_stack((r, zeros(shape(r)[0])))
		r = column_stack((r, zeros(shape(r)[0])))
		
		# merge new array into r
		q = 'http://www.coinchoose.com/api.php?base=BTC'
		if livedata == True:
			j = api().callAPI(q)
		else:
			j = api().callAPI(q, 'coinchoose.txt')
			
		
		cc = {}
		for i in j:
			cc.update({i['name']:i})
			"""
			print i
			print i['0']
			print i['name']
			print i['price']
			print i['minBlockTime']
			print i['ratio']
			print i['adjustedratio']
			print i['difficulty']
			print i['networkhashrate']
			print i['avgHash']
			print i['currentBlocks']
			print i['avgProfit']
			print i['algo']
			print i['reward']
			"""
		#res = json.loads(j)
		#print res
		
		print cc
		#print r
		
		mcaps = 0
		mvolume = 0
		for i in range(0,len(r)):
			#print r[i]
			#print r[i][1]
			#print r[i][4]
			r[i][2] = n(r[i][2])
			r[i][4] = n(r[i][4])
			r[i][5] = n(r[i][5])
			r[i][7] = n(r[i][7])
			r[i][8] = n(r[i][8])
			# calculate total marketcap
			mcaps += float(r[i][2])
			mvolume += float(r[i][7])
			
		for i in range(0,len(r)):
			# MarketCap / Total MarketCap (%)
			r[i][9] = float(r[i][2])/mcaps*100
			# Volume / MarketCap (%)
			r[i][10] = float(r[i][7]) / float(r[i][2]) * 100
			# % volume to total volume summation
			r[i][11] = float(r[i][7]) / mvolume * 100
			# inverse of price
			r[i][12] = float(1) / float(r[i][4])
			# Supply / Total MarketCap (%)
			r[i][13] = float(r[i][5])/mcaps*100
		
			# Supply / Total MarketCap (%)
			r[i][13] = float(r[i][5])/mcaps*100
			# Supply / MarketCap (%)
			r[i][14] = float(r[i][5]) / float(r[i][2]) * 100
			# Supply / total volume summation
			r[i][15] = float(r[i][5]) / mvolume * 100
			try:
				r[i][16] = float(cc[r[i][1]]['minBlockTime'])
			except:
				''
			try:
				r[i][17] = float(cc[r[i][1]]['ratio'])
			except:
				''
			try:
				r[i][18] = float(cc[r[i][1]]['adjustedratio'])
			except:
				''
			try:
				r[i][19] = float(cc[r[i][1]]['difficulty'])
			except:
				''
			try:
				r[i][20] = float(cc[r[i][1]]['networkhashrate'])
			except:
				''
			try:
				r[i][21] = float(cc[r[i][1]]['avgHash'])
			except:
				''
			try:
				r[i][22] = float(cc[r[i][1]]['currentBlocks'])
			except:
				''
			try:
				r[i][23] = float(cc[r[i][1]]['avgProfit'])
			except:
				''
			try:
				r[i][24] = float(cc[r[i][1]]['algo'])
			except:
				''
			try:
				r[i][25] = float(cc[r[i][1]]['reward'])
			except:
				''
			#print r[i][1]
			#print r[i][4]
		li = r.tolist()
		#for i in li:
		#	print i
		
		# add to the json log file
		d = {}
		d['timestamp'] = time.time()
		d['data'] = r.tolist()
		j = json.dumps(d)
		fp = open('bitcoin-analyze.log', 'a')
		if savelog == 0:
			fp.write(j+"\n")
		fp.close()
		
		#for i in r:
			#print i
			#print type(i)
			#print i[2]
			# numpy analysis
		#	a = array( [ n(i[0]), n(i[2]), n(i[4]), n(i[5]), n(i[7]), n(i[8])  ] )
		#	try:
		#		#print a
		#		#b = vstack([b, a])
		#		b = concatenate((b, a))
		#	except:
		#		''
		#b = b.reshape((b.shape[0]/6), 6)
		#print b
		
		# create csv file
		if savelog:
			import csv
			fname = config().basedir+'/log/output-lynx/output-lynx-'+str(d['timestamp'])+'.csv'
			b1 = open(fname,'w')
			c1 = csv.writer(b1)
			#c1.writerow(( header[0], header[2], header[4], header[5], header[7], header[8] ))
			c1.writerow(header)
			c1.writerows(r)
			b1.close()
			self.out('saved to: '+fname)
		
			self.insertOutput(fname)
		
		#sum = b.sum(axis=0)
		#print [sum[1],sum[3]]
		#print sum
		#print b[0:1, : ]
		
		#status, output = commands.getstatusoutput('ggobi '+fname)
		#doPlot(b)
		
		"""
		a = arange(15).reshape(3,5)
		print a
		print a.sum(axis=0)
		a = array([1])
		#print dir(a)
		a = vstack([1])
		print a
		a = vstack([2])
		print a
		"""
		# return r for server.py pre-processor
		return r.tolist()
		
	def coinwarz(self):
		import  json
		base = 'http://www.coinwarz.com'
		u = 'http://www.coinwarz.com/difficulty-charts/ronpaulcoin-difficulty-chart'
		c = "lynx -source '"+u+"' | grep JSON"
		status, output = commands.getstatusoutput(c)
		u = re.sub(re.compile(r'.*?JSON\(\'(.*=[\d]+).*', re.S),'\\1',output)
		u = base + u
		c = "lynx -source '"+u+"'"
		status, output = commands.getstatusoutput(c)
		"""
		fp = open('coinwarz.json', 'r')
		output = fp.read()
		"""
		output = json.loads(output)
		rlist = []
		for i in output:
			print i
			
			ts = i[0]
			
			ts = float(ts)/1000
			
			#print i[1]
			jsdate = time.strftime("new Date (%Y,%m,%d, %H, %I, %S)", time.localtime(ts))
			pr = i[1]
			#print time.gmtime(ts)
			rlist.append([jsdate, pr])
		print rlist
		return rlist
		#print output
	#	#
	
	def insertOutput(self, output, c = False):
		# insert data into sqlite db
		if c == False:
			import sqlite3 as s
			#todo: fix the os.path.abspath() call and use this instead of the hardcoded config().basedir
			#f = os.path.abspath('./db/hash.sqlite')
			#d = os.path.dirname(f)
			try:
				d = config().basedir
				f = d+'/db/hash.sqlite'
				c = s.Connection(f)
			except s.OperationalError, e:
				print e
				print f
				sys.exit()
		
		"""
		try:
			c.execute("drop table cryptocoins;")
		except s.OperationalError, e:
			''
		"""
		try:
			cu = c.execute('create table cryptocoins(timestamp DOUBLE, coin TEXT, marketcap DOUBLE, price DOUBLE, supply DOUBLE, unit TEXT, volume DOUBLE, change24hr DOUBLE, mtm DOUBLE, vm DOUBLE, vtv DOUBLE, inversePrice DOUBLE, stm DOUBLE, sm DOUBLE, stv DOUBLE);')
		except s.OperationalError, e:
			''
			#print e
		
		fz = output.split()
		for i in fz:
			#print i
			ts = re.sub(re.compile(r'.*-([\d\.]+)\..*', re.S), '\\1', i)
			fp = open(i, 'r')
			output = fp.read()
			co = output.split("\r\n")
			for j in co:
				try:
					jsp = j.split(',')
					#print jsp
					jsp.pop(0)
					jsp.insert(0, ts)
					jsp.pop(3)
					#print jsp
					#ins = c.execute("insert into cryptocoins (id,data) values (NULL,'"+json.dumps(mydata)+"');")
					#lenj = len(jsp)
					
					try:
						ins = c.execute("insert into cryptocoins values (?,?,?,?,?,?,?,?,?,?,?,?)", jsp)
					except s.OperationalError, e:
						''
						#print e
					except s.ProgrammingError, e:
						''
						#print e
						
					try:
						ins = c.execute("insert into cryptocoins values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", jsp)
					except s.OperationalError, e:
						''
						#print e
					except s.ProgrammingError, e:
						''
						#print e
					
					try:
						jsp = jsp.pop()
						ins = c.execute("insert into cryptocoins values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", jsp)
					except s.OperationalError, e:
						''
						#print e
					except s.ProgrammingError, e:
						''
						#print e
					
					#sql = "INSERT INTO cryptocoins VALUES (%s)" % ",".join('?' * 15)
					#ins = c.execute(sql, jsp)
					
					#print ins
					#print dir(ins)
					c.commit()
				except IndexError, e:
					''
					#print e
			self.out('updated sqlite db')
			fp.close()
			time.sleep(1)
		c.close()
	
	def analyzeReader(self):
		cmd = "ls "+config().basedir+"/log/output-lynx/output-lynx-*.csv 2> /dev/null"
		status, output = commands.getstatusoutput(cmd)
		self.insertOutput(output)

	def analyzedb(self):
		# insert data into sqlite db
		import sqlite3 as s
		c = s.Connection(config().basedir+'/db/hash.sqlite')
		
		cur = c.cursor()
		#res = cur.execute("select * from cryptocoins where coin != 'Coin' and coin != '.';")
		res = cur.execute("select * from cryptocoins where coin != 'Coin' and coin != '.' order by timestamp desc;")
		#res = cu.fetchall()
		res = list(res)
		for i in res:
			print i
			ts = float(i[0]) 
			jsdate = time.strftime("new Date (%Y,%m,%d, %H, %I, %S)", time.localtime(ts))
			print jsdate
			
		c.close()
		#res = [1,2,3]
		return res

from lib.CryptsyPythonAPI.Cryptsy import *
class cryptsy(broker):
	def __init__(self, api_key, api_secret):
		self.domain = "cryptsy.com"
		self.url = 'https://'+self.domain+"/api"
		
		self.method_getInfo = 'getinfo'
		super(cryptsy, self).__init__(api_key, api_secret)
		
	def getBalances(self):
		print 'cryptsy balances:'
		c = Cryptsy(self.api_key,self.api_secret)
		info = c.getInfo()['return']['balances_available']
		b = price().getPriceJSON('BTC')
		for i in info:
			bal = float(info[i])
			q = 0
			if bal > 0:
				q = price().getPriceJSON(i)
				bal_btc = float(info[i]) * q
				bal_usd = float(bal_btc) * float(b)
				print i + ' ' + info[i] + ' ' + str(bal_btc) + ' ' + str(bal_usd)
			
		"""
		print j
		balances = {}
		total_btc = 0
		xbtcusd = 870
		"""
		"""
		for i in j['balances']:
			#print i
			amount = float(i['amount']) / pow(10,8)
			#print i['currency_name'] + '\t' + str(i['currency_id']) + '\t' + str(amount)
			#print price().getPriceJSON('MOON')
			rate =  self.getPrice(i['currency_name'])
			#print rate
			try:
				bal = amount * rate
				usdbal = bal * xbtcusd
				print i['currency_name'] + '\t' + str(i['currency_id']) + '\t' + str(amount) + '\t' + str(bal) + '\t' + str(usdbal)
				balances[i['currency_name']] = {}
				balances[i['currency_name']]['currency_id'] = i['currency_id']
				balances[i['currency_name']]['amount'] = amount
				balances[i['currency_name']]['balance'] = bal
				total_btc += bal				
			except:
				''
		#print j['balances']
		print balances
		total_usd = total_btc * xbtcusd
		print {'balances':balances,'total_btc':total_btc, 'total_usd':total_usd}
		"""

class btce(broker):
	
	def __init__(self, api_key, api_secret):
		self.domain = "btc-e.com"
		self.url = 'https://'+self.domain+"/tapi"
		
		self.method_getInfo = 'getInfo'
		super(btce, self).__init__(api_key, api_secret)

	
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
		#headers = {}
		#params = {}
		params = ""
		if server == "blockchain.info":
			conn = httplib.HTTPSConnection(server)
			#print 'https'
		else:
			conn = httplib.HTTPConnection(server)
			#print 'http'
		url = 'https://'+server+str(req)
		#print url
		#print req
		#print params
		#print headers
		#print server
		try:
			conn.request("GET", req, params, headers)
			response = conn.getresponse()
			content = response.read()
			conn.close()
			#print content

			bal = re.findall(re.compile(compile, re.S), content)
			e = bal[0][1]
			
			print '\t blockchain \t',
			print '%.8f' % nd(e,8),
			print '\t ' + url
			
			return float(e)
		#except socket.error, e:
		#	''
		except:
			return float(0)
		
	def getTicker(self, i):
		self.log('getTicker '+i)
		
		if i == 'usd':
			return None
			
		self.getNonce()
		headers = {"Content-type": "application/x-www-form-urlencoded",
				   "Key":self.api_key,
				   "Sign":self.sign}
		domain = "btc-e.com"
		
		# initialize self.currencies[i] if not a dictionary
		try:
			type(self.currencies[i])
		except:
			self.currencies[i] = {}
		# set the base currency
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
		
		amount = '%.8f' % float(amount)
				
		# method name and nonce go into the POST parameters
		gi1 = self.getInfo()
		self.log(str(gi1))
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
		H = hmac.new(self.api_secret, digestmod=hashlib.sha512)
		H.update(self.params)
		self.sign = H.hexdigest()
		headers = {"Content-type": "application/x-www-form-urlencoded",
				   "Key":self.api_key,
				   "Sign":self.sign}
		domain = "btc-e.com"
		#url = 'https://'+domain+"/api/2/"+str(i)+"_"+self.currencies[i]['basecurr']+"/ticker"
		url = 'https://'+domain+"/tapi"
		print '\tticker\t\t\t' + url
		print '\t---'
		
		conn = httplib.HTTPSConnection(domain)
		conn.request("POST", url, self.params, headers)
		response = conn.getresponse()
		ticker = json.load(response)
		
		self.log(str(ticker))
		
		gi2 = self.getInfo()
		self.log(str(gi2))
		cu = currencyPair[0]+currencyPair[1]+currencyPair[2]
		
		#print cu
		#print 'bal1:'+str(gi1[cu])
		#print 'bal2:'+str(gi2[cu])
		diffbal = math.sqrt(math.pow(gi1[cu]-gi2[cu],2))
		#print 'diffbal:'+str(diffbal)
		#print 'amount:'+amount
		adiff = diffbal-float(amount)
		print 'adiff:'+str(adiff)
		print str((adiff/float(amount)*100))
		if 0 <= adiff and adiff <= 0.001:
			print 'check: ' + str(adiff)
		else:
			print 'balance diff: ' + str(adiff) + ' ' + str((adiff/float(amount)*100)) + '%'
		
		return ticker

	def main(self):
		self.log('main')
		# Hash the params string to produce the Sign header value
		H = hmac.new(self.api_secret, digestmod=hashlib.sha512)
		H.update(self.params)
		self.sign = H.hexdigest()
		
		self.getInfo()
		self.getNonce()

		#headers = {"Content-type": "application/x-www-form-urlencoded",
		#		   "Key":self.api_key,
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

		# get balance data
		print ""
		print "= Blockchains & Brokers ========================================================="
		print ""
		baseTicker = self.getTicker('btc')
		"""
		for i in responseBTCe:
			self.currencies[i] = {}
			self.currencies[i]['xsell'] = 0
		"""
		for i in config().dat:
			# ignore usd
			if i == 'usd':
				continue
			try:
				if responseBTCe[i] > 0 or config().dat.has_key(i):
					print i
					ticker = self.getTicker(i)
					try:
						self.currencies[i]['xsell'] = ticker['ticker']['sell']
					except KeyError:
						'stub'
					except TypeError:
						self.currencies[i]['xsell'] = 1
					try:
						self.currencies[i]['xbuy'] = ticker['ticker']['buy']
					except KeyError:
						'stub'
					except TypeError:
						self.currencies[i]['xbuy'] = 1
						
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
			except:
				''
			
			def getMBal(server, address, compile):
				if type(address) == type(""):
					bal = self.getBlockChains(server, "/address/"+address, compile)
				if type(address) == type([]):
					self.log('adress bal:'+str(address[1]))
					self.log('adress bal:'+str(type(address[1])))
					bal = address[1]
					print '	'+address[0] + '	' + str(address[1])
				# if brokerBlockcians has no index config().dat[i][1][j], it throws a ValueError
				#self.brokerBlockchains[i].index(config().dat[i][1][j])
				try:
					self.currencies[i]['bal'] += bal
				except:
					self.currencies[i] = {}
					self.currencies[i]['bal'] = bal
				return bal
				
			# litecoin balance
			if i == 'ltc':
				for j in range(0, len(config().dat[i][1])):
					bal = getMBal("litecoinscout.com", config().dat[i][1][j], '(Balance: (.*?) LTC)')
					"""
					try:
						self.currencies[i]['bal'] += bal
					except:
						self.currencies[i]['bal'] = bal
					"""
			
			# dogecoin balance
			if i == 'doge':
				for j in range(0, len(config().dat[i][1])):
					bal = getMBal("dogechain.info", config().dat[i][1][j], '(Balance.*?([\d\.]+).*?DOGE)')
				p = price().getPriceJSON('DOGE')
				self.currencies[i]['xsell'] = p
				self.currencies[i]['xbuy'] = p
				self.currencies[i]['basecurr'] = 'btc'
				self.currencies[i]['xbasecurr'] = baseTicker['ticker']['sell']

			# mooncoin balance
			if i == 'moon':
				for j in range(0, len(config().dat[i][1])):
					bal = getMBal("moonchain.info", config().dat[i][1][j], '(Balance.*?([\d\.]+).*?MOON)')
				p = price().getPriceJSON('MOON')
				self.currencies[i]['xsell'] = p
				self.currencies[i]['xbuy'] = p
				self.currencies[i]['basecurr'] = 'btc'
				self.currencies[i]['xbasecurr'] = baseTicker['ticker']['sell']

			# bitcoin balance
			try:
				if i == 'btc' and type(config().dat[i][1]):
					for j in range(0, len(config().dat[i][1])):
						#if config().dat[i][1][j] != config().brokerBlockchains[i][0]:
						#try:
						# two modes
						# - '<blockchain address>'
						# - ['description',<amount(float)>]
						address = config().dat[i][1][j]
						self.log('adress:'+str(address))
						if type(address) == type(""):
							bal = self.getBlockChains("blockchain.info", "/address/"+address, '(Balance.*?([\d\.]+) BTC)')
							
						if type(address) == type([]):
							self.log('adress bal:'+str(address[1]))
							self.log('adress bal:'+str(type(address[1])))
							bal = address[1]
							print '	'+address[0] + '	' + str(address[1])
						# if brokerBlockcians has no index config().dat[i][1][j], it throws a ValueError
						#self.brokerBlockchains[i].index(config().dat[i][1][j])
						try:
							self.currencies[i]['bal'] += bal
						except:
							self.currencies[i]['bal'] = bal
						"""
						except ValueError, e:
							# add to balance if config().dat[i][1][j] is not registered in brokerBlockchains
							self.currencies[i]['bal'] += bal
							print e
						except NameError, e:
							print e
							''
						"""
			except TypeError, e:
				print e
			try:
				try:
					if type(self.btcBaseCurrencies.index(i)) == type(1):
						self.currencies[i]['xrate'] = self.currencies[i]['xsell'] * self.currencies[i]['xbasecurr']
					else:
						self.currencies[i]['xrate'] = self.currencies[i]['xsell']
				except KeyError, e:
					self.currencies[i]['xrate'] = self.currencies[i]['xsell']
				except:
					self.currencies[i]['xrate'] = 1
				self.log('xrate:'+str(self.currencies[i]['xrate']))
				try:
					self.log('xbasecurr:'+str(self.currencies[i]['xbasecurr']))
				except:
					''
				self.currencies[i]['usdbal'] = nv(self.currencies[i]['bal'] * self.currencies[i]['xrate'])
				tusdbal += nv(self.currencies[i]['usdbal'])
			except KeyError, e:
				print e
			
				
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
				pshould = nv(float(config().dat[i][0]) / config().tdat * 100)
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
			
			self.currencies[i]['pshould'] = pshould
			self.currencies[i]['usdbalshould'] = usdbalshould
			
			#try:
			if self.currencies[i]['bal'] > 0 or config().dat.has_key(i):
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
					self.currencies[i]['decrease'] = self.currencies[i]['usdbal'] - usdbalshould
					self.currencies[i]['decrease_amount'] = self.currencies[i]['decrease'] / self.currencies[i]['xrate']
					print  '\t-',
					print string.zfill('%.2f' % (self.currencies[i]['decrease_amount']), 5),
					print ' ' + str(i) + "\t[USD",
					print '%.4f' % self.currencies[i]['decrease'],
					print ']'
					#print  ""
				if self.currencies[i]['usdbal'] <= usdbalshould:
					self.currencies[i]['increase'] = usdbalshould - self.currencies[i]['usdbal']
					try:
						self.currencies[i]['increase_amount'] = self.currencies[i]['increase'] / self.currencies[i]['xrate']
					except:
						self.currencies[i]['increase_amount'] = 0
					print  '\t+',
					print string.zfill('%.2f' % (self.currencies[i]['increase_amount']), 5),
					print ' ' + str(i) + "\t[USD",
					print '%.4f' % self.currencies[i]['increase'],
					print ']'
					#print ""
			else:
				''
			#except Error, e:
			#	print e

		#footer
		print 'Total USD: ' + str(tusdbal)
		
		# read
		#f = file('bitcoin.json','r')
		#j = f.read()
		#ptbal = json.load(j)
		#print ptbal
		
		print self.cryptsy.getBalances()
		
		
		w = {'totalusd': tusdbal, 'currencies':self.currencies}
		
		# keep a log
		# write to json file
		j = json.dumps(w, separators=(',',':'))
		f = file('bitcoin.json','w')
		f.write(j)
		f.close()
		
	def rebalanceCurrencies(self):
		
		f = file('bitcoin.json','r')
		j = f.read()
		jo = json.loads(j)
		print jo
		joc = jo['currencies']
		for i in joc:
			preinfo = self.getInfo()
			print ''
			print '---- '+i
			print joc[i]
			print joc[i]['pcent']
			print 'pre-balance:'+str(joc[i]['bal'])
			
			try:
				amount = joc[i]['increase_amount']
				type = 'buy'
				#postBal = joc[i]['bal'] + amount
				postBal = preinfo[i] + amount
			except:
				''
				
			try:
				amount = joc[i]['decrease_amount']
				type = 'sell'
				#postBalShould = joc[i]['bal'] - amount
				postBalShould = preinfo[i] - amount
			except:
				''
			
			print 'post-balance-should:'+str(postBalShould)
			
			
			
			try:				
				ans = raw_input("self.sendTrade('"+i+"_"+joc[i]['basecurr']+"', '"+type+"', "+str(amount)+") ? (y/n): ")
				if ans == 'y':
					self.sendTrade(i+"_"+joc[i]['basecurr'], type, str(amount))					
			except KeyError, e:
				''
			# checks
			info = self.getInfo()
			
			# check currency balance
			currBal = info[i]
			print 'currBal:'+str(currBal)
			diffBal2BalShould = currBal - postBalShould
			print 'diffBal2BalShould:'+str(diffBal2BalShould)
			if diffBal2BalShould < (10 * math.pow(10,-9)):
				print i + ' checked:: good, difference is low:  '+str(diffBal2BalShould)
			else:
				print i + ' checked:: bad, major difference: '+str(diffBal2BalShould)
				
			# 
			preBTCBal = preinfo['btc']
			currBTC = info['btc']
			print 'preBTCBal:'+str(preBTCBal)
			print 'currBTC:'+str(currBTC)
			btcAmount = amount * joc[i]['xsell']
			print 'btcAmount:'+str(btcAmount)
			btcBalShould = btcAmount + preBTCBal
			print 'btcBalShould:'+str(btcBalShould)	
			commission = (btcBalShould / currBTC * 100) - 100
			print 'commission:'+str(commission)
			
			
		print jo['totalusd']
	
	
	def liquidate(self):
		f = file('bitcoin.json','r')
		j = f.read()
		jo = json.loads(j)
		print jo
		joc = jo['currencies']
		for i in joc:
			print ''
			print '---- '+i
			print joc[i]
			print joc[i]['bal']
			
			try:
				amount = joc[i]['bal']
				type = 'sell'
			except:
				''
			
			try:				
				ans = raw_input("self.sendTrade('"+i+"_"+joc[i]['basecurr']+"', '"+type+"', "+str(amount)+") ? (y/n): ")
				if ans == 'y':
					self.sendTrade(i+"_"+joc[i]['basecurr'], type, str(amount))					
			except KeyError, e:
				''
		print jo['totalusd']
		
	def buy_btc(self):
		f = file('bitcoin.json','r')
		j = f.read()
		jo = json.loads(j)
		print jo
		joc = jo['currencies']
		try:
			i = 'usd'
			type ='buy'
			pair = 'btc_usd'
			amount = joc[i]['bal'] / joc['btc']['xbuy'] - 0.1
			ans = raw_input("self.sendTrade('"+pair+"', '"+type+"', "+str(amount)+") ? (y/n): ")
			if ans == 'y':
				self.sendTrade(pair, type, str(amount))					
		except KeyError, e:
			print e	
	
	def buy_ltc(self):
		f = file('bitcoin.json','r')
		j = f.read()
		jo = json.loads(j)
		print jo
		joc = jo['currencies']
		try:
			i = 'usd'
			type ='buy'
			pair = 'btc_usd'
			amount = joc[i]['bal'] / joc['ltc']['xbuy']
			ans = raw_input("self.sendTrade('"+pair+"', '"+type+"', "+str(amount)+") ? (y/n): ")
			if ans == 'y':
				self.sendTrade(pair, type, str(amount))					
		except KeyError, e:
			print e
			
	def sweep(self):
		#responseBTCe = self.getInfo()
		responseBTCe = {'btc':0}
		print responseBTCe
		
		tusdbal = 0
		tusdbalshould  = 0 

		# get balance data
		baseTicker = self.getTicker('btc')
		for i in responseBTCe:
			self.currencies[i] = {}
			self.currencies[i]['xsell'] = 0
			if responseBTCe[i] > 0 or config().dat.has_key(i):
				print i
				
				ticker = self.getTicker(i)
				try:
					self.currencies[i]['xsell'] = ticker['ticker']['sell']
				except KeyError:
					'stub'
				except TypeError:
					self.currencies[i]['xsell'] = 1
				try:
					self.currencies[i]['xbuy'] = ticker['ticker']['buy']
				except KeyError:
					'stub'
				except TypeError:
					self.currencies[i]['xbuy'] = 1
					
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
				for j in range(0, len(config().dat[i][1])):
					bal = self.getBlockChains("litecoinscout.com", "/address/"+config().dat[i][1][j], '(Balance: (.*?) LTC)')
					self.currencies[i]['bal'] += bal

			# bitcoin balance
			try:
				if i == 'btc' and type(config().dat[i][1]):
					
					filen = './bin/bitaddress.txt'
					#f = open(filen,'r')
					#print dir(f)
					#print f.read()
					#r = f.readlines()
					#for j in r:
					#	print j
						
					import csv
					with open(filen, 'rb') as csvfile:
						fn = csv.reader(csvfile, delimiter=',', quotechar='"')
						for row in fn:
							#print ', '.join(row)
							#print row[1]
							bal = self.getBlockChains("blockchain.info", "/address/"+row[1], '(Balance.*?([\d\.]+) BTC)')
							self.currencies[i]['bal'] += bal
					
					for j in range(0, len(config().dat[i][1])):
						#if config().dat[i][1][j] != config().brokerBlockchains[i][0]:
						try:
							bal = self.getBlockChains("blockchain.info", "/address/"+config().dat[i][1][j], '(Balance.*?([\d\.]+) BTC)')
							# if brokerBlockcians has no index config().dat[i][1][j], it throws a ValueError
							#self.brokerBlockchains[i].index(config().dat[i][1][j])
							self.currencies[i]['bal'] += bal
							#print 'bal:'+str(self.currencies[i]['bal'])
						except ValueError, e:
							# add to balance if config().dat[i][1][j] is not registered in brokerBlockchains
							self.currencies[i]['bal'] += bal
							print e
						except NameError, e:
							print e
							''
			except:
				''
