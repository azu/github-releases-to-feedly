github-releases-to-feedly
=========================

One-Click Subscription Button for Github Releases RSS Feed.

![repo](http://take.ms/2bbce)

Usage
-----

### Get Feedly token

1. Sign-in from [OAuth Feedly API](https://cloud.feedly.com/v3/auth/auth?client_id=feedly&redirect_uri=http://localhost&scope=https://cloud.feedly.com/subscriptions&response_type=code&migrate=false)
2. Copy `XXX` from `http://localhost/?code=XXX&state=` (address bar)
3. `$ node get_token.js XXX` (print "access_token")
4. copy `JSON`*1
	- Tips: 3 and 4 at a time.
	``` sh
	git clone https://github.com/azu/github-releases-to-feedly.git
	cd github-releases-to-feedly
	node get_token.js XXX | pbcopy
	```
5. install [github-releases-to-feedly.user.js](https://raw.githubusercontent.com/azu/github-releases-to-feedly/master/github-releases-to-feedly.user.js)
6. Run UserScript Command -> github-releases-to-feedly - Set UserInfo
7. paste `JSON`*1

### Subscription

Current Subscribe Tag : "Github" (If you want to change tag, please pull-requests)

- Subscribe from each repository
- Subscribe from [Watched repositories](https://github.com/watching)

![img](http://take.ms/qDycP)

Develop
-------

```sh
npm install
npm run-script watch
# dist
npm run-script dist
```

Contributing
------------

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

License
-------

MIT
