<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/*
  Tested working with PHP5.4 and above (including PHP 7 )

 */
require_once './php/vendor/autoload.php';

use FormGuide\Handlx\FormHandler;

$pp = new FormHandler();

$mailer = $pp->getMailer();

$validator = $pp->getValidator();
$validator->fields(['vase_jmeno', 'vase_prijmeni', 'nazev_spolecnosti', 'email', 'telefon', 'type_company', 'zprava'])->areRequired();
$validator->fields(['consulting' ,'ux_design' , 'quality_insurance' ,  'wordpress ' , 'custom_website_development' , 'frontend']);
$validator->field('email')->isEmail();
$validator->field('zprava')->maxLength(6000);
$validator->fields(['gdpr']);

$pp->sendEmailTo('adam.david108@gmail.com');

echo $pp->process($_POST);
