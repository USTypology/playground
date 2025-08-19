// This file handles the timeline feature, managing the display and interaction of historical events.

document.addEventListener("DOMContentLoaded", function() {
    const timelineData = fetchTimelineData();
    const timelineContainer = document.getElementById("timeline-container");

    function fetchTimelineData() {
        return fetch("assets/data/timeline.json")
            .then(response => response.json())
            .catch(error => console.error("Error fetching timeline data:", error));
    }

    function renderTimeline(events) {
        events.forEach(event => {
            const eventElement = document.createElement("div");
            eventElement.classList.add("timeline-event");
            eventElement.innerHTML = `
                <h3>${event.year}</h3>
                <p>${event.description}</p>
            `;
            timelineContainer.appendChild(eventElement);
        });
    }

    timelineData.then(events => {
        renderTimeline(events);
    });
});