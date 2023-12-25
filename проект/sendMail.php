<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $comment = $_POST["comment"];

    // Замените 'your_email@example.com' на вашу электронную почту
    $to = "Shahrom311219@gmail.com";
    $subject = "Новый комментарий от $name";
    $message = "Имя: $name\n\nКомментарий:\n$comment";

    mail($to, $subject, $message);

    // Отправка ответа клиенту (может быть использована для обработки на стороне клиента)
    echo json_encode(["success" => true]);
} else {
    // Если запрос не является POST, отправляем ошибку
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
