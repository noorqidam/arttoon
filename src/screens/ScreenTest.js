import React, { Component } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';

import { connect } from 'react-redux'
import * as actionTodos from './../redux/actions/actionTodos'
import * as actionWebtoons from './../redux/actions/actionWebtoons'

class screenTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.handleGetTodos()
    this.props.handleGetWebtoons()
  }

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.props.webtoonsLocal.webtoons.data}
          renderItem={({ item }) => <Text> {item.title} </Text>}
          keyExtractor={item => item.id} 
          />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    todosLocal: state.todos,
    webtoonsLocal: state.webtoons
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetTodos: () => dispatch(actionTodos.handleGetTodos()),
    handleGetWebtoons: () => dispatch(actionWebtoons.handleGetWebtoons())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(screenTest);
