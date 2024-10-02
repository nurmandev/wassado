import React from 'react'
import hero1 from '../assets/img/hero/hero-1.jpg'
import hero2 from '../assets/img/hero/hero-2.jpg'
import hero3 from '../assets/img/hero/hero-3.jpg'

const Carousel = () => {
    return (
        <div>



            {/* <!-- Hero Section Begin --> */}
            <section class="hero-section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="hero-text">
                                <h1 style={{color: 'black'}}>LuxuryStay Hospitality</h1>
                                <p style={{color : 'black'}}>Here are the best hotel booking sites, including recommendations for international
                                    travel and for finding low-priced hotel rooms.
                                </p>

                            </div>
                        </div>
                        {/* <div class="col-xl-4 col-lg-5 offset-xl-2 offset-lg-1">
                            <div class="booking-form">
                                <h3>Booking Your Hotel</h3>
                                <form action="#">
                                    <div class="check-date">
                                        <label for="date-in">Check In:</label>
                                        <input type="text" class="date-input" id="date-in" />
                                        <i class="icon_calendar"></i>
                                    </div>
                                    <div class="check-date">
                                        <label for="date-out">Check Out:</label>
                                        <input type="text" class="date-input" id="date-out" />
                                        <i class="icon_calendar"></i>
                                    </div>
                                    <div class="select-option">
                                        <label for="guest">Guests:</label>
                                        <select id="guest">
                                            <option value="">2 Adults</option>
                                            <option value="">3 Adults</option>
                                        </select>
                                    </div>
                                    <div class="select-option">
                                        <label for="room">Room:</label>
                                        <select id="room">
                                            <option value="">1 Room</option>
                                            <option value="">2 Room</option>
                                        </select>
                                    </div>
                                    <button type="submit">Check Availability</button>
                                </form>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div class="hero-slider owl-carousel">
                    <div class="hs-item set-bg" style={{ backgroundImage: `url(${hero1})` }}></div>
                    <div class="hs-item set-bg" style={{ backgroundImage: `url(${hero2})` }}></div>
                    <div class="hs-item set-bg" style={{ backgroundImage: `url(${hero3})` }}></div>
                </div>
            </section>
            {/* <!-- Hero Section End --> */}



        </div>
    )
}

export default Carousel