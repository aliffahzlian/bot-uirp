const { SlashCommandBuilder } = require('@discordjs/builders');
const con = require('../function/mysql');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('register')
	.setDescription('For the list of new players')
	.addStringOption(option => option.setName('name')
	    .setDescription('Set your name UCP')
	    .setRequired(true)),
    async execute(interaction) {
		const name = await interaction.options.getString('name');
		const discordid = await interaction.user.id;
		if(interaction.channel.id === '930331765183221760') {
			con.query(`SELECT * FROM ucp WHERE discordid = '${discordid}'`, async (err, row) => {
				if(row.length < 1) {
					con.query(`SELECT * FROM ucp WHERE name = '${name}'`, async (err, row) => {
						if(row.length < 1) {
							if(interaction.member.permissions.has('ADMINISTRATOR')) {
								con.query(`INSERT INTO ucp SET name = '${name}', discordid = '${discordid}', verify = '1', character_1 = '${name}', character_2 = '${name}', character_3 = '${name}'`);
								return interaction.reply(`\`\`\`\n${name} Good luck to here bro , Chat Ini Harap Di Ss\`\`\``);
							}
							else {
								con.query(`INSERT INTO ucp SET name = '${name}', discordid = '${discordid}', verify = '1', character_1 = '${name}', character_2 = '${name}', character_3 = '${name}'`);
								interaction.member.setNickname(name);
								interaction.member.roles.add('929958742269771786');
								interaction.member.roles.remove('929959422917218335');
								return interaction.reply(`\`\`\`\n${name} Good luck to here bro , Chat Ini Harap Di Ss\`\`\``);
							}
						}
						else {
							await interaction.reply({content: `\`\`\`\nThis name is already in use\`\`\``, ephemeral: true});
						}
					})
				}
				else {
					await interaction.reply({content: `\`\`\`\nYou already have ucp, can't register anymore\`\`\``, ephemeral: true});
				}
			}) 
		}
		else {
			await interaction.reply({content: `\`\`\`\nYou can't use this command on this channel\`\`\``, ephemeral: true});
		}
    },
};