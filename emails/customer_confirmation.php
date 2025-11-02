<?php
function getCustomerConfirmationTemplate($data) {
    $services = !empty($data['services']) ? implode(', ', $data['services']) : 'Brak wybranych usług';
    
    $eventDetails = '';
    if ($data['inquiry_type'] === 'event' && !empty($data['event_date'])) {
        $eventDetails = "
        <tr>
            <td style='padding: 20px; background: #2a2a2a; border-radius: 10px;'>
                <h3 style='color: #f5ed96; margin-top: 0;'>📅 Szczegóły wydarzenia</h3>
                <p style='color: #ffffff; margin: 10px 0;'><strong style='color: #f5ed96;'>Rodzaj:</strong> {$data['event_type']}</p>
                " . (!empty($data['event_date']) ? "<p style='color: #ffffff; margin: 10px 0;'><strong style='color: #f5ed96;'>Data:</strong> {$data['event_date']}</p>" : "") . "
                " . (!empty($data['location']) ? "<p style='color: #ffffff; margin: 10px 0;'><strong style='color: #f5ed96;'>Lokalizacja:</strong> {$data['location']}</p>" : "") . "
                " . (!empty($data['guest_count']) ? "<p style='color: #ffffff; margin: 10px 0;'><strong style='color: #f5ed96;'>Liczba gości:</strong> {$data['guest_count']}</p>" : "") . "
            </td>
        </tr>
        <tr><td style='height: 20px;'></td></tr>";
    }
    
    return "
    <!DOCTYPE html>
    <html lang='pl'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Potwierdzenie zapytania - PartyTime</title>
    </head>
    <body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a0a0a;'>
        <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #0a0a0a;'>
            <tr>
                <td align='center' style='padding: 40px 20px;'>
                    <table width='600' cellpadding='0' cellspacing='0' style='background-color: #1a1a1a; border-radius: 15px; overflow: hidden; box-shadow: 0 8px 30px rgba(245, 237, 150, 0.3);'>
                        <!-- Header -->
                        <tr>
                            <td style='background: linear-gradient(135deg, #f5ed96 0%, #CFB53B 100%); padding: 30px; text-align: center;'>
                                <h1 style='margin: 0; color: #000000; font-size: 32px;'>🎉 PartyTime</h1>
                                <p style='margin: 10px 0 0; color: #000000; font-size: 18px; font-weight: bold;'>Dziękujemy za kontakt!</p>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style='padding: 30px;'>
                                <table width='100%' cellpadding='0' cellspacing='0'>
                                    <!-- Greeting -->
                                    <tr>
                                        <td>
                                            <p style='color: #ffffff; font-size: 16px; line-height: 1.6; margin: 0 0 20px;'>
                                                Witaj <strong style='color: #f5ed96;'>{$data['name']}</strong>! 👋
                                            </p>
                                            <p style='color: #ffffff; font-size: 16px; line-height: 1.6; margin: 0 0 20px;'>
                                                Otrzymaliśmy Twoje zapytanie i wkrótce się z Tobą skontaktujemy. 
                                                Zazwyczaj odpowiadamy w ciągu <strong style='color: #f5ed96;'>24 godzin</strong>.
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Divider -->
                                    <tr>
                                        <td style='padding: 20px 0;'>
                                            <div style='height: 2px; background: linear-gradient(to right, transparent, #f5ed96, transparent);'></div>
                                        </td>
                                    </tr>
                                    
                                    <!-- Summary title -->
                                    <tr>
                                        <td>
                                            <h2 style='color: #f5ed96; font-size: 20px; margin: 0 0 20px;'>📋 Podsumowanie Twojego zapytania</h2>
                                        </td>
                                    </tr>
                                    
                                    <!-- Event Details -->
                                    {$eventDetails}
                                    
                                    <!-- Selected services -->
                                    <tr>
                                        <td style='padding: 20px; background: #2a2a2a; border-radius: 10px;'>
                                            <h3 style='color: #f5ed96; margin-top: 0;'>✅ Wybrane usługi</h3>
                                            <p style='color: #ffffff; margin: 0; line-height: 1.8;'>{$services}</p>
                                        </td>
                                    </tr>
                                    
                                    " . (!empty($data['message']) ? "
                                    <tr><td style='height: 20px;'></td></tr>
                                    <tr>
                                        <td style='padding: 20px; background: #2a2a2a; border-radius: 10px;'>
                                            <h3 style='color: #f5ed96; margin-top: 0;'>💬 Twoja wiadomość</h3>
                                            <p style='color: #ffffff; margin: 0; white-space: pre-wrap;'>{$data['message']}</p>
                                        </td>
                                    </tr>
                                    " : "") . "
                                    
                                    <!-- Divider -->
                                    <tr>
                                        <td style='padding: 20px 0;'>
                                            <div style='height: 2px; background: linear-gradient(to right, transparent, #f5ed96, transparent);'></div>
                                        </td>
                                    </tr>
                                    
                                    <!-- Contact info -->
                                    <tr>
                                        <td style='padding: 20px; background: rgba(245, 237, 150, 0.1); border-radius: 10px; border: 1px solid rgba(245, 237, 150, 0.3);'>
                                            <h3 style='color: #f5ed96; margin-top: 0;'>📞 Potrzebujesz szybszej odpowiedzi?</h3>
                                            <p style='color: #ffffff; margin: 10px 0;'>Możesz skontaktować się z nami bezpośrednio:</p>
                                            <p style='color: #ffffff; margin: 10px 0;'>
                                                <strong style='color: #f5ed96;'>Email:</strong> 
                                                <a href='mailto:kontakt@e-partytime.pl' style='color: #f5ed96;'>kontakt@e-partytime.pl</a>
                                            </p>
                                            <p style='color: #ffffff; margin: 10px 0;'>
                                                <strong style='color: #f5ed96;'>Telefon:</strong> 
                                                <a href='tel:+48123456789' style='color: #f5ed96;'>+48 123 456 789</a>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style='padding: 20px; text-align: center; background: #0a0a0a;'>
                                <p style='margin: 0 0 10px; color: #f5ed96; font-size: 16px; font-weight: bold;'>
                                    Wyjątkowe chwile zasługują na wyjątkową oprawę ✨
                                </p>
                                <p style='margin: 0; color: rgba(245, 237, 150, 0.6); font-size: 14px;'>
                                    Odwiedź nas na <a href='https://www.e-partytime.pl' style='color: #f5ed96; text-decoration: none;'>www.e-partytime.pl</a>
                                </p>
                                <p style='margin: 10px 0 0; color: rgba(245, 237, 150, 0.4); font-size: 12px;'>
                                    To wiadomość automatyczna - nie odpowiadaj na nią. Skontaktuj się z nami pod adresem kontakt@e-partytime.pl
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    ";
}
?>
