var request = require('request');
var secretsFile = require('./secrets');
var fs = require('fs');
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
            downloadImageByURL(repo.avatar_url, "avatars/"+repo.login+".jpg");
            console.log(repo.avatar_url);
            
          });
      cb(err, body);
    });
  }
 
  getRepoContributors("jquery", "jquery", function(err, result) {
    //console.log("Errors:", err);
    //console.log("Result:", result);
  });

  function downloadImageByURL(url, filePath) {
    request.get(url)
    //console.log("downloading image");               // Note 1
   .on('error', function (err) {                                   // Note 2
     throw err; 
   })
   .on('response', function (response) {                           // Note 3
     console.log('Response Status Code: ', response.statusCode);
   })
   .pipe(fs.createWriteStream(filePath));   
   console.log("got the image");            // Note 4

    // ...
  } 
  //downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./kvirani.jpg")
 