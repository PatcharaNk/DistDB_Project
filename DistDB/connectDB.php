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
    
?>