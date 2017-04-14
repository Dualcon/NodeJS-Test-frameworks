“Selenium WebDriver is a powerful tool that plays well across different platforms”
Including unit tests in your web app projects brings many benefits: primarily, an effective and measurable way of proving code quality to developers and other project stakeholders. Browser automation takes these concepts further and applies the practice to running integration and regression tests live within the presentation layer user interface (UI). From there, we can codify integration test scripts that do all the work for us – proving that the web app works as expected in the platform in which it will ultimately run.
Before we can start to control a browser automatically, we need a tool called Selenium WebDriver. This tool will handle the automated testing of our web app, verifying that it runs as expected. Selenium implements a Domain Specific Language (DSL): Selenese – a high-level, cross-platform and language-independent convention for representing Selenium commands.
The overall goal of Selenese is to provide an API that is easy to understand and maintain. Group a number of its commands together and you’ve created a test script that can control a browser. Language-independent tests can be coded in a range of languages: C#, Java, JavaScript, Objective-C, Perl, PHP, Python and Ruby.
In this article, I will show you how to write test scripts to prove that the TECH.review website works as expected, although these principles apply to any site or web app.
Set up the project
For our purposes, we will be running Selenium tests using JavaScript on the Node.js app framework. To get this working, we’ll first need to grab a few Node.js modules. Make sure you have Node.js installed, then open up a terminal or console window and create a project folder:
mkdir tech.review
cd tech.review
npm init
Now let’s grab and install the core selenium-webdriver module and save it to our project package.json file:
npm install --save selenium-webdriver
We’re also going to need a testing framework to make the process of writing our tests simpler. For this example we’ll be using Jasmine, but feel free to choose your own flavour – there are certainly plenty of choices available.
npm install --save jasmine
jasmine init
Next, we need to install a browser driver, which will act as a layer between Selenium WebDriver and the browser to run the tests in. It will capture our commands, send them to the browser and retrieve the results. The driver is browser-specific. There are drivers that talk to all the major browsers, including mobile browsers.
In this example, we’ll use ChromeDriver to connect to Google’s Chrome browser. Download the latest version and unpack the zip file. Make sure to update your PATH environment variable with the install location to make it accessible to our project.
Understanding asynchronous testing
Before we dive into the code, we need to understand some important points. Doing a site regression manually requires a tester to run each test one at a time in each browser being tested. This could take the better part of a day, depending on the size of the project. Running tests asynchronously (even in parallel) across various browsers cuts that time significantly, and is one of the great benefits of using Selenium WebDriver in your regression test setup.
Both Selenium and Jasmine have ways to handle asynchronous testing. Selenium uses promises through a ControlFlow management class implemented into the library. This means we don’t need to explicitly write all of the usual Jasmine then() function calls. It also means most of the API methods return a promise that we can then take advantage of. A good write-up of this is available here.
Since Jasmine version 2.0, the beforeEach(), it() and afterEach() functions can be given an optional done parameter. If supplied, the test runner will wait until this function is executed before advancing. More examples are available in Jasmine’s documentation on asynchronous support.
Writing tests with Jasmine
The following is an example integration test for the TECH.insight website. This code should be saved in our project as tech.review/spec/integration-test.js:
var selenium = require('selenium-webdriver');

describe('Selenium Tutorial', function() {

    // Open the TECH.insight website in the browser before each test is run
    beforeEach(function(done) {
        this.driver = new selenium.Builder().
            withCapabilities(selenium.Capabilities.chrome()).
            build();

        this.driver.get('http://www.techinsight.io/').then(done);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        this.driver.quit().then(done);
    });

    // Test to ensure we are on the home page by checking the <body> tag id attribute
    it('Should be on the home page', function(done) {
        var element = this.driver.findElement(selenium.By.tagName('body'));

        element.getAttribute('id').then(function(id) {
            expect(id).toBe('home');
            done();
        });
    });

    // Test the navigation bar by clicking on the 'REVIEW' link and checking the URL changes to '/review'
    it('Has a working nav', function(done) {
        var element = this.driver.findElement(selenium.By.linkText('REVIEW'));

        element.click();

        this.driver.getCurrentUrl().then(function(value) {
            expect(value).toContain('/review');
            done();
        });
    });
});
With all the prerequisites satisfied, we can run the code by executing the following on the command line:
jasmine spec\integration-test.js
You’ll see browser windows pop open and some ghostly page interactions – therefore you can be sure the integration tests are running! The console will output the results of the Jasmine specs.
Break it down
Our test suite begins with a call to the global Jasmine function describe(), which will wrap all of the specs for our example. Next, the beforeEach() function contains the code to start a session with Selenium. It will be run before each of our test specs.
beforeEach(function(done) {
    this.driver = new selenium.Builder().
        withCapabilities(selenium.Capabilities.chrome()).
        build();

    this.driver.get('http://www.techinsight.io/').then(done);
});
In Jasmine, each function you pass around (such as to beforeEach(), it(), and others) is run under the same context. This means we can define something in beforeEach() using the this keyword and access that object within the other global functions, such as this.driver in this case.
For our browser driver, we create an instance of the Builder class and pass it a set of default settings for Chrome. We then kick things off with the build() method, which will load up the browser.
this.driver.get('http://www.techinsight.io/').then(done);
Selenium will use its ControlFlow promise class to wait for the browser to load before navigating to the TECH.insight website. The get() method returns a promise that we attach a then() function call to – finally calling Jasmine’s done() method. This ensures our test specs are not executed until the page is ready to be interacted with.
afterEach(function(done) {
    this.driver.quit().then(done);
});
In the same vein, we want to clean up after each test spec we run. Inside Jasmine’s afterEach() function, we call the quit() method on our driver, which will close all processes and browsers associated with that driver instance. The quit() method returns a promise that we use to tell when the afterEach() function has completed execution.
it('Should be on the home page', function(done) {
    var element = this.driver.findElement(selenium.By.tagName('body'));

    element.getAttribute('id').then(function(id) {
        expect(id).toBe('home');
        done();
    });
});
Ah, our first test! Inside Jasmine’s it() method, we are verifying that the TECH.insight website has properly loaded and that we are indeed on the home page.
var element = this.driver.findElement(selenium.By.tagName('body'));
Selenium WebDriver’s findElement() method will search the page code and return the first matched element. We specify an element through the By namespace. There are various functions available – in this example, we’re looking for the page <body> tag via tagName().
element.getAttribute('id').then(function(id) {
    expect(id).toBe('home');
    done();
});
We use the getAttribute() method on the returned element – in this case looking for its id attribute. The method returns a promise that will be resolved, passing the attribute’s value. From there, we expect the <body> tag’s id attribute value to be home, indicating that this is the home page. Finally, we call Jasmine’s done() method.
it('Has a working nav', function(done) {
    var element = this.driver.findElement(selenium.By.linkText('REVIEW'));

    element.click();

    this.driver.getCurrentUrl().then(function(value) {
        expect(value).toContain('/review');
        done();
    });
});
The next test will check to see if we can interact with the navigation bar on the page. We want to click through to the Review section, in which we will find all our wonderful articles.
var element = this.driver.findElement(selenium.By.linkText('REVIEW'));

element.click();
As before, we first use the findElement() method to locate the link containing the text REVIEW. Once found, we fire a browser click event on to it.
this.driver.getCurrentUrl().then(function(value) {
    expect(value).toContain('/review');
    done();
});
The getCurrentUrl() method will retrieve the URL of the current page and return a promise. We’re expecting the URL to have changed and now contain /review – if it does, the test will pass.
Wait, there’s more…
Selenium WebDriver offers much more than is covered in this example. It is a highly powerful and versatile tool that plays well on many different platforms. More updates and improvements will be made as automated browser testing continues to grow in popularity.
In this example, we’re using Selenium with Node.js, a great starting point that can be extended further. We chose Jasmine for our testing framework, but there are many more to choose from. The selenium-webdriver Node.js package comes with a module that may be used to write tests that run with the Mocha testing framework instead.
You can further automate your browser integration tests by hooking Selenium WebDriver up to a cloud-based Virtual Machine setup, such as that provided by SauceLabs or BrowserStack. This will ensure you can run tests in multiple browsers and across operating systems without needing a large selection of hardware to run them on.

Font: http://www.techinsight.io/review/devops-and-automation/browser-automation-using-selenium-webdriver-and-nodejs/