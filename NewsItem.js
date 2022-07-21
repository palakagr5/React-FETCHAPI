import React from 'react'

const NewsItem=(props)=> {
    

        let {title,description, Imageurl, newsurl, author, date}= props;
        return (
            <div>
                <div className="card my-2">
                    <img src={!Imageurl?"https://images.hindustantimes.com/img/2022/06/28/1600x900/alia_bhatt_ranbir_kapoor_1656383178569_1656383178816.jpg": Imageurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small class="text-muted">By {!author?"Unknown": author} on {new Date(date).toGMTString()}</small></p>
                        <a  rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }


export default NewsItem
