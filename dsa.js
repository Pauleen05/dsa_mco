let busCategories = {
  luxury: [
    { name: "Luxury Bus-L1", price: 1000, seats: 30 },
    { name: "Luxury Bus-L2", price: 1000, seats: 30 },
    { name: "Luxury Bus-L3", price: 1000, seats: 30 }
  ],
  aircon: [
    { name: "Airconditioned-AC1", price: 700, seats: 30 },
    { name: "Airconditioned-AC2", price: 700, seats: 30 },
    { name: "Airconditioned-AC3", price: 700, seats: 30 }
  ],
  minibus: [
    { name: "Minibus-M1", price: 500, seats: 25 },
    { name: "Minibus-M2", price: 500, seats: 25 },
    { name: "Minibus-M3", price: 500, seats: 25 }
  ],
  uvx: [
    { name: "UV Express-U1", price: 250, seats: 20 },
    { name: "UV Express-U2", price: 250, seats: 20 },
    { name: "UV Express-U3", price: 250, seats: 20 }
  ]
};

let bookingList = [];

// Login
function login() {
  let passengerName = prompt("Enter your Name:");
  if (!passengerName) {
    alert("Name is Required.");
    return null;
  }
  alert("Welcome " + passengerName);
  return passengerName;
}

// Choose a category
function chooseBusCategory() {
  let type = prompt("Choose a Bus Category (luxury, aircon, minibus, uvx):").toLowerCase();

  if (!busCategories[type]) {
    alert("Invalid Category.");
    return null;
  }

  let info = "Available buses:\n";
  busCategories[type].forEach((bus, index) => {
    info += `${index + 1}. ${bus.name} - ₱${bus.price} - Seats: ${bus.seats}\n`;
  });

  alert(info);

  let busChoice = parseInt(prompt("Choose a bus number(1,2,3):")) - 1;

  if (busChoice < 0 || busChoice >= busCategories[type].length) {
    alert("Invalid bus selection.");
    return null;
  }

  return { type, busChoice };
}

// Reserve a seat
function reserveSeat(passenger, type, busChoice) {
  let seat = prompt("Enter Seat Number to Reserve:");
  let selectedBus = busCategories[type][busChoice];

  for (let booking of bookingList) {
    if (
      booking.passenger === passenger &&
      booking.bus === selectedBus.name &&
      booking.seat === seat
    ) {
      alert("Seat Already Reserved by You.");
      return;
    }
  }

  if (selectedBus.seats <= 0) {
    alert("No seats left.");
    return;
  }

  bookingList.push({
    passenger: passenger,
    category: type,
    bus: selectedBus.name,
    seat: seat,
    cost: selectedBus.price,
    paid: false,
    paymentMethod: null,
    proof: null
  });

  selectedBus.seats--;
  alert("Seat reserved successfully!");
}

// Cancel a reservation
function cancelSeat(passenger) {
  let busName = prompt("Enter Bus Name to Cancel:");
  let seat = prompt("Enter Seat Number to Cancel:");

  for (let i = 0; i < bookingList.length; i++) {
    let booking = bookingList[i];
    if (
      booking.passenger === passenger &&
      booking.bus === busName &&
      booking.seat === seat
    ) {
      bookingList.splice(i, 1);

      for (let category in busCategories) {
        for (let bus of busCategories[category]) {
          if (bus.name === busName) {
            bus.seats++;
            alert("Reservation canceled.");
            return;
          }
        }
      }
    }
  }

  alert("Reservation Not Found.");
}

// Make a payment
function makePayment(passenger) {
  let busName = prompt("Enter Bus Name for Payment:");
  let seat = prompt("Enter Seat Number for Payment:");
  let method = prompt("Payment method? (Cash or GCash):").toLowerCase();

  if (method !== "cash" && method !== "gcash") {
    alert("Invalid payment method.");
    return;
  }

  let proof = null;
  if (method === "gcash") {
    proof = prompt("Enter GCash Payment Photo or URL:");
    if (!proof) {
      alert("GCash payment requires a photo.");
      return;
    }
  }

  for (let booking of bookingList) {
    if (
      booking.passenger === passenger &&
      booking.bus === busName &&
      booking.seat === seat
    ) {
      booking.paid = true;
      booking.paymentMethod = method;
      booking.proof = proof;
      alert("Payment Successful Via " + method.toUpperCase());
      return;
    }
  }

  alert("Reservation Not Found.");
}

// Print all reservations
function printReservations() {
  if (bookingList.length === 0) {
    alert("No reservations yet.");
    return;
  }

  let summary = "";
  bookingList.forEach(booking => {
    summary += `Passenger: ${booking.passenger}\nBus: ${booking.bus} (${booking.category})\nSeat: ${booking.seat}\nPrice: ₱${booking.cost}\nPaid: ${booking.paid ? "Yes" : "No"}\nMethod: ${booking.paymentMethod || "N/A"}\nPhoto: ${booking.proof || "None"}\n-----\n`;
  });

  alert(summary);
}

// Main menu
function main() {
  let currentUser = login();
  if (!currentUser) return;

  while (true) {
    let option = prompt(
      "Choose an option:\n1. Reserve Seat\n2. Cancel Seat\n3. Make Payment\n4. View Reservations\n5. Exit"
    );

    if (option === "1") {
      let details = chooseBusCategory();
      if (details) reserveSeat(currentUser, details.type, details.busChoice);
    } else if (option === "2") {
      cancelSeat(currentUser);
    } else if (option === "3") {
      makePayment(currentUser);
    } else if (option === "4") {
      printReservations();
    } else if (option === "5") {
      alert("Thank you and Goodbye!");
      break;
    } else {
      alert("Invalid Option.");
    }
  }
}

main();
