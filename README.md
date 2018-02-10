# Steemit Viewer

This is a project I created due to poor performance of eSteem app for Android. It's based on NativeScript & Angular5. Currently it doesn't have much features but I plan to add more as time goes by.

Current features:
* Set ups your feed via username. No need to login, just provide account username and it will get feed from that.
* Infinite feed scrolling
* Post view
* App remembers your settings so no need to provide username every time
* Lightweight
* Trending page
* New page
* Hot page
* Trending Tags
* Your blog page
* Ability to view other people's blogs
* Blazing fast compared to eSteem app on my Xiaomi Mi5 with Android Oreo
* Ability to share post via native share panel

Planned features:
* Search for tags/accounts
* Optimized Post view
* NFSW tag filter (currently none)
* Comments background worker (currently on UI thread - quite hard on responsiveness)
* Declined payout style
* More information about the post in post view
* Login support
* Push notifications with new posts from followed accounts

To do:
* Optimize styles
* Optimize views to use less resources
* Use encrypted storage instead of plan NS storage (for security and planned features)