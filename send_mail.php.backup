<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $emailRaw = trim($_POST['email'] ?? '');
    $email = filter_var($emailRaw, FILTER_VALIDATE_EMAIL) ?: '';
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $date = $_POST['date'] ?? '';
    $location = htmlspecialchars(trim($_POST['location'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    $eventTypesRaw = $_POST['event_type'] ?? [];
    $customEvent = htmlspecialchars(trim($_POST['event_custom'] ?? ''));

    if (!is_array($eventTypesRaw)) {
        $eventTypesRaw = [$eventTypesRaw];
    }

    if (in_array('Inne', $eventTypesRaw) && $customEvent !== '') {
        $eventTypesRaw = array_filter($eventTypesRaw, fn($v) => $v !== 'Inne');
        $eventTypesRaw[] = "Inne: $customEvent";
    }

    $eventTypes = implode(', ', $eventTypesRaw);

    $attractionsRaw = $_POST['attractions'] ?? [];
    $customAttraction = htmlspecialchars(trim($_POST['attraction_custom'] ?? ''));

    if (!is_array($attractionsRaw)) {
        $attractionsRaw = [$attractionsRaw];
    }

    if ($customAttraction !== '') {
        $attractionsRaw = array_filter($attractionsRaw, fn($v) => $v !== 'Inne');
        $attractionsRaw[] = "Inne: $customAttraction";
    }

    $attractions = implode(', ', $attractionsRaw);

    $wantPDF = isset($_POST['ofertaPDF']) && $_POST['ofertaPDF'] === 'on';

    $bodyHtml = "
        <p><strong>Imię i nazwisko:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Telefon:</strong> $phone</p>
        <p><strong>Data wydarzenia:</strong> $date</p>
        <p><strong>Rodzaj imprezy:</strong> $eventTypes</p>
        <p><strong>Lokalizacja:</strong> $location</p>
        <p><strong>Atrakcje:</strong> $attractions</p>
        <p><strong>Chce ofertę PDF:</strong> " . ($wantPDF ? 'Tak' : 'Nie') . "</p>
        <p><strong>Dodatkowe informacje:</strong><br>$message</p>
    ";

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'twoj@email.com';
        $mail->Password = 'twoje_haslo';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->setFrom('twoj@email.com', 'Formularz PartyStacja');

        // Wiadomość do Ciebie
        $mail->addAddress('odbiorca@email.com');
        $mail->addReplyTo($email, $name);
        $mail->isHTML(true);
        $mail->Subject = "Nowe zapytanie z formularza kontaktowego PartyStacja";
        $mail->Body = "<h2>Nowe zapytanie ze strony PartyStacja</h2>" . $bodyHtml;
        $mail->send();

        // Wiadomość do klienta
        $mail->clearAllRecipients();
        $mail->addAddress($email);
        $mail->Subject = "Dziękujemy za zapytanie – PartyStacja 🎉";
        $mail->Body = "
            <p>Dziękujemy za kontakt, $name!</p>
            <p>Oto podsumowanie Twojego zapytania:</p>
            $bodyHtml
            <br><br>
            <p>Wkrótce się z Tobą skontaktujemy 🙂</p><br>
            <p>Pozdrawiamy,<br>Zespół PartyStacja</p>
        ";

        if ($wantPDF) {
            $pdfPath = __DIR__ . '/resources/files/oferta.pdf';
            if (file_exists($pdfPath)) {
                $mail->addAttachment($pdfPath, 'Oferta_PartyStacja.pdf');
            }
        }

        $mail->send();

        echo json_encode(['success' => true, 'message' => 'Wiadomości zostały wysłane pomyślnie.']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "Błąd wysyłania: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Niepoprawna metoda żądania']);
}
