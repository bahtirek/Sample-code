<?
//////   adding phone data to phone table

function addToPhone($areacode, $phonenumber){
	global $link;
	if($phonenumber and $areacode){
		$sql = "INSERT INTO phone (number, area_code)
							VALUES (?, ?)";
	
		if(!$stmt = mysqli_prepare($link, $sql)){
			return false;
			exit;
		}
		mysqli_stmt_bind_param($stmt, 'ii', $phonenumber, $areacode);
		mysqli_stmt_execute($stmt);
		if(mysqli_stmt_error($stmt)){
			//printf("Error:on add name %s.\n", mysqli_stmt_error($stmt));
		}
		mysqli_stmt_close($stmt); 
		return mysqli_insert_id($link);
	}
}
//////   END OF  --  adding phone data to phone table


/////////       adding Business info to card table

function addToBusiness($array){
	global $link;
	extract ($array);
	$businessName = $businessNameOne."|line2|".$businessNameTwo;
	$sql = "INSERT INTO business (business_name, slogan) VALUES (?,?)";
	if(!$stmt = mysqli_prepare($link, $sql)){
		return false;
		exit;
	}
	mysqli_stmt_bind_param($stmt, 'ss',  $businessName, $slogan);
	mysqli_stmt_execute($stmt);
	if(mysqli_stmt_error($stmt)){
		//printf("Error:on add name %s.\n", mysqli_stmt_error($stmt));
	}
	mysqli_stmt_close($stmt);
	return mysqli_insert_id($link);	
}

/////////       END OF -- adding Business info to card table


/////////       phoneBusinessRealtion

function phoneBusinessRelation($businessId, $phoneId, $ptype, $pos){
	global $link;
	$sql = "INSERT INTO phone_business (phone_id, business_id, ptype, pos) VALUES(?,?,?,?)";
	if(!$stmt = mysqli_prepare($link, $sql)){
		return false;
		exit;
	}
	mysqli_stmt_bind_param($stmt, 'iisi', $phoneId, $businessId,  $ptype, $pos);
	mysqli_stmt_execute($stmt);
	if(mysqli_stmt_error($stmt)){
		//printf("Error:on add name %s.\n", mysqli_stmt_error($stmt));
	}
	mysqli_stmt_close($stmt);
	return true;	
}

/////////       END OF phoneBusinessRealtion


/////////       adding nameoncard to  table

function addToNameOnCard($array, $businessid){
	global $link;
	extract($array);
	$userid = 1;
	$sql = "INSERT INTO nameoncard ( first_name, last_name, position, business_id, user_id) VALUES (?,?,?,?,?)";
	if(!$stmt = mysqli_prepare($link, $sql)){
		return false;
		exit;
	}
	mysqli_stmt_bind_param($stmt, 'sssii', $firstname, $lastname, $position, $businessid, $userid);
	mysqli_stmt_execute($stmt);
	if(mysqli_stmt_error($stmt)){
		//printf("Error:on add name %s.\n", mysqli_stmt_error($stmt));
	}
	mysqli_stmt_close($stmt);
	return true	;	
}
/////////       END OF -- adding nameoncard info to  table

/////////       adding address to Db

function addToAddress($array){
	global $link;
	extract($array);
	$address = $addressLineOne."|line2|". $addressLineTwo;
	$zipcode = intval($zipcode);
	$sql = "INSERT INTO address (address_line, city, zipcode, state) VALUES (?,?,?,?)";
	if(!$stmt = mysqli_prepare($link, $sql)){
		return false;
		exit;
	}
	mysqli_stmt_bind_param($stmt, 'ssis', $address, $city, $zipcode, $state);
	mysqli_stmt_execute($stmt);
	if(mysqli_stmt_error($stmt)){
		//printf("Error:on add name %s.\n", mysqli_stmt_error($stmt));
	}
	mysqli_stmt_close($stmt);
	return mysqli_insert_id($link);		
}
/////////       END OF -- adding address to Db

/////////       adding logo to Db

function addToLogo($newLogoName, $businessId){
	global $link;
	$sql = "INSERT INTO logo (new_name, business_id) VALUES (?,?)";
	if(!$stmt = mysqli_prepare($link, $sql)){
		return false;
		exit;
	}
	mysqli_stmt_bind_param($stmt, 'si', $newLogoName, $businessId);
	mysqli_stmt_execute($stmt);
	if(mysqli_stmt_error($stmt)){
		//printf("Error:on add name %s.\n", mysqli_stmt_error($stmt));
	}
	mysqli_stmt_close($stmt);
	return true;		
}

function removeFromTempLogo($logo){
	global $link;
	$sql = "DELETE FROM templogo WHERE logoname='$logo'";
	if(!$result = mysqli_query($link, $sql)){
		//echo mysqli_errno($link) . ": " . mysqli_error($link). "\n";
		return false;
	}
}


/////////       END OF -- adding logo to Db

/////////       adding description to Db

function addToDescription($description, $businessId){
	global $link;
	$sql = "INSERT INTO description (description, business_id) VALUES (?,?)";
	if(!$stmt = mysqli_prepare($link, $sql)){
		return false;
		exit;
	}
	mysqli_stmt_bind_param($stmt, 'si', $description, $businessId);
	mysqli_stmt_execute($stmt);
	if(mysqli_stmt_error($stmt)){
		//printf("Error:on add name %s.\n", mysqli_stmt_error($stmt));
	}
	mysqli_stmt_close($stmt);
	return true;		
}
/////////       END OF --  description to Db


/////////       adding weblink to Db

function addToWeblink($weblink, $web, $businessId){
	global $link;
	$sql = "INSERT INTO weblink (web_link, web_service, business_id) VALUES (?,?,?)";
	
	if(!$stmt = mysqli_prepare($link, $sql)){
		return false;
		exit;
	}
	mysqli_stmt_bind_param($stmt, 'ssi', $weblink, $web, $businessId);
	mysqli_stmt_execute($stmt);
	if(mysqli_stmt_error($stmt)){
		//printf("Error:on add name %s.\n", mysqli_stmt_error($stmt));
	}
	mysqli_stmt_close($stmt);
	return true;		
}
/////////       END OF -- weblink  to Db


/////////       adding email to Db

function addToEmail($email){
	global $link;
	$sql = "INSERT INTO email (email) VALUES (?)";
	
	if(!$stmt = mysqli_prepare($link, $sql)){
		return false;
		exit;
	}
	mysqli_stmt_bind_param($stmt, 's', $email);
	mysqli_stmt_execute($stmt);
	if(mysqli_stmt_error($stmt)){
		//printf("Error:on add name %s.\n", mysqli_stmt_error($stmt));
	}
	mysqli_stmt_close($stmt);
	return mysqli_insert_id($link);		
}
/////////       END OF -- email  to Db

/////////       adding website to Db

function addToWebsite($website){
	global $link;
	$sql = "INSERT INTO website (website) VALUES (?)";
	
	if(!$stmt = mysqli_prepare($link, $sql)){
		return false;
		exit;
	}
	mysqli_stmt_bind_param($stmt, 's', $website);
	mysqli_stmt_execute($stmt);
	if(mysqli_stmt_error($stmt)){
		//printf("Error:on add name %s.\n", mysqli_stmt_error($stmt));
	}
	mysqli_stmt_close($stmt);
	return mysqli_insert_id($link);		
}
/////////       END OF -- website  to Db

