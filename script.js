'use strict'

//変数宣言(現在時刻用)
const hour_time = document.getElementById("nowHour");      
const minute_time =document.getElementById("nowMin");  
const second_time = document.getElementById("nowSec"); 

//変数宣言(カウントダウン用)
const year_c = document.getElementById("cntYear");  
const day_c = document.getElementById("cntDay");  
const hour_c = document.getElementById("cntHour");       
const minute_c =document.getElementById("cntMin");  
const second_c = document.getElementById("cntSec"); 

//変数宣言（タイムゾーン用）
const cha = document.getElementById('ch');
const fra = document.getElementById('fc');
const usa = document.getElementById('us');
const jpn = document.getElementById('jp');
const tZone = document.getElementById('zone');

//従業員検索用
const jCode = document.getElementById('jcode');
const codeChk = document.getElementById('search');
const userName = document.getElementById('account');

//座席選択用
const seat1to1 = document.getElementById('seat1-1');
const seat1to2 = document.getElementById('seat1-2');
const seat1to3 = document.getElementById('seat1-3');
const seat1to4 = document.getElementById('seat1-4');
const seat1to5 = document.getElementById('seat1-5');
const seat1to6 = document.getElementById('seat1-6');
const seat2to1 = document.getElementById('seat2-1');
const seat2to2 = document.getElementById('seat2-2');
const seat2to3 = document.getElementById('seat2-3');
const seat2to4 = document.getElementById('seat2-4');
const seat2to5 = document.getElementById('seat2-5');
const seat2to6 = document.getElementById('seat2-6');
const seat3to1 = document.getElementById('seat3-1');
const seat3to2 = document.getElementById('seat3-2');
const seat3to3 = document.getElementById('seat3-3');
const seat3to4 = document.getElementById('seat3-4');
const seat3to5 = document.getElementById('seat3-5');
const seat3to6 = document.getElementById('seat3-6');
const seat4to1 = document.getElementById('seat4-1');
const seat4to2 = document.getElementById('seat4-2');
const seat4to3 = document.getElementById('seat4-3');
const seat4to4 = document.getElementById('seat4-4');
const seat4to5 = document.getElementById('seat4-5');
const seat4to6 = document.getElementById('seat4-6');

//情報保持用変数
let timezone = 0;       //JST基準の時差値保持用
let country = "東京";   //タイムゾーンの国名保持用
let now;                //時間保持用
let rstName = ""        //従業員名保持用

//従業員コード検索用（今後csvファイルから取得するように変更）
const objSyainList =[
    {code:"0000001" ,namae:"愛知 一郎", seki:""},
    {code:"0000002" ,namae:"愛知 二郎", seki:""},
    {code:"0000003" ,namae:"愛知 三郎", seki:""},
    {code:"0000004" ,namae:"愛知 四郎", seki:""},
    {code:"0000005" ,namae:"愛知 五郎", seki:""},
    {code:"0000006" ,namae:"愛知 六郎", seki:""},
    {code:"0000007" ,namae:"愛知 七郎", seki:""},
] 

//時間処理関数呼び出し（ループ）
function showTime() {
    //現在時刻を表示
    nowTime();
    //カウントダウン
    countDown();
    //1000ms処理を待機する関数を呼び出す
    restart();
}

//現在時刻表示用
function nowTime(){
    now = new Date();
    let hour = now.getHours() + timezone;
    let minute = now.getMinutes() ;
    let second = now.getSeconds() ;

    //ｰｰｰｰｰｰｰ 時差計算後のマイナス時間修正-------------
    if ( Number(hour) < 0 ){
        hour = Number(hour) + 24
    }
    //-------------------------------------

    //html出力
    hour_time.textContent=String(hour).padStart(2,"0");
    minute_time.textContent=String(minute).padStart(2,"0");
    second_time.textContent=String(second).padStart(2,"0");
}

//カウントダウン用
function countDown(){  
    const limit = new Date("2024/03/17/ 00:00:00");
    const jisa = timezone * 60 * 60 * 1000;
    const setTime = limit.getTime() -now.getTime() - jisa;
    const year = Math.floor(setTime / (24 * 60 * 60 * 1000) / 365)
    const day = Math.floor(setTime / (24 * 60 * 60 * 1000)- (365 * year));
    const hourTime = Math.floor(setTime % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
    const minuteTime = Math.floor(setTime % (24 * 60 * 60 * 1000) / (60 * 1000)) % 60;
    const secondTime = Math.floor(setTime % (24 * 60 * 60 * 1000) / 1000) % 60 % 60;

    //html出力
    year_c.textContent=String(year).padStart(1);
    day_c.textContent=String(day).padStart(3,"0");
    hour_c.textContent=String(hourTime).padStart(2,"0");
    minute_c.textContent=String(minuteTime).padStart(2,"0");
    second_c.textContent=String(secondTime).padStart(2,"0");
    tZone.textContent= country + " (JST : " + String(timezone) +")";
}

//１秒待機＋showTime関数再呼び出し
function restart(){
     setTimeout(showTime,1000); //1000ms待機してshowTimeを再呼び出し
}

//タイムゾーン設定（各Button処理）
cha.addEventListener("click",function(){
    timezone = -1;
    country = "中国";
})
fra.addEventListener("click",function(){
    timezone = -8;
    country = "フランス";
})
usa.addEventListener("click",function(){
    timezone = -18;
    country = "アメリカ";
})
jpn.addEventListener("click",function(){
    timezone = 0;
    country = "日本";
})

//従業員検索
codeChk.addEventListener("click",function(){
    let rst = 0;
    if (jCode.value < 9999999 && jCode.value.length === 7) {
        for (const chkCode of objSyainList){
            if ( chkCode["code"] === jCode.value){
                rstName = chkCode["namae"] ;
                rst = 1;
                break;
            }
        }
        
        if(rst !== 0){
            userName.textContent = rstName + " さん";
        }else{
            window.alert("対象者がいませんでした");
            rstName = ""
            userName.textContent = "";
        }
    } else {
        window.alert("従業員コード（半角7桁を入力してください");
        rstName = ""
        userName.textContent = "";
    }
})

//座席選択
function seatSelect(event){
    if(rstName !== ""){
        const targetId = event.target.id;
        let objCount = 0;
        let otherSeat = "";
        let otherUser = false;

        //自分が席を確保しているか？
        for(const chkObj of objSyainList){
            if(chkObj["namae"] === rstName && chkObj["seki"] !== ""){
                otherSeat = chkObj["seki"];
                break;
            }
            objCount += 1;
        }

        //他の人の席か？
        for(const chkObj of objSyainList){
            if(chkObj["namae"] !== rstName && chkObj["seki"] === targetId){
                otherUser = true;
                break;
            }
        }

        //自分が他の席を確保しており、他の人が使ってない席の場合
        if(otherSeat !== "" &&  otherUser === false){
            clearCanvas(otherSeat);
            objSyainList[objCount]["seki"] = targetId;
        }

        //他の人が使ってない席の場合
        if(otherUser === false){
            const target = document.getElementById(targetId);
            const chgCanvas = target.getContext('2d');
            chgCanvas.fillStyle = 'silver';
            chgCanvas.fillRect(10, 10, 100, 100);
            chgCanvas.font = '12px bold';
            chgCanvas.fillStyle = 'black';
            //文字の配置を指定（左上基準にしたければtop/leftだが、文字の中心座標を指定するのでcenter
            chgCanvas.textBaseline = 'center';
            chgCanvas.textAlign = 'center';
            //座標を指定して文字を描く（座標は画像の中心に）
            var x = (target.width / 2);
            var y = (target.height / 2);
            chgCanvas.fillText(rstName,x,y);
            for(const chkObj of objSyainList){
                if(chkObj["namae"] === rstName){
                    chkObj["seki"] = targetId;
                    break;
                }  
            }
        } 
    }

}

//使用中の座席を初期化する
function clearCanvas(canvasId){
    const setCanvas = document.getElementById(canvasId);
    const searchCanvas = setCanvas.getContext('2d');
    searchCanvas.fillStyle = 'lightgreen';
    searchCanvas.fillRect(10, 10, 100, 100);
    searchCanvas.fillText("",0,0);
}

//処理開始(時間関係処理)
showTime()

//canvasで描画した■をクリックしたら文字を入れる
seat1to1.addEventListener("click",seatSelect);
seat1to2.addEventListener("click",seatSelect);
seat1to3.addEventListener("click",seatSelect);
seat1to4.addEventListener("click",seatSelect);
seat1to5.addEventListener("click",seatSelect);
seat1to6.addEventListener("click",seatSelect);
seat2to1.addEventListener("click",seatSelect);
seat2to2.addEventListener("click",seatSelect);
seat2to3.addEventListener("click",seatSelect);
seat2to4.addEventListener("click",seatSelect);
seat2to5.addEventListener("click",seatSelect);
seat2to6.addEventListener("click",seatSelect);
seat3to1.addEventListener("click",seatSelect);
seat3to2.addEventListener("click",seatSelect);
seat3to3.addEventListener("click",seatSelect);
seat3to4.addEventListener("click",seatSelect);
seat3to5.addEventListener("click",seatSelect);
seat3to6.addEventListener("click",seatSelect);
seat4to1.addEventListener("click",seatSelect);
seat4to2.addEventListener("click",seatSelect);
seat4to3.addEventListener("click",seatSelect);
seat4to4.addEventListener("click",seatSelect);
seat4to5.addEventListener("click",seatSelect);
seat4to6.addEventListener("click",seatSelect);