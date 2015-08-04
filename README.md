Bootcards: A cards-based UI framework with dual-pane capability for mobile and desktop, built on top of Bootstrap
=========

Bootcards is a cards-based UI framework. It is built on top of Bootstrap and uses its responsive features. Bootcards has a native look on Android, iOS and desktop. Unlike most other UI frameworks, it includes a dual-pane interface for tablet users.

**Why Bootcards?**

We think Cards are the design pattern for mobile of the future. The near future that is. Cards are appearing already on sites and apps like Twitter, Google Now, Facebook, Spotify, Pinterest, and Amazon. To kickstart your (and our) projects we decided to create Bootcards.

**Release**

The current version of Bootcards is stable, but always work in progress. We built a demo app showcasing what the framework (and your apps) can look like using NodeJS. You'll find it <a href="http://demo.bootcards.org"  target="_blank">here</a> (note that adding, saving and deleting items is not implemented). Please let us know what you think!

Want to help or want to know more? Drop us a note at bootcards@gmail.com. Look for more info at http://www.bootcards.org and follow us on Twitter (http://www.twitter.com/bootcards).

**License**

Bootcards is released under an MIT license. It contains code from the <a href="http://getbootstrap.com" target="_blank">Twitter Bootstrap</a> and <a href="http://goratchet.com/" target="_blank">Ratchet</a> projects (both also MIT licensed).

**Building**

To build the Bootcards source files you'll need to have **Node** and **NPM** installed. Bootcards uses Grunt to build the source files and uses the **grunt-sass** Grunt task (which uses <a href="http://libsass.org/" target="_blank">libsass</a>) to compile the SASS files.

Install Grunt using:

`npm install -g grunt-cli`

Then run an `npm install` and `bower install` to resolve all other dependencies. You can then build Bootcards from the source files by calling `grunt`. You can also use `grunt watch` to continuously monitor the source folder for changes and auto-build the project.


