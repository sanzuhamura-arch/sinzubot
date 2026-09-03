module.exports = async function ({ api, event, args }) {
	const { threadID } = event;
	const prefix = process.env.PREFIX || "!";

	// Kung nag-type lang ng "!help"
	if (!args[0]) {
		const helpMessage = `
🤖 ═══ [ SINZUBOT HELP MENU ] ═══ 🤖

📌 Prefix: \`${prefix}\`

⚙️ LISTAHAN NG COMMANDS:

🔹 **${prefix}setallnicknames <bagong_nickname>**
   └ Baguhin ang palayaw ng LAHAT ng miyembro sa GC.

🔹 **${prefix}lockgcname <pangalan>**
   └ I-lock ang pangalan ng GC para hindi palitan ng iba.
   └ Gamitin ang \`${prefix}lockgcname unlock\` para tanggalin ang lock.

🔹 **${prefix}help [command]**
   └ Ipakita ang tulong o detalye ng isang command.

💬 **AUTO REPLIES (Kusa sasagot ang bot):**
   └ Type "bot", "prefix", "kumusta", o "sinzubot"

💡 *Tip: I-type ang \`${prefix}help <command>\` para sa karagdagang detalye. Halimbawa: \`${prefix}help lockgcname\`*
`;

		return api.sendMessage(helpMessage, threadID);
	}

	// Kung nag-type ng "!help setallnicknames" o "!help lockgcname"
	const commandQuery = args[0].toLowerCase();

	if (commandQuery === "setallnicknames") {
		const msg = `
🔹 **COMMAND:** ${prefix}setallnicknames
📖 **PALIWANAG:** Palitan ang nickname ng bawat miyembro sa GC nang sabay-sabay.
✏️ **USAGE:** \`${prefix}setallnicknames [Bagong Nickname]\`
💡 **EXAMPLE:** \`${prefix}setallnicknames Member\`
⚠️ **NOTE:** May kaunting delay ito bawat tao para iwas-ban ng Facebook.
`;
		return api.sendMessage(msg, threadID);
	}

	if (commandQuery === "lockgcname") {
		const msg = `
🔹 **COMMAND:** ${prefix}lockgcname
📖 **PALIWANAG:** I-lock ang pangalan ng GC. Kapag may nagpalit, ibabalik ito ng bot sa naka-lock na pangalan.
✏️ **USAGE:**
   • Lock GC: \`${prefix}lockgcname [Gusto mong pangalan]\`
   • Unlock GC: \`${prefix}lockgcname unlock\`
💡 **EXAMPLES:**
   • \`${prefix}lockgcname Official Group Chat\`
   • \`${prefix}lockgcname unlock\`
`;
		return api.sendMessage(msg, threadID);
	}

	return api.sendMessage(`❌ Walang nahanap na detalye para sa command na "${commandQuery}".`, threadID);
};
