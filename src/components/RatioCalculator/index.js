import React, { Component } from 'react';

class RatioCalculator extends Component {
    constructor() {
        super();

        this.state = {
            originalWidth: 1920,
            originalHeight: 1080,
            newWidth: 0,
            newHeight: 0
        }
    }
    render() {
        const { originalWidth, originalHeight, newWidth, newHeight } = this.state;
        return (
            <div className={'ratio-calc-container'}>
                <p>
                    <b>Instructions:</b>&nbsp;&nbsp;&nbsp; Enter the values for the original width (W1) & original height (H1) on the left, then enter either a new width (W2) or new height (H2) on the right to calculate the remaining value.
                    Change any of the values at any time, or click reset.
                </p>
                <div className={'row'}>
                    <div className={'form-container col-12 col-md-6'}>
                        <div className={'reset-container mt-4 mb-4'}>
                            <label htmlFor="W1">W1 : </label>
                            <input
                                id={'W1'}
                                className={'ml-2'}
                                type="text"
                                value={originalWidth}
                            />
                        </div>
                        <div className={'reset-container mt-4 mb-4'}>
                            <label htmlFor="H1">H1 : </label>
                            <input
                                className={'ml-2'}
                                id={'H1'}
                                type="text"
                                value={originalHeight}
                            />
                        </div>
                        <hr />
                        <div className={'reset-container mt-4 mb-4'}>
                            <label htmlFor="W2">W2 : </label>
                            <input 
                                id={'W2'} 
                                className={'ml-2'} 
                                type="text" 
                                value={newWidth}
                            />
                        </div>
                        <div className={'reset-container mt-4 mb-4'}>
                            <label htmlFor="H2">H2 : </label>
                            <input 
                                id={'H2'} 
                                className={'ml-2'} 
                                type="text" 
                                value={newHeight}
                            />
                        </div>
                        <div className={'reset-container mt-4 mb-4'}>
                            <button className={'reset-btn'}>Reset</button>
                        </div>
                    </div>
                    <div className={'preview-container col-12 col-md-6'}>
                        <div><h5>Preview : </h5></div>
                        <div className={'preview-block mt-2'}>
                            <div className={'visual-ratio'}>
                                <img src={'http://segdeha.com/e/aspect_ratio/sample.jpg'} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p> Use the form at top to calculate the missing value for a particular aspect ratio. This is useful, for example, when resizing photos or video. </p>
                    <h5><b>Formula :</b></h5>
                    <p>Say you have a photo that is 1600 x 1200 pixels, but your blog only has space for a photo 400 pixels wide. To find the new height of your photo—while preserving the aspect ratio—you would need to do the following calculation:</p>
                    <div className={'mb-4'}>
                        <code>
                            <h5>original height / original width x new width = new height</h5>
                            <h5>1200 / 1600 x 400 = 300</h5>
                        </code>
                    </div>
                </div>
            </div>
        )
    }
}

export default RatioCalculator;
