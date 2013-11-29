#!/usr/bin/python

from bitcoin import *

b = bitcoin('JPDOOFP6-HVRFC67N-QZH4SLY3-NAKISDKR-31IYB900', '11643a3fbdc0561e8c45fa2456338c2e46ebafda94d7fe8066429ace5f862046')

if __name__ == '__main__':
	if sys.argv[1] == 'main':
		b.main()
	if sys.argv[1] == 'rebalance':
		b.rebalanceCurrencies()
	b.showLog()
