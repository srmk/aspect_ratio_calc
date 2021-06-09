import React, { Component } from 'react';
import $ from 'jquery';
import { solve, ratio, isInteger, ratio2css, resizeSampleImage } from './helper';


const imgHandlers = [
    { name: 'crop', key: 'crop' },
    { name: 'letterBox', key: 'letterBox' },
];

const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

class RatioCalculator extends Component {
    constructor() {
        super();

        this.state = {
            originalWidth: 1920,
            originalHeight: 1080,
            newWidth: '',
            newHeight: '',
            showImage: false,
            imgSrc: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
            ratio: ratio(1920, 1080),
            selectedHandler: 'crop'
        }

        this.reset = this.reset.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const { originalWidth, originalHeight } = this.state;
        $('#visual-ratio').css(ratio2css(originalWidth, originalHeight));
        resizeSampleImage(this.state.selectedHandler);
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.state.originalWidth !== prevState.originalWidth) ||
            (this.state.originalHeight !== prevState.originalHeight)) {
            $('#visual-ratio').css(ratio2css(this.state.originalWidth, this.state.originalHeight));
            resizeSampleImage(this.state.selectedHandler);
            this.setState({
                ratio: ratio(this.state.originalWidth, this.state.originalHeight)
            });
        }
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value !== '' ? parseInt(value) : value });
    }

    onKeyDown(event) {
        var x = event.keyCode;
        if (x === 109 || x === 189) {
            event.preventDefault();
            alert("You can't enter minus value !");
        }
    }

    onKeyUp(e) {
        const { name, value } = e.target;
        if (!isInteger(value)) return;
        let newWidth, newHeight;
        switch (name) {
            case 'originalWidth':
                newWidth = solve(undefined,
                    this.state.newHeight,
                    this.state.originalWidth,
                    this.state.originalHeight);
                this.setState({ newWidth });
                break;
            case 'originalHeight':
                newHeight = solve(this.state.newWidth,
                    undefined,
                    this.state.originalWidth,
                    this.state.originalHeight);
                this.setState({ newHeight });
                break;
            case 'newWidth':
                newHeight = solve(this.state.newWidth,
                    undefined,
                    this.state.originalWidth,
                    this.state.originalHeight);
                this.setState({ newHeight });
                break;
            case 'newHeight':
                newWidth = solve(undefined,
                    this.state.newHeight,
                    this.state.originalWidth,
                    this.state.originalHeight);
                this.setState({ newWidth });
                break;
            default:
                break;
        }
    }

    reset() {
        this.setState({
            originalWidth: 1920,
            originalHeight: 1080,
            newWidth: '',
            newHeight: '',
            showImage: false,
            imgSrc: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
            ratio: ratio(1920, 1080),
            selectedHandler: 'crop'
        })
    }


    render() {
        const { originalWidth,
            originalHeight, newWidth,
            newHeight, showImage, imgSrc } = this.state;
        return (
            <div className={'ratio-calc-container'}>
                <p> Use the form at below to calculate the missing value for a particular aspect ratio. This is useful, for example, when resizing photos or video. </p>
                <p>
                    <b>Instructions:</b>&nbsp;&nbsp;&nbsp; Enter the values for the original width (W1) & original height (H1) on the top, then enter either a new width (W2) or new height (H2) on the bottom to calculate the remaining value.
                    Change any of the values at any time, or click reset.
                </p>
                <div className={'row'}>
                    <div className={'form-container col-12 col-md-6'}>
                        <div className={'reset-container pt-4 pb-4'}>
                            <label htmlFor="W1">W1 : </label>
                            <input
                                id={'W1'}
                                className={'ml-2'}
                                type="text"
                                min="0"
                                onKeyUp={this.onKeyUp}
                                name={'originalWidth'}
                                value={originalWidth}
                                onKeyDown={this.onKeyDown}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className={'reset-container  pb-4'}>
                            <label htmlFor="H1">H1 : </label>
                            <input
                                className={'ml-2'}
                                id={'H1'}
                                name={'originalHeight'}
                                type="text"
                                min="0"
                                onKeyUp={this.onKeyUp}
                                onKeyDown={this.onKeyDown}
                                value={originalHeight}
                                onChange={this.onChange}
                            />
                        </div>
                        <hr />
                        <div className={'reset-container  pb-4'}>
                            <label htmlFor="W2">W2 : </label>
                            <input
                                id={'W2'}
                                className={'ml-2'}
                                type="text"
                                min="0"
                                name={'newWidth'}
                                value={newWidth}
                                onKeyUp={this.onKeyUp}
                                onKeyDown={this.onKeyDown}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className={'reset-container  pb-4'}>
                            <label htmlFor="H2">H2 : </label>
                            <input
                                id={'H2'}
                                className={'ml-2'}
                                type="text"
                                min="0"
                                name={'newHeight'}
                                value={newHeight}
                                onKeyUp={this.onKeyUp}
                                onKeyDown={this.onKeyDown}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className={'reset-container pt-4 pb-4'}>
                            <button
                                className={'reset-btn'}
                                onClick={this.reset}
                            >Reset</button>
                        </div>
                    </div>
                    <div className={'preview-container col-12 col-md-6'}>
                        <div className={'preview-header'}>
                            <h5>Preview : </h5>
                            <h5>{this.state.ratio}</h5>
                        </div>
                        <div className={'preview-block pt-2'}>
                            <div id={'visual-ratio'} className={'visual-ratio'}> sample
                                {showImage && <img src={imgSrc} alt="" />}
                            </div>
                        </div>
                        <div className={'sample-img-trigger'}>
                            <div style={{ ...style, alignItems: 'flex-start' }}>
                                <div style={{ ...style, minWidth: '115px' }}>
                                    <input
                                        id={'show-img'}
                                        type={'checkbox'}
                                        style={{ minHeight: 'auto' }}
                                        checked={showImage}
                                        onChange={(e) => {
                                            this.setState((prevState) => ({ showImage: !prevState.showImage }))
                                        }}
                                    />
                                    <label className={'m-0'} htmlFor={'show-img'}>{showImage ? 'Hide' : 'Show'} image</label>
                                </div>
                                <div
                                    style={{
                                        ...style,
                                        flexDirection: 'column',
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    <label className={'m-0'}>Ratio mismatches :</label>
                                    <div>
                                        {
                                            imgHandlers.map((item) => {
                                                return (
                                                    <label className={'mb-0 ml-4'} key={item.key}>
                                                        <input
                                                            id={item.key}
                                                            type="radio"
                                                            className={'mr-2'}
                                                            name={'img-type'}
                                                            value={item.name}
                                                            style={{ minHeight: 'auto', verticalAlign: 'middle' }}
                                                            checked={item.name === this.state.selectedHandler}
                                                            onChange={() => {
                                                                this.setState({ selectedHandler: item.name });
                                                                resizeSampleImage(item.name);
                                                            }}
                                                        />
                                                        {item.name}
                                                    </label>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            {showImage && <div className={'mb-2'}>
                                <label htmlFor="sample-img">Sample Image URL: </label>
                                <input
                                    id={'sample-img'}
                                    style={{ minWidth: '100%' }}
                                    type="text"
                                    name={'imgSrc'}
                                    value={imgSrc}
                                    onChange={(e) => this.setState({ imgSrc: e.target.value })}
                                />
                            </div>}
                        </div>
                    </div>
                </div>
                <div>
                    <h5><b>Formula :</b></h5>
                    <p>Say you have a photo that is 1600 x 1200 pixels, but your blog only has space for a photo 400 pixels wide. To find the new height of your photo—while preserving the aspect ratio—you would need to do the following calculation:</p>
                    <div className={'pb-4'}>
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
