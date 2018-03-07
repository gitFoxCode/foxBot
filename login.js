const fs = require("fs");
const login = require("facebook-chat-api");
const botAccount = {
	email: "webfoxcode@gmail.com",
	password: "wordPass123"
}

login({email: botAccount.email, password: botAccount.password}, (err, api) => {
    if(err) return console.error(err);

    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
});