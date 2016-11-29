$(document).ready(function () {

    var ifAuth = true;
    var data_result;
    var playerName = "Endy";


    var game = function (data_result, i) {

        $("#obj1-name").text(data_result[i].name);
        $("#obj1-value").text(data_result[i].value);

        $("#obj2-name").text(data_result[i + 1].name);
        $("#obj2-value").text(data_result[i + 1].value);
    };
    //запись результата в таблицу статистики
    function setStat(name, result) {
        $.ajax({
            url: "http://127.0.0.1:8000/stat/",
            method: "POST",
            dataType: 'json',
            data: {
                login: name,
                result: result
            },
            success: function (data) {
                alert(data);
            }
        });
    }

    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", $.cookie().csrftoken);
            }
        }
    });

    //получение данных для построения таблицы рекордов
    $.ajax({
        method: 'get',
        url: 'http://127.0.0.1:8000/stat/',
        dataType: 'json',
        data: {format: 'json'},
        success: function (data) {
            data_result = data.results;
        }
    }).done(function () {
        //построение таблицы
        var records = "<table>";
        records += "<thead><tr><th>Position</th><th>Name</th><th>Result</th></tr></thead>";
        for (var i = 0; i < data_result.length; i++) {
            records += "<tr>";
            records += "<td>" + (i + 1) + "</td>";
            records += "<td>" + data_result[i].login + "</td>";
            records += "<td>" + data_result[i].result + "</td>";
            records += "</tr>";
        }
        records += "</table>";
        $("#rec").html(records);
    });

    //тут будет авторизация
    if (ifAuth) {

        $(".user").text(playerName);
        //грузим вопросы из базы
        $.ajax({
            method: 'get',
            url: 'http://127.0.0.1:8000/elements/',
            dataType: 'json',
            data: {format: 'json'},
            success: function (data) {
                data_result = data.results;
                console.log(data_result);
            }
        }).done(function () {
            //вывод первой пары объектов
            var i = 0;
            game(data_result, i);

            //при клике проверка
            $('#buttonHigher').click(function () {
                if (data_result[i + 1].value >= data_result[i].value) {//если ответ верный, игра продолжается
                    i++;//увеличение счетчика
                    game(data_result, i);//загрузка следующего бьекта игра
                } else {//если ответ не верный, игра окончена
                    setStat(playerName, i);//запись результата в бд
                    window.location = 'http://127.0.0.1:8000/client';//пееход на главную
                }
            });

            $('#buttonLover').click(function () {
                if (data_result[i + 1].value >= data_result[i].value) {
                    setStat(playerName, i);
                    window.location = 'http://127.0.0.1:8000/client';
                } else {
                    console.log('true');
                    i++;
                    game(data_result, i);
                }
            });
        });
    }
});