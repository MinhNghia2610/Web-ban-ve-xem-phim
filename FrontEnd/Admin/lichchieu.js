document.addEventListener("DOMContentLoaded", function () {
    loadSchedules();
});

function loadSchedules() {
    const scheduleTable = document.getElementById("scheduleTable");
    scheduleTable.innerHTML = `
        <tr>
            <td>1</td>
            <td>Dune 2</td>
            <td>2025-04-01</td>
            <td>18:00</td>
            <td>Rạp 1</td>
            <td>
                <button onclick="editSchedule(this)">Sửa</button>
                <button onclick="deleteSchedule(this)">Xóa</button>
            </td>
        </tr>`;
}

function addSchedule() {
    const scheduleTable = document.getElementById("scheduleTable");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>New</td>
        <td><input type="text" placeholder="Tên phim"></td>
        <td><input type="date"></td>
        <td><input type="time"></td>
        <td><input type="text" placeholder="Phòng chiếu"></td>
        <td>
            <button onclick="saveSchedule(this)">Lưu</button>
            <button onclick="deleteSchedule(this)">Xóa</button>
        </td>`;
    scheduleTable.appendChild(newRow);
}

function editSchedule(button) {
    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName("td");
    
    cells[1].innerHTML = `<input type="text" value="${cells[1].innerText}">`;
    cells[2].innerHTML = `<input type="date" value="${cells[2].innerText}">`;
    cells[3].innerHTML = `<input type="time" value="${cells[3].innerText}">`;
    cells[4].innerHTML = `<input type="text" value="${cells[4].innerText}">`;
    
    button.outerHTML = `<button onclick="saveSchedule(this)">Lưu</button>`;
}

function saveSchedule(button) {
    const row = button.parentElement.parentElement;
    const inputs = row.getElementsByTagName("input");
    
    row.innerHTML = `
        <td>Updated</td>
        <td>${inputs[0].value}</td>
        <td>${inputs[1].value}</td>
        <td>${inputs[2].value}</td>
        <td>${inputs[3].value}</td>
        <td>
            <button onclick="editSchedule(this)">Sửa</button>
            <button onclick="deleteSchedule(this)">Xóa</button>
        </td>`;
}

function deleteSchedule(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}
