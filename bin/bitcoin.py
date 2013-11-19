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

def getBlockChains(server, req, compile):
	headers = {"Content-type": "application/x-www-form-urlencoded","Sign":sign}
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

# Replace these with your own API key data
#BTC_api_key = "OCM7MMKC-6NZGJD3U-9CA6UZQK-XD4FQEJT-1RJWY7MV"
#BTC_api_secret = "867ebdf127a2d0aff48dad5363fb558addd25d12a640e564d3396b7356434b5e"
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

#print response.status, response.reason

def nv(n):
	#return type(n)
	#if n != '':
	return float("%.2f" % float(n))

try:
	res = json.load(response)['return']['funds']
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
	'ltc': [2,'Lc9ajLEfBUsaLcZayJQao9KgRiBBvdy79x'],
	'btc': [1,'19ANGDaYUTcb7zokc2cXd3espshu9ZfczC'],
	#'usd': [1],
	'ftc':[0],
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
for i in res:
	arr[i] = {}
	arr[i]['xsell'] = 0
	if res[i] > 0 or dat.has_key(i):
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
	
	# calc
	arr[i]['bal'] = res[i]
	
	# litecoin balance
	if i == 'ltc':
		arr[i]['bal'] = getBlockChains("litecoinscout.com", "/address/"+dat[i][1], '(Balance: (.*?) LTC)')

	# bitcoin balance
	if i == 'btc':
		arr[i]['bal'] = getBlockChains("blockchain.info", "/address/"+dat[i][1], '(Balance.*?([\d\.]+) BTC)')
	
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
	
	#print 'usdbal:'+str(arr[i]['usdbal'] )
	#print 'pcent:'+str(arr[i]['pcent'])
	try:		
		pshould = nv(float(dat[i][0]) / tdat * 100)
		usdbalshould = nv(arr[i]['usdbal'] / arr[i]['pcent'] * pshould)
		#print 'pshould:'+pshould
		#print 'usdbalshould:'+usdbalshould
		tusdbalshould  += usdbalshould 
	except:
		"stub"
	
	try:
		if arr[i]['bal'] > 0 or dat.has_key(i):
			print i + ": \t" + str(arr[i]['bal']) + " \t" + str(arr[i]['usdbal']) + " \t" + str(arr[i]['pcent'])+"% \t\t" + str(pshould) + "% \t" + str(arr[i]['xsell'])
			#print 'usdbal:'+str(arr[i]['usdbal'])
			#print 'usdbalshould:'+str(usdbalshould)
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
