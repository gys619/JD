//路径16.0:/#M7NeT5LW0xAqeo%，潮流生活新趋势，为你的选手投票，有机会抽奖获得大礼！
const $ = new Env('潮流生活新趋势');

const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';


let cookiesArr = [], cookie = '', message;
let secretp='',inviteId=[]
let num=0;


if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

let inviteCodes = []
$.shareCodesArr = [];
$.inviteId  = [];
$.encryptPin=[]
$.invite=[]
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  
  $.inviteIdCodesArr = {}
  for (let i = 0; i < cookiesArr.length && true; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      await getUA()
    }
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
		cookie = cookiesArr[i];
		$.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
		$.index = i + 1;
		$.isLogin = true;
		$.nickName = '';
    $.Bearer = '';
		message = '';
		console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
		try {



      //get_superboxSupBoxHomePage($.UserName)
      requestAlgo()
      await $.wait(9000)



      // if(i>0){
      //   help(6,invite[i-1])
      // }else{
      //   help(6,54554)
      // }
      
       task=["1","2","3","4","5","7","8","9","10"]
       for (let i = 0; i < task.length; i++) {
         requestAlgo()
         doTask(task[i])
         await $.wait(5000)
       }


       for (var n=0;n<7;n++){
        requestAlgo()
        open()
      }
      

     
      // console.log(`\n******开始抽奖*********\n`);
			// await $.wait(1000)
      // for (var n=0;n<5;n++){
      //     superboxOrdinaryLottery()
      //     await $.wait(5000)
      // }
		}catch(e){
			$.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
		}
    }
  }

  // for (let i = 0; i < cookiesArr.length; i++) {
  //   cookie = cookiesArr[i];
  //   $.index = i + 1;
  //   $.canHelp = true;
  //   $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);

  //   console.log(`账号 ${$.index} ${$.UserName} 开始抽奖`)
  //   // for (var n=0;n<5 && $.canHelp;n++){
  //   //   superboxOrdinaryLottery()
  //   //   await $.wait(5000)
  //   // }
  //   //await $.wait(2000)
  // }


})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })










function get_superboxSupBoxHomePage(openId){

	let body={"openId":"jd_4e55cd03489a9","risk":false};
	return new Promise((resolve) => {$.post(taskPostUrl("https://jd.xyani.com/user/login",body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            console.log(`\n\nbear:${JSON.stringify(data)}\n`)
            if (data.code === 200) {
              if (data.data ) {
                $.Bearer=   "Bearer " +  data.data.token
                
                $.invite.push(data.data.userId)
              } 
            } else {
              console.log(`\n\nencryptPin失败:${JSON.stringify(data)}\n`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
	})
}

function doTask(taskId){

	let body={"taskId":taskId};
	return new Promise((resolve) => {$.post(taskPostUrl("https://jd.xyani.com/task/accomplish",body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            //console.log(`\n\nhome:${JSON.stringify(data)}\n`)
            if (data.code === 200) {
              if (data.data ) {
                console.log(`\n\n任务:${taskId}${data.data.name}已完成\n`)

              } 
            } else {
              console.log(`\n\nencryptPin失败:${JSON.stringify(data)}\n`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
	})
}

function help(taskId,inviter){

	let body={"taskId":taskId,"inviter":inviter};
	return new Promise((resolve) => {$.post(taskPostUrl("https://jd.xyani.com/task/invite",body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            //console.log(`\n\nhome:${JSON.stringify(data)}\n`)
            if (data.code === 200) {
              if (data.data ) {


              } 
            } else {
              console.log(`\n\nencryptPin失败:${JSON.stringify(data)}\n`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
	})
}


async function doTask(taskId) {

  const options = {
    "url": `https://jd.xyani.com/task/accomplish`,
    'headers': {
      'Host': 'jd.xyani.com',
      'Origin': 'https://prodev.m.jd.com',
      'Sec-Fetch-Mode': 'cors',
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'com.jingdong.app.mall',
      'Sec-Fetch-Site': 'cross-site',
      'Accept':'application/json, text/javascript, */*; q=0.01',
      'Authorization': $.Bearer,
      "User-Agent": $.UA,
      "Referer": "https://prodev.m.jd.com/mall/active/2DWXWszt6VvNx4HDctSa4TA7rHh6/index.html",
      'Accept-Language': 'zh-cn',
      'Accept-Encoding': 'gzip, deflate, br',
    },
    'body': JSON.stringify({
      "taskId":taskId
    })
  }
  new Promise(async resolve => {
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`request_algo 签名参数API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            console.log(`\n\nhome:${JSON.stringify(data)}\n`)
            if (data['code'] === 200) {
              $.Bearer=   "Bearer " +  data.data.token
                
                $.invite.push(data.data.userId)
              
            } else {
              // console.log(`fp: ${$.fingerprint}`)
              console.log('request_algo 签名参数API请求失败:')
            }
          } else {
            console.log(`京东服务器返回空数据`)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

async function open() {

  const options = {
    "url": `https://jd.xyani.com/user/draw`,
    'headers': {
      'Host': 'jd.xyani.com',
      'Origin': 'https://prodev.m.jd.com',
      'Sec-Fetch-Mode': 'cors',
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'com.jingdong.app.mall',
      'Sec-Fetch-Site': 'cross-site',
      'Accept':'application/json, text/javascript, */*; q=0.01',
      'Authorization': $.Bearer,
      "User-Agent": $.UA,
      "Referer": "https://prodev.m.jd.com/mall/active/2DWXWszt6VvNx4HDctSa4TA7rHh6/index.html",
      'Accept-Language': 'zh-cn',
      'Accept-Encoding': 'gzip, deflate, br',
    },
    'body': JSON.stringify({
      
    })
  }
  new Promise(async resolve => {
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`request_algo 签名参数API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            console.log(`\n\nhome:${JSON.stringify(data)}\n`)
            if (data['code'] === 200) {
              if(data.data && data.data.award){
                if(data.data.award.skuId===1){
                  console.log(`\n\n获得京豆:${data.data.award.amount}个\n`)

                }


              }
              console.log(`\n\nhome:${JSON.stringify(data)}\n`)
              
            } else {
              // console.log(`fp: ${$.fingerprint}`)
              console.log('request_algo 签名参数API请求失败:')
            }
          } else {
            console.log(`京东服务器返回空数据`)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

async function requestAlgo() {

  const options = {
    "url": `https://jd.xyani.com/user/login`,
    'headers': {
      'Host': 'jd.xyani.com',
      'Origin': 'https://prodev.m.jd.com',
      'Sec-Fetch-Mode': 'cors',
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'com.jingdong.app.mall',
      'Sec-Fetch-Site': 'cross-site',
      'Accept':'application/json, text/javascript, */*; q=0.01',
      'Authorization': $.Bearer,
      "User-Agent": $.UA,
      "Referer": "https://prodev.m.jd.com/mall/active/2DWXWszt6VvNx4HDctSa4TA7rHh6/index.html",
      'Accept-Language': 'zh-cn',
      'Accept-Encoding': 'gzip, deflate, br',
    },
    'body': JSON.stringify({
      "openId":$.UserName,
      "risk":false
    })
  }
  new Promise(async resolve => {
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`request_algo 签名参数API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            console.log(`\n\nhome:${JSON.stringify(data)}\n`)
            if (data['code'] === 200) {
              $.Bearer=   "Bearer " +  data.data.token
                
                $.invite.push(data.data.userId)
              
            } else {
              // console.log(`fp: ${$.fingerprint}`)
              console.log('request_algo 签名参数API请求失败:')
            }
          } else {
            console.log(`京东服务器返回空数据`)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

function taskPostUrl(url1,body) {
  return {
    url: url1+'',
    //body: `body=${escape(JSON.stringify(body))}`,
    body: escape(JSON.stringify(body)),
    headers: {
      'Host': 'jd.xyani.com',
      'Origin': 'https://prodev.m.jd.com',
      'Sec-Fetch-Mode': 'cors',
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'com.jingdong.app.mall',
      'Sec-Fetch-Site': 'cross-site',
      'Accept':'application/json, text/javascript, */*; q=0.01',
      'Authorization': $.Bearer,
      "User-Agent": $.UA,
      "Referer": "https://prodev.m.jd.com/mall/active/2DWXWszt6VvNx4HDctSa4TA7rHh6/index.html?a=1&openType=1&inviter=54554&tttparams=LvY6i009eyJnTGF0IjoiMzIuMDE0MjM5IiwiZ0xuZyI6IjEyMC4yNjMyMzMifQ8",
      'Accept-Language': 'zh-cn',
      'Accept-Encoding': 'gzip, deflate, br',
    }
  }
}





//格式化助力码
function shareCodesFormat() {
  return new Promise(async resolve => {
    // console.log(`第${$.index}个京东账号的助力码:::${$.shareCodesArr[$.index - 1]}`)
    $.newShareCodes = [];
    if ($.shareCodesArr[$.index - 1]) {
      $.newShareCodes = $.shareCodesArr[$.index - 1].split('@');
    }
    if($.index == 1) $.newShareCodes = [...inviteCodes,...$.newShareCodes]
    console.log(`第${$.index}个京东账号将要助力的好友${JSON.stringify($.newShareCodes)}`)
    resolve();
  })
}
function requireConfig() {
  return new Promise(resolve => {
    console.log(`开始获取${$.name}配置文件\n`);
    //Node.js用户请在jdCookie.js处填写京东ck;
    let shareCodes = [];
    if ($.isNode()) {
      if (process.env.JD_CITY_EXCHANGE) {
        exchangeFlag = process.env.JD_CITY_EXCHANGE || exchangeFlag;
      }
      if (process.env.CITY_SHARECODES) {
        if (process.env.CITY_SHARECODES.indexOf('\n') > -1) {
          shareCodes = process.env.CITY_SHARECODES.split('\n');
        } else {
          shareCodes = process.env.CITY_SHARECODES.split('&');
        }
      }
    }
    console.log(`共${cookiesArr.length}个京东账号\n`);
    $.shareCodesArr = [];
    if ($.isNode()) {
      Object.keys(shareCodes).forEach((item) => {
        if (shareCodes[item]) {
          $.shareCodesArr.push(shareCodes[item])
        }
      })
    }
    console.log(`您提供了${$.shareCodesArr.length}个账号的${$.name}助力码\n`);
    resolve()
  })
}
function getUA(){
	$.UA = `jdapp;android;10.0.6;11;9363537336739353-2636733333439346;network/wifi;model/KB2000;addressid/138121554;aid/9657c795bc73349d;oaid/;osVer/30;appBuild/88852;partner/oppo;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; KB2000 Build/RP1A.201005.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045537 Mobile Safari/537.36`
}
function randomString(e) {
	e = e || 32;
	let t = "abcdef0123456789", a = t.length, n = "";
	for (i = 0; i < e; i++)
		n += t.charAt(Math.floor(Math.random() * a));
	return n
}
function randomNum(e) {
	e = e || 32;
	let t = "0123456789", a = t.length, n = "";
	for (i = 0; i < e; i++)
		n += t.charAt(Math.floor(Math.random() * a));
	return n
}
function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}
function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}