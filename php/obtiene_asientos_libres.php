<?php
include_once ("db_config.php");
$eventoId = $_POST['eventoId'];
$sql = "SELECT * FROM ub_escenarios where evento_id ='".$eventoId."'";
$result = mysqli_query($con, $sql);
if ($result) {
   $var = [];
   while($obj = mysqli_fetch_object($result)) {
      $var[] = $obj;
      $escenarioId = $obj->id;
   }

   if (empty($var)) {
   		//echo "El escenario no se ha generado para este evento";
   		echo "Error1";
   }else{
   		$sql = "SELECT * FROM ub_sillas where ub_escenario_id ='".$escenarioId."' AND persona_evento_id is null ORDER BY nombreSilla ASC";
		$result = mysqli_query($con, $sql);
		if ($result) {
		   $var = [];
		   while($obj = mysqli_fetch_object($result)) {
		      $var[] = $obj;
		   }

		   if (empty($var)) {
		   		//echo "No hay sillas disponibles";
		   		echo "Error2";
		   }else{
		   		echo json_encode($var);
		   }
		   //echo '{"evento":'.json_encode($var).'}';

		}else{
		   echo "Error";
		}
   }
   //echo '{"evento":'.json_encode($var).'}';

}else{
   echo "Error";
}
mysqli_close($con);

?>