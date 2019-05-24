const fs = require("fs");
const login = require("facebook-chat-api");

login({email: "E-mail", password: "Password"}, (err, api) => {
    if(err) return console.error(err);

    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
});