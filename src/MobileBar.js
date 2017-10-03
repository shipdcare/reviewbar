import React, { Component } from 'react';
import FaStar from 'react-icons/lib/fa/star';
import FaMinus from 'react-icons/lib/fa/minus';
import axios from 'axios';
import './App.css';

function Stars(props){
    if(props.rating <= 1){
        return (  <FaStar size={props.size}  className= {props.class}/> );
    } else if(props.rating >= 1 && props.rating <= 2){
        return ( 
            <span> 
                <FaStar size={props.size}  className= {props.class}/>
                <FaStar size={props.size}  className= {props.class}/>
            </span> 
        );
    } else if(props.rating >= 2 && props.rating <= 3){
        return ( 
            <div> 
                <FaStar size={props.size}  className= {props.class}/>
                <FaStar size={props.size}  className= {props.class}/>
                <FaStar size={props.size}  className= {props.class}/>
            </div> 
        );
    } else if(props.rating >= 3 && props.rating <= 4){
        return ( 
            <div> 
                <FaStar size={props.size} className= {props.class}/>
                <FaStar size={props.size} className= {props.class}/>
                <FaStar size={props.size} className= {props.class}/>
                <FaStar size={props.size} className= {props.class}/>
            </div> 
        );
    } else if(props.rating >= 4 ){
        return ( 
            <span> 
                <FaStar size={props.size} className= {props.class}/>
                <FaStar size={props.size} className= {props.class}/>
                <FaStar size={props.size} className= {props.class}/>
                <FaStar size={props.size} className= {props.class}/>
                <FaStar size={props.size} className= {props.class}/>
            </span>
        );
    }else{
        return <div></div>
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function ListItems(props) {
    if(isEmpty(props.data)){
        return(<div></div>)
    } else {
        return (
            <div>
                { props.data.reviews.map(item => (
                    <ListItem key={item.id} data={item}/>
                ))}
            </div>
        );
    }
}

function ListItem(props){
    return(
        <div className="levler-left-bar-review">
        <p className="levler-left-bar-review-name">{props.data.name}</p>
        <p>
            <Stars rating={props.data.rating} size="16" class="levler-left-bar-star"/>
            <span className="levler-bullet">&bull;</span>
            <span className="levler-left-bar-review-time">{props.data.review_time}</span>
        </p>
        <p className="levler-left-bar-review-comment">{props.data.comment}</p>
    </div>
    );
}

class MobileBar extends Component {

    constructor(props){
        super(props);
        this.toggleReviews = this.toggleReviews.bind(this);
        this.state = {show: false, data: {}}
    }

    componentWillMount(){
        var self = this;
        axios({
            method: "get",
            url: 'https://app.levler.co/api/v1/toolbar/reviews',
            headers: {'authorization': 'e242d884ff3238758c821f67af00c5d6'}
        }).then(function (response) {
          self.setState({data: response.data})
        }).catch(function (error) {
          console.log(error);
        });
    }
    
    toggleReviews() {
        if(this.state.show) {
            this.setState({show: false})
        } else {
            this.setState({show: true})
        }
    }

    render(){
        return (
            <div className="levler-sm-container">
                <div id="levler-bar-small" className={this.state.show ? 'open':'closed'} onClick={ this.toggleReviews }>
                    <div id="levler-show-reviews-small" className={ this.state.show ? 'hide':'show'}>
                        <div className="levler-bar-small-label levler-bar-small-label-rating">{ this.state.data.rating }</div>
                        <div className="levler-bar-small-stars"><Stars size="8" rating={this.state.data.rating} /></div>
                        <div className="levler-bar-small-label levler-bar-small-label-reviews">{ this.state.data.No_of_reviews }</div>
                        <div className="levler-bar-small-reviews">Reviews</div>
                    </div>
                    <div id="levler-hide-reviews-small" className={ this.state.show ? 'show':'hide'}>
                        <FaMinus size={30} id="levler-minus"/>
                    </div>
                </div>
                <div id="levler-bar-left" className={ this.state.show ? 'show':'hide'}>
                    <div className="levler-left-bar-body">
                        <div className="levler-left-bar-header">
                            <Stars size="30" rating={this.state.data.rating} class="levler-left-bar-star"/>
                            <p className="levler-left-bar-header-label">{ this.state.data.No_of_reviews } Reviews</p>
                        </div>
                        <div className="levler-left-bar-reviews">
                            <ListItems data={this.state.data} />
                        </div>
                    </div>
                    <div className="levler-left-bar-footer">
                        <p className="levler-left-bar-footer-label">Powered by Levler</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MobileBar;