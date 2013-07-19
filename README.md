webPerformance
==============

##Description


Test web pages performance with differents bandwith.

Generates HAR files with descriptions captured from the requests and responses. 
You can use a online tool to visualize HTTP Archive (HAR) log files created by this HTTP tracking tool.

I recommend this one: [Har viewer](http://www.softwareishard.com/har/viewer/ "Har viewer").

## Installation

    $ npm install webperformance
  
+ You need install in your system "Wonder shaper", a script that allow the user to limit the bandwidth 
	of one or more network adapters.
+ Please follow the instructions [Wonder shaper](https://github.com/magnific0/wondershaper/ "Wonder shaper").
 
## usage

```
  Usage: node webPerformance.js [options]

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -u, --url <url>              Add url to test
    -m, --minimun [kbps]         Add minimun bandwith connection
    -s, --step [kbps]            Add step
    -i, --interface [interface]  Set the interface

  Examples:

    $ node webPerformance.js -u https://github.com/xala3pa/webPerformance -m 4000
    $ node webPerformance.js -u https://github.com/xala3pa/webPerformance -i wlan0 -m 4000 -s 4000

```


##Author

Alvaro Salazar (2013)


##License


Copyright (c) 2013 Alvaro Salazar salazar3pa@gmail.com

See the file LICENSE for copying permission.
