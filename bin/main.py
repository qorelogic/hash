#!/usr/bin/python

from keys import *

if __name__ == '__main__':
	
	try:
		if sys.argv[1] == 'main':
			b.setCryptsy(c)
			b.main()
		if sys.argv[1] == 'rebalance':
			b.rebalanceCurrencies()
		if sys.argv[1] == 'liquidate':
			b.liquidate()
		if sys.argv[1] == 'buybtc':
			b.buy_btc()
		if sys.argv[1] == 'buyltc':
			b.buy_ltc()
		if sys.argv[1] == 'getinfo':
			info = b.getInfo()
			print info['btc']
			print info['ppc']
		if sys.argv[1] == 'lb':
			import localbitcoinsapi as lb
			from localbitcoinsapi.LocalBitcoins.lb_api import *
			#print dir(LocalBitcoins)
			#print dir(lb.LocalBitcoins.lb_api.LocalBitcoinsAPI)
			#lb1 = lb.LocalBitcoins()
			#print type(lb.LocalBitcoins.lb_api.LocalBitcoinsAPI)
			lb = LocalBitcoinsAPI('adb23a01d6b3a53291a3','41a441024a9535913741c709e993521164945432')
		if sys.argv[1] == 'sweep':
			b.sweep()
		if sys.argv[1] == 'check':
			#b.check()
			#print b.getInfo()			
			
			from lib.PyCryptsy.PyCryptsy import *

			api=PyCryptsy(c.api_key, c.api_secret)

			# currencies to trade
			src="DOGE"
			dest="BTC"

			# trade multiplier (set to 1 to trade at lowest buy price)
			multiplier=1.01

			# get target price
			target=api.GetBuyPrice(src, dest)*multiplier

			# get available balance
			avail=api.GetAvailableBalance(src)
			print avail

			# trade 10% of available balance
			#print api.CreateSellOrder(src, dest, avail/10, target)
			
			#c.check()			
			#print c.getInfo()
		if sys.argv[1] == 'analyze':
			b.analyze(True, True)
		if sys.argv[1] == 'analyze-live':
			b.analyze(True, False)
		if sys.argv[1] == 'analyze-dryrun':
			b.analyze(False, False)
		if sys.argv[1] == 'test2':
			#print b.getBlockChains('dogechain.info','/address/DBHAPfBRc7L7WTcr2Cnf6tfvTRtdKEpnkF','(Balance.*?([\d\.]+).*?DOGE)')
			#print price().getPriceJSON('DOGE')
			#print price().getPriceJSON('MOON')
			#print price().getPriceJSON('KITTEH')
			#print price().getCryptsyMarketId('MEOW/BTC')
			print coinexPw().getBalances()
			#print cryptsy('317bca8e06c57bb892d72a5f7c860d52cfcc8053c6594a782c72bcaad388e32c', '191bac48d7545435f5367d9dfd30d70c64fca38059615fe21bb6a1e03c523135').getBalances()
			print c.getBalances()
			
			
		if sys.argv[1] == 'test3':
			#b.coinwarz()
			b.analyzeReader()
		if sys.argv[1] == 'test4':
			b.analyzedb()
		if sys.argv[1] == 'test5':
			f = sys.argv[2]
			b.insertOutput(f)
		if sys.argv[1] == 'test6':
			b.analyze(False, False)
			
		if sys.argv[1] == 'test7a':
			c = 'lynx -dump http://www.reddit.com/r/worldnews/hot.json | python -mjson.tool'
			status, output = commands.getstatusoutput(c)
			print output
		if sys.argv[1] == 'test7':
			#b.reddit()
			
			import MySQLdb

			db = MySQLdb.connect(host="localhost", # your host, usually localhost
				user="ql", # your username
				passwd="lq", # your password
				db="ql") # name of the data base
				
			cursor = db.cursor()

			"""
			# you must create a Cursor object. It will let
			#  you execute all the queries you need
			cur = db.cursor() 

			# Use all the SQL you like
			cur.execute("SELECT * FROM reddit")

			# print all the first cell of all the rows
			for row in cur.fetchall() :
				print row[0]
			"""
			
			p = {
				"approved_by": None, 
				"author": "anutensil", 
				"author_flair_css_class": None, 
				"author_flair_text": None, 
				"banned_by": None, 
				"clicked": None, 
				"created": 1394385090.0, 
				"created_utc": 1394381490.0, 
				"distinguished": None, 
				"domain": "self.worldnews", 
				"downs": 558, 
				"edited": 1395427548.0, 
				"gilded": 0, 
				"hidden": None, 
				"id": "1zz0hh", 
				"is_self": None, 
				"likes": None, 
				"link_flair_css_class": None, 
				"link_flair_text": None, 
				"media": None, 
				"media_embed": {}, 
				"name": "t3_1zz0hh", 
				"num_comments": 1628, 
				"num_reports": None, 
				"over_18": None, 
				"permalink": "/r/worldnews/comments/1zz0hh/ukraine_sticky_post/", 
				"saved": None, 
				"score": 1249, 
				"secure_media": None, 
				"secure_media_embed": {}, 
				"selftext": '',
				"selftext_html": '',
				"stickied": None, 
				"subreddit": "worldnews", 
				"subreddit_id": "t5_2qh13", 
				"thumbnail": "", 
				"title": "Ukraine Sticky Post", 
				"ups": 1807, 
				"url": "http://www.reddit.com/r/worldnews/comments/1zz0hh/ukraine_sticky_post/", 
				"visited": None,
			}
			
			pk = ','.join('`%s`' % x for x in p.keys())
			vls = ','.join("'%s'" % "%s" for x in p.values())
			sql = "INSERT INTO reddits ("+pk+") VALUES ("+vls+");"
			print len(p)
			print sql
			#sql = "INSERT INTO reddits (id, title) VALUES ('%s', '%s');"
			#sys.exit()

			"""
			# Insert the data into the table
			for i in range(1000):
				s = now - i*five_mins
				cursor.execute(sql % ( sin(s), cos(s), tan(s), s ))
			"""
			
			def fma(str):
				return re.escape(str.stip())
				
			w = ['controversial', 'hot', 'rising','top', 'new', 'gilded','wiki']
			for i in w:
				#url = 'http://www.reddit.com/r/worldnews/'+i+'.json'
				url = '/opt2/hash/qwe'
				fp = open(url)
				u = fp.read()
				fp.close()
				jo = json.loads(u)
				
				#jo = api().callAPI(url)
				print jo
				#pi = {}
				for j in jo['data']['children']:
					#id = fma(j['data']['id'])
					#title = fma(j['data']['title'])
					#print len(p)
					for k in p.keys():
						#print k
						p[k] = None
						p[k] = j['data'][k]
						
					print p
					#print p.keys()
					#print p.values()
					
					#print 'inserting: '+id
					#try:
						#cursor.execute(sql %  (id, title))
					#cursor.execute(sql %  p.values())
					#cursor.execute(sql % p.values())
					#except:
					#	''

	except IndexError, e:
		print 'usage: main.py < main | rebalance | liquidate | buybtc | buyltc | getinfo | lb | sweep | check | analyze | analyze-live | analyze-dryrun >'

#o = LocalBitcoinsAPI()
