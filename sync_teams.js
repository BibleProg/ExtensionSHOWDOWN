// https://developer.github.com/v3/gists/

console.log("Load ShowdownSync extension!");

function init(){

    console.log("Init start!");
      
    debug    = true;
    gistName = "ShowdownSync";
    error    = {"count" : 0, "lasterror" : ""};
    id       = Get_id();
    version  = Get_version();
    rTeams   = Get_rteams();
    lTeams   = Get_lteams();
    autoSync = true;
    // if (autoSync) {window.addEventListener("click", Save);}

    console.debug({
        "token" : token,
        "debug" : debug,
        "gistName" : gistName,
        "error" : error,
        "id" : id,
        "autoSync" : autoSync,
        "version" : version,
        "rTeams" : rTeams,
        "lTeams" : lTeams
    });
    

    
}

function Requete(url, method="GET", data=false){

   var xhr = new XMLHttpRequest();
   
   xhr.open(method, url, false); // false force sync

   xhr.setRequestHeader("Accept", "application/vnd.github+json");
   xhr.setRequestHeader("Authorization", "Bearer " + token);

   xhr.send(data);

   if (xhr.status == 401){
    throw {"name" : "BadIdentification", "message" : "Mauvaises informations d\'authentification"};
   }
   console.debug(xhr);

   return {
    'status': xhr.status,
    'text': xhr.responseText
  };

}

function Create(){

   var data = '{"description":"ShowdownSync","public":false,"files":{"teams":{"content":"En attente de synchronisation"}}}';
   var url  = "https://api.github.com/gists";
   var res = Requete(url, "POST", data);
   res = JSON.parse(res.text);

   return res.id;

}

function Get_id(){

   // var url = "https://api.github.com/users/" + username + "/gists";
   var url = "https://api.github.com/gists"

   var res = Requete(url); 
   var gists = JSON.parse(res.text);


   if (gists.length > 0){
      for(var i = 0; i < gists.length; i++){
         
            var description = gists[i].description;
            var gistId      = gists[i].id;
            
            if (description == gistName){
               return gistId;
            }
      }      
   }

   return Create();
}

function Get_version(){
    var url = "https://api.github.com/gists/" + id;
    var res = Requete(url);
    var gist = JSON.parse(res.text);
    // console.debug(gist);
    var raw_url = gist.files.teams.raw_url;
    var regex = /raw\/[a-z0-9]+/g;
   
    return raw_url.match(regex)[0].replace('raw/','');
}

function Get_rteams(){
   var url = "https://api.github.com/gists/" + id;
   var res = Requete(url);
   var gist = JSON.parse(res.text);
   // console.debug(gist);

   var raw_url = gist.files.teams.raw_url;

   var raw = Requete(raw_url);

   return raw.text.replaceAll("~","\n");
}


function Get_lteams(){
    return localStorage.getItem('showdown_teams');
}

function Backup(){
    localStorage.setItem('showdown_teams_backup', lTeams);
}

function Restore(){
    var bTeams = localStorage.getItem('showdown_teams_backup');
    localStorage.setItem('showdown_teams', localStorage.getItem('showdown_teams_backup'));
}

function Save(){
    
    var ok = confirm("Ecraser la sauvegarde ?");
    if (ok){
        var url = "https://api.github.com/gists/" + id;
        var data = '{"description":"ShowdownSync","files":{"teams":{"content":"'+ lTeams.replaceAll("\n","~") +'"}}}';
        console.debug(data);
        Requete(url, "PATCH", data);
    }

}

function Sync(){
    Backup();
    if (rTeams == "En attente de synchronisation"){
        alert("Aucune team à synchroniser !");

    }else{
        localStorage.setItem('showdown_teams', rTeams);
    }
}

browser.runtime.onMessage.addListener( (sentMesssage, sender) => 
{ 
    browser.storage.local.get().then((key) =>{
        try{
            token    = key.token;
        
            init();
            console.debug(sentMesssage.text);

            switch (sentMesssage.text){
                case 'charger':
                    Sync();
                    window.location.reload();
                    break;
                case 'restaurer':
                    Restore();
                    window.location.reload();
                    break;
                case 'sauvegarder':
                    Save();
                    break;
                case 'test':
                    console.log('test boutton ok');
                    break;
                default:
                    console.log(sentMesssage.text)

            }
        }catch(e){
            if (e.name == "BadIdentification") {alert("Mauvais token Github");}
            console.log(e.name + " : " + e.message);
        }
    });
});