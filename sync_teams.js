// import * from "https://cdn.skypack.dev/@octokit/rest";
// curl 
//     -X POST 
//     -H "Accept: application/vnd.github+json" 
//     -H "Authorization: Bearer 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" 
//     https://api.github.com/gists 
//     -data "{\"description\":\"Example of a gist\",\"public\":false,\"files\":{\"README.md\":{\"content\":\"Hello World\"}}}"

// create POST
// token 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
// var data = '{"description":"Example of a gist","public":false,"files":{"README.md":{"content":"Hello World"}}}';

console.log("Execute ShowdownSync !");
token    = "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";
username = "BibleProg";
debug    = true;
gistName = "ShowdownSync";
id = "";



function Requete(url, method="GET", data=false){

   var url = "https://api.github.com/gists";
   var xhr = new XMLHttpRequest();
   
   xhr.open(method, url, false); // false force sync

   xhr.setRequestHeader("Accept", "application/vnd.github+json");
   xhr.setRequestHeader("Authorization", "Bearer " + token);

   // xhr.onreadystatechange = function () {
   //  if (xhr.readyState === 4 && debug) {
   //     console.log(xhr.status);
   //     console.log(xhr.responseText);
   // }};

   xhr.send(data);
   // console.log( xhr.responseText);
   return {
    'status': xhr.status,
    'text': xhr.responseText //.replace("[","").replace("]","").replace("\n","").replace(" ", "")
  };

}

function Create(){

   var data = '{"description":"Example of a gist","public":false,"files":{"README.md":{"content":"Hello World"}}}';
   var url  = "https://api.github.com/gists";
   Requete(url, "POST", data);
}

function Exist(){

   var url = "https://api.github.com/users/" + username + "/gists";

   var res = Requete(url); 
   var gists = JSON.parse(res.text); 

   // console.debug(gists);

   if (gists.length > 0){
      for(var i = 0; i < gists.length; i++){
         
            var description = gists[i].description;
            id          = gists[i].id;
            if (description == gistName){
               return true;
            }
      }

   }

   return false;

}

function Get(){
   var url = "https://api.github.com/gists/" + id;
   var res = Requete(url);
   var gist = JSON.parse(res.text);
   // var file = JSON.parse(gist[0].files);
   // console.debug(gist[1]);
   var raw_url = gist[0].files.teams.raw_url;
   var regex = /raw\/[a-z0-9]+/g;
   version = gist[0].files.teams.raw_url.match(regex)[0].replace('raw/','');
   console.debug();
   var content = new XMLHttpRequest();
   content.open("GET",raw_url,false);
   content.send(null);
   console.debug(content.responseText);


   return gist[0].files.content;
}

console.debug(Exist());
// var ok = Exist();
if (Exist()){
   rTeams = Get();
   // console.log(rTeams);

}
// lTeams = localStorage.getItem('showdown_teams');
// if(lTeams === null){
//    localStorage.getItem
// }
// console.debug(lTeams);

