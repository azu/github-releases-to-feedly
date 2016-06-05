github-releases-to-feedly
=========================

One-Click Subscription Button for Github Releases RSS Feed.

![repo](http://take.ms/2bbce)

Usage
-----

### Get Feedly token

1. Create IFTTT maker to Feedly hook
    - [Subscrib RSS to Feedly by js_mode - IFTTT](https://ifttt.com/recipes/426295-subscrib-rss-to-feedly "Subscrib RSS to Feedly by js_mode - IFTTT")
5. install [github-releases-to-feedly.user.js](https://raw.githubusercontent.com/azu/github-releases-to-feedly/master/github-releases-to-feedly.user.js)
6. Run UserScript Command -> github-releases-to-feedly - Set UserInfo
7. paste IFTTT maker url like `  https://maker.ifttt.com/trigger/subscribe_feedly/with/key/xxxxxxx` 

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
