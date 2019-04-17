<!-- 歌词显示 -->
<!-- 不同的歌曲；建议动态加载歌词js -->

var textbox=$('.textbox');
var audio = document.getElementById("audio");

var getTime = function(){
    // 不需要这个函数了，直接输出audio.currentTime这个时间进行比大小就可以
    // 获取03:14:33这种格式的当前播放时间
    var timeNow = audio.currentTime
    // console.log(timeNow);
    // 获取分钟数
    var timeMin = String(Math.floor(timeNow/60));
    // 如果分钟数是1位，前面加个0
    timeMin = timeMin.length<2 ? "0"+timeMin : timeMin;
    // console.log(timeMin);
    var timeSec = String(Math.floor(timeNow%60));
    timeSec = timeSec.length<2 ? "0"+timeSec : timeSec;
    // console.log(timeSec);
    var timeMil = String(timeNow);
    timeMil = timeMil.substr(timeMil.indexOf('.')+1,2);//取小数点后面的两位
    // console.log(timeMil);
    var timeLrc = timeMin + ":" + timeSec + "." + timeMil;

    return timeLrc;
};

var getLrcTime = function(i){
    // 获取歌词里的每句的时间
    var lrcTime = loveStory[i].substr(1,8);//"01:15.80"
    // 分钟转数字可以去掉前面的0
    lrcTimeMin = parseInt(lrcTime.split(":")[0]);//1
    // 虽然末尾有0，不过要转成数字比大小
    lrcTimeSec = parseFloat(lrcTime.split(":")[1]);//15.8
    lrcTime = lrcTimeMin*60+lrcTimeSec;
    // console.log(lrcTimeMin);
    // console.log(lrcTimeSec);
    // console.log(lrcTime);
    return lrcTime;
};

setInterval(function(){
    // 获取lrc.js文件中的歌词，每秒刷新一下，获取播放时间，然后跟歌词里的时间比对，如果播放时间大于歌词时间，就显示歌词。
    var timeNow = audio.currentTime

    for(var i = 0; i < loveStory.length; i++){
        var lrcTime = getLrcTime(i);
        // console.log(lrcTime);
        var lrcWord = loveStory[i].substr(10,loveStory[i].length);
        if(timeNow > lrcTime){
            console.log(lrcTime);
            console.log(lrcWord);
            loveStory.splice(i,1);//删除显示过的文本，
            textbox.html(lrcWord);//歌词显示到文本框内
        }else{

        }
    }

},1000);
