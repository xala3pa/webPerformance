//Manage dependecies
var sys = require('util'),
    execSync = require("exec-sync"),
    ProgressBar = require('progress'),
    phantomjs = require('phantomjs'),
    program = require('commander');

var fileName; //File Name to persist data in har format
var maxKbs = 80000;  //Maximun bandwith to test in kbs

//TODO: Coercion | check type data (Integer)
//Command line interface
program
  .version('0.0.1')
  .option('-u, --url <url>', 'Add url to test')
  .option('-m, --minimun [kbps]', 'Add minimun bandwith connection','4000')
  .option('-s, --step [kbps]', 'Add step','4000')
  .option('-i, --interface [interface]', 'Set the interface','eth0');

program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    $ node webPerformance.js -u https://github.com/xala3pa/webPerformance -m 4000');
    console.log('    $ node webPerformance.js -u https://github.com/xala3pa/webPerformance -i wlan0 -m 4000 -s 4000');
    console.log('');
});

program.parse(process.argv);

//Progess Bar
var bar = new ProgressBar('  Testing Performance [:bar] :percent', {
      complete: '='
    , incomplete: ' '
    , width: 50
    , total: maxKbs / program.step
  });

while (maxKbs >= program.minimun) {          
    //increment progress bar
    bar.tick(1);            
    //output file name
    fileName = "performance_" + maxKbs + "_" + program.interface + ".har";
    //Set bandwith using wonderShaper
    execSync("sudo wondershaper -a " + program.interface + " -d " + maxKbs + " -u 8000");
    //Execute synchronously process tasks
    execSync("phantomjs netsniff.js " + program.url + " " + fileName);
    //clear all traffic shaping from that interface.
    execSync("sudo wondershaper -c -a " + program.interface);

 
    maxKbs = maxKbs - program.step;  
}

process.exit();


