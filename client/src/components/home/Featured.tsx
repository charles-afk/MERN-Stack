import React from 'react'
import feature from '../../models/feature.json'
export const Featured: React.FC = () => {
    const {photo} = feature
    return (
        <div className="column is-one-quarter box content-1">

            <p className="title">Latest News</p>

            <figure className="image is-4by3">
                <img src={photo} alt="Pic of Latest News"/>
            </figure>

            <p>
                &emsp;With the fall of the TVA, it is finally revealed who the man
                that lives at the end of time is, and an even greater evil
                is forewarned!<br/>
                &emsp;Now, a new unknown danger is on the horizon, that may unravel the realities
                of our known universe as we know it!<br/>
                &emsp;Setting off a chain reaction of events that ripple across the MCU, new 
                heros and foes team up with our favorite characters creating some memorable
                stories that will stick with you for ages!

            </p>
            
        </div>
    )
}
