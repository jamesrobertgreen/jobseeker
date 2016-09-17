<?PHP
header('Access-Control-Allow-Origin: *');
$valid_url_regex = '/.*/';

// ############################################################################

$url = $_GET['url'];

if ( !$url ) {
  
  // Passed url not specified.
  $contents = 'ERROR: url not specified';
  $status = array( 'http_code' => 'ERROR' );
  
} else if ( !preg_match( $valid_url_regex, $url ) ) {
  
  // Passed url doesn't match $valid_url_regex.
  $contents = 'ERROR: invalid url';
  $status = array( 'http_code' => 'ERROR' );
  
} else {
  $ch = curl_init( $url );
  
  curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
  curl_setopt( $ch, CURLOPT_HEADER, true );
  curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
  
  list( $header, $contents ) = preg_split( '/([\r\n][\r\n])\\1/', curl_exec( $ch ), 2 );
  
  $status = curl_getinfo( $ch );
  
  curl_close( $ch );
}

// Split header text into an array.
$header_text = preg_split( '/[\r\n]+/', $header );

  
  // $data will be serialized into JSON data.
  $data = array();
  

    $data['headers'] = array();
    
    foreach ( $header_text as $header ) {
      preg_match( '/^(.+?):\s+(.*)$/', $header, $matches );
      if ( $matches ) {
        $data['headers'][ $matches[1] ] = $matches[2];
      }
    }
  
  

    $data['status'] = array();
    $data['status']['http_code'] = $status['http_code'];
  
  
  // Set the JSON data object contents, decoding it from JSON if possible.
  $decoded_json = json_decode( $contents );
  $data['contents'] = $decoded_json ? $decoded_json : $contents;
  
  // Generate appropriate content-type header.
  $is_xhr = true;
  header( 'Content-type: application/' . ( $is_xhr ? 'json' : 'x-javascript' ) );
  
  // Get JSONP callback.
  $jsonp_callback = true;
  
  // Generate JSON/JSONP string
  $json = json_encode( $data );
  
  print $json;
  


?>