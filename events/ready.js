module.exports = {
    name: 'ready',
    description: 'Untuk mendeteksi jika bot nya online',
	async execute(client) {
	    console.log(`Bot ${client.user.tag} telah online`);
		client.user.setActivity('Unity Island Roleplay', {type: 'WATCHING'});
	},
};