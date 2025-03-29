document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/api/schedule")
        .then(response => response.json())
        .then(data => {
            const scheduleContainer = document.getElementById("scheduleContainer");
            scheduleContainer.innerHTML = "";
            data.forEach(schedule => {
                const scheduleCard = document.createElement("div");
                scheduleCard.className = "schedule-card";
                scheduleCard.innerHTML = `
                    <h2>${schedule.day}</h2>
                    <p>${schedule.openingHours}</p>
                    <div class="movie-times">
                        ${schedule.showtimes.map(time => `<span class="time">${time}</span>`).join(" ")}
                    </div>
                `;
                scheduleContainer.appendChild(scheduleCard);
            });
        })
        .catch(error => console.error("Lỗi khi tải lịch chiếu:", error));
});