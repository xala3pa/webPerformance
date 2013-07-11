//Manage dependecies
var sys = require('util'),
    execSync = require("exec-sync"),
    ProgressBar = require('progress'),
    program = require('commander');

var fileName; //File Name to persist data in har format
var maxKBs = 80000;  //Maximun bandwith to test in kbs

//TODO: Coercion | check type data (Integer)
//Command line interface
program
  .version('0.0.1')
  .option('-u, --url <url>', 'Add url to test')
  .option('-m, --minimun [kbps]', 'Add minimun connection','4000')
  .option('-s, --step [kbps]', 'Add step','4000');

program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    $ nodejs webPerformance.js -u https://github.com/xala3pa/webPerformance -m 4000');
    console.log('    $ nodejs webPerformance.js -u https://github.com/xala3pa/webPerformance -m 4000 -s 4000');
    console.log('');
});

program.parse(process.argv);

//Progess Bar
var bar = new ProgressBar('  Testing Performance [:bar] :percent', {
      complete: '='
    , incomplete: ' '
    , width: 50
    , total: maxKBs / program.step
  });

while (maxKBs >= program.minimun) {          
    //increment progress bar
    bar.tick(1);            
    //output file name
    fileName = "performance" + maxKBs + ".har";
    //Execute synchronously process tasks
    execSync("phantomjs netsniff.js " + program.url + " " + fileName );

    maxKBs = maxKBs - program.step;  
}


