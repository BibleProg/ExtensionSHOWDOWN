// import * from "https://cdn.skypack.dev/@octokit/rest";
// curl 
//     -X POST 
//     -H "Accept: application/vnd.github+json" 
//     -H "Authorization: Bearer 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" 
//     https://api.github.com/gists 
//     -data "{\"description\":\"Example of a gist\",\"public\":false,\"files\":{\"README.md\":{\"content\":\"Hello World\"}}}"


    console.log("Execute ShowdownSync !");

    var token = "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"

    var url = "https://api.github.com/gists";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/vnd.github+json");
    xhr.setRequestHeader("Authorization", "Bearer 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");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
          console.log(xhr.status);
          console.log(xhr.responseText);
       }};

    var data = '{"description":"Example of a gist","public":false,"files":{"README.md":{"content":"Hello World"}}}';
    xhr.send(data);


    // teams = localStorage.getItem('showdown_teams');
    // console.log(teams);
