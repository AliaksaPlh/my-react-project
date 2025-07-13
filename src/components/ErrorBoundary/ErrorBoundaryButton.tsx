import React from 'react';
import Button from '../button/Button';

interface BuggyComponentState {
  crash: boolean;
}

class ErrorBoundaryButton extends React.Component<
  unknown,
  BuggyComponentState
> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      crash: false,
    };
  }

  handleClick = () => {
    this.setState({ crash: true });
  };

  render() {
    if (this.state.crash) {
      throw new Error('💥 ErrorBoundary check');
    }

    return (
      <div>
        <Button onClick={this.handleClick} className="errorButton">
          ErrorBoundary 💥
        </Button>
      </div>
    );
  }
}

export default ErrorBoundaryButton;
