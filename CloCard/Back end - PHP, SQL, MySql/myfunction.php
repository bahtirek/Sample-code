<?


function divideNumber($phone){
	$toReplace= array("(", ")", "-");
	$phone = str_replace($toReplace, "", $phone);
	$phoneNumber["areacode"] = intval(substr($phone, 0, 3));
	$phoneNumber["number"] = intval(substr($phone, 3));
	return $phoneNumber;
}


////// phone number validation

function phoneValidation($phone){
	$phonelen = strlen($phone);
	
	$i=0;
	if(strlen($phone)>9){
		while($i<=$phonelen){
			if(is_numeric($phone{$i})){
				$phonestr = $phonestr.$phone{$i};
			}
			$i++;
		}
		if($phonestr{0}==1){
			$phonestr = substr($phonestr, 1);
		}
		if(strlen($phonestr) != 10){
			$error =  "Phone is invalid";
			echo $error;
		}
		
	}else{
		$error =  "Phone is invalid";
		echo $error;
	}
	$areacode = substr($phonestr, 0, 3);
	$phonenumber = substr($phonestr, 3);
	$phonearr = ["areacode"=>substr($phonestr, 0, 3), "phonenumber"=>substr($phonestr, 3)];
	return $phonearr;
}
////// END OF  -- phone number validation


////// creating phone string

function phoneStr2($number, $area, $ptype, $ext){
	switch($ptype){
		case 'Cell' : $ptype = "Cell:&nbsp;&nbsp;&nbsp;"; break;
		case "Shop" : $ptype = "Shop:&nbsp;&nbsp;"; break;
		case "Store" : $ptype = "Store:&nbsp;"; break;
		case "Phone" : $ptype = "Phone:"; break;
		case "Office" : $ptype = "Office:"; break;
		case "Fax" : $ptype = "Fax:&nbsp;&nbsp;&nbsp;&nbsp;"; break;
		case "" : $ptype = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"; break;
	}


	
	$phonestr = $ptype . "&nbsp; (".$area.")&nbsp;".substr($number, 0, 3)."-".substr($number, 3);
	if ($ext) $phonestr = $phonestr."&nbsp;&nbsp;&nbsp;&nbsp;Ext :&nbsp;".$ext;
	return $phonestr;
}

function area_phone($phonenumber, $areacode){
	$areaPhone = "(". $areacode .") ".substr($phonenumber, 0, 3)."-".substr($phonenumber, 3);
	return $areaPhone;
}
////// END OF  -- creating phone string


///// creating unique file name

/* function uniqFileName(){
	if(isset($_COOKIE['userdata'])){
		$userdata = unserialize(base64_decode($_COOKIE['userdata']));
		$user_id = $userdata['id'];
	}
	$uniq_file_name = md5($user_id, )
} */

///// END OF creating unique file name
function value_placeholder($key1, $key2){
	if($key1 == $key2){
		echo "value placeholder=\"$key1\"";
	}else{
		echo "value=\"$key1\"";
	}

}

function file_name($fileName){
	////time+username+md5
	$date=time();
	$fileNameNew = md5($date.$fileName);
	return $fileNameNew;
}
/* function file_name($userName, $fileName){
	////time+username+md5
	$date=time();
	$userName;
	$fileNameNew = md5($date.$userName.$fileName);
	return $fileNameNew;
} */

function validEmail($email){
    // This checks for "xxxxxx@yyyyyy.zzz"
    if(preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $email))
		return true;
	else
		return false;
}
function clearInt($data){
	return (int)$data;
}
function clearStr($data){
	global $link;
	return mysqli_real_escape_string($link, trim(strip_tags($data)));
}
function clearStr2($data){
	global $link;
	return trim(strip_tags($data));
}


/////////error log
function my_error_log($array){
	extract($array);
	//var_dump($array);
	$myHtml = "<html>
	<header>
		<link rel=\"stylesheet\" href=\"../style.css\" />
	</header>
	<body>
	";
	
	///// creating folder if not exist
	$epath = "../";
	$folderName = 'ERROR_LOG/'.date('m_Y').'/';
	if(!file_exists($epath.$folderName)){
		if(!mkdir($epath.$folderName)){
		  ///error trgger
			$folderName = 'ERROR_LOG/';
		}
	}///// end of creating folder if not exist
	
	
	///// creating error log file if not exist
	$epath = "../";
	$fileName = $epath.$folderName.date('m_d').'.html';
	if(!file_exists($fileName)){
		$f = fopen($fileName, "a");
		fputs($f, "$myHtml");
		fclose($f);
	}///// end of creating error log file if not exist
	//echo $fileName;
	$f = fopen($fileName, "a+") or die ("Не могу открыть файл!");
	
	//fpassthru($f);
	$table = "<table width = \"100%\" border=\" 1px black collapse;\">
			<tr>
				<th width = \"150px;\">TIME</th><td>".date("H : i : s",$date)."</td>
			</tr>
			<tr>
				<th width = \"150px;\">USER_ID</th><td>".$userid."</td>
			</tr>
			<tr>
				<th width = \"150px;\">FILE</th><td>".$file."</td>
			</tr>
			<tr>
				<th width = \"150px;\">STEP</th><td>".$step."</td>
			</tr>
			<tr>
				<th width = \"150px;\">FUNCTION</th><td>".$currentfunc."</td>
			</tr>
			<tr>
				<th width = \"150px;\">ERROR</th><td>".$errormessage."</td>
			</tr>
			<tr>
				<th width = \"150px;\">SQL</th><td>".$sql."</td>
			</tr>
			
		</table>";
	fputs($f, "$table");
	fclose($f);
	//echo $fileName;
}

/////////end of error log


///////// error log

function error_log_dB($array){
	global $link;
	extract($array);
	print_r($array);
	echo $currentsql;
	$sql = "INSERT INTO errorlog (user_id, page, errormessage, step, timestamp, mysql, function, datetime)	VALUES(?,?,?,?,?,?,?,?)";
	if(!$stmt = mysqli_prepare($link, $sql)){
		return false;
		exit;
	}
	
	mysqli_stmt_bind_param($stmt, 'isssisss',  $userid, $file, $errormessage, $step, $timestamp, $currentsql, $currentfunc,$datetime);
	mysqli_stmt_execute($stmt);
	if(mysqli_stmt_error($stmt)){
		printf("Error:on add name %s.\n", mysqli_stmt_error($stmt));
	}
	mysqli_stmt_close($stmt);
}


/////////end of error log

