const Discord = require('discord.js');
const client = new Discord.Client();
const Rcon = require('modern-rcon');
const rcon = new Rcon("127.0.0.1" /* ← Ркон айпи*/, 25569 /* ← Ркон порт*/, "РКОН ПАРОЛЬ" /* ← Ркон пароль*/, 5000);
client.login(process.env.BOT_TOKEN);

client.on('message', msg => {
	if (msg.author.bot) return;
	if(msg.content == "/cmd") {
		msg.channel.send("``Консоль`` › ``Используй так: /cmd <Твоя комманда>``");
	}else{
		let rolename = msg.guild.roles.find(`name`, `RCON` /* ← Там где `RCON` - название роли которая сможет использовать бота*/);
		if(msg.content.startsWith("/cmd ")) {
			if(!msg.member.roles.has(rolename.id)) {
				msg.channel.send("``Консоль`` › ``Нет прав :c``");
				msg.channel.send("``Консоль`` › ``Купите (СоВладелец) на сайте: ToffiCraft.ru``");
				console.log("Пользователь с айди " + msg.author.id + " попытался использовать бота, но у него недостаточно прав.");
				return;
			}
			var blocked = [];
			blocked[0] = 'op';
			blocked[1] = 'deop';
			blocked[2] = 'pex';
			blocked[3] = 'permissionsex';
			blocked[4] = 'permissionsex:pex';
			blocked[5] = 'minecraft:op';
			blocked[6] = 'minecraft:deop';
			let args = msg.content.slice(5, msg.length);
			for (var aaa = 0; aaa < blocked.length; aaa++) {
				if(args.includes(blocked[aaa])) {
					msg.channel.send("``Консоль`` › ``Увы, комманда заблокирована!``");
					return;
				}
			}
			if(args.length == 0) {
				msg.channel.send("``Консоль`` › ``Используй так: /cmd <Твоя комманда>``");
			} else {
				var blacklist = [];
                blacklist[0] = "Блять";
                for(var i = 0; i < blacklist.length; i++) {
                    if(args.toLowerCase().includes(blacklist[i].toLowerCase())) {
                        msg.delete();
                        msg.channel.send("``Консоль`` › ``Не выражайся!``");
                        return;
                        break;
                    } else {
						rcon.connect().then(() => {
							return rcon.send(args); //Не трогать
						}).then(res => {
							msg.channel.send("``Консоль`` › ``Ответ от сервера:``");
							console.log("Пользователь с айди " + msg.author.id + " использует комманду /" + args);
							msg.channel.send('```' + res + '```');
						}).then(() => {
							return rcon.disconnect();
						});
					}
                }
			}
		}
	}
});
