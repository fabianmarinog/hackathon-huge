import React, { PropTypes } from 'react'

class CopyClipboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  copyToClipboard(textToCopy) {
      // create hidden text element, if it doesn't exists already
      // must use a temporary form element for the selection and copy
      const targetId = 'copy-text'
      let target = document.getElementById(targetId);

      if (!target) {
        target = document.createElement('textarea');
        target.style.position = 'absolute';
        target.style.left = '-9999px';
        target.style.top = '0';
        target.id = targetId;
        document.body.appendChild(target);
      }

      target.textContent = textToCopy;

      this.setState({ text: textToCopy });

      // select the content
      let currentFocus = document.activeElement;
      target.focus();
      target.setSelectionRange(0, target.value.length);

      // copy the selection
      document.execCommand('copy');

      // restore original focus
      if (currentFocus && typeof currentFocus.focus === 'function') {
        currentFocus.focus();
        setTimeout(() => {
          target.blur();
        }, 50);
      }

      target.textContent = '';
  }

  copy() {
    this.copyToClipboard(location.href);
  }

	render () {

		return (
      <div>
        {this.state.text}
				<button onClick={() => this.copy()}>Copy to clipboard</button>
			</div>
		)
	}
}

export default CopyClipboard
