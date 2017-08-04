const React = require('react');
const ReactDOM = require('react-dom');
const util = require('./util');
const UxcoreProgress = require('uxcore-progress');
const { Line } = UxcoreProgress;
const Icon = require('uxcore-icon');

class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percentage: 0
        };
    }

    onPending() {
        this.props.file.pending();
    }

    componentDidMount() {

        let t = null;
        let me = this;
        let percentage = me.state.percentage;
        me._isMounted = true;
        me.t = setInterval(() => {
            percentage = percentage + 5;
            if (me.props.isVisual && me.props.status === 'error') {
                clearInterval(me.t);
            } else {
                if (me._isMounted) {
                    me.setState({
                        percentage: percentage
                    });
                }
                if (percentage === 95) {
                    clearInterval(me.t);
                }
            }

        }, me.props.interval);
    }

    componentWillUnmount() {
        let me = this;
        me._isMounted = false;
        clearInterval(me.t)
    }

    render() {
        console.log(this.props.percentage);
        if (this.props.isVisual) {
            if (this.props.status === 'error') {
                return (
                    <div className="visual-progress-box">
                        <Icon onClick={this.props.onPending.bind(this)} className="re-upload-icon" name="shuaxin" />
                        <span onClick={this.props.onPending.bind(this)} className="re-upload">重新上传</span>
                        <div className="delete-progress" onClick={this.props.onCancel.bind(this)}><Icon name="biaodanlei-tongyongqingchu" /></div>
                    </div>
                )
            } else {
                return (
                    <div className="visual-progress-box">
                        <Line percent={this.state.percentage} strokeWidth={4} showInfo={false} />
                        <div className="delete-progress" onClick={this.props.onCancel.bind(this)}><Icon name="biaodanlei-tongyongqingchu" /></div>
                    </div>
                )
            }
        } else {
            return (
                <div style={{
                    width: '100%',
                    transform: `scale(${this.state.percentage / 100}, 1)`,
                    transformOrigin: 'left top',
                    transition: 'transform 0.1s linear',
                }} className="progress-box"></div>
            )
        }
    }
}

Progress.propTypes = {
    percentage: React.PropTypes.number,
    interval: React.PropTypes.number
};
Progress.defaultProps = {
    percentage: 0,
    interval: 100
};

module.exports = Progress;
