if (msg.author.id != client.user.id && !msg.author.bot) {
var re = msg.content.split(" ");
  if (re[1] !==undefined && (re[0].toLowerCase() == pf || re[0] == "<@!796578740448264192>")) {
    re[1] = re[1].toLowerCase();
    if (cm.get(re[1]) !== undefined) {
      if (cm.get(re[1]).exp[1]) {
      if (re[2]===undefined) {var susers = require("./data.json");
      if (susers[msg.author.id]!==undefined) re[2]=susers[msg.author.id];} else if (isping(re[2])) {re[2] = require("./data.json")[re[2].substr(3,re[2].length-4)];}}
      if (re.length - 2>=cm.get(re[1]).exp[0]) {
        if (re[1]==="help") {
          if (re[2]===undefined) {
          var sen = "";
          cm.forEach((val, key) => {
            sen = sen+"`"+key+"`: "+val.csd+"\n";
          });
          mesg = new discord.MessageEmbed() 
        .setColor('#0099ff')
	      .setTitle('All commands start with the prefix `sc`. Use `sc help [command]` to learn more about a command (not done).')
	      .setDescription(sen+"more commands coming soon!");
          msg.channel.send(mesg);
          } else {
        mesg = new discord.MessageEmbed()
      .setTitle(re[2]+" command")
      .setDescription(cm.get(re[2]).cld);
        msg.channel.send(mesg);
          }
        } else if (re[1]==="mc"){
          request("https://api.scratch.mit.edu/users/"+re[2]+"/messages/count", (err, resp, body) => {
            var count = JSON.parse(body);
            if (count.code === undefined) {
              request("https://api.scratch.mit.edu/users/"+re[2], (err, resp, body) => {
              var mesg = JSON.parse(body);
              var embed = new discord.MessageEmbed() 
            .setAuthor(mesg.username, mesg.profile.images["90x90"])
            .setDescription("Message count: "+comma(count.count));
              msg.channel.send(embed);
              });
            } else {
              msg.channel.send("This user doesn't exist! Did you mistype something?");
            }
          });
        } else if (re[1]==="fp") {
                      request("https://scratch.mit.edu/site-api/users/all/"+re[2],(error, response, body) => {
            try {
            mesg = JSON.parse(body);
            } catch(e) {
              mesg = "nope";
            }
            if (mesg !== "nope") {
            mesg = mesg.featured_project;
            if (mesg !== null) {
              request("https://api.scratch.mit.edu/projects/"+mesg,(error,response,body) => {
                mesg = JSON.parse(body);
                if (mesg.code === undefined) {
                sen = new discord.MessageEmbed()
            .setAuthor(mesg.author.username, mesg.author.profile.images["90x90"])
            .setTitle(mesg.title.replace(/_/g,"`_`"))
            .setURL("https://scratch.mit.edu/projects/"+mesg.id)
            .setDescription("<:view:797962400657047562> "+comma(mesg.stats.views)+", <:love:797962311640940584> "+comma(mesg.stats.loves)+", <:fav:797962340116201522> "+comma(mesg.stats.favorites))
            .setImage(mesg.image);
            msg.channel.send(sen);
            } else {
              msg.channel.send("Featured project not shared");
            }
              });
            } else {
              request("https://api.scratch.mit.edu/users/"+re[2]+"/projects?limit=40", (error,response,body)=>{
                mesg = JSON.parse(body);
                if (mesg.length !== 0) {
                mesg = mesg[mesg.length-1];
                sen = new discord.MessageEmbed()
            .setAuthor(re[2], mesg.author.profile.images["90x90"])
            .setTitle(mesg.title.replace(/_/g,"`_`").replace(/~~/g,"~‎~"))
            .setURL("https://scratch.mit.edu/projects/"+mesg.id)
            .setDescription("<:view:797962400657047562> "+mesg.stats.views+", <:love:797962311640940584> "+mesg.stats.loves+", <:fav:797962340116201522> "+mesg.stats.favorites)
            .setImage(mesg.image);
            msg.channel.send(sen);
                } else {
                  msg.channel.send("This user did not share any projects yet!");
                }
              });
            }
          } else {
              msg.channel.send("This user doesn't exist, probably.");
          }    
        });
        } else if (re[1]==="hi") {
          if (re[2]===undefined) {
            var susers = require("./data.json");
            if (susers[msg.author.id]===undefined) {
              msg.channel.send("Tell me your Scratch username!");
            } else {
              msg.channel.send("Hi, "+susers[msg.author.id]+"!");
            }
          } else {
            request("https://api.scratch.mit.edu/users/"+re[2], (err, resp, body) => {
              if (JSON.parse(body).code === undefined) {
                var mesg = JSON.parse(body);
                var susers = require("./data.json");
                susers[msg.author.id] = mesg.username;
                fs.writeFile("data.json",JSON.stringify(susers), err =>{
                  if (err) throw err;
                  msg.channel.send("Okay, got it!");
                });
              } else {
                msg.channel.send("This user doesn't exist! Did you mistype something?");
              }
            });
          }
        } else if (re[1]==="find") {
          if (isping(re[2])||Number(re[2])!==NaN) {
            if (isping(re[2])) re[2] = re[2].substr(3,re[2].length-4);
            var susers = require("./data.json");  
            if (susers[re[2]]!==undefined) {
            msg.channel.send("This user is "+susers[re[2]]+" on Scratch!");
            } else {
              msg.channel.send("This user did not tell me their Scratch username!");
            }
          } else {
            msg.channel.send("That's not a discord user!");
          }
        } else if (re[1]==="info") {
                    request("https://api.scratch.mit.edu/users/"+re[2], (err,resp,body) => {
            user = JSON.parse(body);
            if (user.code===undefined) {
          request("https://scratchdb.lefty.one/v2/user/info/"+re[2], (err, res, body) => { 
            var stats = JSON.parse(body);
            function statcheck(check) {
              if (stats.error===undefined) {
                return comma(stats.statistics[check])} else {return "No "+check+" stats available"}
            }
              request("https://scratch.mit.edu/site-api/users/all/"+re[2],(err, res, body) => {
                var feat = JSON.parse(body);
                if (user.scratchteam) user.username=user.username+"*";
                if (user.profile.bio==="") user.profile.bio = "This user does not have a bio";
                if (user.profile.status==="") user.profile.status = "This user does not have a WIWO";
                if (feat.featured_project!==null) {
                request("https://api.scratch.mit.edu/projects/"+feat.featured_project, (err,resp,body)=>{
                   var proj = JSON.parse(body);
                   if (proj.title===undefined) proj.title = "Featured project not shared";   
              var sen = new discord.MessageEmbed()
            .setTitle(user.username.replace(/_/g,"`_`")+" <:link:798053448422916117>")
            .setURL("https://scratch.mit.edu/users/"+re[2])
            .setDescription("<:view:797962400657047562>"+ statcheck("views")+"\n<:love:797962311640940584>"+statcheck("loves")+"\n<:fav:797962340116201522>"+statcheck("favorites")+"\n<:follow:797962365886529557>"+statcheck("followers"))
            .addField("About Me", convert(user.profile.bio) , true)
            .addField("What I'm Working On", convert(user.profile.status), true)
            .addField(feat.featured_project_label_name, convert(proj.title))
            .setImage(proj.image)
            .setThumbnail(user.profile.images["90x90"]);
            msg.channel.send(sen);
            });
            } else {
              var sen = new discord.MessageEmbed()
            .setTitle(user.username.replace(/_/g,"`_`")+" <:link:798053448422916117>")
            .setURL("https://scratch.mit.edu/users/"+re[2])
            .setDescription("<:view:797962400657047562>"+ statcheck("views")+"\n<:love:797962311640940584>"+statcheck("loves")+"\n<:fav:797962340116201522>"+statcheck("favorites")+"\n<:follow:797962365886529557>"+statcheck("followers"))
            .addField("About Me", convert(user.profile.bio), true)
            .addField("What I'm Working On", convert(user.profile.status), true)
            .addField(feat.featured_project_label_name, "Nope.")
            .setImage("https://i.ibb.co/nwz9wLB/nope.png")
            .setThumbnail(user.profile.images["90x90"]);
            msg.channel.send(sen);
            }
            });
          });
          } else {
            msg.channel.send("This user does not exist! Did you mistype something?");
          }
        });
        } else if (re[1]=="invite") {
          var mesg = new discord.MessageEmbed()
    .setTitle("Invite link")
    .setDescription("Add me to your server with this [link!](https://discord.com/oauth2/authorize?client_id=796578740448264192&scope=bot)")
      msg.channel.send(mesg);
      msg.channel.send("Join the official server here: https://discord.gg/HGEbfZNCAM");
        } else if (re[1]=="srchp") {
          if (re[3] === undefined || Number(re[3])===NaN) {re[3] = 5;} else {re[3] = Number(re[3]);
          if (re[3] > 10) re[3] = 10}
          //the big replace spaghetti
          re[2] = replaceAll(re[2], "`", "%60");
          re[2] = replaceAll(re[2], "@", "%40");
          re[2] = replaceAll(re[2], "#", "%23");
          re[2] = replaceAll(re[2], "$", "%24");
          re[2] = replaceAll(re[2], "%", "%25");
          re[2] = replaceAll(re[2], "^", "%5E");
          re[2] = replaceAll(re[2], "&", "%26");
          re[2] = replaceAll(re[2], "+", "%2B");
          re[2] = replaceAll(re[2], "=", "%3D");
          re[2] = replaceAll(re[2], "[", "%5B");
          re[2] = replaceAll(re[2], "{", "%7B");
          re[2] = replaceAll(re[2], "]", "%5D");
          re[2] = replaceAll(re[2], "}", "%7D");
          re[2] = replaceAll(re[2], "\n"[0], "%5C");
          re[2] = replaceAll(re[2], "|", "%7C");
          re[2] = replaceAll(re[2], ":", "%3A");
          re[2] = replaceAll(re[2], ";", "%3B");
          re[2] = replaceAll(re[2], ",", "%2C");
          re[2] = replaceAll(re[2], "?", "%3F");
          re[2] = replaceAll(re[2], "/", "%2F");
          //</replace>
          request("https://api.scratch.mit.edu/search/projects/?q="+re[2], (err, resp, body)=> {
            var mesg = JSON.parse(body);
            var sen = "";
            for (var i=0;i<re[3];i++) {
              sen = sen +"[**"+mesg[i].title+"**](https://scratch.mit.edu/projects/"+mesg[i].id+")\nby: ["+mesg[i].author.username+"](https://scratch.mit.edu/users/"+mesg[i].author.username+")\n<:view:797962400657047562>: "+comma(mesg[i].stats.views)+" <:love:797962311640940584>: "+comma(mesg[i].stats.loves)+" <:fav:797962340116201522>: "+comma(mesg[i].stats.favorites)+"\n\n";
            }
            var embed = new discord.MessageEmbed()
          .setTitle("Project Search Results")
          .setURL("https://scratch.mit.edu/search/projects/?q="+re[2])
          .setDescription(sen);
            msg.channel.send(embed);
          });
        } else if (re[1]==="trding") {
          if (re[2] === undefined || Number(re[2])===NaN) {re[2] = 5;} else {re[2] = Number(re[2]);
          if (re[2] > 10) re[2] = 10}
          request("https://api.scratch.mit.edu/explore/projects?mode=trending",(err, resp, body) => {
            var mesg=JSON.parse(body);
            var sen = "";
            for (var i=0;i<re[2];i++) {
              sen = sen +"[**"+mesg[i].title+"**](https://scratch.mit.edu/projects/"+mesg[i].id+")\nby: ["+mesg[i].author.username+"](https://scratch.mit.edu/users/"+mesg[i].author.username+")\n<:view:797962400657047562>: "+comma(mesg[i].stats.views)+" <:love:797962311640940584>: "+comma(mesg[i].stats.loves)+" <:fav:797962340116201522>: "+comma(mesg[i].stats.favorites)+"\n\n";
            }
            var embed = new discord.MessageEmbed()
          .setTitle("Trending Projects")
          .setURL("https://scratch.mit.edu/explore/projects?mode=trending")
          .setDescription(sen);
            msg.channel.send(embed);
          });
        }
      } else {
        msg.channel.send(cm.get(re[1]).nea);
      }
    }
  }
}