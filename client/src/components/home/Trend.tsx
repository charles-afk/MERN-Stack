import React from 'react'
import trends from '../../models/trends.json';
export const Trend: React.FC  = () => {
    return (
        <div>
            { trends.map(post => {
                return (
                    <div key={post.id}> 
                        <div className="card">
                            <div className="columns">
                                <div className="column">
                                    <div className="card-image">
                                        <figure className="image is-4by3">
                                            <div key={post.id}>
                                                <img src={post.pic} alt="Featured Pic"/>
                                            </div>
                                        </figure>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="media">
                                        <div className="media-content">
                                            <div key={post.id}>
                                                <p className="title is-4">{post.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <div key={post.id}>
                                            <p>{post.writing}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }) }
        </div>
    )
}
