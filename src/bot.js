const tmi = require('tmi.js');

// Define configuration options
const opts = {
    identity: {
        username: 'user',
        password: 'token'
    },
    channels: [
        'twitch_user'.toLowerCase()
    ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("chat", onChatHandler);
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

async function onChatHandler(target, user, message, self) {
    if (self) {
        return;
    } // Ignore messages from the bot

    console.log(user.username, ": ", message)
    const random = Math.floor(Math.random() * 2)

    if (message.toString().toLowerCase() == '!fumita') {
        if (user.username.toLowerCase() == 'elfuu_farmer') {
            client.say(target, 'no te puedes auto leer el asterisco fuma, no sea weon')

        } else {
            client.say(target, "el fuma esta leyendo los pliegues de tu asterisco y predice que...")
            await sleep(2000)
            if (random === 1) {
                client.say(target, user.username.toString() + " Tendra un lindo futuro")
            } else {
                client.say(target, user.username.toString()+ " Te moriras de una diarrea nuclear")
            }
        }

    }

}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot
    // Remove whitespace from chat message
    const commandName = msg.trim().toLowerCase();

    // If the command is known, let's execute it
    if (commandName === 'no') {

        const num = rollDice();
    } else {
    }
}

// Function called when the "dice" command is issued
function rollDice () {
    const sides = 100;
    return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}