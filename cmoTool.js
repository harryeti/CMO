//

/*
 * 注意：本程序中的“随机”都是伪随机概念，以当前的天为种子。
 */
function random(dayseed, indexseed) {
    var n = dayseed % 10007;
    for (var i = 0; i < 100 + indexseed; i++) {
        n = n * n;
        n = n % 10007; // 10007 是>10000的第一个质数
    }
    return n;
}

var today = new Date();
var iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

var weeks = ["日", "一", "二", "三", "四", "五", "六"];
var chosen1 = ["耶里夏丽", "温暖你的猪", "烤鱼", "麻辣香锅", "小菜园", "云海肴", "外婆家"];
var chosen2 = ["丼魂", "金拱门", "KFC", "火车头", "小吃街"];
var parterns = ["Ring", "Song", "Tompson", "Yuan", "Nick", "Shepard"];

var bans = [{
    "Yuan": ["小菜园"]
}];

var drinks = [{
    name: "梦",
    values: ["冰凉水果茶", "至尊奶盖茶"]
}, {
    name: "斯达巴克斯",
    values: ["加烫浓缩一口闷", "冰爽到家星冰乐", "温暖的"]
}, {
    name: "一点点",
    values: ["红茶拿铁+冰淇淋"]
}];

function is_someday() {
    // return today.getMonth() == 5 && today.getDate() == 4;
    return false;
}

function getTodayString() {
    return "今天是" + today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日 星期" + weeks[today.getDay()];
}

function star(num) {
    var result = "";
    var i = 0;
    while (i < num) {
        result += "★";
        i++;
    }
    while (i < 5) {
        result += "☆";
        i++;
    }
    return result;
}

// 生成今日运势
function pickTodaysMile() {
    //   var _activities = filter(activities);

    // var numChosen1 = random(iday, 113) % 3 + 2;
    // var numChosen2 = random(iday, 103) % 3 + 2;
    // var numBad = random(iday, 87) % 3 + 2;
    var chosen1Array = pickRandomActivity(chosen1, 1);
    var chosen2Array = pickRandomActivity(chosen2, 1);
    var drinkArray = pickRandomActivity(drinks, 1);
    let a = [];
    chosen1Array.forEach(c => {
        a.push(c);
        this.addToChosen1(c);
    });
    chosen2Array.forEach(c => {
        a.push(c);
        this.addToChosen2(c);
    });
    var badArray = pickRandomActivity(a, 1);
    // badArray.forEach(b => this.addToBad(b));
    drinkArray.forEach(b => this.addToDrink(b));
    // var specialSize = pickSpecials();
}

// 去掉一些不合今日的事件
function filter(activities) {
    var result = [];

    // 周末的话，只留下 weekend = true 的事件
    if (isWeekend()) {

        for (var i = 0; i < activities.length; i++) {
            if (activities[i].weekend) {
                result.push(activities[i]);
            }
        }

        return result;
    }

    return activities;
}

function isWeekend() {
    return today.getDay() == 0 || today.getDay() == 6;
}

// 添加预定义事件
function pickSpecials() {
    var specialSize = [0, 0];

    for (var i = 0; i < specials.length; i++) {
        var special = specials[i];

        if (iday == special.date) {
            if (special.type == 'good') {
                specialSize[0]++;
                addToGood({
                    name: special.name,
                    good: special.description
                });
            } else {
                specialSize[1]++;
                addToBad({
                    name: special.name,
                    bad: special.description
                });
            }
        }
    }

    return specialSize;
}

// 从 activities 中随机挑选 size 个
function pickRandomActivity(activities, size) {
    var picked_events = pickRandom(activities, size);

    // for (var i = 0; i < picked_events.length; i++) {
    //     picked_events[i] = parse(picked_events[i]);
    // }

    return picked_events;
}

// 从数组中随机挑选 size 个
function pickRandom(array, size) {
    var result = [];

    for (var i = 0; i < array.length; i++) {
        result.push(array[i]);
    }

    for (var j = 0; j < array.length - size; j++) {
        var index = random(iday, j) % result.length;
        result.splice(index, 1);
    }

    return result;
}

// 解析占位符并替换成随机内容
function parse(event) {
    var result = {
        name: event.name,
        good: event.good,
        bad: event.bad
    }; // clone

    if (result.name.indexOf('%v') != -1) {
        result.name = result.name.replace('%v', varNames[random(iday, 12) % varNames.length]);
    }

    if (result.name.indexOf('%t') != -1) {
        result.name = result.name.replace('%t', tools[random(iday, 11) % tools.length]);
    }

    if (result.name.indexOf('%l') != -1) {
        result.name = result.name.replace('%l', (random(iday, 12) % 247 + 30).toString());
    }

    return result;
}

function addToChosen1(event) {
    $('.chosen1 .content ul').append('<li><div class="name">' + event + '</div><div class="description">' + event + '</div></li>');
}

function addToChosen2(event) {
    $('.chosen2 .content ul').append('<li><div class="name">' + event + '</div><div class="description">' + event + '</div></li>');
}

// 添加到“不宜”
function addToBad(event) {
    $('.bad .content ul').append('<li><div class="name">' + event + '</div><div class="description">' + event + '</div></li>');
}

function addToDrink(event) {
    $('.drink_value').html(event.name);
}

$(function() {
    // if (is_someday()) {
    //     document.body.className = 'someday'
    // }
    // ;
    $('.date').html(getTodayString());
    // $('.direction_value').html(directions[random(iday, 2) % directions.length]);
    // $('.goddes_value').html(star(random(iday, 6) % 5 + 1));
    pickTodaysMile();
});