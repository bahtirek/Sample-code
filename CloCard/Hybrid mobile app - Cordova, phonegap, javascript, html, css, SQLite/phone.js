var persData={};
var json;
var forms;
var $recoveryData = false;
var cloCard = {};
var weblink = {"twit": "twit"};
var newCard;
var viewOn = [];
var div;
var cardIdOnView;
var input;
var app={};
var user={};
var cardFromDb = {};
window.exCard = {address:{}, business:{}};
 var db;
function value(id, val){
	if(val){
		document.getElementById(id).value = val;
	}else{
		return document.getElementById(id).value;
	}
	
}

function byId(id){
	if(id){
		return document.getElementById(id);
	}else{
		return false;
	}
	
}



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

function element(el){
	if(el){
		return document.createElement(el);
	}else{
		return false;
	}
}

function textNode(t){
	if(t){
		return document.createTextNode(t);
	}else{
		return false;
	}
}


		
function submitBackupEmail(){
	var email = input.backupEmail.value;
	var emailUpd = true;
	if(app.email != email){
		if(email.length != 0){
			var emailUpd = confirm("Update email?");
			if(emailUpd == true){//       proverka zameny email
				if(app.id){
					var data = window.btoa(JSON.stringify([email, app.id]));
				}else{
					var data = window.btoa(JSON.stringify([email, ""]));
				}
			}else{
				if(app.id){
					viewSwitch(["all-cards"]);
				}else{
					var data = window.btoa(JSON.stringify(["" , ""]));
				}
			}
			var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
			req.onreadystatechange = function(){
			if(req.readyState != 4) return;
				json = req.responseText;
				if(json){
					console.log(JSON.parse(json)[0])
					if(JSON.parse(json)[0] == "exist"){
						console.log("dkjfgaksdjf")
						alert("thei email can't be used");
					}else{
						var userJson = JSON.parse(json);
						var appEmail = userJson[0];
						var appId = userJson[1];
						console.log("eto meil"+email)
						console.log("eto id"+appId)
						saveUser(appId, appEmail, false);
					}
				};
			};
			req.open('GET', 'http://localhost/php/get_app_id.php?data='+data, true);
			//req.open('GET', 'http://my-testserver.com/json/get_app_id.php?data='+data, true);
			req.send(null);
		}else{
			viewSwitch(["all-cards"]);
		}	
	}else{
		viewSwitch(["all-cards"]);
	}
}

function getNewAppId(){
	var data = window.btoa(JSON.stringify(["" , ""]));
	var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
			req.onreadystatechange = function(){
			if(req.readyState != 4) return;
				json = req.responseText;
				if(json){
					var userJson = JSON.parse(json);
					var appEmail = userJson[0];
					var appId = userJson[1];
					saveUser(appId, appEmail, false);
				};
			};
			req.open('GET', 'http://localhost/php/get_app_id.php?data='+data, true);
			//req.open('GET', 'http://my-testserver.com/json/get_app_id.php?data='+data, true);
			req.send(null);
}
		
function saveUser(appId, appEmail, recovery){
	if(recovery == true){
		if(app.id){
			db.transaction(function(tx){
				tx.executeSql('DELETE FROM app WHERE id=?', [app.id], function(){console.log("dleted");}, function(err){console.log("eto-p"+err)});
			}, errorCB, successCB);
		}
		db.transaction(populateUserTbl, errorCB, successCB);
		function populateUserTbl(tx){
			var sql = 'INSERT INTO app (id, email) VALUES (?,?)';
			tx.executeSql(sql, [appId, appEmail], function(){
														console.log("success on saveUser");
													}, 
													function(){
														console.log("error on saveUser"+err);
													}
			);
		}
	}
	if(app.id){
		if(appEmail){// if (email)update email
			db.transaction(function(tx){
				tx.executeSql('UPDATE app SET email=? WHERE id=?', [appEmail, app.id]);
			}, errorCB, successCB);
		}
	}else{
		db.transaction(populateUserTbl, errorCB, successCB);
		function populateUserTbl(tx){
			var sql = 'INSERT INTO app (id, email) VALUES (?,?)';
			tx.executeSql(sql, [appId, appEmail], function(){
													console.log("success on saveUser");
												}, 
												function(){
													console.log("error on saveUser"+err);
												}
			);
		}// insert email id
	}
	/*  */
	//goToMain();
}

function getEmail(){
	db.transaction(function(tx){tx.executeSql('SELECT * FROM app', [], getUserTbl, errorCB);}, errorCB, successCB);
	function getUserTbl(tx, result){
		byId('recovery-email').value = result.rows[0]["email"];
		console.log(result.rows);
	}
}		

		

function goToMain(){
	//location.assign('index.html');
}
		
function search(){
	var phone = value("search");
	console.log(phone);
	var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
				req.onreadystatechange = function(){
					
					if(req.readyState != 4) return;
						var json = req.responseText;
						console.log(json)
						if(json){
							cloCard = JSON.parse(json);
							console.log(cloCard);
							createCardView("card-search", cloCard);
						};
					};
				var data = window.btoa(phone);
				var data = phone;
				console.log(data)
				//req.open('GET', 'http://my-testserver.com/json/get_card.php?phone='+data, true);
				req.open('POST', 'http://localhost/php/get_card.php', true);
				//req.open('POST', 'http://my-testserver.com/json/get_card.php', true);
				req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				req.send('phone='+data);
}	

function apChild(els){
		var i = els.length-1;
		var child;
		var parent;
		while(i > 0){
			child = els[i];
			i--;
			parent = els[i];
			parent.appendChild(child);
		}
}

function addImage2(td, src, to, href){
		var img = element("img");
		var a = element("a");
		img.src = src;
		a.setAttribute("href", to + ":" + href);
		a.style.float = "right";
		a.style.marginBottom = "0";
		apChild([td, a, img]);
}

function addImage(td, src, to, href){
		var img = element("img");
		img.src = src;
		img.onclick = function(){document.location.href = to + ':' + href;}
		img.style.float = "right";
		apChild([td,  img]);
}


function createCardView(id, card){
	var parent = byId(id);
	if(parent.childNodes[0]) parent.removeChild(parent.childNodes[0]);
	window.table = element("table");
	console.log(card.business);
	if(card){
		if(card.logo){
			displayLogo(card.logo, table)
		}
		
		if(card.business){
			displayBusiness(card.business, table)
		}
		if(card.phone){
			
			for(var i = 1; i <=4; i++){
				if(card.phone["phone"+i]){
					// phone type
					var text = textNode(card.phone["ptype"+i] + " :");
					var td = element("td");
					td.style.paddingTop = "8px";
					td.style.fontSize = "90%"
					apChild([td, text]);
					if(card.phone["ptype"+i] == "cell" || card.phone["ptype"+i] == "mobile"){
						addImage(td, "images/sms.png", "sms", card.phone["phone"+i])
					}
					var tr = element("tr");
					apChild([table, tr, td]);
					
					
					// phone phone
					var text = textNode(card.phone["phone"+i]);
					var td = element("td");
					apChild([td, text]);
					addImage(td, "images/call.png", "tel", card.phone["phone"+i])
					td.style.borderBottom = "1px solid #D8D8D8";
					var tr = element("tr");
					apChild([table, tr, td]);
					
				}
			}
		}
		if(card.address){
			displayAddress(card.address)
		}
		
		if(card.email){
			displayWeb(card.email, "images/mail.png", "mailto");
		}
		if(card.website){
			displayWeb(card.website, "images/web.png", "http");
		}
		if(card.weblink){
			var tr = element("tr");
			var td = element("td");
			td.setAttribute("colspan", "2");
			for(l in card.weblink){
				var img = element("img");
				var a = element("a");
				if(l == "face"){
					img.src = "images/facebook.png";
					a.setAttribute("href", card.weblink[l]);
				}else if(l == "twit"){
					img.src = "images/twitter.png";
					a.setAttribute("href", card.weblink[l]);
				}else if(l == "inst"){
					img.src = "images/instagram.png";
					a.setAttribute("href", card.weblink[l]);
				}
				apChild([td, a, img]);
			}
			apChild([table,tr, td]);
		}
		
		if(card.descr){
			var td = element("td");
			td.setAttribute("colspan", "2");
			var tr = element("tr");
			var ul = element("ul");
			
			for(d in card.descr){
				if(card.descr[d].length > 0){
					text = textNode(card.descr[d]);
					var li = element("li");
					//td.setAttribute("colspan", "2");
					apChild([ul, li, text]);
				}
			}
			apChild([table,tr, td, ul]);
		}
		apChild([parent,table]);
		viewSwitch(["card-search", "save-button"]);
	}
}



function viewSwitch(id){
	for(var i = 0; i < viewOn.length; i++){
		byId(viewOn[i]).style.display = "none";
	}
	for(var i = 0; i < id.length; i++){
		byId(id[i]).style.display = "block";
	}
	viewOn = id;
}

     
function onDeviceReady(){
	var menuButton = document.getElementsByClassName("menu")[0];
	menuButton.onclick = function(){viewSwitch(["menu"]);}
	var menuButtons = byId("menu").getElementsByTagName("button");
	var accountButtons = byId("account-view").getElementsByTagName("button");
	forms = document.getElementsByTagName("form");
	input = document.getElementsByTagName("input");
	menuButtons[0].onclick = function(){viewSwitch(["persdata-view"]);};// add pers data
	menuButtons[1].onclick = function(){viewSwitch(["relation-view"]);};//relation
	menuButtons[2].onclick = function(){viewSwitch(["account-view"]);};
	accountButtons[0].onclick = function(){app.email ? input.backupEmail.value = app.email : input.backupEmail.value = ""; viewSwitch(["backup-view"]);};//backup
	accountButtons[1].onclick = function(){viewSwitch(["recovery-view"]);};// recovery
	var persButtons = document.getElementsByClassName("drop-button");
	persButtons[0].onclick = function(){byId("personal-phone").style.display == "block" ? byId("personal-phone").style.display = "none" : byId("personal-phone").style.display = "block";};
	persButtons[1].onclick = function(){byId("personal-email").style.display == "block" ? byId("personal-email").style.display = "none" : byId("personal-email").style.display = "block";};
	div = document.getElementsByTagName("div")[0].getElementsByTagName("div");
	for (var i = 0; i < div.length; i++){
		div[i].style.display = "none";
	}
	db = window.openDatabase("Clocard53", "1.0", "Clocard24 Db", 65000);
	db.transaction(createTables, errorCB, successCB);
	db.transaction(getAppId, errorCB, successCB);
    db.transaction(getAllCards, errorCB, successCB);
    
	
	//db.transaction(dump, errorCB, successCB);
}

	
function dump(tx){
	tx.executeSql('DROP TABLE IF EXISTS business');
	tx.executeSql('DROP TABLE IF EXISTS address');
	tx.executeSql('DROP TABLE IF EXISTS name');
	tx.executeSql('DROP TABLE IF EXISTS weblink');
	tx.executeSql('DROP TABLE IF EXISTS description');
	tx.executeSql('DROP TABLE IF EXISTS phone');
}

function createTables(tx){
	tx.executeSql('CREATE TABLE IF NOT EXISTS business (id, businessNameOne NOT NULL , businessNameTwo NOT NULL, slogan NOT NULL, logo NOT NULL)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS address (id, addressLineOne NOT NULL, addressLineTwo NOT NULL, city NOT NULL, stzip NOT NULL, email NOT NULL, website NOT NULL)');
	//tx.executeSql('CREATE TABLE IF NOT EXISTS phone (id INTEGER PRIMARY KEY AUTOINCREMENT, number NOT NULL)');
	//tx.executeSql('CREATE TABLE IF NOT EXISTS phone (id INTEGER PRIMARY KEY   AUTOINCREMENT, number NOT NULL, ptype NOT NULL, pos NOT NULL)');
	/* tx.executeSql('CREATE TABLE IF NOT EXISTS weblink (id, link, serv)'); */
	tx.executeSql('CREATE TABLE IF NOT EXISTS description (id, description NOT NULL)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS app (id, email NOT NULL)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS name (id, fname NOT NULL, lname NOT NULL, email1 NOT NULL, email2 NOT NULL)');//name id equal to appid
	tx.executeSql('CREATE TABLE IF NOT EXISTS business_name (business_id, name_id)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS name_phone (name_id, phone_id, ptype NOT NULL, pos NOT NULL)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS business_phone (business_id, phone NOT NULL, ptype NOT NULL, pos NOT NULL)');
}

function getAppId(tx){
	tx.executeSql('SELECT * FROM app', [], function(tx, result){
		if(result.rows.length > 0){
			if(result.rows[0]["id"]) app.id = result.rows[0]["id"];
			if(result.rows[0]["email"]) app.email = result.rows[0]["email"];
		}else{
			viewSwitch(["first-start-view"]);
		}
		console.log(app.id);
		console.log(app.email);
	}, errorCB);
}
	
function getAllCards(tx){
	tx.executeSql('SELECT * FROM business', [], drawAllCards, errorCB);
	function drawAllCards(tx, result){
		var len = result.rows.length;
		for(var i=0; i < len; i++){
			var table = element("table");
			table.className = "all-cards";
			for(b in result.rows[i]){//td, tr
				if(b != "logo" && b != "id" && result.rows[i][b].length > 0){
					//alert(b);
					//alert(result.rows[i][b]);
					console.log(result.rows[i]["id"])
					text = textNode(result.rows[i][b]);
					var td = element("td");
					if(b == "Slogan") td.style.fontStyle = "italic";
					td.style.textAlign = "center";
					td.style.paddingLeft = "0";
					var tr = element("tr");
					apChild([table, tr, td, text]);
					
				}
				
			}
			id = result.rows[i]["id"];
			table.setAttribute("onclick", "getCard("+id+")");
			var parent = byId("all-cards");
			viewSwitch(["all-cards"]);
			apChild([parent,table]);
		}
	}
	tx.executeSql('SELECT * FROM app', [], 
		function(tx, result){
			
			console.log(result.rows);
		}, errorCB);
}		
		
		
function errorCB(err) {
    alert("Error processing SQL : "+err);
    console.log("Error processing SQL: "+err);
}


function successCB(msg) {
    //alert("success3!");
	if(msg){
		console.log(msg);
	}else{
		console.log("success!");
	}
    
}	
		
	
		


function isCardExistInDb(cardToSave, recovery){//if recovery true dont send save confrm
	/* if(cardToSave){
		var id = cardToSave.id;
	}else{
		var id = cloCard.id;
	} */
	var id = cardToSave.id;
	db.transaction(function(tx){
		tx.executeSql('SELECT id FROM business WHERE id=?', [id], getId, errorCB)
	}, errorCB, successCB);
	function getId(tx, result){
		console.log('eto res'+result.rows);
		if(Object.keys(result.rows).length == 0){
			console.log(result.rows);
			if(recovery == true ){
				saveCardToDb(cardToSave);
			}else{
				saveCardToDb(cardToSave);
				confirmOfSave(id);
			}
		}else{
			viewSwitch(["all-cards"]);
		}
	}
	goToMain;
}

function saveCardToDb(card){
	db.transaction(populateDb, errorCB);
	//console.log(card);
	function populateDb(tx){
		if(card){
			var id = card.id;
			if(card.business){
				var sql = 'INSERT INTO business (id, businessNameOne, businessNameTwo, slogan, logo) VALUES (?,?,?,?,?)';
				tx.executeSql(sql, [id, card.business.businessNameOne, card.business.businessNameTwo, card.business.slogan, card.logo], successCB, errorCB);
			}
			if(card.phone){
				var len = Object.keys(card.phone).length/2;
				for(var i = 1; i <= len; i++){
					var phone = card.phone["phone"+i];
					var ptype = card.phone["ptype"+i];
					sql = 'INSERT INTO business_phone (business_id, phone, ptype, pos) VALUES (?,?,?,?)';
					tx.executeSql(sql, [id, phone, ptype, i], successCB, errorCB);
				}
			}
			if(card.address){
				var sql = 'INSERT INTO address (id, addressLineOne, addressLineTwo, city, stzip, email, website) VALUES (?,?,?,?,?,?,?)';
				tx.executeSql(sql, [id, card.address.addressLineOne, card.address.addressLineTwo, card.address.city, card.address.stzip, card.email, card.website], successCB, errorCB);
			}
			
			/* if(card.weblink){
				for(l in card.weblink){
					var sql = 'INSERT INTO weblink (id, link, serv) VALUES (?,?,?)';
					tx.executeSql(sql, [id, card.weblink[l], l], successCB, errorCB);
				}
			} */
			if(card.descr){
				for(d in card.descr){
					var sql = 'INSERT INTO description (id, description) VALUES (?,?)';
					tx.executeSql(sql, [id, card.descr[d]], successCB, errorCB);
				}
			}
			/* if(name){
				var sql = 'INSERT INTO name (id, firstName, lastName, position) VALUES (?,?,?,?)';
				tx.executeSql(sql, [id, name.firstName, name.lastName, position], goToMain, errorCB);
			}  */
		}
		
	}
}		

function confirmOfSave(id){
	var data = window.btoa(JSON.stringify([id, app.id]));
	console.log("eto save conf"+data);
	var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
				req.onreadystatechange = function(){
					if(req.readyState != 4) return;
						var json = req.responseText;
						if(json){
							goToMain();
						};
					};
				//req.open('GET', 'http://my-testserver.com/json/card_saved.php?data='+data, true);
				req.open('GET', 'http://localhost/php/card_saved.php?data='+data, true);
				req.send(null);
};
	


function getCard(cardId){
	cardId = cardId.toString();
	console.log("eto getcard"+cardId);
	cardIdOnView = cardId;
	db.transaction(cardDb, errorCB, function(){viewSwitch(["card-view", "back-button"])});
	function cardDb(tx){
		var parent = byId("card-view");
		if(parent.childNodes[0]) parent.removeChild(parent.childNodes[0]);
		window.table = element("table");
		// business
		tx.executeSql('SELECT businessNameOne, businessNameTwo, slogan, logo FROM business WHERE id=?', [cardId], getBusiness, errorCB);
		function getBusiness(tx, result){
			console.log(result.rows);
			if(result.rows[0].logo){
				displayLogo(result.rows[0].logo);
			}
			displayBusiness(result.rows[0]);
			
		}
		//phone
		var sql = 'SELECT ptype, pos, phone FROM business_phone WHERE business_id=? ';
		tx.executeSql(sql, [cardId], getPhone, function(err){console.log("oshibka pri vyvode tele"); errorCB;});
		function getPhone(tx, result){
			console.log(result.rows);
			var len = Object.keys(result.rows).length;
			for(var i = 0; i < len; i++){
				var ptype = result.rows[i]["ptype"];
				var number = result.rows[i]["phone"];
				displayPhone(number, ptype);
			}
		}
		// address
		tx.executeSql('SELECT addressLineOne, addressLineTwo, city, stzip, email, website FROM address WHERE id=?', [cardId], getAddress, errorCB);
		function getAddress(tx, result){
			if(result.rows.length > 0){
				displayAddress(result.rows[0]);
				if(result.rows[0]["email"].length > 0){
					displayWeb(result.rows[0]["email"], "images/mail.png", "mailto");
				}
				if(result.rows[0]["website"].length > 0){
					displayWeb(result.rows[0]["website"], "images/web.png", "http");
				}
			}
		}
		
		tx.executeSql('SELECT description FROM description WHERE id=?', [cardId], getDescr, errorCB);
		function getDescr(tx, result){
			console.log(result);
			var len = Object.keys(result.rows).length;
			var td = element("td");
			td.setAttribute("colspan", "2");
			var tr = element("tr");
			var ul = element("ul");
			for(var i = 0; i< len; i++){
				displayDescr(result.rows[i], ul);
			}
			apChild([table,tr, td, ul]);
		}
		apChild([parent, table]);
	}
}
	
function deleteCard(){
	if (cardIdOnView){
		var rem = confirm("Delete card from db?");
		if(rem == true){
			console.log(cardIdOnView);
			db.transaction(function(tx){
				tx.executeSql('DELETE FROM business WHERE id=?', [cardIdOnView], function(){console.log("dleted");}, function(err){console.log("eto-b"+err)});
			}, errorCB, successCB);
			db.transaction(function(tx){
				tx.executeSql('DELETE FROM address WHERE id=?', [cardIdOnView], function(){console.log("dleted");}, function(err){console.log("eto-a"+err)});
			}, errorCB, successCB);
			/* db.transaction(function(tx){
				tx.executeSql('DELETE FROM weblink WHERE id=?', [cardIdOnView], function(){console.log("dleted");}, function(err){console.log("eto-w"+err)});
			}, successCB); */
			db.transaction(function(tx){
				tx.executeSql('DELETE FROM description WHERE id=?', [cardIdOnView], function(){console.log("dleted");}, function(err){console.log("eto-d"+err)});
			}, errorCB, successCB);
			db.transaction(function(tx){
				tx.executeSql('DELETE FROM business_phone WHERE id=?', [cardIdOnView], function(){console.log("dleted");}, function(err){console.log("eto-p"+err)});
			}, errorCB, successCB);
			confirmOfDeletion();
		}else{
			viewSwitch(["all-cards"]);
		}
	}else{
		viewSwitch(["all-cards"]);
	}
}
		
function confirmOfDeletion(){
	var data = window.btoa(JSON.stringify([cardIdOnView, app.id]));
				console.log(data);
				var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
				req.onreadystatechange = function(){
				if(req.readyState != 4) return;
					var json = req.responseText;
					if(json){
						goToMain();
					};
				};
				//req.open('GET', 'http://my-testserver.com/json/card_deleted.php?data='+data, true);
				req.open('GET', 'http://localhost/php/card_deleted.php?data='+data, true);
				req.send(null);
};		
		
		
		
		
		
//                                 table

function displayBusiness(business){
	for(b in business){
		if(business[b].length > 0 && b != "logo"){
			text = textNode(business[b]);
			var td = element("td");
			if(b == "slogan") td.style.fontStyle = "italic";
			td.style.textAlign = "center";
			td.style.paddingLeft = "0";
			var tr = element("tr");
			tr.style.marginBottom = "10px";
			apChild([table,tr, td, text]);
		}
	}
}	

function displayLogo(logo){
	var tr = element("tr");
	var td = element("td");
	var img = element("img");
	//img.src="http://my-testserver.com/"+logo;
	img.src="http://localhost/ehost/"+logo;
	img.className = "card-logo";
	td.className = "td-center";
	apChild([table,tr, td, img]);
}	

function displayAddress(address){
	var i = 1;
	for(a in address){
		if(address[a].length > 0 && a != "email" && a != "website"){
			text = textNode(address[a]);
			var td = element("td");
			if(i == 4){
				td.style.paddingBottom = "10px";
				td.style.borderBottom = "1px solid #D8D8D8";
				}else if(i == 1){
					td.style.paddingTop = "10px";
					
					addImage(td, "images/map.png", "", address[a]);
				}
			var tr = element("tr");
			apChild([table,tr, td, text]);
		}
		i++;
	}
}

function displayWeb(link, img, appToUse){
	text = textNode(link);
	var td = element("td");
	td.style.paddingBottom = "5px";
	td.style.paddingTop = "5px";
	td.style.borderBottom = "1px solid #D8D8D8";
	addImage(td, img, app, link);
	var tr = element("tr");
	apChild([table,tr, td, text]);
}

function displayPhone(number, ptype){
		console.log(number);
		// phone type
		var text = textNode(ptype + " :");
		var td = element("td");
		td.style.paddingTop = "8px";
		td.style.fontSize = "90%"
		apChild([td, text]);
		if(ptype == "cell" || ptype == "mobile"){
			addImage(td, "images/sms.png", "sms", number)
		}
		var tr = element("tr");
		apChild([table, tr, td]);
			
		// phone phone
		var text = textNode(number);
		var td = element("td");
		apChild([td, text]);
		addImage(td, "images/call.png", "tel", number)
		td.style.borderBottom = "1px solid #D8D8D8";
		var tr = element("tr");
		apChild([table, tr, td]);
}

function displayDescr(descr, ul){
	for(d in descr){
		if(descr[d].length > 0){
			console.log(descr[d])
			text = textNode(descr[d]);
			var li = element("li");
			//td.setAttribute("colspan", "2");
			apChild([ul, li, text]);
		}
	}
	
}
//                                 table		
		

function getRecoveryCode(){
	var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
	req.onreadystatechange = function(){
	if(req.readyState != 4) return;
		var json = req.responseText;
		if(json){
			console.log(JSON.parse(json));
		};
	};
	var data = window.btoa(input.recoveryEmail.value);
	console.log(data)
	//req.open('GET', 'http://my-testserver.com/json/recovery_code.php?email='+data, true);
	req.open('GET', 'http://localhost/php/recovery_code.php?email='+data, true);
	req.send(null);
}

function recovery(){
				var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
				req.onreadystatechange = function(){
					if(req.readyState != 4) return;
						var json = req.responseText;
						console.log("recovery func")
						if(json){
							recoveryData = (JSON.parse(json));
							//console.log($recoveryData);
							if(recoveryData == false){
								console.log("Code is not exist");
							}else{
								//console.log(recoveryData);
								for(var i=0; i < recoveryData.length; i++){
									console.log(recoveryData[i]);
									isCardExistInDb(recoveryData[i], true);
								};
								saveUser(recoveryData[0]['appId'], recoveryData[0]['appEmail'], true)
							}
						};
					};
				var data = window.btoa(input.recoveryCode.value);
				console.log(data)
				//req.open('GET', 'http://my-testserver.com/json/recovery_code.php?email='+data, true);
				req.open('GET', 'http://localhost/php/recovery.php?code='+data, true);
				req.send(null);
}



function trim(data){
	if(data.charCodeAt(0) == 32){
		data = data.substr(1);
		return trim(data);
	}
	if(data.charCodeAt(data.length-1) == 32){
		data = data.substr(0, data.length-1);
		return trim(data);
	}
	return data;
}


function submitPersData(){
	for(var i = 1; i <= 14; i++){
		user[input[i].name] = trim(input[i].value);
	}
	var data = window.btoa(JSON.stringify(user));
	var req = getXMLHttpRequest(); /// создаем XMLHttpRequset обект 
			req.onreadystatechange = function(){
			if(req.readyState != 4) return;
				json = req.responseText;
				if(json){
					
				};
			};
			console.log(data);
			req.open('GET', 'http://localhost/php/save_user_data.php?data='+data, true);
			//req.open('GET', 'http://my-testserver.com/json/get_app_id.php?data='+data, true);
			req.send(null);

	console.log(user)
}













