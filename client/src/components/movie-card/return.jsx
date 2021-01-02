import React from 'react';

export class Return extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { Button, onClick} = this.props;
    // A actual onclick function that is clicked on.
    return (
      <div onClick={
        () => onClick(Button)} className="returner">{}</div>
    );
  }
}