<?php
function getAdminCandlesNotificationTemplate($data) {
    $services = !empty($data['services']) ? implode(', ', $data['services']) : 'Brak wybranych usług';
    
    return "
    <!DOCTYPE html>
    <html lang='pl'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Nowe zamówienie świec - PartyTime</title>
    </head>
    <body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a0a0a;'>
        <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #0a0a0a;'>
            <tr>
                <td align='center' style='padding: 40px 20px;'>
                    <table width='600' cellpadding='0' cellspacing='0' style='background-color: #1a1a1a; border-radius: 15px; overflow: hidden; box-shadow: 0 8px 30px rgba(245, 237, 150, 0.3);'>
                        <!-- Header -->
                        <tr>
                            <td style='background: linear-gradient(135deg, #f5ed96 0%, #CFB53B 100%); padding: 30px; text-align: center;'>
                                <h1 style='margin: 0; color: #000000; font-size: 28px;'>🕯️ PartyTime</h1>
                                <p style='margin: 10px 0 0; color: #000000; font-size: 16px;'>Nowe zamówienie świec</p>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style='padding: 30px;'>
                                <table width='100%' cellpadding='0' cellspacing='0'>
                                    <!-- Alert box -->
                                    <tr>
                                        <td style='padding: 15px; background: rgba(207, 181, 59, 0.2); border-left: 4px solid #CFB53B; border-radius: 8px;'>
                                            <p style='color: #f5ed96; margin: 0; font-weight: bold;'>🔔 To zapytanie dotyczy wyłącznie świec</p>
                                        </td>
                                    </tr>
                                    
                                    <tr><td style='height: 20px;'></td></tr>
                                    
                                    <!-- Wybrane produkty -->
                                    <tr>
                                        <td style='padding: 20px; background: #2a2a2a; border-radius: 10px;'>
                                            <h3 style='color: #f5ed96; margin-top: 0;'>🕯️ Wybrane świece</h3>
                                            <p style='color: #ffffff; margin: 0; line-height: 1.8;'>{$services}</p>
                                        </td>
                                    </tr>
                                    
                                    <tr><td style='height: 20px;'></td></tr>
                                    
                                    <!-- Dane kontaktowe -->
                                    <tr>
                                        <td style='padding: 20px; background: #2a2a2a; border-radius: 10px;'>
                                            <h3 style='color: #f5ed96; margin-top: 0;'>👤 Dane kontaktowe</h3>
                                            <p style='color: #ffffff; margin: 10px 0;'><strong style='color: #f5ed96;'>Imię i nazwisko:</strong> {$data['name']}</p>
                                            <p style='color: #ffffff; margin: 10px 0;'><strong style='color: #f5ed96;'>Email:</strong> <a href='mailto:{$data['email']}' style='color: #f5ed96;'>{$data['email']}</a></p>
                                            <p style='color: #ffffff; margin: 10px 0;'><strong style='color: #f5ed96;'>Telefon:</strong> <a href='tel:{$data['phone']}' style='color: #f5ed96;'>{$data['phone']}</a></p>
                                        </td>
                                    </tr>
                                    
                                    " . (!empty($data['message']) ? "
                                    <tr><td style='height: 20px;'></td></tr>
                                    <tr>
                                        <td style='padding: 20px; background: #2a2a2a; border-radius: 10px;'>
                                            <h3 style='color: #f5ed96; margin-top: 0;'>💬 Dodatkowe informacje</h3>
                                            <p style='color: #ffffff; margin: 0; white-space: pre-wrap;'>{$data['message']}</p>
                                        </td>
                                    </tr>
                                    " : "") . "
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style='padding: 20px; text-align: center; background: #0a0a0a;'>
                                <p style='margin: 0; color: rgba(245, 237, 150, 0.6); font-size: 14px;'>
                                    PartyTime - Wyjątkowe chwile zasługują na wyjątkową oprawę
                                </p>
                                <p style='margin: 10px 0 0; color: rgba(245, 237, 150, 0.6); font-size: 12px;'>
                                    <a href='https://www.e-partytime.pl' style='color: #f5ed96; text-decoration: none;'>www.e-partytime.pl</a>
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
