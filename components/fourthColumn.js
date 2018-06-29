import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import SortableList from 'react-native-sortable-list';

const window = Dimensions.get('window');

class FourthColumn extends Component {

  render() {
    const { skillOrder } = this.props
    const { skillData } = this.props
    const { enemy } = this.props

    return (
      <View style={styles.container}>
        <SortableList
          horizontal
          order={skillOrder}
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={skillData}
          renderRow={this._renderRow}
          onChangeOrder={(nextOrder) => { this._order = nextOrder; }}
          onReleaseRow = {(key) => this.newRelease(this._order, enemy)}
        />
      </View>
    );
  }

  newRelease = (ord, enemy) => {
    const func = this.props.onDrop
    func(ord, enemy)
  }

  _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
  }
}

class Row extends Component {

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  render() {
   const {data, active} = this.props;

    return (
      <Animated.View style={[
        styles.row,
        this._style,
      ]}>
        <Text style={styles.text}>{data.text}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  list: {
    alignItems: "center",
    height: 60,
    width: "100%",
  },

  contentContainer: {
    ...Platform.select({
      ios: {
        paddingVertical: 30,
      },

      android: {
        paddingVertical: 0,
      }
    })
  },

  row: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',   
    padding: 12,
    width: 60,
    height: 50,
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 4,


    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        elevation: 0,
        marginHorizontal: 5,
      },
    })
  },

  text: {
    fontSize: 18,
    color: '#222222',
  }
});

export default FourthColumn