import React from 'react'
import { useContact } from '../components/contact/hooks/useContact'
export const Contact: React.FC = () => {
    const {values,handleChange,handleTextChange,handleSubmit} = useContact()
    const {name,email,text} = values
    return (
        <div>
            <div className="level section">
                <div className="level-item">
                    <div className="card box explain-box">
                        <div className="card-content">
                            <div className="content contact-explained">
                                <p>
                                Have anything you'd like to share? Enter your information and
                                message below and I'll make sure to get back to you as soon as I can!
                                </p>
                            </div>
                        </div>      
                    </div>
                </div>
            </div>
            
            <div className="level section">
                <div className="level-item con">

                    <form onSubmit={handleSubmit}>    
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <p className="control has-icons-left has-icons-right">
                                        <input className="input" 
                                               type="text" 
                                               placeholder="Name"
                                               name="name"
                                               value={name}
                                               onChange={handleChange}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                            <i className="fas fa-check"></i>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <p className="control has-icons-left has-icons-right">
                                        <input className="input" 
                                               type="email" 
                                               placeholder="Email"
                                               name="email"
                                               value={email}
                                               onChange={handleChange}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                            <i className="fas fa-check"></i>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <textarea className="textarea"
                                  placeholder="Enter your message here!"
                                  name="text"
                                  value={text}
                                  onChange={handleTextChange}
                        ></textarea>

                        <button className="fix-submit" type="submit">Submit</button>
                    </form>

                </div>
            </div>
        </div>
    )
}
