<?php
if ($_GET['key'] !== 'your-secret-key') {
  http_response_code(403);
  exit('Forbidden');
}
exec('/home/accommodation/repositories/southafrica/deploy.sh');
echo "Updated.";
?>
