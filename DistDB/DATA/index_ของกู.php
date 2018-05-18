<?php
    try
    {
        $username = 'VG2017';
        $password = 'VG2017';
        $uri = "mongodb://".$username.":".$password."@ds157320.mlab.com:57320/video_game";
        $conn = new MongoClient($uri);
        $db   = $conn->video_game;
        //create Collection//
        $col = $db->Game;
    }
    catch(MongoConnectionException $e)
    {   
        die("Failed to connect to database ".$e->getMessage());
    }
    echo('Connection Successful</br>');
    $cur = $col->find();
    
    foreach($cur as $i){
        echo $i['Name'].$i['URL Pic'];
        echo '</br>';
        echo '<iframe width="560" height="315" src='.$i['URL Trailer'].' frameborder="0" allowfullscreen></iframe>';
        
        echo '</br></br>';
    }
?>