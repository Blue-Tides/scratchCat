const discord = require("discord.js");


function help(re) {
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
}