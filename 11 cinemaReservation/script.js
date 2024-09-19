const container = document.querySelector(".container");
let count = document.getElementById("count");
let amount = document.getElementById("amount");
let select = document.querySelector("#movie");
const seats = document.querySelectorAll('.seat:not(.reserved)')


getFromLocalStorage();
calculateTotal();

container.addEventListener("click", (e) => {
    if (e.target.classList.contains('seat') && !(e.target.classList.contains('reserved'))) {
        e.target.classList.toggle("selected");
        calculateTotal();
    };
});

select.addEventListener("change", () => {
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll(".seat.selected");
    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach((seat) => {
        selectedSeatsArr.push(seat);
    });

    seats.forEach((seat) => {
        seatsArr.push(seat);
    });

    let selectedSeatIndexs = selectedSeatsArr.map((seat) => {
        return seatsArr.indexOf(seat);
    });

    const selectetSeats = container.querySelectorAll('.seat.selected');
    let selectedSeatsLength = selectetSeats.length;
    count.innerHTML = selectedSeatsLength;
    amount.innerHTML = selectedSeatsLength * select.value;

    saveToLocalStorage(selectedSeatIndexs);
};

function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
};


function getFromLocalStorage() {
    let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            };
        });
    };

    let selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    };

};
