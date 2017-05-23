<?php
include_once ("db_config.php");

$id = $_POST['id'];
$evento = $_POST['evento'];
$sql = "SELECT * FROM personas_eventos where persona_id = '".$id."' AND evento_id = '".$evento."'";
$result = mysqli_query($con, $sql);
if ($result) {
   $var = [];
   while($obj = mysqli_fetch_object($result)) {
      $var[] = $obj;
      $persona_evento_id = $obj->id;
   }
   if (empty($var)) {
   		echo "Error1";
   }else{
   		//echo '{"funcionario":'.json_encode($var).'}';
   		$sql = "SELECT * FROM ub_sillas where persona_evento_id = '".$persona_evento_id."'";
		$result = mysqli_query($con, $sql);
		if ($result) {
		   $var = [];
		   while($obj = mysqli_fetch_object($result)) {
		      $var[] = $obj;
		      $columna = $obj->ub_columna_id;
		      $fila = $obj->ub_fila_id;
		   }
		   if (empty($var)) {
		   		echo "Error2";
		   }else{
		   		$sql = "SELECT * FROM ub_columnas where id = '".$columna."'";
		   		$result = mysqli_query($con, $sql);
				if ($result) {
				   $var = [];
				   while($obj = mysqli_fetch_object($result)) {
				      $var[] = $obj;
				      $columna = $obj->name;
				   }
				}else{
				   echo "Error";
				}

				$sql = "SELECT * FROM ub_filas where id = '".$fila."'";
		   		$result = mysqli_query($con, $sql);
				if ($result) {
				   $var = [];
				   while($obj = mysqli_fetch_object($result)) {
				      $var[] = $obj;
				      $fila = $obj->name;
				   }
				}else{
				   echo "Error";
				}
				echo $columna.$fila;
		   }
		}else{
		   echo "Error";
		}
   }
}else{
   echo "Error";
}
mysqli_close($con);

?>