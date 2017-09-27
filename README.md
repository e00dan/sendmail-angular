# Sendmail

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3. It takes advantage of Angular 4 and TypeScript.

It lets you send mails using 2 providers - SendGrid and Mailgun. Files created by developer are mostly under `src/app` directory. Altough `spec.ts` files were generated and only fixed, so unit tests pass. You can also review commit called Initial Draft to see exactly what changes have been made since generating new project using Angular CLI.

It's easy to add another provider by creating new class extending from `IMailProvider`. Later you need to add this class to providers, and constructor of `MailSenderService` - so it will be injected.

At the beginning you need to provide credentials for at least one provider. **It's very important to use Disable CORS addon when using this application** - I can't understand why SendGrid assumed that JavaScript applications can't store API key safely. However there's no switch in configuration like: "I know what I'm doing, turn this off.".

## Motivation

I've got a lot of Ember development work experience, but wanted to show how to leverage power of TypeScript to create universal services - in this case easily adding new providers in clean, readable manner with strict type-checking. During development of JavaScript applications I sometimes miss a lot times when I've used C# or Java, so such projects are opportunity for me to try fancy technologies and experiment with strictly typed browser applications.

In terms of architecture, I could also add virtual class `MailProvider` which implements `IMailProvider`, that `MailProviderSendgridService` and `MailProviderMailgunService` extend from, but decided that my example application is simple enough not to create another layer of inheritance. However `isEnabled` getter is duplicated across these providers. Possibly one wayto avoid that would be exporting method from one file and importing it in another - I'm not doing that however because in strictly typed languages like C# we can't export one method from class and import it in another like in JavaScript.

Name Sendmail origins from desired behaviour of application - sending mails obviously - and famous Polish saying: "Emacsem przez sendmail" - which translates to: "using Emacs through sendmail" - the context is that was said in a movie in scene and did sound very cryptic to viewers, so later Internet users in Poland begin refering with this saying to any IT related question asked. Shout out to each movie that used nmap to describe mysterious processes! Knowledge base: https://nmap.org/movies/.

## Architecture

This is single-page application without backend. Disable CORS extension is required for this application to work properly. Example addon for Chrome that's working (altough can brake other pages so I would recommend removing it after testing this application): https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi.

Alternative is to open Chrome process with disable-web-security flag.

For storing cookies I've used `js-cookie`. In one place I'm using `async.js` `detect()` method - equivalent of synchronous `Array.prototype.find`, because `IMailProvider.checkStatus()` method is asynchronous.

## Test suite

Unit test suite passes however there are only few and very basic tests. I decided to spend my time on architecturing code, designing and implementing features instead of creating extensive test suite. The truth is also that altough I've vast knowledge of testing techniques and TDD in Ember.js for unit, integration and acceptance tests I can't say the same about Karma, Jasmine and Angular. For example I don't know how to effectively and comfortably mock one method of service that component or another service depend upon to assert in it. I'm not sure about state of end to end tests in this application but I haven't touched generated files so e2e test suite probably fails.

Most of my testing creations are under NDA, but here's test suite (also basic) of Ember addon which ranks 96 amongs Ember 100 best addons with over 200 000 downloads already: https://github.com/Kuzirashi/ember-link-action/tree/master/tests.

## Missing features

The most important missing part is that email form lacks possibility to input details of message we'd like to send. For example, we can send message to only one recipient, we can't specify names for from and to mails. There isn't also possibility to opt into sending `text/html` mail instead of `text/plain`. I think we could think of something like visual editor or markdown editor with live preview to make this application better - not only for sending mails, but also for drafting them.

Another missing feature is correct checking of status of Mailgun - Sendgrid has API to check status of the service, but Mailgun doesn't, so at this moment we're only checking whether mailgun.com is online. It's unreliable way to do it, but couldn't think of better for this prototype, and wanted to keep checking status feature more or less working.

## Error handling

I haven't spent too much time on error handling, but errors are catched and displayed in error dialog displayed to user. I'm also not sure how this application will behave when someone will try to input very long data for parameters - probably provider's API will return error codes.

## Discussion

Altough Dependency Injection framework works quite nice in Angular I wonder whether `MailSenderService` should have properties injected into it's constructor - `MailProviderSengridService` and `MailProviderMailgunService`. Theoretically we could create new instance of `MailSenderService` and push providers using method like `mailSenderInstance.addProvider(provider : IMailProvider)` from outside (so `MailSender` has zero knowledge about `IMailProvider` concrete implementations), but this would be unconvinient in Angular (as far as my knowledge of this framework is concerned). It's possible to use Angular DI factory for `MailSenderService`, so maybe it's potential for improvement on this ground.

Another thing to discuss is using `get` keyword for getters or `getName` method getter? The case I'm thinking about is when these getters become complicated, long methods. I'd like to keep pseudo-native getters and setters small enough, and when code of getter grows use another method instead of property getter.

Probably if this application would be created as Webkit desktop or mobile application we could avoid this tragic Disable CORS thing - which is the biggest pain point of this application, because user is forced to install another addon if it's run in the browser. However, once again, I wanted to do everything on the front-end and show features of TypeScript.

## Time of development

Time of development of this application is approximately 1 man day.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
