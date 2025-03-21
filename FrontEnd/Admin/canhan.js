function editField(field) {
    let span = document.getElementById(field);
    let input = document.getElementById("edit-" + field);

    if (input.style.display === "none") {
        input.value = span.innerText; // Lấy dữ liệu cũ vào ô nhập
        span.style.display = "none";
        input.style.display = "inline-block";
    } else {
        span.innerText = input.value; // Lưu giá trị mới
        span.style.display = "inline";
        input.style.display = "none";
    }
}
