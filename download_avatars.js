var request = require('request');
var secretsFile = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': secretsFile.GITHUB_TOKEN
      }
    };
    
    request(options, function(err, res, body) {
        var repos = JSON.parse(body);
        repos.forEach(function(repo) {
            
            console.log(repo.avatar_url);
            
          });
      cb(err, body);
    });
  }
 
  getRepoContributors("jquery", "jquery", function(err, result) {
    //console.log("Errors:", err);
    //console.log("Result:", result);
  });
 