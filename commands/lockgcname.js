const Thread = require("../models/Thread");

module.exports = async function ({ api, event, args }) {
	const { threadID } = event;
	const action = args[0]?.toLowerCase();

	if (action === "off" || action === "unlock") {
		await Thread.findOneAndUpdate(
			{ threadID },
			{ $unset: { "settings.lockedGcName": "" } },
			{ upsert: true }
		);
		return api.sendMessage(" Naka-unlock na ang pangalan ng GC.", threadID);
	}

	const nameToLock = args.join(" ");
	if (!nameToLock) {
		return api.sendMessage("⚠️ Maglagay ng pangalan na ilo-lock. Example: !lockgcname Official GC", threadID);
	}

	try {
		await Thread.findOneAndUpdate(
			{ threadID },
			{ $set: { "settings.lockedGcName": nameToLock } },
			{ upsert: true }
		);

		api.setTitle(nameToLock, threadID, (err) => {
			if (err) return api.sendMessage("❌ Pumalya ang pagpapalit ng pangalan.", threadID);
			api.sendMessage(`🔒 Naka-lock na ang pangalan ng GC sa: "${nameToLock}"`, threadID);
		});
	} catch (error) {
		console.error(error);
		api.sendMessage("❌ May error sa pag-save sa database.", threadID);
	}
};
