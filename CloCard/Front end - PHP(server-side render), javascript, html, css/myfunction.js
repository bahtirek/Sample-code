var address = {zipcode: "", state: "", city: "", addressLineOne: "", addressLineTwo: ""};
var newCard = {};
var business = {businessNameOne: "", businessNameTwo: "", slogan: ""};
var phone = {};
var addDescrCnt = 6;
var addDescrLimit = 15;
var logo;
var descr = {};
var webLink = {};
var phoneNumber = "";
var website;
var email;
var warnings = {};




function getXMLHttpRequest() {
	if(window.XMLHttpRequest) {
		try {
			return new XMLHttpRequest();
		} catch (e) {} 
	} else if (window.ActiveXObject){
		try {
			return new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e) {}
		try {
			return new ActiveXObject('Microsoft XMLHTTP');
		}
		catch (e) {}
	}
	return null;
}

function getPrimaryPhone(){
	var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
				req.onreadystatechange = function(){
					if(req.readyState != 4) return;
					myJson = req.responseText;
					priPhone = JSON.parse(myJson);
					phone.phone1 = priPhone.phonenumber;
					phone.ptype1 = "Phone";
					document.getElementById("phone1input").value = phone.phone1;
					document.getElementById("phone1").innerHTML = phone.phone1;
					document.getElementById("phone1Image").src="../images/call.png"
					document.getElementById("ptype1").innerHTML="Phone: "
				};
				req.open('GET', 'get_primary_phone.php', true);
				req.send(null);
		}; 
		
		
function clearStateString(data, inputName){
			if(data.length != 0){
				var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
				req.onreadystatechange = function(){
					if(req.readyState != 4) return;
					newString = req.responseText;
					if(newString){
						address[inputName] = newString;
						document.getElementById("statezip").innerHTML = address.state +" "+ address.zipcode;
					};
				};
				data = window.btoa(data);
				req.open('GET', 'clear_string.php?num='+data, true);
				req.send(null);
			}else{
				address[inputName] = "";
				document.getElementById("statezip").innerHTML = address.state +" "+ address.zipcode;
			}
		}


function clearBusinessString(data, inputName){
			if(data.length != 0){
				var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
				req.onreadystatechange = function(){
					if(req.readyState != 4) return;
					newString = req.responseText;
					if(newString){
						document.getElementById(inputName).innerHTML = newString;
						business[inputName] = newString;
					};
				};
				data = window.btoa(data);
				req.open('GET', 'clear_string.php?num='+data, true);
				req.send(null);
			}else{
				document.getElementById(inputName).innerHTML = "";
				business[inputName] = "";
			}
		}
		
		
function clearAddressString(data, inputName){
			if(data.length != 0){
				var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
				req.onreadystatechange = function(){
					if(req.readyState != 4) return;
					newString = req.responseText;
					if(newString){
						document.getElementById(inputName).innerHTML = newString
						if(inputName == "email"){
							email = newString;
							document.getElementById(inputName+"Image").src="../images/mail.png";
						}else if(inputName == "website"){
							website = newString;
							document.getElementById(inputName+"Image").src="../images/web.png";
						}else{
							address[inputName] = newString;
							if(document.getElementById(inputName+"Image")){
								document.getElementById(inputName+"Image").src="../images/map.png"; 
							}
						}
					};
				};
				data = window.btoa(data);
				req.open('GET', 'clear_string.php?num='+data, true);
				req.send(null);
				
			}else{
				document.getElementById(inputName).innerHTML = ""
						if(inputName == "email"){
							email = "";
							document.getElementById(inputName+"Image").src="";
						}else if(inputName == "website"){
							website = "";
							document.getElementById(inputName+"Image").src="";
						}else{
							address[inputName] = "";
							if(document.getElementById(inputName+"Image")){
								document.getElementById(inputName+"Image").src=""; 
							}
							
						}
			}
		}

	function selectPtype(val, ptype){
		if(val.length == 13){
			console.log("kjhgjkh="+val.length);
			document.getElementsByName(ptype)[0].focus();
		}
	}	

	function selectSubmit(val){
		if(val.length == 13){
			console.log("kjhgjkh="+val.length);
			document.getElementById("submit").disabled = false;
		}
	}	

	
	function phoneValidation(phoneNumber, inputName, ptype){
		inp = document.getElementById(inputName+"input");
		inpShow = document.getElementById(inputName);
		inpImage = document.getElementById(inputName+"Image");
		inpPtype = document.getElementById(ptype);
		inpWarn = document.getElementById("warning");
			
		if(phoneNumber.length != 0){
			if(phoneNumber.length == 13){
				phone[inputName] = phoneNumber;
				phone[ptype] = "Phone";
				inpShow.innerHTML = phoneNumber;
				inpImage.src="../images/call.png";
				inp.style.backgroundColor = "";
				inpPtype.innerHTML="Phone: ";
				delete warnings[inputName];
			}else{
				phone[inputName] = "";
				phone[ptype] = "";
				inpShow.innerHTML = "";
				inpImage.src="";
				inp.style.backgroundColor = "#feebee";
				inpPtype.innerHTML="";
				inpWarn.innerHTML = "**  Phone number must be 10 digits!!";
				warnings[inputName] = 1;
				return false;  
			}
		}else{
			phone[inputName] = "";
			phone[ptype] = "";
			inpShow.innerHTML = "";
			inpImage.src="";
			inp.style.backgroundColor = "";
			inpPtype.innerHTML="";
			delete warnings[inputName];
		}
		if(Object.keys(warnings).length == 0){
			inpWarn.innerHTML = "";
		}
	}
		
	
function isNumber2(event, wx, name){
	thisx = document.getElementById(name+"input");
	//console.log(thisx.value.length);
	var charCode = (event.which) ? event.which : event.keyCode;
	if(charCode>31 && (charCode<48||charCode>57)){
		return false;
	}else{
		switch(wx.length){
			case 0: thisx.value = "(";break;
			case 4: thisx.value = thisx.value+")"; break;
			case 8: thisx.value = thisx.value+"-"; break;
			case 12: document.getElementById(name+"input").style.backgroundColor = "";  break;
		}
		return true;
	}
}

	
function getImageData(){      //getting logo's link and originName
			var imageData = document.getElementById("myLogo").src;
			var originName = document.getElementById("myLogoOrigin").src;
		}
		
		
function addDescription(){
			if(addDescrCnt == addDescrLimit){
				alert("You have reached the limit of description entry");
			}else{
				newId="descDiv"+addDescrCnt;
				document.getElementById(newId).style.display = "block";
				addDescrCnt++;
			}
		}


function clearDescriptionString(data, inputName){
			if(data.length != 0){
				var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
				req.onreadystatechange = function(){
					if(req.readyState != 4) return;
					newString = req.responseText;
					console.log(newString);
					if(newString){
						document.getElementById(inputName).innerHTML = newString;
						descr[inputName] = newString;
					};
				};
				data = window.btoa(data);
				req.open('GET', 'clear_string.php?num='+data, true);
				req.send(null);
			}else{
				document.getElementById(inputName).innerHTML = "";
				descr[inputName] = "";
			}
		}
			
		
function ptypeSelector(value, name, pos){
			phonePos = name[5];
			if(phone[pos]){
				if(value=="Other"){
					newId=name+"Other";
					document.getElementById(newId).style.visibility = "visible";
				}else{
					document.getElementById(name+"Other").style.visibility = "hidden";
					document.getElementById(name).value = "";
					document.getElementById(name).innerHTML = value+": ";
					phone[name] = value;
				}
			}
		}
		

function clearPtypeString(data, inputName){
			if(data.length != 0){
				var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
				req.onreadystatechange = function(){
					if(req.readyState != 4) return;
					newString = req.responseText;
					if(newString){
						document.getElementById(inputName).innerHTML = newString;
						phone[inputName] = newString;
					};
				};
				data = window.btoa(data);
				req.open('GET', 'clear_string.php?num='+data, true);
				req.send(null);
			}else{
				document.getElementById(inputName).innerHTML = "";
				phone[inputName] = "";
			}
		}

		
function webLinkString(link, inputName){
			if(link){
				document.getElementById(inputName+"Image").style.display = "initial";
				webLink[inputName] = link;
			}else{
				document.getElementById(inputName+"Image").style.display = "none";
				webLink[inputName] = "";
			}
		}

function submitMyForm(url){
			var jsondata;
			var newCard = {
				'business': business, 
				'phone': phone, 
				'address': address, 
				'weblink': webLink,
				'logo': logo,
				'description': descr,
				'email': email,
				'website': website};
	
	var data = window.btoa(JSON.stringify(newCard));
	var newUrl = url+"?data="+data;
	window.open(newUrl);	
	console.log(newUrl);
	for(var i in business){
		console.log(i + "--" + business[i]);
	}
	for(var i in phone){
		console.log(i + "--" + phone[i]);
	}
	for(var i in address){
		console.log(i + "--" + address[i]);
	}
	for(var i in descr){
		console.log(i + "--" + descr[i]);
	}
	for(var i in webLink){
		console.log(i + "--" + webLink[i]);
	}
	
}



/* function isNumber(event){
	thisx = document.getElementById("phone");
	var charCode = (event.which) ? event.which : event.keyCode;
	if(charCode>31 && (charCode<48||charCode>57)){
		return false;
	}else if(thisx.value.length == 0 && charCode==49){
		return false;
	}else{
		switch(thisx.value.length){
			case 0: thisx.value = "(";break;
			case 4: thisx.value = thisx.value+")"; break;
			case 8: thisx.value = thisx.value+"-"; break;
		}
		return true;
	}
}

 */function isNumber(event){
	thisx = document.getElementById("phone");
	var charCode = (event.which) ? event.which : event.keyCode;
	if(charCode>31 && (charCode<48||charCode>57)){
		return false;
	}else if(thisx.value.length == 0 && charCode==49){
		return false;
	}else{
		switch(thisx.value.length){
			case 3: thisx.value = "("+thisx.value+") "; break;
			case 9: thisx.value = thisx.value+"-"; break;
		}
		return true;
	}
}






function focusTab(inputObj){
	if(inputObj.value.length == inputObj.maxLength){
		document.getElementById("submit").disabled=false;
	}else{
		document.getElementById("submit").disabled=true;
	}
}









/* 		
function clearEmailString(data){
			if(data.length != 0){
				var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
				req.onreadystatechange = function(){
					if(req.readyState != 4) return;
					newString = req.responseText;
					if(newString){
						document.getElementById("email").innerHTML = newString
						email = newString;
						document.getElementById("emailImage").src="../images/mail.png"; break;
					};
				};
				data = window.btoa(data);
				req.open('GET', 'clear_string.php?num='+data, true);
				req.send(null);
			}else{
				document.getElementById(email).innerHTML = "";
				email = "";
			}
		}
		
function clearString(data){
			if(data.length != 0){
				var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
				req.onreadystatechange = function(){
					if(req.readyState != 4) return;
					newString = req.responseText;
					if(newString){
						document.getElementById("email").innerHTML = newString
						email = newString;
						document.getElementById("emailImage").src="../images/mail.png"; break;
					};
				};
				data = window.btoa(data);
				req.open('GET', 'clear_string.php?num='+data, true);
				req.send(null);
			}else{
				document.getElementById(email).innerHTML = "";
				email = "";
			}
		}
 */
 
/*  
	function phoneValidation2(number, inputName, ptype){
			if(number.length != 0){
				if(number.length == 13){
					phoneNumber = "("+number.substr(0,3)+")"+number.substr(3,3)+"-"+number.substr(6);
					document.getElementById(inputName).innerHTML = phoneNumber;
					phone[inputName] = phoneNumber;
					phone[ptype] = "Phone";
					document.getElementById(inputName+"input").style.backgroundColor = "white";
					document.getElementById(inputName+"Image").src="../images/call.png"
					document.getElementById(ptype).innerHTML="Phone: "
					delete warnings[inputName];
					
				}else{
					document.getElementById(inputName+"input").style.backgroundColor = "#feebee";
					document.getElementById("warning").innerHTML = "**  Phone number must be 10 digits!!";
					document.getElementById(inputName).innerHTML = "";
					document.getElementById(inputName+"Image").src=""
					document.getElementById(ptype).innerHTML=""
					phone[inputName] = "";
					phone[ptype] = "";
					warnings[inputName] = 1;
					return false;  
				}  
			}else{
				document.getElementById(inputName).innerHTML = "";
				document.getElementById(inputName+"Image").src=""
				document.getElementById(ptype).innerHTML=""
				document.getElementById(inputName+"input").style.backgroundColor = "white";
				document.getElementById("warning").innerHTML = "";
				phone[inputName] = "";
				phone[ptype] = "";
				delete warnings[inputName];
			}
			
		} */

/* function submitMyForm(){
			var jsondata;
			var newCard = {
				'business': business, 
				'phone': phone, 
				'address': address, 
				'weblink': webLink,
				'logo': logo,
				'description': description,
				'email': email,
				'website': website};
				
			

	
	var data = window.btoa(JSON.stringify(newCard));
	var newUrl = "save_new_card.php?data="+data;
	window.open(newUrl);	
	console.log(newUrl);
	for(var i in business){
		console.log(i + "--" + business[i]);
	}
	for(var i in phone){
		console.log(i + "--" + phone[i]);
	}
	for(var i in address){
		console.log(i + "--" + address[i]);
	}
	for(var i in description){
		console.log(i + "--" + description[i]);
	}
	for(var i in webLink){
		console.log(i + "--" + webLink[i]);
	}
	for(var i in logo){
		console.log(i + "--" + logo[i]);
	}
} */

/* function isNumber(event){
	var charCode = (event.which) ? event.which : event.keyCode;
	if(charCode>31 && (charCode<48||charCode>57)){
		return false;
	}else{
		return true;
	}
} */






/* 

var area;
var f3D;
var s4D;


function focusTab(inputObj){
	switch (inputObj.name){
		case "area" : if(inputObj.value.length == inputObj.maxLength) document.getElementById("f3D").focus(); area = inputObj.value.length; break;
		case "f3D" : if(inputObj.value.length == inputObj.maxLength) document.getElementById("s4D").focus(); f3D = inputObj.value.length; break;
		case "s4D" : if(inputObj.value.length == inputObj.maxLength) document.getElementById("s4D").blur(); s4D = inputObj.value.length; break;
	}
	if(area == 3 && f3D == 3 && s4D == 4){
		console.log("true");
		document.getElementById("submit").disabled=false;
	}
} */
		
		
/* 		
		

	function phoneValidation(number, inputName, ptype){
			if(number.length != 0){
				if(number.length == 10){  
					var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
					req.onreadystatechange = function(){
						if(req.readyState != 4) return;
						phoneNumber = req.responseText;
						console.log(phoneNumber);
						document.getElementById(inputName).innerHTML = phoneNumber;
						phone[inputName] = phoneNumber;
						phone[ptype] = "Phone";
						console.log(phone[ptype]);
						console.log(phone[inputName]);
						document.getElementById(inputName+"input").style.backgroundColor = "white";
						document.getElementById(inputName+"Image").src="../images/call.png"
						document.getElementById(ptype).innerHTML="Phone: "
					};
					number = window.btoa(number);
					req.open('GET', 'phone_check.php?num='+number, true);
					req.send(null);       
				}else{
					document.getElementById(inputName+"input").style.backgroundColor = "#feebee";
					document.getElementById("warning").innerHTML = "**  Phone number must be 10 digits!!";
					document.getElementById(inputName).innerHTML = "";
					document.getElementById(inputName+"Image").src=""
					document.getElementById(ptype).innerHTML=""
					
					phone[inputName] = "";
					phone[ptype] = "";
					return false;  
				}  
			}else{
				document.getElementById(inputName).innerHTML = "";
				document.getElementById(inputName+"Image").src=""
				document.getElementById(ptype).innerHTML=""
				document.getElementById(inputName+"input").style.backgroundColor = "white";
				document.getElementById("warning").innerHTML = "";
				phone[inputName] = "";
				phone[ptype] = "";
			}
			
		}
 */		
		

