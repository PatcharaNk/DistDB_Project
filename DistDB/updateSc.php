<?php
    include 'connectDB.php';
    $filter = $_REQUEST["q"];
    $new = explode("!!",$filter);
    $name = $new[0];
    $platform = $new[1];
    $score = (float)$new[2];
    $cnt = (float)$new[3];
    
    $new_data = array('$set'=>array('User_Score'=>$score,"User_Count"=>$cnt));
    $col->update(array("Name"=>$name,"Platform"=>$platform),$new_data);
?>