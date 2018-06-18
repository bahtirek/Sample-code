<?
const DB_HOST = "localhost";
const DB_LOGIN = "root";
const DB_PASSWORD = "";
const DB_NAME = "clocard10";
const FILE_NAME = ".htpasswd";
$link = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASSWORD, DB_NAME) OR die (mysqli_connect_error());

function getHash($password){
	$hash = password_hash($password, PASSWORD_BCRYPT);
	return trim($hash);
}
function checkHash($password, $hash){
	return password_verify(trim($password), trim($hash));
}
function saveUser($email, $hash, $name){
	global $link;
	if ($email and $hash and $name){
		$sql = 'INSERT INTO users (email, password, name)
		                    VALUES(?,?,?)';
		
		if(!$stmt = mysqli_prepare($link, $sql))
			return false;
		mysqli_stmt_bind_param($stmt, "sss", $email, $hash, $name);
		mysqli_stmt_execute($stmt);
		mysqli_stmt_close($stmt);
		return true;
	}
	return false;
}
function saveCardPhone($into, $value, $stmtvalue, $intcount){
	$sql = 'INSERT INTO card ($into) VALUES($value)';
	if(!$stmt = mysqli_prepare($link, sql))
		return false;
	mysqli_stmt_bind_param($stmt, "$intcount");
}
function userExists($email){
	global $link;
	$sql = "SELECT email FROM users WHERE email = '$email' ";
	If(!$result = mysqli_query($link, $sql))
		return false;
	$users = mysqli_fetch_assoc($result);
	if (is_array($users)){
		if ($email == $users['email']){
			return true;
		}
		else
			return false;
	}
	else
		return false;
	}

function userLoginCheck($email, $password){
	global $link;
	$sql = "SELECT id, password, name FROM users WHERE email = '$email'"; 
	If(!$result = mysqli_query($link, $sql))
		return false;
	$userData = mysqli_fetch_assoc($result);
	if(is_array($userData)){
		$pshash = $userData['password'];
		//$myhash = checkHash($password, $pshash);
		if(!checkHash($password, $pshash))
			return false;
		return $userData;
		}
		else 
			return false;
	}

/* function logOut(){ 
	session_destroy(); 
	header('Location: userlogin.php'); 
	exit; 
} */

function logCheck(){
	if($_COOKIE['userdata']){
		$userData = unserialize(base64_decode($_COOKIE['userdata']));
		$user_id = $userdata['id'];
		$user_name = $userdata['name'];
		//$path = $_SERVER['REQUEST_URI'];
		$logStatus['link'] = "logout.php";
		$logStatus['log'] = "LogOut";
		$logStatus['username'] = $userData["name"];
		$logStatus['userid'] = $userData['id'];
		return $logStatus;
		//$user_hash = $userdata['hash'];
		//$ip = $_SERVER['REMOTE_ADDR'];
		//$user_hash_check = md5($user_name . $ip);
	}else{
		$originPage = $_SERVER['PHP_SELF'];
		setcookie("originpage", $originPage);
		$logStatus['link'] = "login_signup.php";
		$logStatus['log'] = "Login/Signup";
		return $logStatus;
	}
}





