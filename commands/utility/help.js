const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Provides in-depth explanations of each command'),
	async execute(interaction) {
		await interaction.reply("youre mother");
	},
};