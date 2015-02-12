# Unchatbar phone book
[![Build Status](https://travis-ci.org/unchatbar/unchatbar-phone-book.svg?branch=master)](https://travis-ci.org/unchatbar/unchatbar-phone-book)

Peer to peer chat application using WebRTC technologies

## Requirements
* Node.js 0.10+
* Chrome 26+ or Firefox 23+

## Installation
* Install Bower: `npm install -g bower`
* Install Gunt CLI: `npm install -g grunt-cli`
* Clone repository `git clone git://github.com/unchatbar/unchatbar.git`
* Run `npm install` to install required Node.js modules
* Run `bower install` to install required Bower components


## Dependencies
* angular
* json3
* es5-shim
* bootstrap-css-only
* ngstorage
* lodash
* ui.router
* angularjs-dropdown-multiselect
* unchatbar-connection
* unchatbar-user

## Get Started
```javascript
angular.module('app', ['unchatbar-contact'])
```


## Configure
* store PhoneBook Data in local Storage

>
```javascript
PhoneBookProvider.setLocalStorage([TRUE/FALSE]);
```


## API
* get get Client (by peer id)

>
```javascript
Profile.getClient([PEERID]);
```

* get all clients

>
```javascript
Profile.getClientMap();
```

* get new client

>
```javascript
Profile.addClient([PEERID],[PROFILE]);
```

* update client

>
```javascript
Profile.updateClient([PEERID],[Label]);
```

* remove client

>
```javascript
Profile.removeClient([PEERID]);
```

* get a group by groupid

>
```javascript
Profile.getGroup([GROUPID]);
```


* get all groups

>
```javascript
Profile.getGroupMap();
```


* copy a group from other client

>
```javascript
Profile.copyGroupFromPartner([PEERID],[NEWGROUP]);
```

* add a own new group

>
```javascript
Profile.addGroup([GROUPNAME]);
```


* update a group

>
```javascript
Profile.updateGroup([GROUPID],[GROUP]);
```

* remove a group by groupid

>
```javascript
Profile.removeGroup([GROUPID]);
```

* remove a client from group

>
```javascript
Profile.removeGroupByClient([PEERID],[GROUP]);
```

## Directive

* list of all client

>
```html
<un-contact-client-list></un-contact-client-list>
```


* select client

>
```html
<un-contact-client-selected></un-contact-client-selected>
```


* list of all groups

>
```html
<un-contact-group-list></un-contact-group-list>
```


* select group

>
```html
<un-contact-group-selected></un-contact-group-selected>
```


* add new group

>
```html
<un-contact-group-add></un-contact-group-add>
```


## Events

* **PhoneBookUpdate**: phoneBook data was update