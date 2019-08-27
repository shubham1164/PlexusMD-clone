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
          <Text style={styles.name}>{this.props.name}</Text>
          <Text numberOfLines={1} style={styles.description}>{this.props.description}</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    maxWidth: 140,
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center'
  },
  detailsDiv: {
    padding: 5,
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 14,
  },
  description: {
    fontSize: 10,
    color: 'gray'
  }
})

FeaturingListItem.propTypes = {
  id: PropTypes.string,
  profileImageUrl: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string
};
