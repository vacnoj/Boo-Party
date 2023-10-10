$(document).ready(function () {

    var hidden = false;
    var hidden2 = false;
    var status = "Undecided"
    var party_size = 0;
    var bringing = "Undecided"
    var guest_name = "Undecided"

    $('#rsvp_button').click(function () {

        const fricken_bats = document.querySelectorAll('.fricken_bats');

        fricken_bats.forEach(bat => {

            bat.style.display = 'unset'

            bat.style.animation = 'flyBats 5s linear 1 forwards'

        });

        const bats = document.querySelectorAll('.fricken_bats');

        bats.forEach(bat => {
            const randomTop = Math.floor(Math.random() * window.innerHeight);
            const randomLeft = Math.floor(Math.random() * window.innerWidth);

            bat.style.top = `${randomTop}px`;
            bat.style.left = `${randomLeft}px`;
        });

        $('.jumbotron').slideUp(2000);

        setTimeout(function () {

            $('.jumbotron').empty();
            $('.jumbotron').append(guest_form_header)
            $('.jumbotron').append(rsvp_info)
            $('.jumbotron').append(guest_form)
            $('.guest_form').append(rsvp_section)
            $('.guest_form').append(party_size_section)
            $('.guest_form').append(bringing_section)
            $('.guest_form').append(done_section)

            // hide the party size, bring, and done

            $('.party_size_section').hide();
            $('.bringing_section').hide();
            $('.done_section').hide();
            $('#rsvp_res_row').hide();
            $('.jumbotron').slideDown(2000);

            $('#guest').on('keyup change', function () {
                if ($('#guest').val()) {
                    guest_name = $('#guest').val();
                    $('#rsvp_res_row').show();
                } else {
                    $('#rsvp_res_row').hide();
                    $('.party_size_section').hide();
                    party_size = 0;
                    $('#guest_count').val('');
                    $('.bringing_section').hide();
                    hidden2 = false;
                    bringing = "Undecided"
                    $('.bring_response').show();
                    $('.done_section').hide();
                }
            })

            $(".rsvp_response").click(function () {
                // Find the parent row element
                var row = $(this).closest(".rsvp_row");

                if (!hidden) {
                    // Hide the other button within the same row
                    row.find(".rsvp_response").not(this).hide();
                    hidden = true;
                    status = $(this).data('status');
                    check_status();
                } else {
                    row.find(".rsvp_response").not(this).show();
                    hidden = false;
                    status = "Undecided"
                    check_status();
                }
            });

            $('.bring_response').click(function () {
                var row2 = $(this).closest(".bring_row");

                if (!hidden2) {
                    // Hide the other button within the same row
                    row2.find(".bring_response").not(this).hide();
                    hidden2 = true;
                    bringing = $(this).data('bring');
                } else {
                    row2.find(".bring_response").not(this).show();
                    hidden2 = false;
                    bringing = "Undecided"
                }

                if (bringing !== "Undecided") {
                    $('.done_section').show();
                    $('#done_btn').text("Done");
                } else {
                    $('.done_section').hide();
                }
            });

            $('#guest_count').on('keyup', function () {
                party_size = $(this).val()
                if (party_size > 0) {
                    $('.bringing_section').show();
                }
                else {
                    $('.bringing_section').hide();
                }
            })

            $('#done_btn').click(function () {

                var response = {
                    "guest_name": guest_name,
                    "status": status,
                    "party_size": party_size,
                    "bringing": bringing
                }

                console.log(response)

                done(status);
            })

        }, 2100)

    });

    function check_status() {
        if (status === "Going") {
            $('.party_size_section').show();
        } else if (status === "Not Going") {
            $('.done_section').show();
            $('#done_btn').text("I\'m a bad friend");
        } else {
            $('.party_size_section').hide();
            party_size = 0;
            $('#guest_count').val('');
            $('.bringing_section').hide();
            hidden2 = false;
            bringing = "Undecided"
            $('.bring_response').show();
            $('.done_section').hide();
        }
    }

    function done(status) {
        // send data to database
        // page fades away
        $('.jumbotron').fadeOut(5000);

        setTimeout(function() {
            $('.jumbotron').empty();
            if (status === "Going") {
                $('.jumbotron').append(big_bat(guest_name));
                $('.jumbotron').fadeIn(5000);
            } else {
                $('.jumbotron').append(`<img src="clown.jpg" alt="" class="spooky3"></img>`);
                $('.jumbotron').show();
                setTimeout(function() {$('.jumbotron').hide();}, 500)
            }
            
        }, 5100)
    }

    function big_bat(guest_name) {
        return (`
            <div class="header">
                <h2 class="display-3">See you sooooooon, ${guest_name}</h2>
            </div>
            <img src="jon_and_nikki.png" alt="" class="bat">
            <div class="details">
                <p>Date: October 28th, 2023</p>
                <p>Time: 6:00 PM</p>
                <p>Location: 24 SUNLIGHT LANE, BAILEY CO, 80241</p>
            </div>
        `)
    }

    const guest_form_header = (`
        <div class="header">
            <h2 class="display-3">RSVP Form</h2>
        </div>
    `)

    const guest_form = (`
        <form class="guest_form" onsubmit="return false;"></form>
    `)

    const rsvp_info = (`
        <div class="row" id="rsvp_info_row">
            <p>We are having a <span id="cp">costume party</span> to celebrate Nikki's 32nd birthday!</p>
            <p>Following the theme of <span id="boo">Booooooo's</span>, please bring your favorite spooky food or
                beverage and get creative with it!</p>
        </div>
    `)

    const rsvp_section = (`
        <div class="rsvp_section">
            <div class="sub-header">
                <h4 class="display-4">Full Name</h4>
            </div>
            <div class="form-group">
                <input type="text" class="form-control center" id="guest" name="name" placeholder="Name">
            </div>
            <div id="rsvp_res_row" class="row rsvp_row">
                <div class="col-5 offset-1">
                    <button data-status="Going" class="btn rsvp_response btn-success">Going</button>
                </div>
                <div class="col-5">
                    <button data-status="Not Going" class="btn rsvp_response btn-danger">Not Going</button>
                </div>
            </div>
        </div>
    `)

    const party_size_section = (`
        <div class="party_size_section">
            <div class="sub-header">
                <h4 class="display-4">Party Size</h4>
            </div>
            <div class="form-group">
                <input type="number" class="form-control center" id="guest_count" name="guest_count">
            </div>
        </div>
    `)

    const bringing_section = (`
        <div class="bringing_section">
            <div class="sub-header">
                <h4 class="display-4">Bringing</h4>
            </div>
            <div id="bring_res_row" class="row bring_row">
                <div class="col-5 offset-1">
                    <button data-bring="Food" class="btn bring_response btn-primary">Snacks</button>
                </div>
                <div class="col-5">
                    <button data-bring="Drink" class="btn bring_response btn-primary">Beverages</button>
                </div>
            </div>
        </div>
    `)

    const done_section = (`
        <div class="done_section">
            <button id="done_btn" class="btn btn-dark">Done</button>
        </div>
    `)
});

