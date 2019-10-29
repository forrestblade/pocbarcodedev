import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

// Configure the library and activate it with a license key
configure("Ac7NJCU1O9E+Kq6uQUOMI/ovSijWHfbwVz600gUaWPC2GH+yTEYDyIlJdPhibSvdqkx3xlMcK5oJXW331m+ubNlrIR49avoMPGmcx8p6YNkpW4CyhFbeDHxNTICieXMEUjw7vd4cTmH5M1nxuQ/1+pjrdRYlmBcpqcUTs2BtQ4I93Mk1KaR4ZnIoOSBi3ymxNWLqGo8Dynf1AZriR7h/ZBwEV60LqWPp3VFYRjVZ91DX22uyUcLRL2Dv4GpubK6EtKFg2+OKLrRobhrWKL7Rag98lN/dc36zrcp/s1vYZ2IvYi45lIURuE+nDf6q0ls7GdK9dy3th/SwcVjh5rhWOLnHx67E2v8KAo1JrfMiPBYeFKET4fV73DlqDCBNdAQCgZ+bBJ9k77v++kzR8MclizbLyxe3xnKzph0RLZYbA6PY4d7WnWI3OqIQHj1HFXpLPzCO6hUqegtCqe/HA6MpLiLj0XeLcDif/bAhJQ3hMXRdrMbjsGFlFbhWuayEj4BcDR/SlPY+CLH9v0QevKYQc+EMQIjYOuLgRPsBUXrq/DDWkf0jIyyhAFTIw5jvfstSSFCsYXalrsMT3eOr/hNQ2mtIaAgYUUXkzCVy1IVqcIvfMLBFGsJ9VVYU6krLpd+fYUT/zf/RccEUBGdeKZsiSIT0vZWi21y7hgkL8OHSGVISU6+wwkH6qn5LtXh/IyvOuhlJiIuYa4bY2Kn9IXqQ4p7DjXobJGf2a1Vk2mvg3lDhYziQ1xB3e7btxPPknUYzR+ThGuiXM7XJZw/sYqHegfgC6P9GlQWohPU0syxwnAhPeoAZ6Bkj9KIVyncA").catch(error => {
  alert(error);
});

const style = {
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  maxWidth: "1280px",
  maxHeight: "80%"
};

class BarcodePicker extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    playSoundOnScan: PropTypes.bool,
    vibrateOnScan: PropTypes.bool,
    scanningPaused: PropTypes.bool,
    guiStyle: PropTypes.string,
    videoFit: PropTypes.string,
    scanSettings: PropTypes.object,
    enableCameraSwitcher: PropTypes.bool,
    enableTorchToggle: PropTypes.bool,
    enableTapToFocus: PropTypes.bool,
    enablePinchToZoom: PropTypes.bool,
    accessCamera: PropTypes.bool,
    camera: PropTypes.object,
    cameraSettings: PropTypes.object,
    targetScanningFPS: PropTypes.number,
    onScan: PropTypes.func,
    onError: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    ScanditSDKBarcodePicker.create(this.ref.current, this.props).then(barcodePicker => {
      this.barcodePicker = barcodePicker;
      if (this.props.onScan != null) {
        barcodePicker.on("scan", this.props.onScan);
      }
      if (this.props.onError != null) {
        barcodePicker.on("scanError", this.props.onError);
      }
    });
  }

  componentWillUnmount() {
    if (this.barcodePicker != null) {
      this.barcodePicker.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    // These are just some examples of how to react to some possible property changes

    if (JSON.stringify(prevProps.scanSettings) !== JSON.stringify(this.props.scanSettings)) {
      this.barcodePicker.applyScanSettings(this.props.scanSettings);
    }

    if (prevProps.visible !== this.props.visible) {
      this.barcodePicker.setVisible(this.props.visible);
    }
  }

  render() {
    return <div ref={this.ref} style={style} />;
  }
}

export default BarcodePicker;
