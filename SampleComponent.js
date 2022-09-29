import React, { Component } from 'react';


class DebounceButton extends Component {
    // constructor(props)
    // {
    //     super(props);
    //     this.state = { color : '#4cb96b' };
    // }

    state = {
        disabled: this.props.isDisabled,
        processing: false
    }

    componentWillReceiveProps(newProps) {
        if (this.state.disabled !== newProps.disabled) {
          this.setState({disabled: newProps.disabled});
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.state.disabled !== nextProps.disabled;
    }

    // componentDidUpdate = (prevProps) => {
    //     if (this.props.disabled && !prevProps.disabled) {
    //         this.setState({ ...this.state, disabled: this.props.disabled})
    //     }

    // }

    testFxn = () => {
        console.log("debounced!!!")
    }

    handleClick = () => {
        console.log("debounce handleClick ran")
        const debounceFxn = _.debounce(this.testFxn, this.props.debounceInterval);
        debounceFxn();
        return false;
    }

    render() {
        return (
            <div>
                <Button
                    variant={this.props.variant}
                    color={this.props.color}
                    onClick={() => {
                        this.setState({ disabled: true, processing: true }, () => {
                            Promise.all([
                                this.handleClick()
                            ]).then(() => {
                                this.setState({ disabled: false, processing: false })
                            })
                        });
                    }}
                    disabled={this.state.disabled}
                >
                    <React.Fragment>
                        {this.state.processing ? <CircularProgress /> : null}
                        {this.state.processing ? this.props.processingText : this.props.buttonText}
                    </React.Fragment>
                </Button>
            </div>
        )
    }
}

export default DebounceButton;
