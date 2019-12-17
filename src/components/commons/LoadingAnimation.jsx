import React, {Component} from 'react'
import loader from '../../images/loader.gif'
class LoadingAnimation extends Component {
    render () {
        return (
            <div className = 'loading-container'>
            <img
            className="loader"
            src={loader}
            alt=""
          />
        </div>)
    }
}
export default LoadingAnimation