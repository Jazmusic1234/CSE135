<html>

<head>
<script src="/collector.js"></script>
</head>
<body>
<?php
  $n=10;
  function getRandomString($n) {
      $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      $randomString = '';
    
      for ($i = 0; $i < $n; $i++) {
          $index = rand(0, strlen($characters) - 1);
          $randomString .= $characters[$index];
      }
    
      return $randomString;
  }
    
  $cookie = getRandomString($n);

  header("Content-Type: application/javascript");
  header("Cache-Control: max-age=604800, public");
  header("set-cookie: " . $cookie);  

?>



<!-- <?php
  $server ="localhost";
  $user = "jcc001";
  $password = "CSE135hw1!";

  $connection = mysqli_connect($server, $user, $password);

  mysqli_selectdb($connection, 'chenjc_db') or die('Could not select database');

  $query = 'INSERT INTO chenjc_db(cookie, userAgent, )'
?> -->
</body>

</html>

