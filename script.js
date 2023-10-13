$(document).ready(function () {

    const pumpkin = (`<i id="pumpkin"><img src="pumpkin_icon.ico" alt="Your Icon"></i>`)

    $('.jumbotron').prepend(pumpkin);

    $('#pumpkin img').on('mousedown', function () {

        tapHoldTimer = setTimeout(function () {

            display_guests();

        }, 5000);
    });

    $('#pumpkin img').on('mouseup', function () {
        clearTimeout(tapHoldTimer);
    });


    var hidden = false;
    var hidden2 = false;
    var status = "Undecided";
    var party_size = 0;
    var bringing = "Undecided";
    var guest_name = "Undecided";
    var notes = "";
    var floating = false;
    var pulled_guests = false;

    $('#bat_img').click(function () {

        if (!floating) {
            $('#bat_img').addClass('floatAround')
            floating = true;
        }

        setTimeout(function () {
            $('#bat_img').removeClass('floatAround')
            floating = false;
        }, 10100)

    })

    $('#rsvp_button').click(function () {

        window.scrollTo(0, 0);

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
            $('.guest_form').append(notes_section)
            $('.guest_form').append(done_section)

            // hide the party size, bring, and done

            $('.party_size_section').hide();
            $('.bringing_section').hide();
            $('.notes_section').hide();
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
                    $('.notes_section').hide();
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
                    $('.notes_section').show();
                    $('.done_section').show();
                    window.scrollTo(0, document.body.scrollHeight);
                    $('#done_btn').text("Submit");
                } else {
                    $('.notes_section').hide();
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

                notes = $('#notes').val();

                var guest_object = {
                    "guest_name": guest_name,
                    "status": status,
                    "party_size": party_size,
                    "bringing": bringing,
                    "notes": notes
                }

                add_guest(guest_object, successful_submission, failed_submission, loading)

            })

        }, 2100)

    });

    function check_status() {
        if (status === "Going") {
            $('.party_size_section').show();
        } else if (status === "Not Going") {
            $('.notes_section').show();
            $('.done_section').show();
            $('#done_btn').text("Submit");
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            $('.party_size_section').hide();
            party_size = 0;
            $('#guest_count').val('');
            $('.bringing_section').hide();
            hidden2 = false;
            bringing = "Undecided"
            $('.bring_response').show();
            $('.notes_section').hide();
            $('.done_section').hide();
        }
    }

    function successful_submission(status) {

        $('.loading_screen').hide();
        $('body').css({
            "overflow": "unset"
        })
        $('.jumbotron').fadeOut(2000);
        // $('.container-fluid').css({
        //     "height" : "100vh"
        // })

        window.scrollTo(0, 0);

        setTimeout(function () {
            $('.jumbotron').empty();
            if (status === "Going") {
                $('.jumbotron').append(big_bat(guest_name));
                $('.jumbotron').fadeIn(2000);
            } else {
                $('.jumbotron').css({
                    "background-color": "black"
                })
                $('body').css({
                    "overflow": "hidden"
                })
                $('.jumbotron').append(`<img src="clown.jpg" alt="" class="spooky3"></img>`);
                $('.jumbotron').show();
                setTimeout(function () {
                    $('.jumbotron').html(happy_halloween);
                }, 600)
            }

        }, 3100)
    }

    function failed_submission() {
        alert("There was an error submitting your RSVP. Please ensure you are connected to a network. Try reloading the page if this persists")
    }

    function loading() {
        $('body').append(loading_screen)
        $('body').css({
            "overflow": "hidden"
        })
    }

    var jon_and_nikki = new Image();
    jon_and_nikki.src = 'jon_and_nikki.png';

    jon_and_nikki.onload = function () {
        console.log('Image preloaded');
    };

    function big_bat(guest_name) {
        return (`
            <div class="header">
                <h2 class="display-3">See you sooooooon, ${guest_name}</h2>
            </div>
            <img src="${jon_and_nikki.src}" alt="" class="bat">
            <div class="details">
                <p>Date: <span class="num_font">Saturday October 28th 2023</span></p>
                <p>Time: <span class="num_font">6:00 PM</span></p>
                <p>Location: <span class="num_font">24 SUNLIGHT LANE, BAILEY CO, 80241</span></p>
            </div>
            <a class="remove_font">Get regular font</a>
        `)
    }

    const happy_halloween = (`
        <div class="header">
            <h2 id="happy_halloween" class="display-3">Happy Halloween</h2>
        </div>
    `)

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

    const notes_section = (`
        <div class="notes_section">
            <div class="sub-header">
                <h4 class="display-4">Notes</h4>
            </div>
            <div class="form-group">
                <textarea type="text" class="form-control center" id="notes" name="notes" placeholder="Notes to host (Optional)"></textarea>
            </div>
        </div>
    `)

    const done_section = (`
        <div class="done_section">
            <button id="done_btn" class="btn btn-dark">Submit</button>
        </div>
    `)

    const loading_screen = (`
        <div class="loading_screen">
            <h2 class="display-3">Sending...</h2>
        </div>
    `)

    $(document).on('click', '.remove_font', function () {
        $('.remove_font').remove();
        $('.details').css({
            "font-family": "sans-serif",
            "font-size": "1rem",
            "font-weight": "bold"
        });
        $('.num_font').css({
            "font-family": "sans-serif",
            "font-size": "1rem",
            "font-weight": "bold"
        });
    });

    function display_guests() {

        $('#guest_table_header').empty();
        $('#guest_table_data').empty();

        // get the guests from firebase
        get_guests()
            .then((guestData) => {

                // create the heading
                var fake = ['guest_name', 'status']
                const column_labels = Object.keys(guestData[0]);
                create_header(fake)

                // create the rows
                guestData.forEach(function (guest, index) {

                    create_row(guest, fake, index)

                })

                $('#guest_table_modal').modal('show');
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }

    function create_header(column_labels) {
        const header_row = $('<tr id="guest_table_header_row"></tr>');

        column_labels.forEach(function (column) {
            const label = column.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            header_row.append(`<td>${label}</td>`);
        });

        $('#guest_table_header').append(header_row);
    }

    function create_row(guest, column_labels, index) {
        const data_row = $(`<tr id="guest_${index}_row"></tr>`);
        column_labels.forEach(function (column, index2) {
            data_row.append(`<td>${guest[column_labels[index2]]}</td>`)
        });
        $('#guest_table_data').append(data_row);
    }
});

