<?php
    include 'connectDB.php';
    $filter = $_REQUEST["q"];
//    echo '<script type="text/javascript">alert("hello!");</script>';
    $new= explode("!!",$filter);
    $name = $new[0];
    $platform = $new[1];
    $cur = $col->find(array('Name'=>$name,'Platform'=>$platform));
    $datalist = array();
    foreach($cur as $item){
        array_push($datalist,array(
            "Name"=>$item['Name'],
            "Platform"=>$item['Platform'],
            "Year_of_Release"=>$item['Year_of_Release'],
            "Genre"=>$item['Genre'],
            "Publisher"=>$item['Publisher'],
            "NA_Sales"=>$item['NA_Sales'],
            "EU_Sales"=>$item['EU_Sales'],
            "JP_Sales"=>$item['JP_Sales'],
            "Other_Sales"=>$item['Other_Sales'],
            "Global_Sales"=>$item['Global_Sales'],
            "Critic_Score"=>$item['Critic_Score'],
            "Critic_Count"=>$item['Critic_Count'],
            "User_Score"=>$item['User_Score'],
            "User_Count"=>$item['User_Count'],
            "Rating"=>$item['Rating'],
            "About"=>$item['About'],
            "URL_Pic"=>$item['URL Pic'],
            "URL_Trailer"=>$item['URL Trailer']));
    }
    echo json_encode($datalist);
?>