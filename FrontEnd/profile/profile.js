document.addEventListener("DOMContentLoaded", function () {
    const storedUser = JSON.parse(localStorage.getItem("registeredUser") || "{}");
    document.getElementById("username").innerText = storedUser.username || "Không có dữ liệu";
    document.getElementById("email").innerText = storedUser.email || "Không có dữ liệu";
    document.getElementById("phone").innerText = storedUser.phone || "Không có dữ liệu";
    console.log("Dữ liệu lấy từ localStorage:", storedUser); // Kiểm tra dữ liệu có đúng không
});

function logoutUser() {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("registeredUser");
        window.location.href = "../home/index.html";
    }
}
function goToHomePage() {
    window.location.href = "../home/index.html";
}