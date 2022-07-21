import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {

    const [articles, setarticles]=useState([])
    const [loading, setloading]= useState(true)
    const [page, setpage]=useState(1)
    const [totalResults, settotalresults]=useState(0)
    document.title= "NewsMonkey-" + props.category
 
   

    const updateNews=async ()=>{
        props.setProgress(10)
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ea25c9661438452fbbb8d93d2170b633&page=${page}&pagesize=${props.pageSize}`;
        setloading(true)
        let data= await fetch(url);
        let parsedData= await data.json();
        setarticles(parsedData.articles)
        settotalresults(parsedData.totalResults)
        setloading(false)
        
        props.setProgress(100)

    }
    useEffect(() => {
        updateNews();
    }, [])


    const fetchMoreData =async () => {
        
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ea25c9661438452fbbb8d93d2170b633&page=${page+1}&pagesize=${props.pageSize}`;
        setpage(page+1)
        
        let data= await fetch(url);
        let parsedData= await data.json();
        setarticles(articles.concat(parsedData.articles))
        settotalresults(parsedData.totalResults)
        
        

      };
    // const handleNext=async ()=>{

    // //     if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)) {
    // //     }
    // //     else{

        
    // //     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ea25c9661438452fbbb8d93d2170b633&page=${this.state.page+1}&pagesize=${props.pageSize}`;
    // //     this.setState({loading: true});
    // //     let data= await fetch(url);
    // //     let parsedData= await data.json();
        
    // //     this.setState({
    // //         page:this.state.page +1 ,
    // //         articles: parsedData.articles,
    // //         loading:false
    // //     })
    // // }

    
    // setpage(page+1);
    // updateNews()
    // }

    // const handlePrevious=async ()=>{

    //     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ea25c9661438452fbbb8d93d2170b633&page=${this.state.page -1}&pagesize=${props.pageSize}`;
    //     // this.setState({loading: true});
    //     // let data= await fetch(url);
    //     // let parsedData= await data.json();
    //     // console.log(parsedData)

    //     // this.setState({
    //     //     page: this.state.page -1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })
    //     setpage(page-1)
    //     updateNews()
    // }
  
    return (
      <div className="container my-3">
       <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>NewsMonkey- Top headlines</h1>
       {loading&&<Spinner/>}
       <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
            

       <div className="row">
       {articles.map((element)=>{
           
           return <div className="col-md-4" key={element.url}>
                <NewsItem  title={element.title} description={element.description} Imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}/>
            </div>
    })}
           
        </div>
    </InfiniteScroll>
          
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }


News.defaultProps= {
    country: 'in',
    pageSize: 8,
    category: 'general',

}

News.propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
