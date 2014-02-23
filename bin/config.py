
class config:
	
	factor = None
	dat = None
	brokerBlockchains = None
	tdat = None
	basedir = '/application directory path here'
	
	def __init__(self):
		# define portfolio weights
		# register currency here and give it a portfolio weight
		self.factor = 20
		self.dat = {
			#'btc': [1,['1AodK7vXUxBL7dyiwZov7QmpytuASi9Ah6']],
			#'ltc': [2,['Lc9ajLEfBUsaLcZayJQao9KgRiBBvdy79x']],
			#'ltc':[2,['Lc9ajLEfBUsaLcZayJQao9KgRiBBvdy79x','La9UReUrxbwDEJkvEJjGNtQdsya838QEWu','LaxQqqgzTVxQYT8yATCzGmvLGjeUodzEPo','Lc4AcHG9PKeRjST8cyMvqHYwFVhQspa6hB','LNrDMaeEyt4tksEsjuwhPc32Tma68cWEWn','LXZc3HdmDGmfhV4hMoxwtsg29jVozRSFCf']],
			'ltc': [2,['Lc9ajLEfBUsaLcZayJQao9KgRiBBvdy79x','La9UReUrxbwDEJkvEJjGNtQdsya838QEWu','LaxQqqgzTVxQYT8yATCzGmvLGjeUodzEPo','Lc4AcHG9PKeRjST8cyMvqHYwFVhQspa6hB','LNrDMaeEyt4tksEsjuwhPc32Tma68cWEWn','LUT1MTSGaUcW9BCk1fYx3cBNLQBYbK8MGr','LRoQJf154h1NL8b28wZJPYrS7RX6Za6T45']],
			#		btce[btc]								BitcoinWalletAndroid							CS1						CS2								CS3									Localbitcoins													Localbitcoins
			'btc': [1,['19ANGDaYUTcb7zokc2cXd3espshu9ZfczC','1HKWHFLuv8UG1s2b8EsNXP935yAB8EH9Wg','1BripERdYEdjS4YRWvWSrrf7Ek925qXAw1','1LDevvnEPd4BHadisV61kcaAKP7FGHKYGV','1PQueM6GjYxDmQHFPug5ckQJbDjA99XjwC','1PYBcQ6qY6Z4VuSJbHDcnHiiihfrNUzs3x','1JwfkBxXExpJBpCP76pDqTcfPSMnG4S6Qr','1HfdrFqJXZJhX14t3QQDw9Jkq2k1QZbSHX','1KtSQmQLfDpSGuxMXtXkiLd3bKQXVMLB31']],
			#		btce[btc]																		CS1						CS2								CS3									Localbitcoins													Localbitcoins
			'btc': [1,['19ANGDaYUTcb7zokc2cXd3espshu9ZfczC','1HKWHFLuv8UG1s2b8EsNXP935yAB8EH9Wg','1BripERdYEdjS4YRWvWSrrf7Ek925qXAw1','1LDevvnEPd4BHadisV61kcaAKP7FGHKYGV','1PQueM6GjYxDmQHFPug5ckQJbDjA99XjwC','1PYBcQ6qY6Z4VuSJbHDcnHiiihfrNUzs3x','1JwfkBxXExpJBpCP76pDqTcfPSMnG4S6Qr','1HfdrFqJXZJhX14t3QQDw9Jkq2k1QZbSHX','1KtSQmQLfDpSGuxMXtXkiLd3bKQXVMLB31']],
			# 1JwfkBxXExpJBpCP76pDqTcfPSMnG4S6Qr, 5K79S8n1EcETWedLBFd1MXp9KobT7SR5oTxBtzFF6994LJCfJX7
			#'btc': [1],
			
			# todo: add the self.currencies below			
			'ftc':[0.1 * self.factor,[]],
			'nvc':[0.1 * self.factor,[]],
			'ppc':[0.1 * self.factor,[]],
			'trc':[0.1 * self.factor,[]],
			'nmc':[0.1 * self.factor,[]],
			'xpm':[0.1 * self.factor,[]],
			'usd':[0,[]],
		}
		self.brokerBlockchains = {
			'btc':[self.dat['btc'][1][0]],
		}
		self.tdat = 0
		for i in self.dat:
			self.tdat += self.dat[i][0]
