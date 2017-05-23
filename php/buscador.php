<?php
include_once ("db_config.php");

$match = $_POST['match'];
$sql = "SELECT * FROM vpersonaevento where personaNombreCompleto LIKE '%".$match."%'";
$result = mysqli_query($con, $sql);
if ($result) {
   $var = [];
   while($obj = mysqli_fetch_object($result)) {
      $var[] = $obj;
   }

   echo '{"funcionario":'.json_encode($var).'}';

}else{
   echo "Error";
}
mysqli_close($con);

?>