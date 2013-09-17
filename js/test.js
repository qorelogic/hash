
url = 'https://trade.plus500.com/Login?IsRealMode=False';

var page = require('webpage').create();
page.onConsoleMessage = function (msg) {
    console.log(msg);
};
page.open(url, function (status) {
	page.render('example.png');
    page.evaluate(function () {
        //console.log(document.title);
        console.log(document.body);
	//console.log($('.RegUser-Label-email').html());
    });
    phantom.exit();
});
