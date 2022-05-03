import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Notfound from "./Notfound";
import Spinner from "./Spinner";

export default class News extends Component {
    static defaultProps = {
        country: "in",
        pagesize: 5,
        category: "general",
    };

    constructor(props) {
        console.log("constructing.........")
        super(props);
        this.state = {
            articles: [],
            loading: true,
            pageNo: 1,
            totalResults: 0,
            keyword:"",
            res:[],
            filter:"",
        };
        this.handleSearch = this.handleSearch.bind(this)
        this.hasKeyword = this.hasKeyword.bind(this)
        console.log("constructed.........")
    }


    async updateNews(){
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4fb0d07e88d413b917bd63bbfa69a4c&page=${this.state.pageNo}&pageSize=${this.props.pagesize}`
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            articles: data.articles,
            totalResults: data.totalResults,
            loading: false,
        });
    }
    
    async componentDidMount() {
        console.log("view ready & mounting process start.........")
        this.setState({ pageNo:this.state.pageNo })
        this.updateNews()
        console.log("component mounted.........")
    }

    handleSearch(e){ 
        this.setState( { keyword: String(e.target.value) } )
        this.setState({res:[]})
        this.hasKeyword();
    }

    handleClickPrevNext = async (e) =>{
        let num = e.target.innerText.trim() === "Next" ? 1 : -1
        this.setState({ pageNo:this.state.pageNo + num })
        this.updateNews()
    }

    hasKeyword = () =>{
        const sample = this.state.articles;
        let temp = []
        for(const currEle of sample){
            const n = currEle.title.length, m = this.state.keyword.length;
            const s = currEle.title.toLowerCase(), x = this.state.keyword.toLowerCase().trim();
            var ans = -1;
            for(let i = 0; i<=n-m; ++i){
                const str = s.slice(i, i+m);
                if(str === x){
                    ans = i;
                    break;
                }
             }
             if(ans>=0){
                 temp.push(currEle)
                 this.setState({res:temp})
             } 
        }
    }
    
    render() {
        console.log("rendering.........")
        return (
          <div className="container my-3">
            <h2 className="text-center">Top headlines below</h2>
            <form style={{ maxWidth: "500px" }} className="d-flex m-auto ">
              <input
                className="form-control mx-2"
                value={this.state.keyword}
                onChange={this.handleSearch}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <select
                style={{ width: "30%" }}
                className="form-select form-select-sm bg-dark text-light"
                aria-label=".form-select-sm example"
                defaultValue={'filter by'}
              >
                <option disabled >
                  Filter By
                </option>
                <option >Title</option>
                <option >Source</option>
              </select>
            </form>
            {this.state.loading && <Spinner />}
            <div className="row">
              {this.state.keyword.length === 0 ? (
                !this.state.loading &&
                this.state.articles.map((currEle, idx) => {
                  return (
                    <div key={currEle.url} className="col-md-4">
                      <Newsitem
                        title={currEle.title}
                        description={currEle.description}
                        imageUrl={currEle.urlToImage}
                        date={currEle.publishedAt}
                        source={currEle.source.name}
                      />
                    </div>
                  );
                })
              ) : this.state.res.length > 0 ? (
                this.state.res.map((currEle, idx) => {
                  return (
                    <div key={idx} className="col-md-4">
                      <Newsitem
                        title={currEle.title}
                        description={currEle.description}
                        imageUrl={currEle.urlToImage}
                        date={currEle.publishedAt}
                        source={currEle.source.name}
                      />
                    </div>
                  );
                })
              ) : (
                <Notfound />
              )}
            </div>

            <div className="conatiner d-flex justify-content-between">
              <button
                disabled={this.state.pageNo <= 1}
                className="btn btn-dark"
                onClick={this.handleClickPrevNext}
              >
                <i className="fa fa-angle-double-left"></i> Previous
              </button>
              <button
                disabled={
                  Math.ceil(this.state.totalResults / this.props.pagesize) <
                  this.state.pageNo + 1
                }
                className="btn btn-dark"
                onClick={this.handleClickPrevNext}
              >
                Next <i className="fa fa-angle-double-right"></i>
              </button>
            </div>
            {console.log("rendered.........")}
          </div>
        );
    }
}
