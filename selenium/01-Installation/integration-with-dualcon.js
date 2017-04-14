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
		this.driver.get('http://localhost:3000').then(done);
	});

	// Close the website after each test is run (so that it is opened fresh each time)
	afterEach(function(done) {
		this.driver.quit().then(done);
	});

	it('Has a download link', function(done) {

		// Click on an element:
		var element = this.driver.findElement(selenium.By.linkText('Download')).click();

		var until = selenium.until;
		var by = selenium.By;

		// Waiting for an element to appear:
		this.driver.wait(until.elementLocated(by.linkText('Download')), 10000, 'Could not locate the child element within the time specified');
		this.driver.findElement(by.id('download')).getText().then(function(text) {
			expect(text).toContain('Download');
		});

		
		this.driver.findElement(by.id('download')).getAttribute('href').then(function(text) {
        console.log(text)
        // Download a file:
        var http = require('http');
        var fs = require('fs');
        var file = fs.createWriteStream('works.zip');
        var request = http.get(text, function(response) {
          response.pipe(file);
        });
        
		});
				
		// Waiting for an element to disappear:
//		driver.wait(function() {
//		    return driver.isElementPresent(by.id('elementdisappears')).then(function(present) {
//		        return !present;
//		    });
//		}, 10000, 'The element was still present when it should have disappeared.');
//		driver.isElementPresent(by.id('elementdisappears')).then(function(present) {
//		});

		// Waiting for an element’s text to change to a value:
//		var element = driver.findElement(by.id('elementchangestext'));
//		driver.findElement(by.id('elementchangestext')).getText().then(function(text) {
//		    assert.equal(text, 'old');
//		});
//		driver.wait(until.elementTextContains(element, 'new'),10000);
//		driver.findElement(by.id('elementchangestext')).getText().then(function(text) {
//		console.log(text);
//		});			

// Get current URL:
		this.driver.getCurrentUrl().then(function(value) {
			console.log(value);
			expect(value).toContain('localhost');
			done();
		});
	});

});