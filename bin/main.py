#!/usr/bin/python

from bitcoin import *

b = btce('OMMAJZSC-1EALBXVT-9M5W5HQL-LGKATXK9-K3IRAZ8J', 'ea826635cbcdce27cdea458e3fbb027040f9b8994421b494b901fcc28af1554a')
c = cryptsy('fe329b4733fc1ccc7dfa900e1cbd7c2ca224bbaa','6730fa20414b90e9f0ce11bdbb3aba81824388d39a6f9e66c9bf2036e1fcbb7f29c39cca7c840c5d')

if __name__ == '__main__':
	try:
		if sys.argv[1] == 'main':
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
			b.analyze()
		if sys.argv[1] == 'test2':
			#print b.getBlockChains('dogechain.info','/address/DBHAPfBRc7L7WTcr2Cnf6tfvTRtdKEpnkF','(Balance.*?([\d\.]+).*?DOGE)')
			print price().getPriceJSON('DOGE')
			print price().getPriceJSON('MOON')
			
	except IndexError, e:
		print 'usage: main.py < main | rebalance | liquidate | buybtc | buyltc | getinfo | lb | sweep | check | analyze >'

#o = LocalBitcoinsAPI()
