<?
	include "../inc/matrix.php";
	include "../inc/myfunction.php";
	require_once "../inc/lib.inc.php";
	require_once "../inc/data.inc.php";
	require_once "../inc/secure.php";
	require_once "../inc/saveToDb.php";
	$logStatus = logCheck();
	$logStatus['link'] = "../logout.php";
	if($logStatus["log"]=="Login/Signup"){
		header("Location: ../login_signup.php");
	}
	$path = "../";
	$navpath ="../";

?>
<!DOCTYPE html>
<html>

<head>
	<title>Clocard</title>
	<link rel="stylesheet" href="../style.css" />
	<script src="../inc/myfunction.js"></script>
	
	<script>
		window.onload=getPrimaryPhone();
	</script>
</head>

<body>

  <header>
    <!-- Header -->
	<span class="slogan">Keep your card in cloud</span>
    <img src="../images/clocardlogo.png"  alt="cloud" class="logo"  usemap="logo"/>
	<map name="logo">
		<area shape="rect" coords="0,0,309,84" href="../index.php">
	</map>
		<!-- Menu -->
	<?include'../home/navin.inc.php';?>
		<!-- menu -->

    <!-- header -->
  </header>

  <section id="main">
	
    <!-- Main content -->
    
    <div class="wrapper">
        <div class="left">
		    <h1 align="center">Create New Clocard</h1>
		    <div class="warning" id="warning">
			</div>
		  
		    <iframe align="middle" height="110px" src="myframe.php"></iframe>
           
		    <form onsubmit="return false" name="businessData">
				<fieldset >
				<legend>Business</legend>
					<div>
						<label>Business Name: </label>
						<input type="text" name="businessNameOne" onblur="clearBusinessString(this.value, this.name)" />
					</div>
					
					<div>
						<label>Business Name: </label>
						<input type="text" name="businessNameTwo" onblur="clearBusinessString(this.value, this.name)"/>
					</div>
					<div>
						<label>Slogan: </label>
						<input type="text" name="slogan" onblur="clearBusinessString(this.value, this.name)" />
					</div>
				</fieldset >
				
				
				<fieldset >
				<legend>Phone</legend>
					<div class="phone-Input">
						<div>
							<label>Primary Phone : </label>
							<input type="text" name="phone1"  id="phone1input"   disabled/>
							<select name="ptype1" class="dropdown" onchange="ptypeSelector(this.value, this.name, 'phone1')">
								<option value="Phone">Phone </option>
								<option value="Office">Office </option>
								<option value="Store">Store </option>
								<option value="Shop">Shop </option>
								<option value="Other">Other...</option>
							</select>
							<input type="text" name="ptype1" id="ptype1Other" placeholder="other..." onblur="clearPtypeString(this.value, this.name)" class="otherPtype"/>
						</div>
						<div>
							<label>Secondary Phone 1: </label>
							<input type="text" name="phone2"  id="phone2input" onblur="phoneValidation(this.value, this.name, 'ptype2')" onkeypress="return isNumber(event, this.name)" onkeyup="selectPtype(this.value, 'ptype2')" maxlength="14"/>
							<select name="ptype2" class="dropdown" onchange="ptypeSelector(this.value, this.name, 'phone2')">
								<option value="Phone">Phone</option>
								<option value="Office">Office</option>
								<option value="Store">Store</option>
								<option value="Shop">Shop</option>
								<option value="Fax">Fax</option>
								<option value="Other" >Other...</option>
							</select>
							<input type="text" name="ptype2" id="ptype2Other" placeholder="other..." onblur="clearPtypeString(this.value, this.name)" class="otherPtype"/>
						</div>
						<div>
							<label>Secondary Phone 2: </label>
							<input type="text" name="phone3"  id="phone3input" onblur="phoneValidation(this.value, this.name, 'ptype3')" onkeypress="return isNumber(event, this.name)" onkeyup="selectPtype(this.value, 'ptype3')" maxlength="14"/>
							<select name="ptype3" class="dropdown" onchange="ptypeSelector(this.value, this.name, 'phone3')">
								<option value="Phone">Phone</option>
								<option value="Office">Office</option>
								<option value="Store">Store</option>
								<option value="Fax">Fax</option>
								<option value="Shop">Shop</option>
								<option value="Other" >Other...</option>
							</select>
							<input type="text" name="ptype3" id="ptype3Other" placeholder="other..." onblur="clearPtypeString(this.value, this.name)" class="otherPtype"/>
						</div>
						<div>
							<label>Secondary Phone 3: </label>
							<input type="text" name="phone4" id="phone4input" onblur="phoneValidation(this.value, this.name, 'ptype4')" onkeypress="return isNumber(event, this.name)" onkeyup="selectPtype(this.value, 'ptype4')" maxlength="14"/>
							<select name="ptype4" class="dropdown" onchange="ptypeSelector(this.value, this.name, 'phone4')">
								<option value="Phone">Phone</option>
								<option value="Office">Office</option>
								<option value="Store">Store</option>
								<option value="Shop">Shop</option>
								<option value="Fax">Fax</option>
								<option value="Other" >Other...</option>
							</select>
							<input type="text" name="ptype4" id="ptype4Other" placeholder="other..." onblur="clearPtypeString(this.value, this.name)" class="otherPtype"/>
						</div>
					</div>
				</fieldset >
				
				
				<fieldset >
				<legend>Address</legend>
					<div>
						<label>Address: </label>
						<input type="text" name="addressLineOne" onblur="clearAddressString(this.value, this.name)"/>
					</div>
					<div>
						<label>Address line 2: </label>
						<input type="text" name="addressLineTwo" onblur="clearAddressString(this.value, this.name)"/>
					</div>
					<div>
						<label>City: </label>
						<input type="text" name="city" onblur="clearAddressString(this.value, this.name)"/>
					</div>
					<div>
					<label>State: </label>
						<select name="state" onchange="clearStateString(this.value, this.name)" class="state">
							<?
							foreach($states as $key => $val){
								if($key == $card["state"]){
									$stateSelection = "selected";
								}
								echo "<option value=\"$key\" ", $stateSelection," >", $val,"</option>\n";
								$stateSelection="";
							}	
							?>
						</select>
                    
					</div>
					<div>
						<label>Zipcode: </label>
						<input type="text" name="zipcode" onblur="clearStateString(this.value, this.name)" class="zipcode"/>
					</div>
					<div>
						<label>Email: </label>
						<input type="text" name="email" onblur="clearAddressString(this.value, this.name)"/>
					</div>
					<div>
						<label>WebSite: </label>
						<input type="text" name="website" onblur="clearAddressString(this.value, this.name)"/>
					</div>
					<div>
						<label>Facebook: </label>
						<input type="text" name="face" onblur="webLinkString(this.value, this.name)"/>
					</div>
					<div>
					<label>Twitter: </label>
                    <input type="text" name="twit" onblur="webLinkString(this.value, this.name)"/>
					</div>
					<div>
						<label>Instagram: </label>
						<input type="text" name="inst" onblur="webLinkString(this.value, this.name)"/>
					</div>
				</fieldset >
				
				<fieldset >
					
				<legend>About</legend>
					<div id="description">
						<div>
							<label>Description: </label>
							<input type="text" name="description1" onblur="clearDescriptionString(this.value, this.name)"/>
						</div>
						<div>
							<label>Description: </label>
							<input type="text" name="description2" onblur="clearDescriptionString(this.value, this.name)"/>
						</div>
						<div>
							<label>Description: </label>
							<input type="text" name="description3" onblur="clearDescriptionString(this.value, this.name)"/>
						</div>
						<div>
							<label>Description: </label>
							<input type="text" name="description4" onblur="clearDescriptionString(this.value, this.name)"/>
						</div>
						<div>
							<label>Description: </label>
							<input type="text" name="description5" onblur="clearDescriptionString(this.value, this.name)"/>
						</div>
						<div id="descDiv6" id="descDiv" class="hidden-description">
							<label>Description: </label>
							<input type="text" name="description6" onblur="clearDescriptionString(this.value, this.name)" />
						</div>
						<div id="descDiv7" class="hidden-description">
							<label>Description: </label>
							<input type="text" name="description7" onblur="clearDescriptionString(this.value, this.name)" />
						</div>
						<div id="descDiv8" class="hidden-description">
							<label>Description: </label>
							<input type="text" name="description8" onblur="clearDescriptionString(this.value, this.name)" />
						</div>
						<div id="descDiv9" class="hidden-description">
							<label>Description: </label>
							<input type="text" name="description9" onblur="clearDescriptionString(this.value, this.name)" />
						</div>
						<div id="descDiv10" class="hidden-description">
							<label>Description: </label>
							<input type="text" name="description10" onblur="clearDescriptionString(this.value, this.name)" />
						</div>
						<div id="descDiv11" class="hidden-description">
							<label>Description: </label>
							<input type="text" name="description11" onblur="clearDescriptionString(this.value, this.name)" />
						</div>
						<div id="descDiv12" class="hidden-description">
							<label>Description: </label>
							<input type="text" name="description12" onblur="clearDescriptionString(this.value, this.name)" />
						</div>
						<div id="descDiv13" class="hidden-description">
							<label>Description: </label>
							<input type="text" name="description13" onblur="clearDescriptionString(this.value, this.name)" />
						</div>
						<div id="descDiv14" class="hidden-description">
							<label>Description: </label>
							<input type="text" name="description14" onblur="clearDescriptionString(this.value, this.name)" />
						</div>
						<div id="descDiv15" class="hidden-description">
							<label>Description: </label>
							<input type="text" name="description15" onblur="clearDescriptionString(this.value, this.name)" />
						</div>
						
					</div>
					<br>
					<div id="addDescr">
					<button id="addDescrButton" onclick="addDescription()">Add more Description</button>
					</div>
				</fieldset>
				<br>
				<br>
				<input type="checkbox" onchange="agreed()"> I have read terms and cond
				<br>
			<br>
				<input type="submit" onclick="submitMyForm('save_new_card.php')" id="submitButton" disabled>
				<input type="reset" />
                
		      </form>
			 
       </div>
	   
		<div class="right">
			<table class="phone"><tr><td>
				<table align="center" class = "phoneTable">
					<tr style=" margin:0; height: 50px;"><td  ><img src="../images/speaker2.png" width="110px" align="center"/></td></tr>
					<tr height="500px">
						<td  class = "display">
							<div class="parent">
								<div class="child">
									<table align="center" class = "phoneTable3" id="phoneTable">
										<tr><td colspan="3" id="logo"><img id="myLogo" src="" width="200px"></td></tr>
										<tr><td colspan="3" id="businessNameOne"></td></tr>
										<tr><td colspan="3" id="businessNameTwo"></td></tr>
										<tr><td colspan="3" id="slogan" style="font-style: italic; padding-bottom:10px" ></td></tr>
										<tr><td colspan="3" id=""></td></tr>
										
										
										
										<tr class="phone-tr"><td><img id="phone1Image" src=""/></td><td id="ptype1"></td><td id="phone1"></td></tr>
										<tr class="phone-tr"><td><img id="phone2Image" src=""/></td><td id="ptype2"></td><td id="phone2"></td></tr>
										<tr class="phone-tr"><td><img id="phone3Image" src=""/></td><td id="ptype3"></td><td id="phone3"></td></tr>
										<tr class="phone-tr"><td><img id="phone4Image" src=""/></td><td id="ptype4"></td><td id="phone4"></td></tr>
										<!--<tr><td style="width: 55px"><img id="phone2Image" src=""/></td><td id="ptype2" style="text-align:left; padding-right: 5px"></td><td style="width: 123px" id="phone2" class="tdLeft"></td></tr>
										<tr><td style="width: 55px"><img id="phone3Image" src=""/></td><td id="ptype3" style="text-align:left; padding-right: 5px"></td><td style="width: 123px" id="phone3" class="tdLeft"></td></tr>
										<tr><td style="width: 55px"><img id="phone4Image" src=""/></td><td id="ptype4" style="text-align:left; padding-right: 5px"></td><td style="width: 123px" id="phone4" class="tdLeft"></td></tr>
										-->
										<tr><td></td><td colspan="3" id=""></td></tr>
										<tr><td><img id="addressImage" src=""/></td><td colspan="2" id="addressLineOne" style="text-align:left; padding-left: 5px"></td></tr>
										<tr><td></td><td colspan="2" id="addressLineTwo" style="text-align:left; padding-left: 5px"></td></tr>
										<tr><td></td><td colspan="2" id="city" style="text-align:left; padding-left: 5px"></td></tr>
										<tr><td></td><td colspan="2" id="statezip" style="text-align:left; padding-left: 5px; "></td></tr>
										
										<tr><td><img id="emailImage" src=""/></td><td colspan="2" id="email" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td><img id="websiteImage" src=""/></td><td colspan="2" id="website" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr>
											<td colspan="3" id="weblinks">
												<img src="../images/instagram.png" id="instImage" style="display: none"/>
												<img src="../images/twitter.png" id="twitImage" style="display: none"/>
												<img src="../images/facebook.png" id="faceImage" style="display: none"/>
											</td>
										</tr>
										
										<tr><td colspan="3" id="description1" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td colspan="3" id="description2" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td colspan="3" id="description3" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td colspan="3" id="description4" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td colspan="3" id="description5" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td colspan="3" id="description6" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td colspan="3" id="description7" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td colspan="3" id="description8" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td colspan="3" id="description9" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td colspan="3" id="description10" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td colspan="3" id="description11" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td colspan="3" id="description12" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td colspan="3" id="description13" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td colspan="3" id="description14" style="text-align:left; padding-left: 5px;"></td></tr>
										<tr><td colspan="3" id="description15" style="text-align:left; padding-left: 5px;"></td></tr>
									</table>
								</div>
							</div>
						</td>
					</tr>
					<tr height="60px"><td style="text-align:center;"><img src="../images/cloud.png" width="60px" alt="Cloud" /></td></tr>
				</table>  </td></tr>
			</table>
		</div>
    </div>
   
    <!-- Main content -->
  </section>
	<div>
		
	</div>
  <footer>
    <!-- Footer -->
	
    
    <!-- Footer -->
  </footer>
</body>

</html>