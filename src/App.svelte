<script>
  let page = "home";
  let menuOpen = false;
  let search = "";
  let selectedCategory = "All";
  let selectedEvent = null;
  let selectedSeats = [];
  let ticketType = "Standard";
  let quantity = 1;
  let checkoutComplete = false;
  let toast = "";

  const categories = [
    "All",
    "Music",
    "Technology",
    "Art",
    "Business",
    "Wellness",
    "Food",
    "Culture"
  ];

  const events = [
    {
      id: 1,
      title: "The Night Assembly",
      category: "Music",
      date: "24",
      month: "SEP",
      weekday: "THURSDAY",
      time: "8:00 PM",
      venue: "The Crescent Hall",
      city: "Dubai",
      country: "UAE",
      price: 85,
      imageClass: "event-one",
      tag: "FEATURED",
      description:
        "An immersive evening of live music, cinematic sound and unforgettable performances in one of Dubai's most intimate venues.",
      organizer: "Morrow Live",
      seats: 120,
      ticketTypes: [
        { name: "Standard", price: 85 },
        { name: "Premium", price: 140 },
        { name: "VIP", price: 220 }
      ]
    },

    {
      id: 2,
      title: "Future / Founders",
      category: "Business",
      date: "03",
      month: "OCT",
      weekday: "SATURDAY",
      time: "10:00 AM",
      venue: "The Foundry",
      city: "London",
      country: "UK",
      price: 120,
      imageClass: "event-two",
      tag: "BUSINESS",
      description:
        "A private gathering of founders, product leaders and creative entrepreneurs exploring the next generation of businesses.",
      organizer: "Future Assembly",
      seats: 80,
      ticketTypes: [
        { name: "Standard", price: 120 },
        { name: "Executive", price: 240 },
        { name: "Founder", price: 420 }
      ]
    },

    {
      id: 3,
      title: "Digital Matter",
      category: "Technology",
      date: "11",
      month: "OCT",
      weekday: "SUNDAY",
      time: "6:30 PM",
      venue: "Atlas Convention Center",
      city: "Singapore",
      country: "Singapore",
      price: 65,
      imageClass: "event-three",
      tag: "TECH",
      description:
        "A future-facing technology event focused on AI, digital products, engineering and the people building what comes next.",
      organizer: "Digital Matter",
      seats: 200,
      ticketTypes: [
        { name: "Standard", price: 65 },
        { name: "Pro", price: 125 },
        { name: "All Access", price: 260 }
      ]
    },

    {
      id: 4,
      title: "Form & Light",
      category: "Art",
      date: "18",
      month: "OCT",
      weekday: "SUNDAY",
      time: "7:00 PM",
      venue: "North Gallery",
      city: "Paris",
      country: "France",
      price: 45,
      imageClass: "event-four",
      tag: "ART",
      description:
        "A contemporary art exhibition bringing sculpture, light and experimental installations together for one evening.",
      organizer: "North Gallery",
      seats: 70,
      ticketTypes: [
        { name: "General", price: 45 },
        { name: "Curator", price: 90 },
        { name: "Collector", price: 180 }
      ]
    },

    {
      id: 5,
      title: "Reset Weekend",
      category: "Wellness",
      date: "24",
      month: "OCT",
      weekday: "SATURDAY",
      time: "9:00 AM",
      venue: "Sol House",
      city: "Lisbon",
      country: "Portugal",
      price: 110,
      imageClass: "event-five",
      tag: "WELLNESS",
      description:
        "A full-day experience built around movement, food, meditation and intentional time away from the noise.",
      organizer: "Sol Collective",
      seats: 50,
      ticketTypes: [
        { name: "Day Pass", price: 110 },
        { name: "Plus", price: 180 },
        { name: "Private", price: 320 }
      ]
    },

    {
      id: 6,
      title: "Table No. 7",
      category: "Food",
      date: "31",
      month: "OCT",
      weekday: "SATURDAY",
      time: "7:30 PM",
      venue: "Maison No. 7",
      city: "Milan",
      country: "Italy",
      price: 95,
      imageClass: "event-six",
      tag: "DINING",
      description:
        "A limited-seat dining experience pairing modern Italian cuisine with intimate storytelling and live acoustic performance.",
      organizer: "Maison No. 7",
      seats: 32,
      ticketTypes: [
        { name: "Dinner", price: 95 },
        { name: "Chef's Table", price: 180 },
        { name: "Private Table", price: 360 }
      ]
    }
  ];

  const venues = [
    {
      city: "Dubai",
      country: "UAE",
      imageClass: "city-one"
    },
    {
      city: "London",
      country: "UK",
      imageClass: "city-two"
    },
    {
      city: "Paris",
      country: "France",
      imageClass: "city-three"
    },
    {
      city: "Singapore",
      country: "Singapore",
      imageClass: "city-four"
    }
  ];

  const organizerStats = [
    { label: "Tickets sold", value: "4,821", change: "+18.4%" },
    { label: "Gross revenue", value: "$384K", change: "+12.8%" },
    { label: "Active events", value: "18", change: "+4 this month" },
    { label: "Attendance", value: "93.7%", change: "+3.1%" }
  ];

  $: filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    const q = search.toLowerCase().trim();

    const matchesSearch =
      !q ||
      event.title.toLowerCase().includes(q) ||
      event.category.toLowerCase().includes(q) ||
      event.city.toLowerCase().includes(q) ||
      event.venue.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  $: selectedTicket =
    selectedEvent &&
    selectedEvent.ticketTypes.find(
      (ticket) => ticket.name === ticketType
    );

  $: ticketSubtotal =
    selectedTicket ? selectedTicket.price * quantity : 0;

  $: serviceFee = Math.round(ticketSubtotal * 0.08);

  $: total = ticketSubtotal + serviceFee;

  $: generatedTicketNumber =
    "MR-" +
    Math.random().toString(36).substring(2, 7).toUpperCase() +
    "-2026";

  function go(target) {
    page = target;
    menuOpen = false;
    window.scrollTo(0, 0);
  }

  function openEvent(event) {
    selectedEvent = event;
    selectedSeats = [];
    ticketType = event.ticketTypes[0].name;
    quantity = 1;
    checkoutComplete = false;
    page = "event";
    window.scrollTo(0, 0);
  }

  function isSeatSelected(seat) {
    return selectedSeats.includes(seat);
  }

  function isSeatUnavailable(seat) {
    const unavailable = [
      "A3",
      "A4",
      "B5",
      "C2",
      "C8",
      "D4",
      "E7",
      "F1",
      "F8",
      "G3",
      "H6",
      "J4"
    ];

    return unavailable.includes(seat);
  }

  function toggleSeat(seat) {
    if (isSeatUnavailable(seat)) {
      return;
    }

    if (isSeatSelected(seat)) {
      selectedSeats = selectedSeats.filter(
        (item) => item !== seat
      );
      return;
    }

    if (selectedSeats.length >= quantity) {
      showToast(
        `You selected ${quantity} seat${
          quantity > 1 ? "s" : ""
        }. Change quantity to select more.`
      );
      return;
    }

    selectedSeats = [...selectedSeats, seat];
  }

  function goToSeats() {
    page = "seats";
    window.scrollTo(0, 0);
  }

  function continueCheckout() {
    if (selectedSeats.length !== quantity) {
      showToast(
        `Please select ${quantity} seat${
          quantity > 1 ? "s" : ""
        } before continuing.`
      );
      return;
    }

    page = "checkout";
    window.scrollTo(0, 0);
  }

  function finishCheckout() {
    checkoutComplete = true;
    page = "tickets";
    showToast("Your ticket has been created ✓");
  }

  function showToast(message) {
    toast = message;

    setTimeout(() => {
      toast = "";
    }, 2600);
  }

  function searchFromHero() {
    page = "events";
    window.scrollTo(0, 0);
  }
</script>


<!-- =====================================================
     NAVIGATION
===================================================== -->

<header class="site-header">

  <div class="nav-inner">

    <button
      class="brand"
      on:click={() => go("home")}
    >
      <span class="brand-mark">M</span>
      <span class="brand-name">MORROW</span>
      <span class="brand-sub">EVENTS</span>
    </button>


    <nav class="desktop-nav">

      <button
        class:nav-active={page === "home"}
        on:click={() => go("home")}
      >
        Discover
      </button>

      <button
        class:nav-active={page === "events"}
        on:click={() => go("events")}
      >
        Events
      </button>

      <button on:click={() => go("tickets")}>
        My tickets
      </button>

      <button on:click={() => go("organizer")}>
        Organize
      </button>

    </nav>


    <div class="nav-actions">

      <button
        class="city-button"
        on:click={() => showToast("Location set to Dubai")}
      >
        ◉ Dubai
      </button>

      <button
        class="profile-button"
        on:click={() => go("tickets")}
      >
        <span>M</span>
      </button>

      <button
        class="mobile-menu-button"
        on:click={() => (menuOpen = !menuOpen)}
      >
        ☰
      </button>

    </div>

  </div>


  {#if menuOpen}

    <div class="mobile-nav">

      <button on:click={() => go("home")}>
        Discover
      </button>

      <button on:click={() => go("events")}>
        Events
      </button>

      <button on:click={() => go("tickets")}>
        My tickets
      </button>

      <button on:click={() => go("organizer")}>
        Organize
      </button>

    </div>

  {/if}

</header>


<!-- =====================================================
     HOME
===================================================== -->

{#if page === "home"}

  <main class="page-home">

    <section class="hero">

      <div class="hero-copy">

        <div class="eyebrow">
          YOUR NEXT MOMENT
        </div>

        <h1>
          There is more
          <span>to experience.</span>
        </h1>

        <p>
          Discover concerts, ideas, exhibitions, dinners and
          experiences worth leaving home for.
        </p>


        <div class="hero-search">

          <label>

            <span>⌕</span>

            <input
              bind:value={search}
              placeholder="Search events, artists or experiences"
              on:keydown={(event) => {
                if (event.key === "Enter") searchFromHero();
              }}
            />

          </label>

          <button on:click={searchFromHero}>
            Search →
          </button>

        </div>


        <div class="hero-tags">

          <span>Trending:</span>

          {#each ["Music", "Technology", "Art", "Business"] as item}

            <button
              on:click={() => {
                selectedCategory = item;
                page = "events";
              }}
            >
              {item}
            </button>

          {/each}

        </div>

      </div>


      <div class="hero-art">

        <div class="hero-orbit one"></div>
        <div class="hero-orbit two"></div>
        <div class="hero-orbit three"></div>

        <div class="hero-event-card">

          <div class="hero-card-date">

            <span>24</span>

            <small>SEP</small>

          </div>

          <div>

            <span class="mini-label">
              FEATURED EVENT
            </span>

            <h3>
              The Night Assembly
            </h3>

            <p>
              Dubai · The Crescent Hall
            </p>

          </div>

        </div>

      </div>

    </section>


    <!-- CATEGORY STRIP -->

    <section class="category-strip">

      <div class="category-inner">

        {#each categories.slice(1) as category}

          <button
            on:click={() => {
              selectedCategory = category;
              page = "events";
            }}
          >

            <span>
              {category === "Music"
                ? "♫"
                : category === "Technology"
                ? "</>"
                : category === "Art"
                ? "◈"
                : "✦"}
            </span>

            <strong>
              {category}
            </strong>

            <small>
              Explore
            </small>

          </button>

        {/each}

      </div>

    </section>


    <!-- FEATURED -->

    <section class="content-section">

      <div class="section-heading">

        <div>

          <span class="eyebrow">
            HANDPICKED
          </span>

          <h2>
            Events worth
            <span>planning around.</span>
          </h2>

        </div>

        <button
          class="text-link"
          on:click={() => go("events")}
        >
          View all events →
        </button>

      </div>


      <div class="featured-grid">

        {#each events.slice(0, 3) as event}

          <article
            class="large-event-card"
            on:click={() => openEvent(event)}
          >

            <div class={`large-event-image ${event.imageClass}`}>

              <span class="event-tag">
                {event.tag}
              </span>

              <button
                class="heart-button"
                on:click|stopPropagation={() =>
                  showToast("Saved to your collection")
                }
              >
                ♡
              </button>

            </div>


            <div class="large-event-info">

              <div class="date-block">

                <strong>
                  {event.date}
                </strong>

                <span>
                  {event.month}
                </span>

              </div>


              <div class="event-info-main">

                <h3>
                  {event.title}
                </h3>

                <p>
                  {event.venue} · {event.city}
                </p>

                <div class="card-bottom">

                  <strong>
                    From ${event.price}
                  </strong>

                  <span>
                    {event.time}
                  </span>

                </div>

              </div>

            </div>

          </article>

        {/each}

      </div>

    </section>


    <!-- UPCOMING -->

    <section class="content-section light-section">

      <div class="section-heading">

        <div>

          <span class="eyebrow">
            UPCOMING
          </span>

          <h2>
            Something for
            <span>every mood.</span>
          </h2>

        </div>

        <button
          class="text-link"
          on:click={() => go("events")}
        >
          Browse events →
        </button>

      </div>


      <div class="compact-events">

        {#each events.slice(3, 6) as event}

          <button
            class="compact-event"
            on:click={() => openEvent(event)}
          >

            <div class={`compact-image ${event.imageClass}`}>
            </div>

            <div class="compact-date">
              <strong>{event.date}</strong>
              <span>{event.month}</span>
            </div>

            <div class="compact-main">

              <span>
                {event.category}
              </span>

              <h3>
                {event.title}
              </h3>

              <p>
                {event.city} · {event.venue}
              </p>

            </div>

            <div class="compact-price">
              From ${event.price}
            </div>

            <div class="compact-arrow">
              →
            </div>

          </button>

        {/each}

      </div>

    </section>


    <!-- CITIES -->

    <section class="content-section">

      <div class="section-heading">

        <div>

          <span class="eyebrow">
            EXPLORE CITIES
          </span>

          <h2>
            Follow the
            <span>energy.</span>
          </h2>

        </div>

      </div>


      <div class="city-grid">

        {#each venues as venue}

          <button
            class={`city-card ${venue.imageClass}`}
            on:click={() => {
              search = venue.city;
              page = "events";
            }}
          >

            <div>
              <span>{venue.country}</span>
              <h3>{venue.city}</h3>
            </div>

            <span class="city-arrow">
              ↗
            </span>

          </button>

        {/each}

      </div>

    </section>


    <!-- ORGANIZER CTA -->

    <section class="organizer-cta">

      <div>

        <span class="eyebrow">
          FOR ORGANIZERS
        </span>

        <h2>
          Create an event
          people remember.
        </h2>

        <p>
          Manage events, tickets, audiences and sales
          from one beautifully simple workspace.
        </p>

        <button
          class="dark-button"
          on:click={() => go("organizer")}
        >
          Open organizer studio →
        </button>

      </div>


      <div class="cta-stat">

        <strong>
          48K+
        </strong>

        <span>
          attendees discovered
          through Morrow
        </span>

      </div>

    </section>

  </main>

{/if}


<!-- =====================================================
     EVENTS
===================================================== -->

{#if page === "events"}

  <main class="events-page">

    <section class="page-intro">

      <div>

        <span class="eyebrow">
          DISCOVER
        </span>

        <h1>
          Find your
          <span>next event.</span>
        </h1>

      </div>

      <p>
        Search concerts, exhibitions, talks, dinners
        and experiences from around the world.
      </p>

    </section>


    <div class="event-controls">

      <label class="event-search">

        <span>⌕</span>

        <input
          bind:value={search}
          placeholder="Search events or cities..."
        />

      </label>


      <div class="category-pills">

        {#each categories as category}

          <button
            class:active-pill={selectedCategory === category}
            on:click={() => (selectedCategory = category)}
          >
            {category}
          </button>

        {/each}

      </div>

    </div>


    <div class="results-head">

      <span>
        {filteredEvents.length} events
      </span>

      <button
        on:click={() => {
          search = "";
          selectedCategory = "All";
        }}
      >
        Clear filters
      </button>

    </div>


    <div class="event-list-grid">

      {#each filteredEvents as event}

        <article
          class="event-list-card"
          on:click={() => openEvent(event)}
        >

          <div class={`list-event-image ${event.imageClass}`}>

            <span>
              {event.tag}
            </span>

          </div>


          <div class="list-event-content">

            <div class="date-block">

              <strong>
                {event.date}
              </strong>

              <span>
                {event.month}
              </span>

            </div>


            <div class="list-event-main">

              <span class="event-category">
                {event.category}
              </span>

              <h3>
                {event.title}
              </h3>

              <p>
                {event.description}
              </p>

              <div class="event-location">
                ◉ {event.venue} · {event.city}
              </div>

            </div>


            <div class="list-event-right">

              <strong>
                From ${event.price}
              </strong>

              <button
                on:click|stopPropagation={() =>
                  openEvent(event)
                }
              >
                View event →
              </button>

            </div>

          </div>

        </article>

      {/each}

    </div>

  </main>

{/if}


<!-- =====================================================
     EVENT DETAIL
===================================================== -->

{#if page === "event" && selectedEvent}

  <main class="event-detail-page">

    <button
      class="back-button"
      on:click={() => go("events")}
    >
      ← Back to events
    </button>


    <section class="event-detail-hero">

      <div class={`detail-visual ${selectedEvent.imageClass}`}>

        <span>
          {selectedEvent.tag}
        </span>

      </div>


      <div class="detail-copy">

        <span class="eyebrow">
          {selectedEvent.category}
        </span>

        <h1>
          {selectedEvent.title}
        </h1>

        <p class="detail-description">
          {selectedEvent.description}
        </p>


        <div class="event-facts">

          <div>
            <small>DATE</small>
            <strong>
              {selectedEvent.weekday},
              {selectedEvent.date}
              {selectedEvent.month}
            </strong>
          </div>

          <div>
            <small>TIME</small>
            <strong>
              {selectedEvent.time}
            </strong>
          </div>

          <div>
            <small>VENUE</small>
            <strong>
              {selectedEvent.venue}
            </strong>
          </div>

          <div>
            <small>LOCATION</small>
            <strong>
              {selectedEvent.city},
              {selectedEvent.country}
            </strong>
          </div>

        </div>

      </div>

    </section>


    <section class="ticket-section">

      <div>

        <span class="eyebrow">
          TICKETS
        </span>

        <h2>
          Choose your
          <span>experience.</span>
        </h2>

      </div>


      <div class="ticket-options">

        {#each selectedEvent.ticketTypes as ticket}

          <button
            class:selected-ticket={ticketType === ticket.name}
            on:click={() => {
              ticketType = ticket.name;
              selectedSeats = [];
            }}
          >

            <span>
              {ticket.name}
            </span>

            <strong>
              ${ticket.price}
            </strong>

            <small>
              per person
            </small>

          </button>

        {/each}

      </div>


      <div class="purchase-panel">

        <div>

          <span class="small-label">
            TICKET QUANTITY
          </span>

          <div class="quantity-control">

            <button
              on:click={() => {
                if (quantity > 1) {
                  quantity -= 1;
                  selectedSeats = [];
                }
              }}
            >
              −
            </button>

            <strong>
              {quantity}
            </strong>

            <button
              on:click={() => {
                if (quantity < 8) {
                  quantity += 1;
                  selectedSeats = [];
                }
              }}
            >
              +
            </button>

          </div>

        </div>


        <div class="purchase-summary">

          <small>
            FROM
          </small>

          <strong>
            ${selectedTicket.price * quantity}
          </strong>

          <button
            class="maroon-button"
            on:click={goToSeats}
          >
            Choose seats →
          </button>

        </div>

      </div>

    </section>

  </main>

{/if}


<!-- =====================================================
     SEATS
===================================================== -->

{#if page === "seats" && selectedEvent}

  <main class="seat-page">

    <div class="page-intro small-intro">

      <div>

        <button
          class="back-button"
          on:click={() => (page = "event")}
        >
          ← Event details
        </button>

        <span class="eyebrow">
          SELECT YOUR SEATS
        </span>

        <h1>
          Make it
          <span>yours.</span>
        </h1>

      </div>

      <p>
        Choose {quantity} seat{quantity > 1 ? "s" : ""}.
        Selected seats will be reserved during checkout.
      </p>

    </div>


    <div class="seat-layout">

      <div class="seat-map-area">

        <div class="stage">
          STAGE
        </div>


        <div class="seat-map">

          {#each ["A","B","C","D","E","F","G","H","I","J"] as row}

            <div class="seat-row">

              <span class="row-label">
                {row}
              </span>

              {#each [1,2,3,4,5,6,7,8] as number}

                <button
                  class="seat"
                  class:selected={isSeatSelected(`${row}${number}`)}
                  class:unavailable={isSeatUnavailable(`${row}${number}`)}
                  on:click={() =>
                    toggleSeat(`${row}${number}`)
                  }
                >
                  {number}
                </button>

              {/each}

            </div>

          {/each}

        </div>


        <div class="seat-legend">

          <span>
            <i></i>
            Available
          </span>

          <span>
            <i class="selected-dot"></i>
            Selected
          </span>

          <span>
            <i class="unavailable-dot"></i>
            Unavailable
          </span>

        </div>

      </div>


      <aside class="seat-summary">

        <span class="eyebrow">
          YOUR BOOKING
        </span>

        <h2>
          {selectedEvent.title}
        </h2>

        <p>
          {selectedEvent.date}
          {selectedEvent.month} ·
          {selectedEvent.time}
        </p>


        <div class="summary-line">

          <span>
            Ticket
          </span>

          <strong>
            {ticketType}
          </strong>

        </div>


        <div class="summary-line">

          <span>
            Quantity
          </span>

          <strong>
            {quantity}
          </strong>

        </div>


        <div class="selected-seat-list">

          <span>
            Selected seats
          </span>

          {#if selectedSeats.length}

            <strong>
              {selectedSeats.join(", ")}
            </strong>

          {:else}

            <small>
              Choose seats on the map.
            </small>

          {/if}

        </div>


        <div class="summary-total">

          <small>
            TOTAL
          </small>

          <strong>
            ${total}
          </strong>

        </div>


        <button
          class="maroon-button wide"
          on:click={continueCheckout}
        >
          Continue to checkout →
        </button>

      </aside>

    </div>

  </main>

{/if}


<!-- =====================================================
     CHECKOUT
===================================================== -->

{#if page === "checkout" && selectedEvent}

  <main class="checkout-page">

    <div class="page-intro small-intro">

      <div>

        <button
          class="back-button"
          on:click={() => (page = "seats")}
        >
          ← Back to seats
        </button>

        <span class="eyebrow">
          CHECKOUT
        </span>

        <h1>
          Almost
          <span>there.</span>
        </h1>

      </div>

    </div>


    <div class="checkout-layout">

      <section class="checkout-form">

        <div class="form-card">

          <span class="eyebrow">
            ATTENDEE DETAILS
          </span>

          <h2>
            Who's attending?
          </h2>


          <div class="two-inputs">

            <label>
              First name
              <input placeholder="Maham">
            </label>

            <label>
              Last name
              <input placeholder="Rao">
            </label>

          </div>


          <label>
            Email address
            <input
              type="email"
              placeholder="you@example.com"
            >
          </label>


          <label>
            Phone
            <input
              placeholder="+92 300 0000000"
            >
          </label>

        </div>


        <div class="form-card">

          <span class="eyebrow">
            PAYMENT
          </span>

          <h2>
            Payment details.
          </h2>


          <label>
            Card number
            <input
              placeholder="•••• •••• •••• ••••"
            >
          </label>


          <div class="two-inputs">

            <label>
              Expiry
              <input placeholder="MM / YY">
            </label>

            <label>
              CVC
              <input placeholder="•••">
            </label>

          </div>


          <p class="secure-note">
            ◉ Secure checkout · Your payment information is protected.
          </p>

        </div>

      </section>


      <aside class="checkout-summary">

        <span class="eyebrow">
          ORDER SUMMARY
        </span>

        <div class={`checkout-image ${selectedEvent.imageClass}`}>
        </div>


        <h2>
          {selectedEvent.title}
        </h2>

        <p>
          {selectedEvent.venue},
          {selectedEvent.city}
        </p>


        <div class="checkout-detail">

          <span>
            Date
          </span>

          <strong>
            {selectedEvent.date}
            {selectedEvent.month}
          </strong>

        </div>


        <div class="checkout-detail">

          <span>
            Seats
          </span>

          <strong>
            {selectedSeats.join(", ")}
          </strong>

        </div>


        <div class="checkout-detail">

          <span>
            {ticketType} × {quantity}
          </span>

          <strong>
            ${ticketSubtotal}
          </strong>

        </div>


        <div class="checkout-detail">

          <span>
            Service fee
          </span>

          <strong>
            ${serviceFee}
          </strong>

        </div>


        <div class="checkout-total">

          <span>
            Total
          </span>

          <strong>
            ${total}
          </strong>

        </div>


        <button
          class="maroon-button wide"
          on:click={finishCheckout}
        >
          Pay ${total} →
        </button>

        <small class="payment-note">
          This is a portfolio checkout prototype.
        </small>

      </aside>

    </div>

  </main>

{/if}


<!-- =====================================================
     MY TICKETS
===================================================== -->

{#if page === "tickets"}

  <main class="tickets-page">

    <div class="page-intro">

      <div>

        <span class="eyebrow">
          YOUR SPACE
        </span>

        <h1>
          My
          <span>tickets.</span>
        </h1>

      </div>

      <p>
        Your upcoming experiences, all in one place.
      </p>

    </div>


    <div class="digital-ticket">

      <div class="ticket-main">

        <div class="ticket-brand">
          MORROW / PASS
        </div>

        <div class="ticket-event">

          <div>

            <span class="eyebrow">
              UPCOMING
            </span>

            <h2>
              {checkoutComplete && selectedEvent
                ? selectedEvent.title
                : "The Night Assembly"}
            </h2>

            <p>
              {checkoutComplete && selectedEvent
                ? selectedEvent.venue + " · " + selectedEvent.city
                : "The Crescent Hall · Dubai"}
            </p>

          </div>


          <div class="ticket-date">

            <strong>
              {checkoutComplete && selectedEvent
                ? selectedEvent.date
                : "24"}
            </strong>

            <span>
              {checkoutComplete && selectedEvent
                ? selectedEvent.month
                : "SEP"}
            </span>

          </div>

        </div>


        <div class="ticket-info-grid">

          <div>
            <span>TIME</span>
            <strong>
              {checkoutComplete && selectedEvent
                ? selectedEvent.time
                : "8:00 PM"}
            </strong>
          </div>

          <div>
            <span>SEAT</span>
            <strong>
              {selectedSeats.length
                ? selectedSeats.join(", ")
                : "B7"}
            </strong>
          </div>

          <div>
            <span>TYPE</span>
            <strong>
              {ticketType}
            </strong>
          </div>

        </div>

      </div>


      <div class="ticket-qr">

        <div class="qr-box">

          <span>▦</span>

        </div>

        <small>
          SCAN TO ENTER
        </small>

        <strong>
          {generatedTicketNumber}
        </strong>

      </div>

    </div>


    <div class="tickets-bottom">

      <div>

        <span class="eyebrow">
          RECENT ACTIVITY
        </span>

        <h2>
          Your events.
        </h2>

      </div>


      <button
        class="maroon-button"
        on:click={() => go("events")}
      >
        Discover more →
      </button>

    </div>


    <div class="ticket-history">

      <div class="history-card">

        <span>
          OCT 11
        </span>

        <div>
          <strong>
            Digital Matter
          </strong>

          <small>
            Singapore · Atlas Convention Center
          </small>
        </div>

        <b>
          CONFIRMED
        </b>

      </div>


      <div class="history-card">

        <span>
          SEP 24
        </span>

        <div>
          <strong>
            The Night Assembly
          </strong>

          <small>
            Dubai · The Crescent Hall
          </small>
        </div>

        <b>
          CONFIRMED
        </b>

      </div>

    </div>

  </main>

{/if}


<!-- =====================================================
     ORGANIZER
===================================================== -->

{#if page === "organizer"}

  <main class="organizer-page">

    <section class="organizer-header">

      <div>

        <span class="eyebrow">
          ORGANIZER STUDIO
        </span>

        <h1>
          Your events,
          <span>in motion.</span>
        </h1>

        <p>
          Manage your events, ticket sales and audience
          from one focused workspace.
        </p>

      </div>


      <button
        class="maroon-button"
        on:click={() => showToast("Create event flow opened")}
      >
        + Create event
      </button>

    </section>


    <div class="stats-grid">

      {#each organizerStats as stat}

        <div class="dashboard-stat">

          <span>
            {stat.label}
          </span>

          <strong>
            {stat.value}
          </strong>

          <small>
            {stat.change}
          </small>

        </div>

      {/each}

    </div>


    <div class="organizer-layout">

      <section class="dashboard-panel">

        <div class="panel-header">

          <div>

            <span class="eyebrow">
              EVENT PERFORMANCE
            </span>

            <h2>
              Ticket sales.
            </h2>

          </div>

          <button>
            Last 30 days ▾
          </button>

        </div>


        <div class="chart">

          <div class="chart-grid">
            <span>500</span>
            <span>400</span>
            <span>300</span>
            <span>200</span>
            <span>100</span>
            <span>0</span>
          </div>


          <div class="bars">

            {#each [32,42,36,58,51,76,68,88,72,94,80,100] as bar}

              <div
                class="bar"
                style={`height:${bar}%`}
              ></div>

            {/each}

          </div>

        </div>

        <div class="chart-labels">

          <span>SEP 01</span>
          <span>SEP 06</span>
          <span>SEP 11</span>
          <span>SEP 16</span>
          <span>SEP 21</span>
          <span>SEP 26</span>

        </div>

      </section>


      <section class="dashboard-panel event-management">

        <div class="panel-header">

          <div>

            <span class="eyebrow">
              LIVE EVENTS
            </span>

            <h2>
              Your lineup.
            </h2>

          </div>

        </div>


        {#each events.slice(0, 4) as event}

          <div class="manage-event">

            <div class={`manage-thumb ${event.imageClass}`}>
            </div>

            <div class="manage-info">

              <strong>
                {event.title}
              </strong>

              <small>
                {event.city} · {event.date} {event.month}
              </small>

            </div>

            <div class="manage-sales">

              <strong>
                {Math.floor(event.seats * 0.67)}
              </strong>

              <small>
                sold
              </small>

            </div>

            <button>
              •••
            </button>

          </div>

        {/each}

      </section>

    </div>


    <section class="organizer-bottom">

      <div>

        <span class="eyebrow">
          QUICK ACTION
        </span>

        <h2>
          Make your next
          event effortless.
        </h2>

      </div>

      <div class="quick-actions">

        <button
          on:click={() =>
            showToast("Event builder opened")
          }
        >
          <span>＋</span>
          <strong>Create event</strong>
          <small>Start from scratch</small>
        </button>

        <button
          on:click={() =>
            showToast("Audience insights opened")
          }
        >
          <span>◈</span>
          <strong>Audience</strong>
          <small>Understand your guests</small>
        </button>

        <button
          on:click={() =>
            showToast("Analytics opened")
          }
        >
          <span>↗</span>
          <strong>Analytics</strong>
          <small>Track performance</small>
        </button>

      </div>

    </section>

  </main>

{/if}


<!-- =====================================================
     TOAST
===================================================== -->

{#if toast}

  <div class="toast">
    {toast}
  </div>

{/if}


<!-- =====================================================
     GLOBAL STYLES
===================================================== -->

<style>

:global(*) {
  box-sizing: border-box;
}

:global(html) {
  scroll-behavior: smooth;
}

:global(body) {
  margin: 0;
  background: #f7f3ef;
  color: #292727;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Arial,
    sans-serif;
}

:global(button),
:global(input) {
  font: inherit;
}

:global(button) {
  cursor: pointer;
}


/* ==========================================
   HEADER
========================================== */

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(247,243,239,.95);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid #dfd9d2;
}

.nav-inner {
  max-width: 1380px;
  height: 78px;
  margin: auto;
  padding: 0 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 9px;
  border: 0;
  background: transparent;
  color: #292727;
  padding: 0;
}

.brand-mark {
  width: 33px;
  height: 33px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #63202b;
  color: white;
  font-size: 13px;
  font-weight: 800;
}

.brand-name {
  font-weight: 800;
  letter-spacing: .14em;
  font-size: 14px;
}

.brand-sub {
  color: #978f88;
  font-size: 7px;
  letter-spacing: .18em;
  margin-left: -5px;
  align-self: flex-end;
  margin-bottom: 4px;
}

.desktop-nav {
  display: flex;
  gap: 28px;
}

.desktop-nav button,
.nav-actions button {
  border: 0;
  background: transparent;
  color: #7a746e;
  font-size: 10px;
}

.desktop-nav button:hover,
.desktop-nav button.nav-active {
  color: #63202b;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 13px;
}

.city-button {
  padding-right: 12px !important;
  border-right: 1px solid #ddd6cf !important;
}

.profile-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #302f2d !important;
  color: white !important;
}

.profile-button span {
  font-size: 10px;
}

.mobile-menu-button {
  display: none;
}

.mobile-nav {
  padding: 8px 18px 18px;
  display: none;
  flex-direction: column;
}

.mobile-nav button {
  padding: 13px 0;
  text-align: left;
  border: 0;
  border-bottom: 1px solid #ded8d1;
  background: transparent;
  color: #5d5853;
  font-size: 11px;
}


/* ==========================================
   GLOBAL
========================================== */

.eyebrow,
.small-label {
  display: block;
  color: #7b6570;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .2em;
  text-transform: uppercase;
}

.eyebrow {
  color: #63202b;
}

.text-link {
  border: 0;
  background: transparent;
  color: #63202b;
  font-size: 10px;
  font-weight: 700;
}

.back-button {
  display: inline-block;
  margin-bottom: 30px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #79726c;
  font-size: 10px;
}

.maroon-button,
.dark-button {
  min-height: 47px;
  padding: 0 19px;
  border: 0;
  border-radius: 6px;
  color: white;
  background: #63202b;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.maroon-button:hover {
  background: #4d1721;
}

.dark-button {
  background: #302f2d;
}

.wide {
  width: 100%;
}


/* ==========================================
   HOME HERO
========================================== */

.hero {
  max-width: 1380px;
  min-height: 650px;
  padding: 80px 38px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: center;
}

.hero-copy h1,
.page-intro h1,
.event-detail-page h1,
.seat-page h1,
.checkout-page h1,
.tickets-page h1,
.organizer-header h1 {
  margin: 17px 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 500;
  letter-spacing: -.055em;
  line-height: .92;
}

.hero-copy h1 {
  max-width: 660px;
  font-size: clamp(63px, 7vw, 105px);
}

.hero-copy h1 span,
.page-intro h1 span,
.event-detail-page h1 span,
.seat-page h1 span,
.checkout-page h1 span,
.tickets-page h1 span,
.organizer-header h1 span {
  color: #63202b;
}

.hero-copy > p {
  max-width: 505px;
  margin: 26px 0;
  color: #776f69;
  font-size: 13px;
  line-height: 1.8;
}

.hero-search {
  width: min(620px,100%);
  display: flex;
  padding: 9px;
  background: white;
  border: 1px solid #dcd5cd;
  box-shadow: 0 20px 55px rgba(57,45,35,.08);
}

.hero-search label {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
}

.hero-search label span {
  color: #817870;
  font-size: 17px;
}

.hero-search input {
  width: 100%;
  height: 45px;
  border: 0;
  outline: 0;
  font-size: 10px;
  color: #292727;
}

.hero-search button {
  width: 110px;
  border: 0;
  background: #63202b;
  color: white;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: .08em;
}

.hero-tags {
  margin-top: 13px;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  align-items: center;
}

.hero-tags span {
  color: #9a938c;
  font-size: 8px;
}

.hero-tags button {
  padding: 6px 9px;
  background: transparent;
  border: 1px solid #d7d0c9;
  color: #6e6862;
  font-size: 8px;
}

.hero-tags button:hover {
  border-color: #63202b;
  color: #63202b;
}

.hero-art {
  min-height: 520px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 65% 38%, rgba(255,255,255,.65), transparent 16%),
    linear-gradient(135deg, #d8d0c8, #b8a89f 72%, #a8948c);
}

.hero-orbit {
  position: absolute;
  border: 1px solid rgba(255,255,255,.58);
  border-radius: 50%;
}

.hero-orbit.one {
  width: 390px;
  height: 390px;
  top: 35px;
  left: 75px;
}

.hero-orbit.two {
  width: 285px;
  height: 285px;
  top: 90px;
  left: 130px;
}

.hero-orbit.three {
  width: 500px;
  height: 180px;
  top: 200px;
  left: 0;
  transform: rotate(-26deg);
  border-color: rgba(99,32,43,.18);
}

.hero-event-card {
  position: absolute;
  left: 45px;
  right: 45px;
  bottom: 42px;
  padding: 22px;
  display: flex;
  align-items: center;
  gap: 17px;
  background: rgba(255,255,255,.96);
  box-shadow: 0 28px 70px rgba(50,39,32,.18);
}

.hero-card-date {
  width: 52px;
  height: 61px;
  border-right: 1px solid #ddd7cf;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.hero-card-date span {
  font-family: Georgia, serif;
  font-size: 29px;
  line-height: 1;
}

.hero-card-date small {
  color: #63202b;
  margin-top: 5px;
  font-size: 8px;
  font-weight: 800;
}

.mini-label {
  color: #92747c;
  font-size: 7px;
  letter-spacing: .16em;
}

.hero-event-card h3 {
  margin: 7px 0;
  font-family: Georgia, serif;
  font-size: 23px;
  font-weight: 500;
}

.hero-event-card p {
  margin: 0;
  color: #7b746e;
  font-size: 9px;
}


/* ==========================================
   CATEGORY STRIP
========================================== */

.category-strip {
  background: #302f2d;
  color: white;
}

.category-inner {
  max-width: 1380px;
  margin: auto;
  padding: 0 38px;
  display: grid;
  grid-template-columns: repeat(4,1fr);
}

.category-inner button {
  min-height: 105px;
  padding: 20px 22px;
  display: grid;
  grid-template-columns: 37px 1fr auto;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  text-align: left;
  background: transparent;
  border: 0;
  border-right: 1px solid #474541;
  color: white;
}

.category-inner button:first-child {
  border-left: 0;
}

.category-inner button:hover {
  background: #393835;
}

.category-inner button > span {
  grid-row: 1/3;
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #62605d;
  color: #dfc3c8;
  font-size: 11px;
}

.category-inner strong {
  font-size: 11px;
  font-weight: 500;
}

.category-inner small {
  color: #8f8d88;
  font-size: 8px;
}


/* ==========================================
   CONTENT
========================================== */

.content-section {
  max-width: 1380px;
  margin: auto;
  padding: 95px 38px;
}

.light-section {
  max-width: none;
  background: #eee9e3;
  padding-left: max(38px,calc((100vw - 1304px)/2));
  padding-right: max(38px,calc((100vw - 1304px)/2));
}

.section-heading {
  margin-bottom: 40px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
}

.section-heading h2 {
  max-width: 670px;
  margin: 13px 0 0;
  font-family: Georgia, serif;
  font-size: clamp(43px,5vw,70px);
  font-weight: 500;
  line-height: .95;
  letter-spacing: -.05em;
}

.section-heading h2 span {
  color: #8d8580;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 15px;
}

.large-event-card {
  background: white;
  border: 1px solid #ddd7cf;
  cursor: pointer;
}

.large-event-card:hover {
  transform: translateY(-3px);
  transition: .2s ease;
}

.large-event-image {
  height: 295px;
  position: relative;
}

.event-one {
  background:
    radial-gradient(circle at 70% 25%, #f7d6a6, transparent 17%),
    linear-gradient(135deg,#3e2432,#8b5061 55%,#1b202a);
}

.event-two {
  background:
    radial-gradient(circle at 35% 30%, #d8c7a9, transparent 19%),
    linear-gradient(135deg,#77746c,#383c3d 55%,#202123);
}

.event-three {
  background:
    radial-gradient(circle at 66% 35%, #cce1db, transparent 20%),
    linear-gradient(135deg,#174d54,#477d7a 52%,#a7c5b9);
}

.event-four {
  background:
    radial-gradient(circle at 28% 36%, #eed7c5, transparent 18%),
    linear-gradient(135deg,#302a31,#6c5960 55%,#b7a39e);
}

.event-five {
  background:
    radial-gradient(circle at 67% 40%, #d2ded1, transparent 20%),
    linear-gradient(135deg,#607067,#9eaa9b 55%,#d7d2be);
}

.event-six {
  background:
    radial-gradient(circle at 70% 32%, #f0d7a1, transparent 17%),
    linear-gradient(135deg,#4f2e23,#94654f 52%,#211918);
}

.event-tag {
  position: absolute;
  top: 17px;
  left: 17px;
  padding: 7px 9px;
  color: white;
  background: rgba(38,36,34,.72);
  font-size: 7px;
  letter-spacing: .13em;
}

.heart-button {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 35px;
  height: 35px;
  border: 0;
  background: white;
  color: #63202b;
  border-radius: 50%;
  font-size: 19px;
}

.large-event-info {
  padding: 22px;
  display: grid;
  grid-template-columns: 51px 1fr;
  gap: 14px;
}

.date-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.date-block strong {
  font-family: Georgia, serif;
  font-size: 31px;
  line-height: .9;
  font-weight: 500;
}

.date-block span {
  margin-top: 6px;
  color: #63202b;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: .13em;
}

.event-info-main h3 {
  margin: 0;
  font-family: Georgia, serif;
  font-size: 22px;
  font-weight: 500;
}

.event-info-main p {
  margin: 7px 0 21px;
  color: #7d766f;
  font-size: 9px;
}

.card-bottom {
  padding-top: 13px;
  border-top: 1px solid #e6e0d9;
  display: flex;
  justify-content: space-between;
  color: #63202b;
  font-size: 9px;
}


/* ==========================================
   COMPACT EVENTS
========================================== */

.compact-events {
  display: grid;
  gap: 9px;
}

.compact-event {
  min-height: 105px;
  padding: 12px;
  display: grid;
  grid-template-columns: 110px 52px 1fr 110px 30px;
  align-items: center;
  gap: 17px;
  background: white;
  border: 1px solid #dbd5ce;
  text-align: left;
}

.compact-event:hover {
  border-color: #bfb7af;
}

.compact-image {
  height: 82px;
}

.compact-date strong {
  display: block;
  font-family: Georgia, serif;
  font-size: 28px;
  font-weight: 500;
}

.compact-date span {
  color: #63202b;
  font-size: 7px;
  font-weight: 800;
}

.compact-main > span {
  color: #9b938b;
  font-size: 7px;
  letter-spacing: .14em;
  text-transform: uppercase;
}

.compact-main h3 {
  margin: 5px 0;
  font-family: Georgia, serif;
  font-size: 19px;
  font-weight: 500;
}

.compact-main p {
  margin: 0;
  color: #7c756e;
  font-size: 9px;
}

.compact-price {
  color: #63202b;
  font-size: 10px;
  font-weight: 700;
}

.compact-arrow {
  font-size: 18px;
  color: #77706a;
}


/* ==========================================
   CITIES
========================================== */

.city-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 11px;
}

.city-card {
  min-height: 270px;
  padding: 23px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  text-align: left;
  position: relative;
  overflow: hidden;
  border: 0;
  color: white;
}

.city-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 25%,rgba(20,18,17,.7));
}

.city-card > div,
.city-arrow {
  position: relative;
  z-index: 2;
}

.city-card > div span {
  font-size: 8px;
  color: rgba(255,255,255,.7);
  text-transform: uppercase;
  letter-spacing: .12em;
}

.city-card h3 {
  margin: 7px 0 0;
  font-family: Georgia, serif;
  font-size: 31px;
  font-weight: 500;
}

.city-arrow {
  font-size: 19px;
}

.city-one {
  background:
    linear-gradient(rgba(65,37,29,.1),rgba(30,25,22,.4)),
    linear-gradient(135deg,#ba9a7e,#5e4337);
}

.city-two {
  background:
    linear-gradient(rgba(50,50,50,.1),rgba(25,25,25,.45)),
    linear-gradient(135deg,#77716b,#3b3a38);
}

.city-three {
  background:
    linear-gradient(rgba(70,50,55,.1),rgba(30,22,27,.45)),
    linear-gradient(135deg,#a28b83,#57464a);
}

.city-four {
  background:
    linear-gradient(rgba(40,80,77,.1),rgba(20,35,34,.45)),
    linear-gradient(135deg,#648783,#293f40);
}


/* ==========================================
   CTA
========================================== */

.organizer-cta {
  max-width: 1380px;
  margin: 0 auto 100px;
  padding: 65px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 50px;
  background: #63202b;
  color: white;
}

.organizer-cta .eyebrow {
  color: #e3bfc6;
}

.organizer-cta h2 {
  max-width: 650px;
  margin: 14px 0 17px;
  font-family: Georgia, serif;
  font-size: clamp(42px,5vw,68px);
  font-weight: 500;
  line-height: .95;
}

.organizer-cta p {
  max-width: 480px;
  color: rgba(255,255,255,.73);
  font-size: 11px;
  line-height: 1.7;
}

.organizer-cta .dark-button {
  margin-top: 17px;
}

.cta-stat {
  min-width: 210px;
  padding-left: 35px;
  border-left: 1px solid rgba(255,255,255,.22);
}

.cta-stat strong {
  display: block;
  font-family: Georgia, serif;
  font-size: 45px;
  font-weight: 500;
}

.cta-stat span {
  display: block;
  margin-top: 8px;
  color: #dfbdc3;
  font-size: 9px;
  line-height: 1.5;
}


/* ==========================================
   EVENTS PAGE
========================================== */

.events-page,
.event-detail-page,
.seat-page,
.checkout-page,
.tickets-page,
.organizer-page {
  max-width: 1380px;
  margin: auto;
  padding: 72px 38px 110px;
}

.page-intro {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 35px;
  margin-bottom: 45px;
}

.page-intro h1 {
  font-size: clamp(56px,6vw,92px);
}

.page-intro > p {
  max-width: 430px;
  color: #77706a;
  font-size: 11px;
  line-height: 1.8;
}

.event-controls {
  padding: 11px;
  background: white;
  border: 1px solid #ddd7cf;
}

.event-search {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 12px;
  border-bottom: 1px solid #ded8d1;
}

.event-search span {
  color: #8a817a;
  font-size: 17px;
}

.event-search input {
  width: 100%;
  height: 48px;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 10px;
}

.category-pills {
  padding-top: 11px;
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
}

.category-pills button {
  height: 31px;
  padding: 0 11px;
  border: 1px solid #d9d2ca;
  background: #faf8f5;
  color: #77706a;
  font-size: 8px;
}

.category-pills button.active-pill {
  background: #63202b;
  color: white;
  border-color: #63202b;
}

.results-head {
  padding: 28px 0 15px;
  display: flex;
  justify-content: space-between;
  color: #827a73;
  font-size: 9px;
}

.results-head button {
  color: #63202b;
  background: transparent;
  border: 0;
  font-size: 9px;
}

.event-list-grid {
  display: grid;
  gap: 10px;
}

.event-list-card {
  display: grid;
  grid-template-columns: 220px 1fr;
  background: white;
  border: 1px solid #ddd7d0;
  cursor: pointer;
}

.list-event-image {
  min-height: 185px;
  position: relative;
}

.list-event-image > span {
  position: absolute;
  left: 13px;
  top: 13px;
  padding: 6px 8px;
  background: rgba(40,38,35,.7);
  color: white;
  font-size: 7px;
  letter-spacing: .12em;
}

.list-event-content {
  padding: 25px;
  display: grid;
  grid-template-columns: 52px 1fr auto;
  gap: 17px;
}

.list-event-main .event-category {
  color: #90727a;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: .15em;
  text-transform: uppercase;
}

.list-event-main h3 {
  margin: 7px 0;
  font-family: Georgia, serif;
  font-size: 27px;
  font-weight: 500;
}

.list-event-main p {
  max-width: 560px;
  margin: 0 0 12px;
  color: #77706a;
  font-size: 9px;
  line-height: 1.7;
}

.event-location {
  color: #63202b;
  font-size: 9px;
}

.list-event-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
}

.list-event-right strong {
  color: #63202b;
  font-size: 11px;
}

.list-event-right button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #292727;
  font-size: 9px;
  font-weight: 700;
}


/* ==========================================
   DETAIL PAGE
========================================== */

.detail-visual {
  min-height: 580px;
}

.event-detail-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 55px;
  align-items: center;
}

.detail-copy h1 {
  font-size: clamp(60px,6vw,92px);
}

.detail-description {
  max-width: 520px;
  margin: 27px 0;
  color: #77706a;
  font-size: 12px;
  line-height: 1.8;
}

.event-facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid #ddd6ce;
}

.event-facts div {
  padding: 18px 15px 18px 0;
  border-bottom: 1px solid #ddd6ce;
}

.event-facts small {
  display: block;
  color: #918982;
  font-size: 7px;
  letter-spacing: .13em;
}

.event-facts strong {
  display: block;
  margin-top: 7px;
  font-size: 10px;
  line-height: 1.5;
}

.ticket-section {
  margin-top: 105px;
}

.ticket-section > div:first-child {
  margin-bottom: 35px;
}

.ticket-section h2,
.seat-summary h2,
.checkout-summary h2,
.form-card h2,
.organizer-bottom h2 {
  margin: 13px 0 0;
  font-family: Georgia, serif;
  font-weight: 500;
  font-size: 39px;
  line-height: 1;
}

.ticket-section h2 span {
  color: #8f8882;
}

.ticket-options {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 9px;
}

.ticket-options button {
  min-height: 125px;
  padding: 20px;
  text-align: left;
  background: white;
  border: 1px solid #ded7d0;
}

.ticket-options button.selected-ticket {
  border: 2px solid #63202b;
}

.ticket-options button span {
  display: block;
  color: #63202b;
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .12em;
}

.ticket-options button strong {
  display: block;
  margin-top: 20px;
  font-family: Georgia, serif;
  font-size: 30px;
  font-weight: 500;
}

.ticket-options button small {
  display: block;
  margin-top: 4px;
  color: #8a837c;
  font-size: 8px;
}

.purchase-panel {
  margin-top: 12px;
  padding: 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  background: #302f2d;
  color: white;
}

.quantity-control {
  margin-top: 11px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.quantity-control button {
  width: 29px;
  height: 29px;
  border: 1px solid #62605d;
  background: transparent;
  color: white;
}

.quantity-control strong {
  min-width: 20px;
  text-align: center;
}

.purchase-summary {
  display: flex;
  align-items: center;
  gap: 18px;
}

.purchase-summary small {
  color: #999793;
  font-size: 7px;
}

.purchase-summary > strong {
  font-family: Georgia, serif;
  font-size: 30px;
  font-weight: 500;
}


/* ==========================================
   SEATS
========================================== */

.small-intro {
  align-items: flex-start;
}

.small-intro h1 {
  font-size: clamp(50px,5vw,76px);
}

.seat-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 28px;
}

.seat-map-area {
  padding: 40px 25px;
  background: white;
  border: 1px solid #ddd7d0;
}

.stage {
  width: 55%;
  height: 45px;
  margin: 0 auto 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #77706a;
  background: #ede8e2;
  border-radius: 50% 50% 8px 8px;
  font-size: 8px;
  letter-spacing: .15em;
}

.seat-map {
  max-width: 640px;
  margin: auto;
}

.seat-row {
  display: grid;
  grid-template-columns: 25px repeat(8,1fr);
  gap: 7px;
  margin-bottom: 7px;
}

.row-label {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9a938d;
  font-size: 8px;
}

.seat {
  aspect-ratio: 1;
  border: 1px solid #d5cec6;
  background: #f8f5f1;
  color: #68615a;
  font-size: 8px;
}

.seat:hover {
  border-color: #63202b;
}

.seat.selected {
  background: #63202b;
  border-color: #63202b;
  color: white;
}

.seat.unavailable {
  background: #353431;
  border-color: #353431;
  color: #6c6a66;
  cursor: not-allowed;
}

.seat-legend {
  margin: 30px auto 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  color: #77706a;
  font-size: 8px;
}

.seat-legend span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.seat-legend i {
  width: 9px;
  height: 9px;
  background: #f8f5f1;
  border: 1px solid #d5cec6;
}

.seat-legend .selected-dot {
  background: #63202b;
  border-color: #63202b;
}

.seat-legend .unavailable-dot {
  background: #353431;
  border-color: #353431;
}

.seat-summary {
  padding: 28px;
  align-self: start;
  background: #302f2d;
  color: white;
}

.seat-summary h2 {
  font-size: 31px;
}

.seat-summary > p {
  color: #aaa8a4;
  font-size: 9px;
  line-height: 1.6;
}

.summary-line {
  padding: 16px 0;
  border-bottom: 1px solid #494744;
  display: flex;
  justify-content: space-between;
  color: #aaa8a4;
  font-size: 9px;
}

.summary-line strong {
  color: white;
}

.selected-seat-list {
  padding: 18px 0;
  border-bottom: 1px solid #494744;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 9px;
}

.selected-seat-list span {
  color: #9d9a95;
}

.selected-seat-list small {
  color: #676662;
}

.summary-total {
  padding: 22px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.summary-total small {
  color: #999691;
  font-size: 7px;
}

.summary-total strong {
  font-family: Georgia, serif;
  font-size: 33px;
  font-weight: 500;
}


/* ==========================================
   CHECKOUT
========================================== */

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 20px;
  align-items: start;
}

.checkout-form {
  display: grid;
  gap: 10px;
}

.form-card {
  padding: 29px;
  background: white;
  border: 1px solid #ddd7d0;
}

.form-card h2 {
  font-size: 30px;
  margin-bottom: 26px;
}

.form-card label {
  display: block;
  margin-bottom: 15px;
  color: #77706a;
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: .08em;
}

.form-card input {
  width: 100%;
  height: 46px;
  margin-top: 6px;
  padding: 0 12px;
  border: 1px solid #dad3cb;
  outline: 0;
  font-size: 10px;
  color: #292727;
  background: #faf8f5;
}

.form-card input:focus {
  border-color: #63202b;
}

.two-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.secure-note {
  color: #77706a;
  font-size: 8px;
}

.checkout-summary {
  padding: 24px;
  background: #302f2d;
  color: white;
}

.checkout-image {
  height: 170px;
  margin: 20px 0;
}

.checkout-summary h2 {
  font-size: 31px;
}

.checkout-summary > p {
  color: #aaa8a4;
  font-size: 9px;
}

.checkout-detail,
.checkout-total {
  padding: 14px 0;
  border-bottom: 1px solid #484744;
  display: flex;
  justify-content: space-between;
  color: #aaa8a4;
  font-size: 9px;
}

.checkout-detail strong {
  color: white;
}

.checkout-total {
  padding: 21px 0;
  border-bottom: 0;
  align-items: flex-end;
}

.checkout-total strong {
  font-family: Georgia, serif;
  font-size: 31px;
  font-weight: 500;
  color: white;
}

.payment-note {
  display: block;
  margin-top: 11px;
  text-align: center;
  color: #777570;
  font-size: 7px;
}


/* ==========================================
   TICKETS
========================================== */

.tickets-page {
  min-height: 700px;
}

.digital-ticket {
  max-width: 900px;
  margin-bottom: 65px;
  display: grid;
  grid-template-columns: 1fr 240px;
  background: white;
  border: 1px solid #ddd7d0;
  box-shadow: 0 20px 60px rgba(53,43,35,.07);
}

.ticket-main {
  padding: 32px;
}

.ticket-brand {
  color: #63202b;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .2em;
}

.ticket-event {
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.ticket-event h2 {
  margin: 10px 0 7px;
  font-family: Georgia, serif;
  font-size: 43px;
  font-weight: 500;
  line-height: .95;
}

.ticket-event p {
  margin: 0;
  color: #77706a;
  font-size: 9px;
}

.ticket-date {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.ticket-date strong {
  font-family: Georgia, serif;
  font-size: 58px;
  font-weight: 500;
  line-height: .8;
}

.ticket-date span {
  color: #63202b;
  margin-top: 10px;
  font-size: 9px;
  font-weight: 800;
}

.ticket-info-grid {
  margin-top: 70px;
  padding-top: 16px;
  border-top: 1px solid #ded8d1;
  display: grid;
  grid-template-columns: repeat(3,1fr);
}

.ticket-info-grid span {
  display: block;
  color: #99918a;
  font-size: 7px;
  letter-spacing: .12em;
}

.ticket-info-grid strong {
  display: block;
  margin-top: 7px;
  font-size: 10px;
}

.ticket-qr {
  padding: 30px;
  background: #eee9e3;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.qr-box {
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 8px solid white;
  background:
    repeating-linear-gradient(
      45deg,
      #252525 0 2px,
      #fff 2px 5px
    );
}

.qr-box span {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: #252525;
  font-size: 45px;
}

.ticket-qr > small {
  margin-top: 15px;
  color: #7e7770;
  font-size: 7px;
  letter-spacing: .14em;
}

.ticket-qr > strong {
  margin-top: 7px;
  color: #63202b;
  font-size: 9px;
}

.tickets-bottom {
  max-width: 900px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.tickets-bottom h2 {
  margin: 10px 0 0;
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: 500;
}

.ticket-history {
  max-width: 900px;
  margin-top: 25px;
  display: grid;
  gap: 8px;
}

.history-card {
  min-height: 79px;
  padding: 16px 18px;
  display: grid;
  grid-template-columns: 70px 1fr auto;
  align-items: center;
  background: white;
  border: 1px solid #ddd7d0;
}

.history-card > span {
  color: #63202b;
  font-size: 9px;
  font-weight: 800;
}

.history-card strong {
  display: block;
  font-family: Georgia, serif;
  font-size: 17px;
  font-weight: 500;
}

.history-card small {
  display: block;
  margin-top: 4px;
  color: #888078;
  font-size: 8px;
}

.history-card > b {
  color: #3f715d;
  font-size: 7px;
  letter-spacing: .12em;
}


/* ==========================================
   ORGANIZER
========================================== */

.organizer-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  padding-bottom: 55px;
}

.organizer-header h1 {
  max-width: 740px;
  font-size: clamp(55px,6vw,88px);
}

.organizer-header p {
  max-width: 510px;
  margin: 20px 0 0;
  color: #77706a;
  font-size: 12px;
  line-height: 1.7;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 9px;
}

.dashboard-stat {
  padding: 24px;
  background: white;
  border: 1px solid #ddd7d0;
}

.dashboard-stat span {
  display: block;
  color: #77706a;
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: .1em;
}

.dashboard-stat strong {
  display: block;
  margin: 18px 0 5px;
  font-family: Georgia, serif;
  font-size: 36px;
  font-weight: 500;
}

.dashboard-stat small {
  color: #5f806c;
  font-size: 8px;
}

.organizer-layout {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1.25fr .75fr;
  gap: 10px;
}

.dashboard-panel {
  padding: 28px;
  background: white;
  border: 1px solid #ddd7d0;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.panel-header h2 {
  margin: 10px 0 0;
  font-family: Georgia, serif;
  font-size: 34px;
  font-weight: 500;
}

.panel-header button {
  border: 1px solid #ddd7d0;
  background: #faf8f5;
  padding: 8px 10px;
  color: #77706a;
  font-size: 8px;
}

.chart {
  height: 260px;
  margin-top: 30px;
  display: grid;
  grid-template-columns: 35px 1fr;
  gap: 10px;
}

.chart-grid {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #a29a93;
  font-size: 7px;
}

.bars {
  height: 100%;
  padding: 7px 0;
  display: grid;
  grid-template-columns: repeat(12,1fr);
  align-items: end;
  gap: 8px;
  border-left: 1px solid #e0dad3;
  border-bottom: 1px solid #e0dad3;
  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0 50px,
      #eee9e3 51px
    );
}

.bar {
  background: #63202b;
  opacity: .9;
}

.chart-labels {
  padding-left: 45px;
  display: flex;
  justify-content: space-between;
  color: #98918a;
  font-size: 7px;
}

.manage-event {
  padding: 14px 0;
  display: grid;
  grid-template-columns: 48px 1fr auto 25px;
  align-items: center;
  gap: 11px;
  border-bottom: 1px solid #e1dbd4;
}

.manage-event:last-child {
  border-bottom: 0;
}

.manage-thumb {
  width: 48px;
  height: 48px;
}

.manage-info strong {
  display: block;
  font-size: 10px;
}

.manage-info small,
.manage-sales small {
  display: block;
  margin-top: 4px;
  color: #99918a;
  font-size: 7px;
}

.manage-sales {
  text-align: right;
}

.manage-sales strong {
  color: #63202b;
  font-size: 10px;
}

.manage-event > button {
  border: 0;
  background: transparent;
  color: #8b837c;
  font-size: 11px;
}

.organizer-bottom {
  margin-top: 10px;
  padding: 35px;
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: 50px;
  background: #eee9e3;
}

.organizer-bottom h2 {
  font-size: 44px;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 8px;
}

.quick-actions button {
  min-height: 130px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  background: white;
  border: 1px solid #dcd5ce;
}

.quick-actions button > span {
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #63202b;
  color: white;
  font-size: 13px;
}

.quick-actions strong {
  margin-top: 19px;
  font-size: 10px;
}

.quick-actions small {
  margin-top: 5px;
  color: #8b837b;
  font-size: 8px;
}


/* ==========================================
   TOAST
========================================== */

.toast {
  position: fixed;
  z-index: 300;
  left: 50%;
  bottom: 25px;
  transform: translateX(-50%);
  padding: 13px 18px;
  background: #302f2d;
  color: white;
  border-radius: 6px;
  box-shadow: 0 15px 40px rgba(0,0,0,.2);
  font-size: 9px;
}


/* ==========================================
   RESPONSIVE
========================================== */

@media (max-width: 1000px) {

  .desktop-nav {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .mobile-nav {
    display: flex;
  }

  .hero {
    grid-template-columns: 1fr;
  }

  .featured-grid {
    grid-template-columns: repeat(2,1fr);
  }

  .city-grid {
    grid-template-columns: repeat(2,1fr);
  }

  .seat-layout,
  .checkout-layout,
  .event-detail-hero {
    grid-template-columns: 1fr;
  }

  .organizer-layout {
    grid-template-columns: 1fr;
  }

  .organizer-bottom {
    grid-template-columns: 1fr;
  }

}


@media (max-width: 720px) {

  .nav-inner {
    height: 68px;
    padding: 0 18px;
  }

  .city-button {
    display: none;
  }

  .hero,
  .content-section,
  .events-page,
  .event-detail-page,
  .seat-page,
  .checkout-page,
  .tickets-page,
  .organizer-page {
    padding-left: 18px;
    padding-right: 18px;
  }

  .hero {
    padding-top: 55px;
    padding-bottom: 60px;
  }

  .hero-copy h1,
  .page-intro h1 {
    font-size: 57px;
  }

  .hero-art {
    min-height: 430px;
  }

  .hero-event-card {
    left: 18px;
    right: 18px;
  }

  .category-inner {
    padding: 0;
    grid-template-columns: repeat(2,1fr);
  }

  .category-inner button {
    border-bottom: 1px solid #474541;
  }

  .featured-grid,
  .city-grid,
  .ticket-options,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .section-heading,
  .page-intro,
  .organizer-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .compact-event {
    grid-template-columns: 85px 42px 1fr 25px;
  }

  .compact-price {
    display: none;
  }

  .event-list-card {
    grid-template-columns: 1fr;
  }

  .list-event-content {
    grid-template-columns: 48px 1fr;
  }

  .list-event-right {
    grid-column: 2;
    align-items: flex-start;
    flex-direction: row;
    margin-top: 10px;
  }

  .purchase-panel {
    flex-direction: column;
    align-items: flex-start;
  }

  .purchase-summary {
    width: 100%;
    justify-content: space-between;
  }

  .digital-ticket {
    grid-template-columns: 1fr;
  }

  .ticket-qr {
    min-height: 230px;
  }

  .ticket-event {
    flex-direction: column;
  }

  .ticket-date {
    align-items: flex-start;
  }

  .organizer-cta {
    margin-left: 18px;
    margin-right: 18px;
    padding: 38px 25px;
    flex-direction: column;
    align-items: flex-start;
  }

  .cta-stat {
    padding-left: 0;
    padding-top: 20px;
    border-left: 0;
    border-top: 1px solid rgba(255,255,255,.22);
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }

}


@media (max-width: 480px) {

  .hero-search {
    flex-direction: column;
  }

  .hero-search button {
    width: 100%;
    height: 43px;
  }

  .compact-event {
    grid-template-columns: 70px 38px 1fr;
  }

  .compact-arrow {
    display: none;
  }

  .detail-visual {
    min-height: 400px;
  }

  .event-facts {
    grid-template-columns: 1fr;
  }

  .seat-map-area {
    padding: 25px 10px;
  }

  .seat-row {
    gap: 4px;
  }

  .seat {
    font-size: 7px;
  }

  .two-inputs {
    grid-template-columns: 1fr;
  }

  .ticket-info-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .ticket-info-grid div {
    border-bottom: 1px solid #ded8d1;
    padding-bottom: 10px;
  }

}

</style>