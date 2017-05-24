<?php
include_once ("db_config.php");
$personaId = $_POST['personaId'];
$sillaNombre = $_POST['sillaNombre'];
$eventoId = $_POST['eventoId'];

$sql = "SELECT * FROM personas_eventos where evento_id ='".$eventoId."' AND persona_id = '".$personaId."'";
$result = mysqli_query($con, $sql);
if ($result) {
   $var = [];
   while($obj = mysqli_fetch_object($result)) {
      $var[] = $obj;
      $persona_evento_id = $obj->id;
   }

   if (empty($var)) {
   		//echo "No se encontro el usuario con el evento en especifico";
   		echo "No se encontro el usuario con el evento en especifico";
   }else{
   		$sql = "SELECT * FROM ub_escenarios where evento_id ='".$eventoId."'";
		$result = mysqli_query($con, $sql);
		if ($result) {
		   $var = [];
		   while($obj = mysqli_fetch_object($result)) {
		      $var[] = $obj;
		      $escenarioId = $obj->id;
		   }
		}
		if (empty($var)) {
	   		//echo "El escenario no se ha generado para este evento";
	   		echo "El escenario no se ha generado para este evento";
	   	}else{
	   		$sql="UPDATE ub_sillas 
				  SET persona_evento_id = '".$persona_evento_id."'
				  WHERE nombreSilla = '".$sillaNombre."' AND ub_escenario_id = '".$escenarioId."'";
			$result = mysqli_query($con, $sql);
			if ($result) {
				echo "ok";
			}else{
				echo "Error al actualizar";
			}
	   	}
   	}
   //echo '{"evento":'.json_encode($var).'}';

}else{
   echo "No se encontró la persona en el evento";
}
mysqli_close($con);

?>