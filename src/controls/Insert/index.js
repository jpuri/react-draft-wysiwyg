import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@innovaccer/design-system';
import Controls from '../index';
import { Dropdown } from '../../components/Dropdown';

export default class Insert extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onCloseLinkPopover: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    linkPopoverOpen: PropTypes.bool,
    translations: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { editorState, modalHandler } = this.props;
    this.state = {
      expanded: false
    };

    //modalHandler.registerCallBack(this.expandCollapse);
  }

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;
    if (editorState && editorState !== prevProps.editorState) {
      this.setState({
        //currentStyles: this.changeKeys(getSelectionInlineStyle(editorState)),
      });
    }
  }

  componentWillUnmount() {
    const { modalHandler } = this.props;
    //modalHandler.deregisterCallBack(this.expandCollapse);
  }

  onExpandEvent = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  expandCollapse = () => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  };

  doExpand = () => {
    this.setState({
      expanded: true,
    });
  };

  doCollapse = () => {
    this.setState({
      expanded: false,
    });
  };

  onChange = (editorState) => {
    this.doCollapse();
    this.props.onChange(editorState);
  };

  renderInDropdown(): Object {
    const {
      config,
      // expanded,
      // doExpand,
      // onExpandEvent,
      // doCollapse,
      currentState,
      onChange,
      ...rest
    } = this.props;

    const {
      expanded
    } = this.state;

    // const trigger = (
    //   <div className="d-flex">
    //     <Icon name="add" />
    //     <Icon name="keyboard_arrow_down" />
    //   </div>
    // );

    return (
      <Dropdown
        //onChange={onChange}
        expanded={this.state.expanded}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        onExpandEvent={this.onExpandEvent}
        menu={true}
      >
        <Icon name="more_horizon" />
        {
          config.options.slice(config.max, config.options.length)
            .map((style, index) => {
              const conf = config[style];
              const Control = Controls[style];

              return (
                <Control
                  key={index}
                  config={conf}
                  inDropdown={true}
                  onChange={this.onChange}
                  {...rest}
                />
              );
            })
        }
      </Dropdown>
    );
  }

  render(): Object {
    const { config, ...rest } = this.props;
    //const hiddenOptions = config.options.length - config.max;
    const visibleOptions = config.max;

    return (
      <div className="Editor-toolbar-insert">
        {
          config.options.slice(0, visibleOptions)
            .map((style, index) => {
              const conf = config[style];
              const Control = Controls[style];

              return conf.isVisible ? (
                <Control
                  key={index}
                  config={conf}
                  inDropdown={false}
                  {...rest}
                />
              ) : null;
            })
        }
        {/* {hiddenOptions > 0 && this.renderInDropdown()} */}
      </div>
    );
  }
}
