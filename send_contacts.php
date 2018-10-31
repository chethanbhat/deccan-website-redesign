<?php

 $to = "sales@deccanplast.com";

 $from = $_REQUEST['email'] ;
 $phone = $_REQUEST['contact'];

 $headers = "From: $from" . "\r\n";
 $headers .= "Cc: marketingdeccan@gmail.com, sales.deccanplast@gmail.com, nizamuddin@deccanplast.com" . "\r\n";
 $headers .= "Bcc: chethan@vibs.co.in" . "\r\n";
 $subject = "Attention - Contact Information from deccanplast.com website";

$name = $_REQUEST['name'] ;
$email = $_REQUEST['email'];
$contact = $_REQUEST['contact'];
$message = $_REQUEST['message'];

$body = "Details of customer who has contacted on the website\n";
$body .= "Name: " . $name . "\n";
$body .= "E-mail Address: " . $email . "\n";
$body .= "Contact Number: " . $contact . "\n";
$body .= "Message: " . $message . "\n";
$body .= "Please take immediate action !";

$headers2 = "From: sales@deccanplast.com";
$subject2 = "Thank you for contacting us !";
$autoreply = "Thank you for contacting us. Somebody will get back to you as soon as possible, usualy within 48 hours. If you have any more questions, please consult our website at www.deccanplast.com";

 if($from == '') {$_SESSION['message'] .= "You have not entered an email, please go back and try again";}
 else if($name == '') {$_SESSION['message'] .= "You have not entered a name, please go back and try again";}
 else if($phone == ''){$_SESSION['message'] .= "You have not entered a phone no, please go back and try again";}
 else{
 $send = mail($to, $subject, $body, $headers);
 $send2 = mail($from, $subject2, $autoreply, $headers2);

 if($send)
 { $_SESSION['message'] = "Thank You, Your message has been sent !";
 }
 else
 { $_SESSION['message'] = "Problem Sending your message !";
 }
 }
?>
