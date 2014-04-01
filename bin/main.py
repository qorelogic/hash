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
		if sys.argv[1] == 'arbitrage':
			print b.arbitrage()
			
	except IndexError, e:
		print 'usage: main.py < main | rebalance | liquidate | buybtc | buyltc | getinfo | lb | sweep | check | analyze | analyze-live | analyze-dryrun | arbitrage >'

#o = LocalBitcoinsAPI()
