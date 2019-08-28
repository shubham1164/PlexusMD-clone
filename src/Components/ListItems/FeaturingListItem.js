import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet} from 'react-native'
import {View, Text} from 'native-base';

export default class FeaturingListItem extends PureComponent{

  render(){
    return(
      <View style={styles.container}>
        <Image
          source={{uri: this.props.profileImageUrl}}
          style={styles.profile}
        />
        <View style={styles.detailsDiv}>
          <Text numberOfLines={1} style={styles.name}>{this.props.name}</Text>
          <Text numberOfLines={1} style={styles.description}>{this.props.description}</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 140,
    marginLeft: 10,
    height: 50
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center'
  },
  detailsDiv: {
    paddingLeft: 5,
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 12,
    maxWidth: 100,
  },
  description: {
    fontSize: 9,
    color: 'gray',
    maxWidth: 100,
  }
})

FeaturingListItem.propTypes = {
  id: PropTypes.string.isRequired,
  profileImageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
