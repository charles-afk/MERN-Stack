import React from 'react'
import { Banner } from '../components/home/Banner';
import { Featured } from '../components/home/Featured';
import { Trend } from '../components/home/Trend';

export const Home: React.FC = () => {
    return (
        <div className="container">
            <main>
                <Banner/>
                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <Featured/>
                            <div className="column box">
                                <p className="title"> Trending </p>
                                <Trend/>
                            </div>
                        </div>
                    </div>
                </section>
            </main>



        </div>
    )
}
