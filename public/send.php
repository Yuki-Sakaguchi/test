<?php
  // 必須
  $company_name = $_POST['company-name'];
  $name = $_POST['name'];
  $email = $_POST['email'];
  $tel = (string)$_POST['tel1'] + (string)$_POST['tel2'] + (string)$_POST['tel3'];
  $contact = $_POST['contact'];

  // 任意
  $period = $_POST['period'];
  $place = $_POST['place'];
  $contents = $_POST['contents'];
  $other = $_POST['other'];

  $error = '';

  if (!$company_name || !$name || !$email || !$tel || !$contact) {
    // 必須項目がない場合
    $error = "error";
  }

  if (mb_strlen($conmapy_name) > 100) {
    // 長すぎはだめ
    $error = "error";
  }

  if (!(bool)filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // メールアドレスが不正
    $error = "error";
  }

  if (!preg_match("/^[0-9]+$/", $tel)) {
    // 電話が不正
    $error = "error";
  }
  
  if (mb_strlen($othre) > 500) {
    // 長すぎはだめ
    $error = "error";
  }

  if (!$error) {
    // エラーがないときだけ送信
  
    mb_language("ja");
    mb_internal_encoding("UTF-8");
    
    $subject = "お問い合わせメール";

    $body = "
      [会社名] $company_name
      [担当者名] $name
      [メールアドレス] $email
      [電話番号] $tel
      [お問い合わせ内容] $contact

      [ご利用期間] $period
      [ご利用場所] $place
      [ご利用内容] $contents
      [その他] $other
    ";

    // $toMail = 'ba550_0ne@icloud.com';
    $toMail = 'blocco@saka-senko.com';
    $formMail = $toMail;
    $fromName = '管理者';
    $header = "From: " . mb_encode_mimeheader($fromName) . "<{$fromEmail}>";

    mb_send_mail($toMail, $subject, $body, $header);
  }

  $return_array = array($error);
  echo json_encode($return_array);
?>

