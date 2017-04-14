var selenium = require('selenium-webdriver');
require('chromedriver');

describe('Selenium Tutorial', function() {

	// Open the dualcon website in the browser before each test is run:
	beforeEach(function(done) {

		var chromeCapabilities = selenium.Capabilities.chrome();
		//setting chrome options to start the browser fully maximized
		var chromeOptions = {
				'args': ['--test-type', '--start-maximized']
		};
		chromeCapabilities.set('chromeOptions', chromeOptions);
		this.driver = new selenium.Builder().withCapabilities(chromeCapabilities).build();

		// Open URL:
		var url1 = 'http://adf.ly/1eNdbb';
		var url2 = 'http://localhost:3000';
		this.driver.get(url1).then(done);
	});

	// Close the website after each test is run (so that it is opened fresh each time)
	afterEach(function(done) {
		this.driver.quit().then(done);
	});

	it('Has a download link', function(done) {

		var until = selenium.until;
		var by = selenium.By;

        waitsFor(function () {

        	this.driver.findElements(selenium.By.tagName("a")).then(function(elems){
    		    elems.forEach(function (elem) {
    		        elem.getText().then(function(textValue){
    		            console.log(textValue);
    		        });
    		    });
    		done();
    		});
        	
        });
        
		
		});

});