<?
require_once "../inc/secure.php";
require_once "../inc/saveToDb.php";
require_once "../inc/myfunction.php";
$logStatus = logCheck();
$userId = $logStatus['userid'];

if($_SERVER['REQUEST_METHOD'] == "GET"){
	$data = json_decode(base64_decode($_GET["data"]),true);
	//print_r($data);
	$business = $data["business"];
	$address = $data["address"];
	$email = $data["email"];
	$website = $data["website"];
	$webLink = $data["webLink"];
	$logo = $data["logo"];
	$description = $data["description"];
	$phone = $data["phone"];
	
	if($business){
		$businessId = addToBusiness($business);
	}
 	
	
	if($phone){
		for($pos = 1; $pos<=4; $pos++){
			if($phone["phone".$pos]){
				$phoneNumber = divideNumber($phone["phone".$pos]);
				$ptype = $phone["ptype".$pos];
				$areaCode = $phoneNumber["areacode"];
				$number = $phoneNumber["number"];
				$sql = "SELECT id FROM phone WHERE area_code = $areaCode AND number = $number";
				if(!$result = mysqli_query($link, $sql))
					return false;
				if(mysqli_num_rows($result) == 0){
					$phoneId = addToPhone($areaCode, $number);
				}else{
					$phoneSqlArray = mysqli_fetch_assoc($result);
					$phoneId = $phoneSqlArray["id"];
				}
				if($businessId AND $phoneId AND $ptype){
					phoneBusinessRelation($businessId, $phoneId, $ptype, $pos);
				}
			}
		}
	}

	if($address){
		if(!empty($address["address"]) OR !empty($address["addressLineTwo"]) OR !empty($address["city"]) OR !empty($address["zipcode"]) OR !empty($address["state"])){
			$addressId = addToAddress($address);
		}
	}
	
	if($logo){
		if(!empty($logo)){
			addToLogo($logo, $businessId);
		removeFromTempLogo($logo);
		}
	}
	
	if($description){
		foreach($description as $key => $val){
			addToDescription($val, $businessId);
		}
	}
	
	if($email){
		$emailId = addToEmail($email);
	} 
	
	if($website){
		$websiteId = addToWebsite($website);
	} 
	
	if($webLink){
		foreach($webLink as $key => $val){
			addToWeblink($val, $key, $businessId);
		}
	}
	
	if($businessId AND $addressId){
		$sql = "INSERT INTO address_business (address_id, business_id) VALUES($addressId, $businessId)";
		if(!$result = mysqli_query($link, $sql)){
			//echo mysqli_errno($link) . ": " . mysqli_error($link). "\n";
			return false;
		}
	}
	
	if($businessId AND $emailId){
		$sql = "INSERT INTO email_business (email_id, business_id) VALUES($emailId, $businessId)";
		if(!$result = mysqli_query($link, $sql)){
			//echo mysqli_errno($link) . ": " . mysqli_error($link). "\n";
			return false;
		}
	}
	
	if($businessId AND $websiteId){
		$sql = "INSERT INTO website_business (website_id, business_id) VALUES($websiteId, $businessId)";
		if(!$result = mysqli_query($link, $sql)){
			//echo mysqli_errno($link) . ": " . mysqli_error($link). "\n";
			return false;
		}
	}
	
	if($businessId AND $userId){
		$sql = "INSERT INTO user_business (user_id, business_id) VALUES($userId, $businessId)";
		if(!$result = mysqli_query($link, $sql)){
			//echo mysqli_errno($link) . ": " . mysqli_error($link). "\n";
			return false;
		}
	}
	
}
header('Location: ../myclocard/myclocard.php');
exit;















