<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $emailRaw = trim($_POST['email'] ?? '');
    $email = filter_var($emailRaw, FILTER_VALIDATE_EMAIL) ?: '';
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $date = $_POST['date'] ?? '';
    $location = htmlspecialchars(trim($_POST['location'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));
    
    // event_type - checkboxy, mogą być tablicą lub pojedynczą wartością
    $eventTypesRaw = $_POST['event_type'] ?? [];
    $customEvent = htmlspecialchars(trim($_POST['event_custom'] ?? ''));
    
    // Upewnij się, że $eventTypesRaw jest tablicą
    if (!is_array($eventTypesRaw)) {
        $eventTypesRaw = [$eventTypesRaw];
    }
    
    // Jeśli "Inne" jest zaznaczone i pole tekstowe uzupełnione
    if (in_array('Inne', $eventTypesRaw) && $customEvent !== '') {
        // Usuń standardowe "Inne" i dodaj dokładniejszy opis
        $eventTypesRaw = array_filter($eventTypesRaw, fn($v) => $v !== 'Inne');
        $eventTypesRaw[] = "Inne: $customEvent";
    }
    
    $eventTypes = implode(', ', $eventTypesRaw);
    
    // atrakcje - tablica checkboxów
    $attractionsRaw = $_POST['attractions'] ?? [];
    $customAttraction = htmlspecialchars(trim($_POST['attraction_custom'] ?? ''));
    
    if (!is_array($attractionsRaw)) {
        $attractionsRaw = [$attractionsRaw];
    }
    
    if ($customAttraction !== '') {
        // Usuń standardowe "Inne" i dodaj opis
        $attractionsRaw = array_filter($attractionsRaw, fn($v) => $v !== 'Inne');
        $attractionsRaw[] = "Inne: $customAttraction";
    }
    
    $attractions = implode(', ', $attractionsRaw);
    
    // Czy klient chce ofertę PDF?
    $wantPDF = isset($_POST['ofertaPDF']) && $_POST['ofertaPDF'] === 'on';

    // Treść HTML do wielokrotnego użytku
    $bodyHtml = "
        <p><strong>Imię i nazwisko:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Telefon:</strong> $phone</p>
        <p><strong>Data wydarzenia:</strong> $date</p>
        <p><strong>Rodzaj imprezy:</strong> $eventTypes</p>
        <p><strong>Lokalizacja:</strong> $location</p>
        <p><strong>Atrakcje:</strong> $attraction</p>
        <p><strong>Chce ofertę PDF:</strong> " . ($wantPDF ? 'Tak' : 'Nie') . "</p>
        <p><strong>Dodatkowe informacje:</strong><br>$message</p>
    ";

    // Tworzymy instancję PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Wspólna konfiguracja SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'twoj@email.com';
        $mail->Password = 'twoje_haslo';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->setFrom('twoj@email.com', 'Formularz PartyStacja');

        // 1️⃣ Wiadomość do Ciebie
        $mail->addAddress('odbiorca@email.com');
        $mail->addReplyTo($email, $name);
        $mail->isHTML(true);
        $mail->Subject = "Nowe zapytanie z formularza kontaktowego PartyStacja";
        $mail->Body = "<h2>Nowe zapytanie ze strony PartyStacja</h2>" . $bodyHtml;
        $mail->send();

        // 2️⃣ Wiadomość do klienta
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

        // Jeśli zażądano PDFa – załącz ofertę
        if ($wantPDF) {
            $pdfPath = __DIR__ . '/resources/files/oferta.pdf';
            if (file_exists($pdfPath)) {
                $mail->addAttachment($pdfPath, 'Oferta_PartyStacja.pdf');
            }
        }

        $mail->send();

        echo 'Wiadomości zostały wysłane pomyślnie.';
    } catch (Exception $e) {
        echo "Błąd wysyłania: {$mail->ErrorInfo}";
    }
}
