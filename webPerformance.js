//Manage dependecies
var sys = require('util'),
    execSync = require("exec-sync"),
    ProgressBar = require('progress'),
    program = require('commander');

var fileName; //File Name to persist data in har format
var maxKBs = 80000;  //Maximun bandwith to test

//TODO: Coercion check type data (Integer)¡
//Command line interface
program
  .version('0.0.1')
  .option('-u, --url <url>', 'Add url to test')
  .option('-m, --minimun [kBs]', 'Add minimun connection','80')
  .option('-s, --step [kBs]', 'Add step','800');

program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    $ nodejs webPerformance.js -u http://www.google.com -m 10');
    console.log('    $ nodejs webPerformance.js -u http://www.google.com -m 10 -s 10');
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
    bar.tick(1);            
    fileName = "performace" + maxKBs + ".har";
    execSync("phantomjs netsniff.js " + program.url + " " + fileName );
    maxKBs = maxKBs - program.step;  
}


