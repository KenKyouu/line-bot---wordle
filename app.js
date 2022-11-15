const linebot = require("linebot");
const randomWords = require("random-words");
const request = require("request");

// linebot
let bot = linebot({
    channelId: "",
    channelSecret: "",
    channelAccessToken: "",
});
let word = [];
let wordArr = [];
let blockArr = [];
let guess = "";
bot.on("message", function (event) {
    if (event.message.text == "開始") {
        event.reply("遊戲開始，欲了解玩法請至記事本查看。");
        guess = "";
        word = [];
        wordArr = [];
        blockArr = [];
        word = randomWords({ exactly: 1, maxLength: 5 });
        while (word[0].length < 5) {
            word = randomWords({ exactly: 1, maxLength: 5 });
        }
        for (i = 0; i < 5; i++) {
            wordArr.push(word[0][i]);
        }
        console.log(wordArr);
        bot.on("message", function (e) {
            guess = e.message.text.toLowerCase().trim();
            if (guess.length != 5 && guess != "開始") {
                e.reply("輸入的單字須由5個英文字母組成");
                guess = "";
                blockArr = [];
            } else if (guess == "開始") {
            } else {
                blockArr = [];
                for (let m = 0; m < 5; m++) {
                    if (wordArr.includes(guess[m]) && wordArr[m] == guess[m]) {
                        blockArr.push("🟩");
                    } else if (
                        wordArr.includes(guess[m]) &&
                        wordArr[m] != guess[m]
                    ) {
                        blockArr.push("🟨");
                    } else {
                        blockArr.push("🟫");
                    }
                }
                let blockString = blockArr.toString();
                let block = blockString.replace(/,/g, "");
                e.reply(block);
                blockArr = [];
                guess = "";
            }
        });
    }
});

bot.listen("/linewebhook", 3000, function () {
    console.log("[BOT已準備就緒]");
});
