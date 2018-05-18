<?php
    try
    {
        $username = 'VG2017';
        $password = 'VG2017';
        $uri = "mongodb://".$username.":".$password."@ds157320.mlab.com:57320/video_game";
        $conn = new MongoClient($uri);
        $db   = $conn->video_game;
        //create Collection//
        $col = $db->User;
    }
    catch(MongoConnectionException $e)
    {   
        die("Failed to connect to database ".$e->getMessage());
    }
    $fname =$_GET["firstname"];
    $lname = $_GET["lastname"];
    $email =$_GET["email"];
    $tel = $_GET["Telephone"];
    $line =$_GET["Line"];
    $fb = $_GET["Facebook"];    
    $check = $col->find(array('firstname'=>$fname,'lastname'=>$lname));
    $cnt = 0;
    foreach($check as $i){
        $cnt++;
    }
    if($cnt == 0){
        if($fname!=null and $lname!=null and $email!=null and $tel!=null and $line!=null and $fb!=null){
            $col->insert(array("firstname"=>$fname,"lastname"=>$lname,"email"=>$email,"Telephone"=>$tel, "Line"=>$line, "Facebook"=>$fb));
        }
        echo "<script>
        alert('THANK YOU');
        </script>";
        echo "<script>
        window.location.replace('Register.html');
        </script>";
    }else{
        echo "<script>
        alert('".$fname." ".$lname." is already use');
        </script>";
        echo "<script>
        window.location.replace('Register.html');
        </script>";
        $col -> remove(array("firstname"=>$fname, "lastname"=>$lname));
    }
    
?>