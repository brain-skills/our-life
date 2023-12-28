document.addEventListener('DOMContentLoaded', function () {
    const tableContainer = document.getElementById('tableContainer');
    const birthdateInput = document.getElementById('birthdateInput');

    const headerRow = document.createElement('div');
    headerRow.className = 'header-row';
    const emptyCell = document.createElement('div');
    emptyCell.className = 'row-number';
    headerRow.appendChild(emptyCell);
    for (let j = 0; j < 52; j++) {
        const headerCell = document.createElement('div');
        headerCell.className = 'header-cell';
        headerCell.textContent = j + 1;
        headerRow.appendChild(headerCell);
    }
    tableContainer.appendChild(headerRow);

    for (let i = 0; i < 90; i++) {
        const row = document.createElement('div');
        row.className = 'clearfix';
        const rowNumberCell = document.createElement('div');
        rowNumberCell.className = 'row-number';
        rowNumberCell.textContent = i + 1;
        row.appendChild(rowNumberCell);
        for (let j = 0; j < 52; j++) {
            const square = document.createElement('div');
            square.className = 'square';
            row.appendChild(square);
        }
        tableContainer.appendChild(row);
    }

    birthdateInput.addEventListener('input', function () {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => square.classList.remove('highlight'));

        const selectedDate = new Date(birthdateInput.value);
        if (selectedDate) {
            const { age, week } = getAgeAndWeekNumber(selectedDate);
            const row = document.querySelector(`.clearfix:nth-child(${age})`);
            if (row) {
                const square = row.querySelector(`.square:nth-child(${week})`);
                if (square) {
                    square.classList.add('highlight');
                }
            }
        }
    });

    function getAgeAndWeekNumber(selectedDate) {
        const currentDate = new Date();
        const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        const timeDiff = currentDate - startDate;
        const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const age = Math.floor(dayDiff / 365);
        const remainingDays = dayDiff % 365;
        const weeksLived = Math.ceil(remainingDays / 7) + 1;

        return { age: age + 1, week: weeksLived };
    }
});

function calculateDays() {
    // Получаем введенную дату из поля ввода
    var birthdateInput = document.getElementById("birthdateInput").value;
    // Преобразуем строку с датой в объект Date
    var birthdate = new Date(birthdateInput);
    // Текущая дата
    var currentDate = new Date();
    // Вычисляем разницу в миллисекундах между текущей датой и датой рождения
    var timeDiff = currentDate - birthdate;
    // Вычисляем количество дней
    var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    // Вычисляем количество недель
    var weeks = Math.floor(days / 7);
    // Выводим результаты в соответствующие теги span
    document.getElementById("lifedays").innerText = days;
    document.getElementById("leftdays").innerText = 36525 - days; // Предполагаем 100 лет жизни (36525 дней)
    document.getElementById("lifeweeks").innerText = weeks;
    document.getElementById("leftweeks").innerText = Math.floor((36525 - days) / 7);
}