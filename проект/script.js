ymaps.ready(init);
 
     function init() {
         var map = new ymaps.Map('map', {
             center: [55.7522, 37.6156],
             zoom: 15,
         });
 
         var addMarkerBtn = document.getElementById('addMarkerBtn');
         addMarkerBtn.addEventListener('click', function () {
             showOptionsForm();
         });
 
         var selectedOption;  
 
         function showOptionsForm() {
            var existingForm = document.getElementById('optionsForm');
        if (existingForm) {
            existingForm.remove(); // Удаляем существующий элемент
        }


             var options = [
                 { name: 'Снег завалил дорогу', image: './img/snowroad.svg', class: 'snow-button' },
                 { name: 'Мокрый пол', image: './img/att.svg', class: 'snow-button1' },
                 { name: 'Мусор', image: './img/trash.svg', class: 'snow-button2' },
                 { name: 'Гололед', image: './img/ice.svg', class: 'snow-button2' },
                 { name: 'Дикие животные', image: './img/anml.svg', class: 'snow-button2' },
                 { name: 'Строительные работы', image: './img/build.svg', class: 'snow-button2' },
                 { name: 'Электропроводка', image: './img/elctr.svg', class: 'snow-button2' },
             ];
 
             var optionForm = document.createElement('div');
             optionForm.id = 'optionsForm';
             optionForm.innerHTML = '<p>Выберите вариант:</p>';
 
             options.forEach(function (option) {
                 var optionBtn = document.createElement('button');
                 optionBtn.textContent = option.name;
                 
                 if (option.class) {
                    optionBtn.classList.add(option.class);
                 }

                 optionBtn.addEventListener('click', function () {
                     selectedOption = option;
                     optionForm.style.display = 'none';
                     allowMarkerPlacement();
                 });
                 optionForm.appendChild(optionBtn);
             });
 
             document.body.appendChild(optionForm);
             var mainArticle = document.getElementById('mainArticle');

            // Проверяем, что элемент <article> существует
            if (mainArticle) {
                // Добавляем форму внутрь элемента <article>
                mainArticle.appendChild(optionForm);
            }
         }
 
         function allowMarkerPlacement() {
             map.container.getElement().classList.add('allow-marker-placement');
 
             function onMapClick(e) {
                 var coords = e.get('coords');
                 addYandexMapMarker(coords, selectedOption);
                 map.events.remove('click', onMapClick);
                 map.container.getElement().classList.remove('allow-marker-placement');
             }
 
             map.events.remove('click', onMapClick);
             map.events.add('click', onMapClick);
         }
        
        // Функция добавления метки
        // Функция добавления метки
// Функция добавления метки
function addYandexMapMarker(coords, option) {
    if (map.getZoom() >= 12) {
        var placemark = new ymaps.Placemark(coords, {
            hintContent: coords.join('<br>'),
            balloonContent: option.name,
        }, {
            iconLayout: 'default#image',
            iconImageHref: option.image,
            iconImageSize: [40, 40],
            iconImageOffset: [-15, -15]
        });

        var deleteBtn = '<button class="delete-marker-btn" onclick="deleteMarker(this)">Удалить метку</button>';
        placemark.properties.set('balloonContent', '<div class="custom-balloon">' +
            '<div class="custom-balloon-header">' + option.name + '</div>' +
            '<div class="custom-balloon-body">' + deleteBtn + '</div>' +
            '</div>');

        map.geoObjects.add(placemark);
    }
}




        
 
         // Функция удаления метки
         window.deleteMarker = function (btn) {
             var geoObject = map.geoObjects.get(map.geoObjects.getLength() - 1);
             map.geoObjects.remove(geoObject);
         };
         
         // Слушаем изменение масштаба карты
        map.events.add('boundschange', function (e) {
        var newZoom = e.get('newZoom');
        // Проверяем уровень масштабирования
        if (newZoom < 15) {
            // Скрываем все метки при недостаточном уровне масштабирования
            map.geoObjects.each(function (geoObject) {
                geoObject.options.set('visible', false);
            });
        } else {
            // Показываем все метки при достаточном уровне масштабирования
            map.geoObjects.each(function (geoObject) {
                geoObject.options.set('visible', true);
            });
        }
    });
     }
    
     document.addEventListener("DOMContentLoaded", function () {
        var burgerMenu = document.querySelector(".burger-menu");
        var mainMenu = document.querySelector(".main-menu");
    
        burgerMenu.addEventListener("click", function () {
          mainMenu.style.display = mainMenu.style.display === "block" ? "none" : "block";
        });
      });







      