#!/usr/bin/python

from bitcoin import *
from localbitcoinsapi.LocalBitcoins.lb_api import *

b = bitcoin('JPDOOFP6-HVRFC67N-QZH4SLY3-NAKISDKR-31IYB900', '11643a3fbdc0561e8c45fa2456338c2e46ebafda94d7fe8066429ace5f862046')

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
		
	except IndexError, e:
		''
b.showLog()

#o = LocalBitcoinsAPI()
