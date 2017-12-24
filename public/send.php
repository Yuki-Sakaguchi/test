<?php
  // if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = 'ba550_0ne@icloud.com';
  // }
  

  // if (isset($_POST["submit"])) {
    mb_language("ja");
    mb_internal_encoding("UTF-8");
    
    $subject = "subject test";

    $body = "
      body test
      $name
    ";
    
    $fromEmail = 'ba550_0ne@icloud.com';
    $fromName = 'お問い合わせテスト';
    $header = "From: " . mb_encode_mimeheader($fromName) . "<{$fromEmail}>";

    mb_send_mail($email, $subject, $body, $header);
  // }
?>
送信しました！
Thanks!