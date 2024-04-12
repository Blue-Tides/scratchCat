const { SlashCommandBuilder } = require('discord.js');
const request=require("request");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('mc')
		.setDescription('Shows hows how much messages a scratcher has')
        .addStringOption(option =>
            option.setName('user')
                .setDescription('scratch user'))
        ,
	async execute(interaction) {
		await interaction.reply(`loading...`);
		request(`https://api.scratch.mit.edu/users/${interaction.options.getString("user")}/messages/count`, (err, resp, body) => {
			if(resp.statusCode!=200) {interaction.editReply("An error occured."); 
			console.log(body);
			return;}
			if(err) interaction.edit("Error:"+err);
			var count = JSON.parse(body);
			interaction.editReply(""+count.count);
		});
	},
};