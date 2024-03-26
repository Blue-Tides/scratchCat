if (msg.author.id != client.user.id) { 
    var stuff = fs.readFileSync("data.json", (err, data) => {
      return JSON.parse(data);
    });
    stuff = JSON.parse(stuff); 
    var re = msg.content.split(" ");
    if (re[0].toUpperCase()===pf.toUpperCase()||re[0]==="<@!796578740448264192>") {
    var mesg;
    //help
    if (re[1] == "help") {
      if (re[2]===undefined||cm.get(re[2])===undefined) {
      var sen = "";
      cm.forEach((val, key) => {
        sen = sen+"`"+key+"`: "+val.csd+"\n";
      });
      mesg = new discord.MessageEmbed() 
  .setColor('#0099ff')
	.setTitle('All commands start with the prefix `sc`. Use `sc help [command]` to learn more about a command.')
	.setDescription(sen+"more commands coming soon!");
      msg.channel.send(mesg);
      } else {
        mesg = new discord.MessageEmbed()
  .setTitle(re[2]+" command")
  .setDescription(cm.get(re[2]).cld);
        msg.channel.send(mesg);
      }
      //message count
    } else if (re[1]=="mc") {
      if (re[2]===undefined) re[2] = stuff[msg.author.id];
      if (re[2]!==undefined) {
      if (re.length <= 2) {
        msg.channel.send("Please tell me who you want to see the message count of!");
      } else {
        if (re[2].length >= 3 && re[2].length <= 20) {
          request("https://api.scratch.mit.edu/users/"+re[2], function(error, response, body,) {
            mesg = JSON.parse(body); 
              if (mesg.code === undefined) {
                request("https://api.scratch.mit.edu/users/"+re[2]+"/messages/count", function(error, response, body,) {
                  var count = JSON.parse(body);
                  var embed = new discord.MessageEmbed() 
            .setAuthor(mesg.name, mesg.profile.images["90x90"])
            .setDescription("Message count: "+comma(count.count));
              msg.channel.send(embed);
                });
              } else {
                msg.channel.send("This user does not exist! Did you mistype somthing?");
              }
          });  
        } else {
          msg.channel.send("This user does not exist! Did you mistype somthing?");
        }
      }
    } else {
      msg.channel.send("Please tell me who you want to see the message count of!");
    }
    } else if (re[1]=="fp") { //featured project
      if (re[2]===undefined) re[2] = stuff[msg.author.id];
      if (re[2]!==undefined) {
        if (re.length <= 2) {
          msg.channel.send("Please tell me who you want to see the featured project of!");
        } else if (re[2].length >= 3 && re[2].length <= 20) {
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
            .setTitle(mesg.title)
            .setURL("https://scratch.mit.edu/projects/"+mesg.id)
            .setDescription("<:view:797962400657047562> "+comma(mesg.stats.views)+", <:love:797962311640940584> "+comma(mesg.stats.loves)+", <:fav:797962340116201522> "+comma(mesg.stats.favorites))
            .setImage(mesg.image);
            msg.channel.send(sen);
            } else {
              msg.channel.send("An error occured");
            }
              });
            } else {
              request("https://api.scratch.mit.edu/users/"+re[2]+"/projects?limit=40", (error,response,body)=>{
                mesg = JSON.parse(body);
                if (mesg.length !== 0) {
                mesg = mesg[mesg.length-1];
                sen = new discord.MessageEmbed()
            .setAuthor(re[2], mesg.author.profile.images["90x90"])
            .setTitle(mesg.title)
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
              msg.channel.send("An error occured");
          }
            
        });
        } else {
          msg.channel.send("This user does not exist! Did you mistype somthing?");
        }
    } else {
      msg.channel.send("Please tell me who you want to see the featured project of!");
    }
      } else if (re[1]=="pfp") {
        if (re[2]===undefined) {
          msg.channel.send("conjureya");
        } else {
          if (re[2].length < 3 || re[2].length > 20) {
            msg.channel.send("conjureya");
          } else {
            request("https://api.scratch.mit.edu/users/"+re[2],(error, response, body) => {
              mesg = JSON.parse(body);
              if (mesg.code===undefined) {
                msg.channel.send({files: [mesg.profile.images["90x90"]]});
              } else {
                msg.channel.send("conjureya");
              }
            });
          }
        }
      } else if (re[1]=="hi") {
        if (re[2]===undefined) {
          if (stuff[msg.author.id]===undefined) {
          msg.channel.send("Tell me your username!");
          } else {
            msg.channel.send("Hi, "+stuff[msg.author.id]+"!");
          }
        } else if (re[2].length >=3 && re[2].length <= 20) {
          request("https://api.scratch.mit.edu/users/"+re[2], (error, request, body) => {
            var mesg = JSON.parse(body);
            if (mesg.code === undefined) {
              stuff[msg.author.id] = mesg.username;
              fs.writeFile("data.json",JSON.stringify(stuff),err => {
                if (err) throw err;
                msg.channel.send("Okay, got it!");
              });
            } else {
              msg.channel.send("This user doesn't exist! Did you mistype something?");
            }
          });
        }
      } else if (re[1]=="find") {
        if (re[2] !== undefined && isping(re[2]) || Number(re[2]!==NaN)) {
        var mesg = re[2].substr(3,re[2].length-4);
        if (!isping(re[2])) mesg = re[2].toString();
        if (stuff[mesg] === undefined) {
          msg.channel.send("This person did not tell me their Scratch username yet!");
        } else {
          msg.channel.send("This person is "+stuff[mesg]+ " on Scratch!");
        }
      } else {
        if (stuff[msg.author.id]!==undefined) {
          msg.channel.send("Your Scratch username is "+stuff[msg.author.id]+"!");
        } else {
          msg.channel.send("Tell me who you want to find the Scratch username of!");
        }
      } 
      } else if (re[1] == "invite") {
        var mesg = new discord.MessageEmbed()
    .setTitle("Invite link")
    .setDescription("Add me to your server with this [link!](https://discord.com/oauth2/authorize?client_id=796578740448264192&scope=bot)")
      msg.channel.send(mesg);
      msg.channel.send("Join the official server here: https://discord.gg/HGEbfZNCAM");
      } else if (re[1] == "info") {
        if (re[2]===undefined) re[2]=stuff[msg.author.id];
        if (re[2]!==undefined) {
        if (re[2].length < 3 || re[2].length > 20) {
          msg.channel.send("This user does not exist! Did you mistype something?");
        } else {
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
                if (feat.featured_project!==null) {
                request("https://api.scratch.mit.edu/projects/"+feat.featured_project, (err,resp,body)=>{
                   var proj = JSON.parse(body);
                   if (proj.title===undefined) {
                proj.title = "Featured project not shared";  
                }
              var sen = new discord.MessageEmbed()
            .setTitle(user.username+" <:link:798053448422916117>")
            .setURL("https://scratch.mit.edu/users/"+re[2])
            .setDescription("<:view:797962400657047562>"+ statcheck("views")+"\n<:love:797962311640940584>"+statcheck("loves")+"\n<:fav:797962340116201522>"+statcheck("favorites")+"\n<:follow:797962365886529557>"+statcheck("followers"))
            .addField("About Me", user.profile.bio, true)
            .addField("What I'm Working On", user.profile.status, true)
            .addField(feat.featured_project_label_name, proj.title)
            .setImage(proj.image)
            .setThumbnail(user.profile.images["90x90"]);
            msg.channel.send(sen);
            });
            } else {
              var sen = new discord.MessageEmbed()
            .setTitle(user.username+" <:link:798053448422916117>")
            .setURL("https://scratch.mit.edu/users/"+re[2])
            .setDescription("<:view:797962400657047562>"+ statcheck("views")+"\n<:love:797962311640940584>"+statcheck("loves")+"\n<:fav:797962340116201522>"+statcheck("favorites")+"\n<:follow:797962365886529557>"+statcheck("followers"))
            .addField("About Me", user.profile.bio, true)
            .addField("What I'm Working On", user.profile.status, true)
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
        }
      }
      }
    }
  }