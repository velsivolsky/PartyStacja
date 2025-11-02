<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Load email templates
require __DIR__ . '/emails/customer_confirmation.php';
require __DIR__ . '/emails/admin_general_notification.php';
require __DIR__ . '/emails/admin_candles_notification.php';

header('Content-Type: application/json; charset=utf-8');

// ============================================
// SMTP CONFIGURATION - Replace with your values
// ============================================
define('SMTP_HOST', 'serwer2590517.home.pl');        // Your SMTP server
define('SMTP_PORT', 465);                        // 587 for TLS, 465 for SSL
define('SMTP_USERNAME', 'noreply@e-partytime.pl'); // Your SMTP username
define('SMTP_PASSWORD', 'n0r3plyep4rtyt1m3');   // Your SMTP password
define('SMTP_SECURE', 'ssl');                    // 'tls' or 'ssl'

// Email addresses
define('EMAIL_FROM', 'noreply@e-partytime.pl');
define('EMAIL_FROM_NAME', 'e-PartyTime');
define('EMAIL_CANDLES', 'swiece@e-partytime.pl');
define('EMAIL_GENERAL', 'kontakt@e-partytime.pl');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Basic contact info
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $emailRaw = trim($_POST['email'] ?? '');
    $email = filter_var($emailRaw, FILTER_VALIDATE_EMAIL) ?: '';
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));
    
    // Inquiry type
    $inquiryType = htmlspecialchars(trim($_POST['inquiry_type'] ?? ''));
    
    // Event details (if applicable)
    $eventType = htmlspecialchars(trim($_POST['event_type'] ?? ''));
    $eventCustom = htmlspecialchars(trim($_POST['event_custom'] ?? ''));
    $eventDate = $_POST['event_date'] ?? '';
    $location = htmlspecialchars(trim($_POST['location'] ?? ''));
    $guestCount = htmlspecialchars(trim($_POST['guest_count'] ?? ''));
    
    // Combine event type
    $eventTypeDisplay = $eventType;
    if ($eventType === 'Inne' && $eventCustom !== '') {
        $eventTypeDisplay = "Inne: $eventCustom";
    }
    
    // Services
    $servicesRaw = $_POST['services'] ?? [];
    if (!is_array($servicesRaw)) {
        $servicesRaw = [$servicesRaw];
    }
    $services = array_map('htmlspecialchars', $servicesRaw);
    
    // Prepare data array for templates
    $data = [
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'message' => $message,
        'inquiry_type' => $inquiryType,
        'event_type' => $eventTypeDisplay,
        'event_date' => $eventDate,
        'location' => $location,
        'guest_count' => $guestCount,
        'services' => $services
    ];
    
    // ============================================
    // DETERMINE ROUTING: Candles only or general
    // ============================================
    $isCandlesOnly = false;
    if (count($services) > 0) {
        // Check if ALL services contain "Świec" (candles)
        $allCandles = true;
        foreach ($services as $service) {
            if (stripos($service, 'Świec') === false) {
                $allCandles = false;
                break;
            }
        }
        $isCandlesOnly = $allCandles;
    }
    
    // Choose admin email and template
    $adminEmail = $isCandlesOnly ? EMAIL_CANDLES : EMAIL_GENERAL;
    $adminTemplate = $isCandlesOnly 
        ? getAdminCandlesNotificationTemplate($data) 
        : getAdminGeneralNotificationTemplate($data);
    
    // Customer confirmation template
    $customerTemplate = getCustomerConfirmationTemplate($data);
    
    // ============================================
    // SEND EMAILS
    // ============================================
    $mail = new PHPMailer(true);
    
    try {
        // Configure SMTP
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port = SMTP_PORT;
        $mail->CharSet = 'UTF-8';
        
        // ============================================
        // 1. Send notification to ADMIN
        // ============================================
        $mail->setFrom(EMAIL_FROM, EMAIL_FROM_NAME);
        $mail->addAddress($adminEmail);
        $mail->addReplyTo($email, $name); // Reply-to customer
        $mail->isHTML(true);
        
        if ($isCandlesOnly) {
            $mail->Subject = "🕯️ Nowe zamówienie świec - PartyTime";
        } else {
            $mail->Subject = "🎉 Nowe zapytanie z formularza - PartyTime";
        }
        
        $mail->Body = $adminTemplate;
        $mail->send();
        
        // ============================================
        // 2. Send confirmation to CUSTOMER
        // ============================================
        $mail->clearAllRecipients();
        $mail->clearReplyTos();
        
        $mail->setFrom(EMAIL_FROM, EMAIL_FROM_NAME);
        $mail->addAddress($email, $name);
        $mail->addReplyTo(EMAIL_GENERAL, 'PartyTime'); // Reply-to general contact
        
        $mail->Subject = "✨ Potwierdzenie zapytania - PartyTime";
        $mail->Body = $customerTemplate;
        
        $mail->send();
        
        echo json_encode([
            'success' => true, 
            'message' => 'Wiadomości zostały wysłane pomyślnie.',
            'debug' => [
                'candles_only' => $isCandlesOnly,
                'admin_email' => $adminEmail
            ]
        ]);
        
    } catch (Exception $e) {
        echo json_encode([
            'success' => false, 
            'message' => "Błąd wysyłania: {$mail->ErrorInfo}"
        ]);
    }
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Niepoprawna metoda żądania'
    ]);
}
