<?php

 $to = "sales@deccanplast.com";

 $from = $_REQUEST['email'] ;

 $name = $_REQUEST['name'] ;
 $headers = "From: $from" . "\r\n";
 $headers .= "Cc: marketingdeccan@gmail.com, sales.deccanplast@gmail.com, nizamuddin@deccanplast.com" . "\r\n";
 $headers .= "Bcc: chethan@vibs.co.in" . "\r\n";
 $subject = "Attention - Request for quotation from deccanplast.com website";
 $contact = $_REQUEST['contact'];
 $pincode = $_REQUEST['pincode'];
 $location = $_REQUEST['location'];
 $email = $_REQUEST['email'];
 $product = $_REQUEST['product'];
 $message = $_REQUEST['message'];

 $body = "Details of customer who has requested the quote\n";
 $body .= "Name: " . $name . "\n";
 $body .= "E-mail Address: " . $email . "\n";
 $body .= "Contact Number: " . $contact . "\n";
 $body .= "Location: " . $location . "\n";
 $body .= "Pincode: " . $pincode . "\n";
 $body .= "Product Interested: " . $product . "\n";
 $body .= "Message: " . $message . "\n";
 $body .= "Please take immediate action !";


 $headers2 = "From: sales@deccanplast.com";
 $subject2 = "Thank you for contacting us !";
 $autoreply = "Thank you for contacting us. Somebody will get back to you as soon as possible, usualy within 48 hours. If you have any more questions, please consult our website at www.deccanplast.com";

 if($from == '') {print "You have not entered an email, please go back and try again";}
 else {
 if($name == '') {print "You have not entered a name, please go back and try again";}
 else {
 $send = mail($to, $subject, $body, $headers);
 $send2 = mail($from, $subject2, $autoreply, $headers2);
 if($send)

 { ?><font face="Verdana" size="2">Thank You , Your Email Sent Successfully.</font>
 <?
 }
 else
 {
 ?>
<font face="Verdana" size="2">Thank You , Your Email cannot Sent Successfully.</font>
 <?
 }
 }
}
?>
