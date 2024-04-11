const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mc')
		.setDescription('Shows hows how much messages a scratcher has')
        .addStringOption(option =>
            option.setName('user')
                .setDescription('scratch user'))
        ,
	async execute(interaction) {
		await interaction.reply(`youre mother is ${interaction.options.getString('user')}`);
	},
};