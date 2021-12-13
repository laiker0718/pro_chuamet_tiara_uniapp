// music play

const bgm = uni.createInnerAudioContext();
bgm.src = 'https://qn.notionbase.com/chaumet/rsvp/music/bg_music.mp3?v=0.1'
bgm.loop = true;

var music = {
    //mute 表示是否是静音，，默认不静音
    playBgm({mute=false}){
        if (!bgm) return;
        if(mute){
            bgm.pause()
        }else{
            bgm.play()
        }
        
        bgm.onPause(()=>{
            console.log('暂停背景音乐');
        })
        bgm.onPlay(() => {
            console.log('开始播放音乐');
        })
        bgm.onError((res) => {
            console.log(res)
        })
    }
}
module.exports = music