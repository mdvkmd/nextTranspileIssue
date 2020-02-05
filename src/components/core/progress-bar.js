import React from 'react'
import NProgress from 'nprogress'
import Router from 'next/router'

/* eslint-disable react/prefer-stateless-function */
class ProgressBar extends React.Component {
  static defaultProps = {
    color: '#29D',
    startPosition: 0.3,
    stopDelayMs: 200,
    height: 3
  };

  timer = null;

  routeChangeStart = () => {
    NProgress.set(this.props.startPosition)
    NProgress.start()
  };

  routeChangeEnd = () => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      NProgress.done(true)
    }, this.props.stopDelayMs)
  };

  render () {
    return (null)
  }

  componentDidMount () {
    const { options } = this.props
    if (options) {
      NProgress.configure(options)
    }

    Router.events.on('routeChangeStart', this.routeChangeStart)
    Router.events.on('routeChangeComplete', this.routeChangeEnd)
    Router.events.on('routeChangeError', this.routeChangeEnd)
  }
}

export default ProgressBar
