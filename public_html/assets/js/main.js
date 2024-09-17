'use strict';

// Ваш токен бота и chat_id группы
const token = '6402112095:AAEiMcLy4raZiGg2a9SYYT1-noqKX-Qyne8';
const chat_id = '@ansormed_chat'; // Используйте @username вашей группы

// Обработка отправки формы
document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Получаем данные из формы
    let userName = document.querySelector('input[name="name"]').value;
    let userEmail = document.querySelector('input[name="email"]').value;
    let userComment = document.querySelector('textarea[name="comment"]').value;

    // Формируем сообщение
    let message = `
    *New Message from Website*
    *Name:* ${userName}
    *Email:* ${userEmail}
    *Comment:* ${userComment}
    `;

    // URL для отправки сообщения
    let url = `https://api.telegram.org/bot${token}/sendMessage`;

    // Отправка данных в Telegram
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chat_id,
            text: message,
            parse_mode: 'Markdown' // Можно использовать 'Markdown' или 'HTML'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('Сообщение отправлено успешно');
            // Очистка формы
            document.querySelector('input[name="name"]').value = '';
            document.querySelector('input[name="email"]').value = '';
            document.querySelector('textarea[name="comment"]').value = '';

            // Показ сообщения подтверждения
            document.querySelector('#form-message').textContent = 'Your message has been sent';
            document.querySelector('#form-message').style.color = 'green'; // Цвет текста
        } else {
            console.error('Ошибка отправки сообщения:', data.description);
            document.querySelector('#form-message').textContent = 'Error sending message. Please try again.';
            document.querySelector('#form-message').style.color = 'red'; // Цвет текста
        }
    })
    .catch(error => {
        console.error('Ошибка сети:', error);
        document.querySelector('#form-message').textContent = 'Network error. Please try again.';
        document.querySelector('#form-message').style.color = 'red'; // Цвет текста
    });
});



// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// navbar toggle
$('#nav-toggle').click(function(){
    $(this).toggleClass('is-active')
    $('ul.nav').toggleClass('show');
});