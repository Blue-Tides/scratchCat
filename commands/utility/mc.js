const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const request = require("request");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('mc')
		.setDescription('Shows hows how much messages a scratcher has')
		.addStringOption(option =>
			option.setName('user')
				.setDescription('scratch user'))
	,
	async execute(interaction) {
		await interaction.deferReply();
		var count = null;
		var mesg = null;
		var ready = 0;
		function send() {
			//console.log(ready);
			if(ready==-1) {
			ready=-2;
			interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
			
		};
			if (ready != 2) return;
			//console.log("trying to send??");
			//interaction.editReply("Messages got!");
			interaction.editReply({
				embeds: [new EmbedBuilder()
					.setAuthor({ name: mesg.username, iconURL: mesg.profile.images["90x90"] })
					.setDescription("Message count: " + comma(count.count))]
			});
		}
		request(`https://api.scratch.mit.edu/users/${interaction.options.getString("user")}/messages/count`, (err, resp, body) => {
			if (resp.statusCode != 200 || err) {
				console.log(body);
				if(ready!=-2) ready=-1;
				send();
				return;
			}
			count = JSON.parse(body);
			//console.log("count got!");
			ready++;
			//console.log(ready);
			send();
			//interaction.editReply(""+count.count);
		});
		request("https://api.scratch.mit.edu/users/" + interaction.options.getString("user"), (err, resp, body) => {
			if (resp.statusCode != 200 || err) {
				if (ready!=-2) ready=-1;
				send();
				console.log(body);
				return;
			}
			mesg = JSON.parse(body);
			//console.log("scratcher info got!");
			ready++;
			//console.log(ready);
			send();
		});

	},
};

//code from ten years ago thats trash will rewrite
//commafies numbers ex 123456 -> 123,456
//to do: rewrite this
function comma(number) {
	var i = "" + number;
	i = i.split("").reverse();
	i.forEach((item, index) => {
		if (index % 3 == 0) i[index] = i[index] + ",";
	});
	i[0] = i[0][0];
	return i.reverse().join("");
}